# AGENTS.md — AI Context for ALM Phase 2 Strategy Repo

This file is the primary context source for any AI agent (Cursor, GitHub Copilot, Claude, GPT-4, etc.) working in this repo.
Read this fully before making any changes to the document.

---

## What This Project Is

**ALM (Application Language Model)** — An AI-assisted platform that generates, validates, and manages enterprise application models written in MAL.

**MAL (Metafore Application Language)** — A domain-specific language (DSL) for defining enterprise applications through structured constructs: `application`, `entity`, `workflow`, `policy`, `agent`, `integration`, `event`, `evolution`.

**Phase 2** — The offline synthetic data pipeline that produces MAL training examples for the ALM platform. It does NOT modify the live ALM runtime. It creates data to improve the model that powers it.

**The pipeline has 5 stages:**
```
Gold Seeds → Jinja2 Template Expansion → LLM Variant Expansion → Validation → Human Review → Registry
```

---

## The File to Edit

**Always edit: `index.html`**

This is the document. It is the same file that GitHub Pages deploys to:
`https://adityaanand0707.github.io/alm-phase2-strategy/`

`phase2_synthetic_data_strategy.html` is a named backup — keep it in sync after editing `index.html`.

To sync after editing:
```powershell
Copy-Item index.html phase2_synthetic_data_strategy.html -Force
```

---

## Document Structure — Section Map

| Section | ID | Title | Update When |
|---|---|---|---|
| 1 | `#s1` | Executive Summary | Scope or strategy fundamentally changes |
| 2 | `#s2` | Status Dashboard | Every sprint — update the 4 tracker cards |
| 3 | `#s3` | Immediate Action Map | Priorities shift between Now/Next/Later |
| 4 | `#s4` | Scope Definition | MAL grammar scope changes |
| 5 | `#s5` | Baseline & Gap Analysis | New capabilities added to ALM platform |
| 6 | `#s6` | Task Coverage & Construct Map | New examples added to Example Library |
| 7 | `#s7` | Pipeline Architecture | Pipeline stages added or changed |
| 8 | `#s8` | Jinja2-First Rationale | Static — change rarely |
| 9 | `#s9` | Platform Readiness Assessment | New components added or readiness changes |
| 10 | `#s10` | Execution Playbook | New stage details, decisions, or workflows added |
| 11 | `#s11` | Model Adaptation Strategy | Model approach changes |
| 12 | `#s12` | Research Methods Reference | New relevant research methods discovered |
| 13 | `#s13` | Governance & Engineering Standards | New governance practices added |
| 14 | `#s14` | Data Schemas & Contracts | Schema fields added or changed |
| 15 | `#s15` | Example Library | New accepted MAL pairs — add here |
| 16 | `#s16` | Risk Register | New risks identified or existing risks resolved |
| 17 | `#s17` | Recommendation | Core strategy recommendation changes |
| 18 | `#s18` | Roadmap | Milestones completed or re-prioritized |
| 19 | `#s19` | Decision Log | Any key decision made, changed, or resolved |
| 20 | `#s20` | Document Maintenance | Update maintenance guidance |
| 21 | `#s21` | Changelog | Every time the document is updated |

---

## HTML/CSS Conventions

### Grids
```html
<div class="grid-2">  <!-- 2 columns -->
<div class="grid-3">  <!-- 3 columns -->
<div class="grid-4">  <!-- 4 columns, used for tracker cards -->
```

### Info Card
```html
<div class="card">
  <div class="ctag navy">Label</div>     <!-- navy / gold / rose / plan / warn -->
  <h4>Card Title</h4>
  <ul><li>Point</li></ul>
  <div class="stat-pill">Note text</div> <!-- add .warn or .plan for color -->
</div>
```

### Metric Card (dashboard tracker)
```html
<div class="metric-card tracker">
  <div class="m-label">Seeds Defined</div>
  <div class="m-value">12 / 50</div>
  <div class="m-desc">Description of the metric.</div>
  <div class="stat-pill warn">In progress</div>
</div>
```

### Example Pair (Section 15)
```html
<div class="example-pair">
  <div class="ep-head">
    <span class="ep-type create">Create</span>  <!-- create/modify/policy/repair/explain/disambig -->
    <span class="ep-title">Title of the Example</span>
  </div>
  <div class="ep-body">
    <div class="ep-col">
      <div class="ep-label">User Intent</div>
      <div class="ep-text">Natural language user request here.</div>
    </div>
    <div class="ep-col">
      <div class="ep-label">MAL Output</div>
      <div class="ep-code">application MyApp
  domain Telecom version 1.0
entity MyEntity
  attributes
    id UUID required</div>
    </div>
  </div>
</div>
```

