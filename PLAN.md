# AI-Powered Process Automation: 5 Production Portfolio Projects

## Executive Overview
This portfolio presents five distinct, production-grade AI process automation systems designed to solve high-friction workflows across enterprise and developer environments. Every project is fully self-contained, typed, tested, containerized, and runnable in under 5 minutes without mandatory external API keys thanks to a unified LLM provider abstraction with built-in deterministic simulation modes.

---

## Portfolio Matrix & Comparative Architecture

| # | Project Name | Domain | Architecture Pattern | Tech Stack | Key AI Capabilities | Primary Output / Deliverable |
|---|--------------|--------|---------------------|------------|---------------------|-----------------------------|
| 1 | `docu-reconcile-ai` | Finance & Document Processing | RESTful API Microservice + Batch Reconciliation Engine | FastAPI, Pydantic v2, SQLite, PyPDF/ReportLab, Pytest | Zero-shot structured JSON extraction, confidence scoring, 2-way/3-way PO matching rules, self-correction retry | Validated ledger reconciliation reports & audit trail API |
| 2 | `git-incident-pilot` | DevOps & SRE Automation | Interactive CLI Tool + Local Git Automation Agent | Click, Rich, Git Python APIs, AST Inspector, Pytest | Stack trace deduplication, AST context retrieval, ReAct tool-calling agent, automated surgical git patch generator | Interactive CLI that pinpoints root cause and generates git fix branches |
| 3 | `triage-flow-worker` | Customer Support & Helpdesk | Asynchronous Priority Queue & Background Worker | Asyncio, Thread-safe SQLite Queue, Pydantic, Pytest | Multi-label intent/urgency triage, SLA risk prediction, BM25/Vector RAG retrieval, policy-guided response drafting | High-throughput worker consuming tickets, auto-resolving or routing with drafted replies |
| 4 | `market-radar-bot` | Executive Intel & Competitor Tracking | Event-Driven Webhook Server + Scheduled Scraper + Bot Dispatcher | FastAPI, Feedparser, BeautifulSoup4, Jinja2, Pytest | Information extraction, strategic threat/opportunity matrix scoring, Markdown & Telegram/Slack block payload generation | Executive briefing digest delivered via Webhooks / Slack / Telegram |
| 5 | `omni-brand-copilot` | Marketing & Content Operations | Full-Stack Web App + Glassmorphic UI Dashboard | FastAPI, Modern HTML5/Tailwind/JS SPA, Pydantic, SQLite, Pytest | Persona-conditioned multi-channel adaptation (Twitter, LinkedIn, Newsletter), Brand Constitution guardrail evaluator | End-to-end web studio for multi-channel campaign generation with automated compliance audits |

---

## Detailed Project Specifications

### 1. `docu-reconcile-ai` — Financial Document Extraction & Ledger Reconciliation
- **Problem**: Finance and accounts payable teams manually cross-reference vendor PDF invoices against internal Purchase Orders (POs) and goods receipts, leading to billing discrepancies, delayed payments, and audit risk.
- **Target User**: AP teams, fintech operators, ERP developers.
- **Architecture**:
  - Ingestion layer for raw text, OCR feeds, and invoice payloads.
  - Multi-provider LLM extractor transforming unstructured invoice documents into strict `InvoiceExtraction` schemas.
  - Reconciliation Engine: Implements 2-way and 3-way matching algorithms, checking line-item SKU equivalence, price variances within tolerance, quantity mismatches, and tax discrepancies.
  - Persistence & Export: Stores invoices, reconciliation jobs, and match certificates in SQLite with full REST API and JSON export.
- **Key AI Components**:
  - Structured extraction with Pydantic JSON schemas.
  - Field-level confidence estimation and schema validation error self-healing.
  - Offline Mock provider with deterministic invoice scenarios (exact match, price drift, fraudulent vendor alert).
- **MVP Scope**:
  - Endpoints: `POST /api/v1/invoices/process`, `GET /api/v1/reconcile/{id}`, `GET /api/v1/purchase-orders`.
  - Comprehensive unit and integration test suite.
  - Dockerfile & docker-compose.

---

### 2. `git-incident-pilot` — DevOps Incident Log Intelligence & Auto-Fix CLI
- **Problem**: When production services fail or CI/CD pipelines break, engineers spend critical minutes wading through hundreds of lines of noise in stack traces, matching line numbers to code, and reproducing errors.
- **Target User**: SREs, on-call software engineers, DevOps leads.
- **Architecture**:
  - Log Analyzer: Ingests raw stack traces and log streams, eliminates noise, isolates traceback frames, and identifies suspect repository files.
  - AST & Blame Context Provider: Inspects local repository files, extracts relevant function bodies, and correlates lines with recent commits.
  - ReAct Tool-Calling Agent: Runs a reasoning loop with tools (`read_file`, `check_syntax`, `propose_patch`, `verify_diff`) to produce a precise patch.
  - Rich Terminal Interface: Interactive tables, diff highlighting, and automated git branch/commit creation.
- **Key AI Components**:
  - ReAct reasoning chain (Thought -> Action -> Observation -> Final Fix).
  - High-precision unified diff generation with AST validation.
  - Mock engine with reproducible incidents (NameError, KeyError, Missing Config, Unhandled API error).
