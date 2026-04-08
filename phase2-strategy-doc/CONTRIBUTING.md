# Contributing to ALM Phase 2 Strategy

This document is a **living report** — it grows as the Phase 2 pipeline matures.
Anyone on the team can update it by cloning the repo and editing through Cursor (or any AI-assisted editor).

---

## Quick Start — Clone and Open

```bash
git clone https://github.com/ADITYAANAND0707/alm-phase2-strategy.git
cd alm-phase2-strategy
```

Open the folder in **Cursor** (or VS Code). The file you edit is `index.html`.

---

## How to Make Updates Using AI Prompting

You do not need to manually write HTML. Open `index.html` in Cursor and describe what you want to change:

### Examples of prompts you can give the AI

**Adding a new example pair:**
> "Add a new Create example to Section 15 (Example Library) for a Healthcare patient registration application. The intent is: Create a patient registration app with insurance verification. Generate the MAL output."

**Updating the progress tracker:**
> "Update the Status Dashboard (Section 2) — Seeds Defined is now 15/50, Templates Built is 6. Change the stat-pill from warn to green for Seeds."

**Logging a new decision:**
> "Add a new Confirmed decision to the Decision Log (Section 19): Model choice is GPT-4o with direct instruction prompting. Rationale: best MAL grammar compliance in internal testing."

**Adding a new risk:**
> "Add a Medium risk to the Risk Register (Section 16): Payload diversity is too low — template substitution is only varying entity names, not workflow step counts."

**Adding a research method:**
> "Add a new row to the Research Methods Reference (Section 12) for Constitutional AI — Main idea: self-critique and revision loop; Best MAL use: reducing policy violations in generated MAL; Role: Supporting."

**Updating the roadmap:**
> "In the Roadmap (Section 18), mark 'Define Gold Seeds' as completed and add a new Now item: Integrate Jinja2 template runner with the validation pipeline."

> **Tip:** Always mention the section name and number in your prompt so the AI knows exactly where to make the change. Read `AGENTS.md` to understand the full document structure.

---

## File Structure

```
alm-phase2-strategy/
│
├── index.html                        ← MAIN FILE — edit this
├── phase2_synthetic_data_strategy.html ← Named backup — keep in sync
│
├── AGENTS.md                         ← AI context (read before prompting)
├── CONTRIBUTING.md                   ← This file
├── README.md                         ← Project overview and live link
│
├── prompts/
│   └── EXAMPLES.md                   ← Ready-to-use prompt templates
│
├── .cursor/
│   └── rules/
│       └── alm-phase2.md             ← Cursor-specific AI rules (auto-loaded)
│
├── .nojekyll                         ← Tells GitHub Pages: don't run Jekyll
└── .gitignore                        ← Keeps .docx and .txt files private
```

---

## Sync Rule

`index.html` is what GitHub Pages serves. `phase2_synthetic_data_strategy.html` is a named copy.
After editing `index.html`, sync the backup:

```powershell
# Windows (PowerShell)
Copy-Item index.html phase2_synthetic_data_strategy.html -Force
```

```bash
# Mac / Linux
cp index.html phase2_synthetic_data_strategy.html
```

---

## Commit and Push

```bash
git add index.html phase2_synthetic_data_strategy.html
git commit -m "Update: [brief description of what changed]"
git push origin master
```

GitHub Pages rebuilds automatically. Changes go live in ~1–2 minutes.

---

## Update Checklist

Before committing, check:

- [ ] The correct section was updated (verify by section ID in the HTML)
- [ ] New example pairs also updated the **Coverage Grid** in Section 6
- [ ] Progress tracker numbers in **Section 2** reflect the latest sprint
- [ ] A **Changelog row** was added to Section 21 with the new version number
- [ ] The **cover meta pill** and **footnote version** were updated (e.g., v2.1)
- [ ] `phase2_synthetic_data_strategy.html` is synced with `index.html`
- [ ] No `.docx`, `.txt`, or private files are being committed (check `git status`)

---

## Sections That Change Regularly vs Rarely

**Update every sprint:**
- Section 2 — Status Dashboard (tracker counts)
- Section 6 — Coverage Grid (when new examples added)
- Section 15 — Example Library (new accepted MAL pairs)
- Section 19 — Decision Log (new choices made)
- Section 21 — Changelog (every update)

**Update when strategy changes:**
- Section 3 — Immediate Action Map
- Section 10 — Execution Playbook
- Section 16 — Risk Register
- Section 18 — Roadmap

**Rarely change:**
- Section 1, 4, 7, 8, 11, 13, 14, 17, 20 — stable foundational content

---

## Using GitHub Codespaces (no local setup needed)

1. Go to: https://github.com/ADITYAANAND0707/alm-phase2-strategy
2. Click **Code → Codespaces → Create codespace on master**
3. Edit `index.html` directly in the browser-based editor
4. Use the built-in Copilot or paste prompts manually
5. Commit and push from the Codespaces terminal

---

## Questions / Decisions

Log all significant decisions in the **Decision Log (Section 19)** — not in Slack, not in comments.
The document is the single source of truth for Phase 2 planning.
