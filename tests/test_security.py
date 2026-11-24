"""Offline contract checks. Run: python -m unittest discover -s tests -v"""
import json
import os
import unittest
from http.client import HTTPConnection
from threading import Thread
from unittest.mock import patch

import h1cloud_portfolio as site
from api import contact


class SecurityTests(unittest.TestCase):
    fields = dict(name="Тест", email="visitor@example.org", company="", website="",
                  message="Проверка формы", acceptance=True)

    def request(self, handler, method, path, body=None, headers=None):
        with site.LimitedServer(("127.0.0.1", 0), handler) as server:
            server.public_https = True
            thread = Thread(target=server.handle_request)
            thread.start()
            connection = HTTPConnection(*server.server_address, timeout=3)
            try:
                connection.request(method, path, body=body, headers=headers or {})
                response = connection.getresponse()
                response.read()
                return response.status, dict(response.getheaders())
            finally:
                connection.close()
                thread.join(3)

    def post(self, data):
        return self.request(contact.handler, "POST", "/api/contact", json.dumps(data),
                            {"Origin": contact.ORIGIN, "Content-Type": "application/json"})[0]

    def test_https_redirect(self):
        status, headers = self.request(site.PortfolioHandler, "GET", "/")
        self.assertEqual(status, 308)
        self.assertEqual(headers["Location"], contact.ORIGIN + "/")

    def test_public_file_policy(self):
        for path in ("assets/images/ritm-hero.jpg", "css/style.css", "js/main.js"):
            self.assertTrue(site.PUBLIC_FILE.fullmatch(path))
        for path in ("admin", "data.sqlite", ".env", "assets/site.zip", "assets/images/.backup.jpg"):
            self.assertFalse(site.PUBLIC_FILE.fullmatch(path))

    def test_budget_expiry(self):
        budget = site.RequestBudget(limit=2, window=4)
        self.assertEqual([budget.allow("peer", t) for t in (0, 1, 2, 4)], [True, True, False, True])

    def test_validation(self):
        self.assertEqual(contact.validate(self.fields)["name"], "Тест")
        for changes in ({"email": "invalid"}, {"message": "x" * 4001}, {"acceptance": False},
                        {"name": " "}, {"extra": "unknown"}):
            with self.subTest(changes=list(changes)):
                self.assertEqual(self.post(self.fields | changes), 422)

    def test_origin_required(self):
        self.assertEqual(self.request(contact.handler, "POST", "/api/contact")[0], 403)

    def test_rejection_logged_without_personal_data(self):
        with self.assertLogs(level="WARNING") as logs:
            self.assertEqual(self.post(self.fields | {"acceptance": False}), 422)
        self.assertIn("contact_rejected status=422", logs.output[0])
        self.assertNotIn(self.fields["email"], logs.output[0])

    def test_request_limit_returns_429(self):
        with patch.object(contact, "request_budget", site.RequestBudget(limit=0)):
            self.assertEqual(self.post(self.fields), 429)

    def test_content_type(self):
        status, _ = self.request(contact.handler, "POST", "/api/contact", "text",
                                 {"Origin": contact.ORIGIN, "Content-Type": "text/plain"})
        self.assertEqual(status, 415)

    def test_mail_not_configured(self):
        with patch.dict(os.environ, {"GMAIL_USER": "", "GMAIL_APP_PASSWORD": ""}):
            self.assertEqual(self.post(self.fields), 503)

    def test_structured_delivery(self):
        with patch.dict(os.environ, {"GMAIL_USER":"sender@example.org","GMAIL_APP_PASSWORD":"test"}), patch.object(contact.smtplib, "SMTP_SSL") as smtp:
            self.assertEqual(self.post(self.fields), 204)
            message = smtp.return_value.__enter__.return_value.send_message.call_args.args[0]
            self.assertEqual(message["To"], contact.RECIPIENT)
            self.assertEqual(message["Reply-To"], self.fields["email"])
            self.assertIn("Сообщение: Проверка формы", message.get_content())
