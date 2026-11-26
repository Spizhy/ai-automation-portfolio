"""Serve the static portfolio and publish new Git revisions on H1Cloud."""

import mimetypes
import json
import re
import os
import shutil
import subprocess
import tempfile
import threading
import time
import zipfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from collections import OrderedDict
from urllib.parse import unquote, urlsplit


REPOSITORY = os.environ.get(
    "PORTFOLIO_REPOSITORY", "https://github.com/Spizhy/ai-automation-portfolio.git"
)
BRANCH = "refs/heads/main"
POLL_SECONDS = 10
STATE = Path(__file__).resolve().parent / ".portfolio-deploy"
GIT_DIR = STATE / "repo.git"
LIVE_ARCHIVE = STATE / "live.zip"
SITE_PATHS = ("index.html", "privacy.html", "css", "js", "assets")
REQUIRED_FILES = {"index.html", "css/style.css", "js/main.js"}
PUBLIC_FILE = re.compile(r"(?:(?:index|privacy)\.html|css/[\w-]+\.css|js/[\w-]+\.js|assets/images/[\w-]+\.(?:png|jpe?g|webp|avif)|assets/fonts/[\w.-]+\.woff2)", re.ASCII)


class RequestBudget:
    def __init__(self, limit=120, window=60):
        self.limit = limit
        self.window = window
        self.clients = OrderedDict()
        self.lock = threading.Lock()

    def allow(self, address, now):
        with self.lock:
            while self.clients and next(iter(self.clients.values()))[0] <= now:
                self.clients.popitem(last=False)
            if address not in self.clients and len(self.clients) >= 4096:
                return False
            expiry, count = self.clients.get(address, (now + self.window, 0))
            if count >= self.limit:
                return False
            self.clients[address] = (expiry, count + 1)
            return True


class LimitedServer(ThreadingHTTPServer):
    slots = threading.BoundedSemaphore(32)

    def process_request(self, request, client_address):
        if not self.slots.acquire(blocking=False):
            self.shutdown_request(request)
            return
        try:
            request.settimeout(8)
            super().process_request(request, client_address)
        except BaseException:
            self.slots.release()
            raise

    def process_request_thread(self, request, client_address):
        try:
            super().process_request_thread(request, client_address)
        finally:
            self.slots.release()


def git(*args):
    result = subprocess.run(
        ["git", *args],
        check=True,
        capture_output=True,
        text=True,
        timeout=35,
        env={**os.environ, "GIT_TERMINAL_PROMPT": "0"},
    )
    return result.stdout.strip()


def active_revision():
    try:
        with zipfile.ZipFile(LIVE_ARCHIVE) as archive:
            return archive.comment.decode("ascii").strip()
    except (FileNotFoundError, UnicodeError, zipfile.BadZipFile):
        return ""


def update_site():
    advertised = git("ls-remote", "--exit-code", REPOSITORY, BRANCH).split()[0]
    if advertised == active_revision():
        return

    if not GIT_DIR.is_dir():
        git("init", "--bare", str(GIT_DIR))
    git("-C", str(GIT_DIR), "fetch", "--depth=1", "--no-tags", REPOSITORY, BRANCH)
    with tempfile.TemporaryDirectory(dir=STATE) as directory:
        candidate = Path(directory) / "site.zip"
        git(
            "-C", str(GIT_DIR), "archive", "--format=zip", f"--output={candidate}",
            "FETCH_HEAD", "--", *SITE_PATHS,
        )
        with zipfile.ZipFile(candidate) as archive:
            if not REQUIRED_FILES.issubset(archive.namelist()) or archive.testzip():
                raise ValueError("The new revision has missing or corrupt site files")
            revision = archive.comment.decode("ascii").strip()
        os.replace(candidate, LIVE_ARCHIVE)
    print(f"Deployed {revision}", flush=True)


def watch_git():
    last_error = ""
    while True:
        started = time.monotonic()
        try:
            update_site()
            last_error = ""
        except (OSError, ValueError, zipfile.BadZipFile, subprocess.SubprocessError) as error:
            message = getattr(error, "stderr", None) or str(error)
            message = message.strip()
            if message != last_error:
                print(f"Git check failed; keeping current site: {message}", flush=True)
                last_error = message
        time.sleep(max(1, POLL_SECONDS - (time.monotonic() - started)))


class PortfolioHandler(BaseHTTPRequestHandler):
    requests = RequestBudget()
    audit = RequestBudget(limit=1)

    def parse_request(self):
        if not super().parse_request():
            return False
        if not self.requests.allow(self.client_address[0], time.monotonic()):
            self.send_error(429)
            return False
        return True

    def log_request(self, code="-", size="-"):
        # Exclude query strings, headers and bodies from the audit log.
        if isinstance(code, int) and code >= 400:
            if self.audit.allow(self.client_address[0], time.monotonic()):
                print(json.dumps({"event": "request_rejected", "status": code,
                                  "peer": self.client_address[0], "time": int(time.time())}), flush=True)

    def log_error(self, *args):
        pass  # log_request records the rejection without untrusted request text.

    def end_headers(self):
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("X-Frame-Options", "DENY")
        if getattr(self, "command", None) and self.request_version != "HTTP/0.9":
            self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def do_GET(self):
        self.serve_site(send_body=True)

    def do_HEAD(self):
        self.serve_site(send_body=False)

    def serve_site(self, send_body):
        requested = unquote(self.path.partition("?")[0]).removeprefix("/") or "index.html"
        if not PUBLIC_FILE.fullmatch(requested):
            self.send_error(404)
            return
        if self.server.public_https:
            self.send_response(308)
            self.send_header("Location", "https://portfolio-sepia-three-27.vercel.app/" +
                             ("" if requested == "index.html" else requested))
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        try:
            archive = zipfile.ZipFile(LIVE_ARCHIVE)
        except (FileNotFoundError, zipfile.BadZipFile):
            self.send_error(503, "Waiting for the first portfolio deployment")
            return

        with archive:
            try:
                entry = archive.getinfo(requested)
            except KeyError:
                self.send_error(404)
                return
            if entry.is_dir():
                self.send_error(404)
                return

            content_type, _ = mimetypes.guess_type(requested)
            self.send_response(200)
            self.send_header("Content-Type", content_type or "application/octet-stream")
            self.send_header("Content-Length", str(entry.file_size))
            self.send_header("Cache-Control", "no-cache")
            self.send_header("X-Portfolio-Commit", archive.comment.decode("ascii").strip())
            self.end_headers()
            if send_body:
                with archive.open(entry) as content:
                    shutil.copyfileobj(content, self.wfile)


if __name__ == "__main__":
    STATE.mkdir(exist_ok=True)
    port = int(os.environ.get("PORTFOLIO_PORT") or os.environ.get("SERVER_PORT") or 25006)
    with LimitedServer(("0.0.0.0", port), PortfolioHandler) as server:
        server.public_https = True
        threading.Thread(target=watch_git, daemon=True).start()
        print(f"Portfolio listening on {port}; checking Git every {POLL_SECONDS}s", flush=True)
        server.serve_forever()
