"""Accept same-origin portfolio inquiries and deliver them to a fixed Gmail inbox."""
import json
import base64
import logging
import os
import re
import smtplib
import ssl
import time
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from h1cloud_portfolio import RequestBudget

ORIGIN = "https://portfolio-sepia-three-27.vercel.app"
RECIPIENT = "ilyaboztech@gmail.com"
LIMITS = {"name": 100, "company": 160, "website": 240, "email": 254, "message": 4000}
budget = RequestBudget(limit=3, window=600)
mail_budget = RequestBudget(limit=15, window=600)
request_budget = RequestBudget(limit=30, window=60)


def validate(data):
    if not isinstance(data, dict) or set(data) != {*LIMITS, "acceptance"} or data["acceptance"] is not True:
        raise ValueError
    fields = {}
    for key, limit in LIMITS.items():
        text = data[key]
        if not isinstance(text, str) or len(text) > limit:
            raise ValueError
        allowed = "\n\r\t" if key == "message" else ""
        if any((ord(c) < 32 or ord(c) == 127) and c not in allowed for c in text):
            raise ValueError
        fields[key] = text.strip()
    if not fields["name"] or not fields["message"] or not re.fullmatch(r"[\w.+%\-]+@[\w-]+(?:\.[\w-]+)+", fields["email"], re.ASCII):
        raise ValueError
    return fields


def build_message(fields, sender):
    message = EmailMessage()
    message["From"] = sender
    message["To"] = RECIPIENT
    message["Reply-To"] = fields["email"]
    message["Subject"] = "Заявка с портфолио"
    labels = {"name": "Имя", "company": "Компания", "website": "Telegram или сайт", "email": "Email", "message": "Сообщение"}
    message.set_content("\n\n".join(f"{label}: {fields[key] or '—'}" for key, label in labels.items()))
    return message


def connect_mail():
    context = ssl.create_default_context()
    try:
        return smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=5, context=context)
    except (OSError, smtplib.SMTPServerDisconnected):
        smtp = smtplib.SMTP("smtp.gmail.com", 587, timeout=5)
        try:
            smtp.starttls(context=context)
            return smtp
        except (OSError, smtplib.SMTPException):
            smtp.close()
            raise


def send_gmail_api(message, client_id, client_secret, refresh_token):
    token_request = Request("https://oauth2.googleapis.com/token", data=urlencode({
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token",
    }).encode("ascii"))
    with urlopen(token_request, timeout=8) as response:
        access_token = json.load(response)["access_token"]
    encoded = base64.urlsafe_b64encode(message.as_bytes()).decode("ascii")
    send_request = Request(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        data=json.dumps({"raw": encoded}).encode("ascii"),
        headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
    )
    with urlopen(send_request, timeout=8) as response:
        return json.load(response)["id"]


class handler(BaseHTTPRequestHandler):
    def reply(self, status):
        self.send_response(status)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def log_request(self, code="-", size="-"):
        if isinstance(code, int) and code >= 400:
            logging.warning("contact_rejected status=%d", code)

    def do_POST(self):
        peer = self.headers.get("x-vercel-forwarded-for", self.client_address[0]).split(",")[0].strip()
        if not request_budget.allow(peer, time.monotonic()):
            return self.reply(429)
        if self.headers.get("Origin") != ORIGIN:
            return self.reply(403)
        if self.headers.get_content_type() != "application/json":
            return self.reply(415)
        length = self.headers.get("Content-Length", "")
        if not re.fullmatch(r"[0-9]{1,5}", length) or not 0 < int(length) <= 24000:
            return self.reply(413)
        try:
            fields = validate(json.loads(self.rfile.read(int(length)).decode("utf-8")))
        except (ValueError, RecursionError):
            return self.reply(422)
        sender = os.getenv("GMAIL_USER", "").strip()
        password = "".join(os.getenv("GMAIL_APP_PASSWORD", "").split())
        oauth = tuple(os.getenv(key) for key in (
            "GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REFRESH_TOKEN",
        ))
        if not sender or (not all(oauth) and not password):
            return self.reply(503)
        now = time.monotonic()
        if not budget.allow(peer, now) or not mail_budget.allow("mail", now):
            return self.reply(429)
        try:
            if all(oauth):
                send_gmail_api(build_message(fields, sender), *oauth)
                return self.reply(204)
            with connect_mail() as smtp:
                smtp.login(sender, password)
                smtp.send_message(build_message(fields, sender))
        except smtplib.SMTPAuthenticationError as error:
            logging.error("mail_authentication_failed smtp_code=%d", error.smtp_code)
            return self.reply(502)
        except (OSError, smtplib.SMTPException, ValueError, KeyError) as error:
            logging.error("mail_delivery_failed type=%s smtp_code=%s",
                          type(error).__name__, getattr(error, "smtp_code", "-"))
            return self.reply(502)
        return self.reply(204)
