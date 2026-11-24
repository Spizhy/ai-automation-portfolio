"""Serve the static portfolio and publish new Git revisions on H1Cloud."""

import mimetypes
import os
import shutil
import subprocess
import tempfile
import threading
import time
import zipfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


REPOSITORY = os.environ.get(
    "PORTFOLIO_REPOSITORY", "https://github.com/Spizhy/ai-automation-portfolio.git"
)
BRANCH = "refs/heads/main"
POLL_SECONDS = 10
STATE = Path(__file__).resolve().parent / ".portfolio-deploy"
GIT_DIR = STATE / "repo.git"
LIVE_ARCHIVE = STATE / "live.zip"
SITE_PATHS = ("index.html", "css", "js", "assets")
REQUIRED_FILES = {"index.html", "css/style.css", "js/main.js"}


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
    def do_GET(self):
        self.serve_site(send_body=True)

    def do_HEAD(self):
        self.serve_site(send_body=False)

    def serve_site(self, send_body):
        requested = unquote(urlsplit(self.path).path).lstrip("/") or "index.html"
        if requested != "index.html" and requested.split("/", 1)[0] not in SITE_PATHS[1:]:
            self.send_error(404)
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
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("X-Portfolio-Commit", archive.comment.decode("ascii").strip())
            self.end_headers()
            if send_body:
                with archive.open(entry) as content:
                    shutil.copyfileobj(content, self.wfile)


if __name__ == "__main__":
    STATE.mkdir(exist_ok=True)
    port = int(os.environ.get("PORTFOLIO_PORT") or os.environ.get("SERVER_PORT") or 25006)
    with ThreadingHTTPServer(("0.0.0.0", port), PortfolioHandler) as server:
        threading.Thread(target=watch_git, daemon=True).start()
        print(f"Portfolio listening on {port}; checking Git every {POLL_SECONDS}s", flush=True)
        server.serve_forever()
