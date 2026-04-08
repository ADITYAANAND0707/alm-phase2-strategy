---
description: ALM Phase 2 Strategy Document — AI editing rules for Cursor
globs: ["index.html", "phase2_synthetic_data_strategy.html"]
alwaysApply: true
---

# ALM Phase 2 — Cursor AI Rules

## Primary File
Always edit `index.html`. This is what GitHub Pages deploys at:
https://adityaanand0707.github.io/alm-phase2-strategy/

After editing `index.html`, sync the backup:
```powershell
Copy-Item index.html phase2_synthetic_data_strategy.html -Force
```

## Before Making Any Changes
Read `AGENTS.md` in this repo. It contains:
- Full project context (ALM, MAL, Phase 2 pipeline)
- Section map (which section to edit for what)
- HTML/CSS class reference for every component type
- MAL grammar syntax
- Changelog rules

## Core Rules

1. **Never change the color tokens** in `:root { }` — the palette is fixed.
2. **Never remove or change the 5 Part dividers** — they structure the document.
3. **Always add a Changelog row** (Section 21) when editing content.
4. **When adding an example pair** (Section 15), also update the Coverage Grid (Section 6).
5. **Use existing CSS classes** — do not add inline styles.
6. **Do not break Mermaid diagrams** — keep `graph TD` / `graph LR` syntax valid.
7. **Do not alter** `#read-progress`, `#back-top`, `scroll-behavior`, or TOC JS — these are UX features.
8. **Preserve section IDs** (`id="s1"` through `id="s21"`) — the TOC links depend on them.

## Project Terminology
- **ALM** — Application Language Model (the full AI platform)
- **MAL** — Metafore Application Language (the DSL this pipeline generates data for)
- **Gold Seed** — manually authored, approved MAL example pair
- **Candidate** — generated MAL that hasn't been validated yet
- **Registry Record** — validated, human-reviewed MAL example
- **Domain Pack** — versioned JSON of approved vocabulary for one domain (e.g., Telecom)
- **L1–L4** — capability layers: Syntax → Task Behavior → Domain/Policy → Robustness
- **Construct** — a MAL block type: `entity`, `workflow`, `policy`, `evolution`, `agent`, `integration`, `event`
- **Task Type** — category of training example: Create, Modify, Explain, Policy-Constraint, Repair, Disambiguate

## MAL Grammar Summary
```
application <Name>
  domain <Domain> version <N>

entity <Name>
  attributes
    <field> <TYPE> [required]

workflow <Name>
  trigger <event>
  steps
    <step>

policy <Name>
  applies_to <Workflow>
  rules
    require <condition>
  audit true

evolution <AppName> version <N>
  modify entity <Name>
    add_attribute <field> <TYPE>
```

## Approved Domains
- `Telecom` (fully defined)
- `Finance` (in planning)
- `Healthcare` (in planning)

## How to Commit After Editing
```powershell
git add index.html phase2_synthetic_data_strategy.html
git commit -m "Update: <what changed>"
git push origin master
```
GitHub Pages updates within ~2 minutes.