### Decision Log Row (Section 19)
```html
<tr>
  <td><strong>Decision name</strong></td>
  <td>What was chosen</td>
  <td>Why it was chosen</td>
  <td><span class="tag tag-confirmed">Confirmed</span></td>  <!-- tag-confirmed / tag-open / tag-planned -->
  <td>Apr 2026</td>
</tr>
```

### Risk Register Row (Section 16)
```html
<div class="oi oi-high">  <!-- oi-high / oi-mid / oi-plan -->
  <span class="sev sev-high">High</span>  <!-- sev-high / sev-mid / sev-plan -->
  <div><strong>Risk title</strong> — Risk description and impact.</div>
</div>
```

### Code Block
```html
<div class="pre-wrap">
  <div class="pre-header">JSON — Record Name</div>
  <pre>{ "key": "value" }</pre>
</div>
```

### Note Callout
```html
<div class="note">
  <div class="note-line"><span class="tag tag-direction">Planning direction</span> Your note text here.</div>
</div>
```

### Coverage Grid Cell (Section 6)
- `class="has-ex"` — example exists in Section 15
- `class="planned"` — targeted next, no example yet
- `class="not-yet"` — not yet scoped

---

## Construct Coverage Rules

When you add a new example pair in Section 15, also update the coverage table in Section 6.
Find the row matching the MAL construct (entity/workflow/policy/evolution/agent/integration/event)
and the column matching the task type (Create/Modify/Explain/Policy-Const./Repair/Disambiguate).
Change `class="planned"` to `class="has-ex"` and the cell text to `✓`.

---

## Progress Tracker Update (Section 2)

The 4 tracker cards hold:
1. **Gold Seeds Defined** — e.g. `12 / 50`
2. **Jinja2 Templates Built** — e.g. `8`
3. **Candidates Validated** — e.g. `0`
4. **Records in Registry** — e.g. `0`

Change the `.m-value` text. Change `.stat-pill warn` to `.stat-pill` (green) once a number is non-zero.

---

## MAL Grammar — Quick Reference

```
application <Name>
  domain <Domain> version <N>

entity <Name>
  attributes
    <field> <TYPE> [required]       -- UUID, STRING, INTEGER, BOOLEAN, ENUM(...), DATE

workflow <Name>
  trigger <event_name>
  steps
    <step_name>

policy <Name>
  applies_to <WorkflowName>
  rules
    require <condition>
  audit true

agent <Name>
  handles <workflow>

integration <Name>
  endpoint <url>

event <Name>
  trigger <condition>

evolution <AppName> version <N>
  modify entity <Name>
    add_attribute <field> <TYPE>
  modify workflow <Name>
    insert_step after <step> <new_step>
```

**Approved domains so far:** `Telecom`, `Finance`, `Healthcare` (to be defined)

---

## Domain Pack Rules

Any MAL generated by LLM must use values from the domain pack only. For Telecom:
- Entities: Subscriber, SIMCard, ServicePlan, Invoice
- Attribute types: UUID, STRING, INTEGER, BOOLEAN, ENUM, DATE
- Roles: subscriber, agent, supervisor, compliance_officer
- Workflow trigger prefixes: new\_, update\_, cancel\_, verify\_

---

## Terminology Glossary

| Term | Meaning |
|---|---|
| Gold Seed | Manually authored, approved MAL example pair |
| Template Payload | JSON file with variable values for Jinja2 substitution |
| Candidate | Generated MAL that has not yet been validated |
| Registry Record | Accepted, validated, human-reviewed MAL example |
| Domain Pack | Versioned JSON of approved vocabulary for a domain |
| L1–L4 | Capability layers: Syntax → Task Behavior → Domain/Policy → Robustness |
| Construct | A MAL block type: entity, workflow, policy, etc. |
| Task Type | Category of training example: Create, Modify, Explain, Policy, Repair, Disambiguate |

---

## Changelog Rule

**Always add a row to Section 21 (Changelog)** when updating the document.

```html
<tr>
  <td><strong>v2.1</strong></td>
  <td>Apr 2026</td>
  <td>Brief description of what changed.</td>
</tr>
```

Also update the version pill in the cover `<div class="meta">` and the footnote at the bottom.

---

## What NOT to Change

- The 5 Part dividers and their descriptions (stable structure)
- The CSS design tokens in `:root { }` (color system is fixed)
- The Mermaid theme configuration in the `<script>` block
- The `scroll-behavior`, `#read-progress`, `#back-top` JS (UI features)
- The `.gitignore` rules for `.docx` and `.txt` files