- **MVP Scope**:
  - Commands: `analyze`, `reproduce`, `propose-fix`, `apply`.
  - Sample broken target repositories for instant zero-dependency testing.
  - Full CLI test suite.

---

### 3. `triage-flow-worker` — Customer Support Priority Queue & SLA Auto-Responder
- **Problem**: Support inboxes receive a high volume of heterogeneous inquiries. High-value customer outages get lost in queues behind low-priority questions, breaching SLA contracts.
- **Target User**: Customer Support Directors, operations managers, B2B SaaS teams.
- **Architecture**:
  - SQLite WAL-mode Priority Task Queue with producer and worker processes, exponential backoff, and dead-letter queue (DLQ).
  - Triage Agent: Evaluates ticket sentiment, urgency level, category, and SLA deadline impact.
  - RAG Retriever: Ingests internal markdown support policies and knowledge docs, matching relevant documentation to customer issues.
  - Decision Engine: If classification confidence >= 0.90 and low-risk, flags for auto-dispatch; otherwise, generates an AI draft response, highlights missing details, and routes to the appropriate human tier.
- **Key AI Components**:
  - Multi-attribute structured triage (Category, Urgency, Sentiment, Actionability).
  - Grounded RAG synthesis with explicit document citations.
  - Deterministic test generator with 10+ standard support benchmark scenarios.
- **MVP Scope**:
  - Worker daemon with task queue, ingestion producer, metrics reporter, RAG knowledge store, full pytest coverage.

---

### 4. `market-radar-bot` — B2B Competitor Intelligence & Executive Briefing Bot
- **Domain**: Strategic Planning & Market Intelligence
- **Problem**: Product leaders and founders struggle to keep track of competitor launches, pricing tier changes, and industry news scattered across blogs, changelogs, and RSS feeds.
- **Target User**: Product managers, founders, market researchers, venture investors.
- **Architecture**:
  - Feed Ingestion & Content Scraper: Collects articles, RSS items, and release notes.
  - Delta Engine: Deduplicates content via SHA-256 fingerprinting to process only net-new information.
  - Strategic Analysis Pipeline: Identifies strategic relevance, categorizes changes (Pricing, Product Feature, Leadership, Funding), and computes an impact score (1-5).
  - Notification Engine: Formats executive markdown briefs and compiles webhook payloads compatible with Slack Block Kit and Telegram HTML formats.
- **Key AI Components**:
  - Synthesis and noise filtering (extracting business implications from marketing copy).
  - Strategic SWOT & Threat evaluation.
  - Offline Mock provider with realistic competitor release scenarios.
- **MVP Scope**:
  - Webhook endpoint, scheduled scan runner, feed parser, notification dispatch simulator, unit & integration tests.

---

### 5. `omni-brand-copilot` — Multi-Channel Content Automation & Brand Guardrails Studio
- **Domain**: Content Marketing & Corporate Brand Compliance
- **Problem**: Converting long-form assets (product updates, case studies, blog posts) into channel-specific posts (Twitter threads, LinkedIn articles, Newsletter summaries) is time-consuming and often violates brand voice or legal compliance rules.
- **Target User**: Content marketers, social media teams, agency copywriters.
- **Architecture**:
  - Full-stack web application: FastAPI backend with an embedded responsive Glassmorphic single-page web UI (HTML5 + Tailwind CSS + Alpine/JS).
  - Content Generation Pipeline: Specialized generation agents for Twitter/X threads, LinkedIn professional updates, and Newsletter digests.
  - Brand Guardrail & Constitution Engine: Evaluates output against a configurable brand rulebook (banned buzzwords, tone metrics, sentiment parameters, and source claim verification).
  - Campaign Studio API: Saves campaigns, provides side-by-side editing, guardrail scorecards, and JSON/Markdown export.
- **Key AI Components**:
  - Cross-channel conditioned generation with prompt personas.
  - Self-reflection guardrail verification with specific feedback notes.
  - Mock provider delivering complete multi-channel campaigns out of the box.
- **MVP Scope**:
  - Interactive Web Studio UI, complete REST API, campaign persistence, automated brand compliance evaluator, unit + integration tests.

---

## Universal Quality & Production Standards
Every repository contains:
1. **Source Code**: Fully typed, clean architecture (domain models, service layer, provider interfaces, application layer).
2. **Provider Abstraction**: Common `BaseLLMClient` interface supporting `mock`, `openai`, `anthropic`, and `gemini` backends, defaulting to `mock` for zero-friction 5-minute setup.
3. **Configuration**: Pydantic `BaseSettings` reading from `.env` with complete `.env.example` templates.
4. **Testing**: 100% runnable unit and integration tests via `pytest`.
5. **Containerization**: Valid `Dockerfile` and `docker-compose.yml`.
6. **CI/CD**: GitHub Actions workflow (`.github/workflows/ci.yml`) testing formatting, type sanity, and test execution.
7. **Documentation**: Production `README.md` with architecture diagrams, quick-start guides, config reference, and `LICENSE` (MIT).
