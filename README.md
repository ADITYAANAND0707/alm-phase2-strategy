# ALM Phase 2 — Synthetic Data Strategy

A living strategy and planning document for Phase 2 of the ALM (Application Language Model) project, focused on building a synthetic data pipeline for MAL (Metafore Application Language).

## Live Document

**[View the Strategy Report →](https://adityaanand0707.github.io/alm-phase2-strategy/)**

---

## What This Document Covers

The report is structured into five parts across 21 sections:

| Part | Sections | Content |
|------|----------|---------|
| **I — Context & Direction** | 1–5 | Executive summary, status dashboard, scope definition, gap analysis |
| **II — Pipeline Design** | 6–10 | Task coverage, pipeline architecture, Jinja2 rationale, platform readiness, execution playbook |
| **III — Strategy & Methods** | 11–12 | Model adaptation strategy, research methods reference |
| **IV — Engineering Standards** | 13–14 | Governance standards, data schemas and contracts |
| **V — Reference & Governance** | 15–21 | Example library, risk register, roadmap, decision log, changelog |

---

## Pipeline Overview

```
Gold Seeds → Jinja2 Expansion → LLM Variant Expansion → Validation → Human Review → Accepted Registry
```

- **Stage 1 (Now):** Gold seed authoring — 40–60 canonical MAL examples covering all construct families
- **Stage 2 (Now):** Jinja2 + Python template expansion — controlled, deterministic MAL variants
- **Stage 3 (Next):** LLM variant expansion — constrained generation with domain packs and strict validation gates
- **Stage 4 (Next):** Validation pipeline — syntax, schema, policy, graph compile, novelty checks
- **Stage 5 (Later):** Human review and registry promotion — scored, accepted records with full provenance

---

## Document Type

This is a **living technical report**. It is designed to be updated as Phase 2 progresses:

- Update the **Progress Tracker** (Section 2) every sprint
- Update the **Construct Coverage Grid** (Section 6) as new examples are accepted
- Update the **Decision Log** (Section 19) when key choices are made
- Add new example pairs to the **Example Library** (Section 15) as records are promoted

---

## Tech Stack

- **MAL** — Metafore Application Language (domain-specific language for enterprise app modeling)
- **ALM** — Application Language Model (AI-assisted platform for MAL generation and validation)
- **Jinja2** — Template engine for controlled synthetic data expansion
- **PostgreSQL + Apache AGE** — Relational + graph database for registry and graph compile validation
- **Qdrant** — Vector DB for semantic retrieval and near-duplicate detection
- **FastAPI** — Backend orchestration for validation, review, and promotion workflows

---

*Phase 2 — In Planning · Version 2.0 · April 2026*
