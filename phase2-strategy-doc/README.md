# ALM Phase 2 — Strategy Document Package

This folder is a self-contained package. Drop it into any repo as-is.
It contains the Phase 2 synthetic data strategy document and everything needed to update it via AI prompting.

**Live Document:** https://adityaanand0707.github.io/alm-phase2-strategy/

---

## Folder Structure

```
phase2-strategy-doc/
│
├── index.html                          ← MAIN FILE — the strategy document (edit this)
├── phase2_synthetic_data_strategy.html ← Named backup — keep in sync with index.html
│
├── AGENTS.md                           ← AI context: section map, HTML classes, MAL grammar
├── CONTRIBUTING.md                     ← How to update via AI prompting + commit workflow
├── README.md                           ← This file
│
├── prompts/
│   └── EXAMPLES.md                     ← 11 ready-to-use prompt templates
│
├── .cursor/
│   └── rules/
│       └── alm-phase2.md               ← Auto-loaded Cursor rules (no setup needed)
│
├── context/                            ← Reference documents (read-only)
│   ├── ALM_MASTER_OVERVIEW.md          ← Full ALM platform overview
│   ├── MAL_Synthetic_Data_Strategy_Report_fixed.docx  ← Original strategy research
│   ├── Metafore_MAL_Formal_Grammar.docx               ← MAL grammar specification
│   └── AML_PROJECT_TRANSCRIPT.txt      ← Project background transcript
│
├── .nojekyll                           ← For GitHub Pages: disables Jekyll
└── .gitignore                          ← Excludes private/temp files
```

---

## How to Update the Document

Open `index.html` in Cursor. The AI auto-loads `.cursor/rules/alm-phase2.md` and knows the full project context.

Just describe what you want changed:

- "Update the progress tracker — Seeds Defined is now 15/50"
- "Add a new Create example pair to Section 15 for Healthcare"
- "Log a new decision in Section 19: GPT-4o chosen for LLM expansion"

See `prompts/EXAMPLES.md` for copy-paste templates covering every section.
See `CONTRIBUTING.md` for the full workflow.

---

## Key Reference: What's in `context/`

| File | What it is |
|---|---|
| `ALM_MASTER_OVERVIEW.md` | Full ALM architecture, MAL constructs, services, storage |
| `MAL_Synthetic_Data_Strategy_Report_fixed.docx` | Original research doc that the strategy is built on |
| `Metafore_MAL_Formal_Grammar.docx` | Formal MAL grammar — entity, workflow, policy, evolution syntax |
| `AML_PROJECT_TRANSCRIPT.txt` | Background transcript from early project planning |

These are read-only references. Do not commit edits to these files.

---

## After Editing — Sync and Push

```powershell
# Sync the named backup
Copy-Item index.html phase2_synthetic_data_strategy.html -Force

# Commit
git add index.html phase2_synthetic_data_strategy.html
git commit -m "Update: [what changed]"
git push origin master
```
