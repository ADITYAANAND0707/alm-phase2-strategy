# Ready-to-Use Prompts for Updating the ALM Phase 2 Strategy Document

Open `index.html` in Cursor (or any AI editor), then copy and paste the relevant prompt below.
Customize the values inside `[ ]` brackets before submitting.

> Before using any prompt, the AI should read `AGENTS.md` for full context.
> If it doesn't do this automatically, start your prompt with: "First read AGENTS.md, then..."

---

## 1. Update the Status Dashboard (Section 2)

```
Update the Status Dashboard in Section 2 (id="s2") of index.html.
Change the tracker card values to:
- Seeds Defined: [15] / 50
- Templates Built: [8]
- Candidates Validated: [24]
- Records in Registry: [10]

For any number that is now non-zero, change the stat-pill class from "warn" to plain "stat-pill" (green).
Also add a Changelog row in Section 21 for this update.
```

---

## 2. Add a New Example Pair (Section 15)

```
Add a new example pair to the Example Library (Section 15, id="s15") in index.html.
Task type: [Create / Modify / Policy / Repair / Explain / Disambiguate]
MAL Construct: [entity / workflow / policy / evolution / agent]
Domain: [Telecom / Finance / Healthcare]
Title: [Short title for the example]
User Intent: [Natural language user request]
MAL Output:
[Paste or describe the expected MAL snippet]

After adding the example pair, also update the Coverage Grid in Section 6 (id="s6"):
find the row for [construct] and the column for [task type], change the class from "planned" to "has-ex" and the cell text to ✓.

Add a Changelog row in Section 21.
```

---

## 3. Log a New Decision (Section 19)

```
Add a new row to the Decision Log table in Section 19 (id="s19") of index.html.
Decision name: [Short name for the decision]
Choice made: [What was decided]
Rationale: [Why this was chosen]
Status: [Confirmed / Open / Planned]
Date: [Month Year]

Add a Changelog row in Section 21.
```

---

## 4. Update the Roadmap (Section 18)

```
Update the Roadmap section (id="s18") in index.html.
Mark as completed: [task name]
Add to Now (current sprint): [new task]
Move to Next sprint: [task being deferred]

Add a Changelog row in Section 21.
```

---

## 5. Add a New Risk (Section 16)

```
Add a new risk entry to the Risk Register (Section 16, id="s16") in index.html.
Severity: [High / Medium / Low]  (use class oi-high / oi-mid / oi-plan respectively)
Title: [Risk short name]
Description: [What the risk is and its potential impact]
Mitigation (optional): [What is being done about it]

Add a Changelog row in Section 21.
```

---

## 6. Add a Research Method (Section 12)

```
Add a new row to the Research Methods Reference table in Section 12 (id="s12") in index.html.
Method name: [e.g. Constitutional AI]
Main idea: [1-2 sentence description]
Best MAL use case: [How it applies to MAL training data]
Role in this pipeline: [Core / Supporting / Future]

Add a Changelog row in Section 21.
```

---

## 7. Update the Action Map (Section 3)

```
Update the Immediate Action Map (Section 3, id="s3") in index.html.
Move these tasks from Now → Done (or remove them): [task names]
Add to Now: [new immediate tasks]
Add to Next: [upcoming tasks]
Add to Later: [deferred tasks]

Add a Changelog row in Section 21.
```

---

## 8. Add a New Card to Execution Playbook (Section 10)

```
Add a new card to the Execution Playbook (Section 10, id="s10") in index.html.
Stage or sub-section: [e.g. Stage 3 – Validation]
Card tag color: [navy / gold / rose / plan / warn]
Title: [Card title]
Content:
- [Bullet 1]
- [Bullet 2]
- [Bullet 3]
Footer note (optional): [Any stat-pill note]

Add a Changelog row in Section 21.
```

---

## 9. Update Platform Readiness (Section 9)

```
Update the Platform Readiness section (Section 9, id="s9") in index.html.
Component name: [e.g. FastAPI Backend]
Change readiness status from [current] to [new status]:
  - "Ready" = green stat-pill (no class modifier)
  - "In Progress" = stat-pill warn
  - "Not Started" = stat-pill plan

Reason for change: [brief explanation]
Add a Changelog row in Section 21.
```

---

## 10. Add a Domain Pack Definition

```
In Section 14 (Data Schemas, id="s14") of index.html, add a new domain pack code block.
Domain name: [Healthcare / Finance / ...]
Include:
  - Entity names for this domain: [list]
  - Attribute types used: [list]
  - Roles: [list]
  - Workflow trigger prefixes: [list]

Format it as a JSON pre-wrap block matching the existing Telecom domain pack style.
Add a Changelog row in Section 21.
```

---

## 11. Increment the Version Number

```
In index.html, update the document version from [v2.0] to [v2.1] in these three places:
1. The cover page meta pill (search for "Version")
2. The footnote at the bottom of the page
3. Add a Changelog row in Section 21 with today's date and a summary of what changed in this version.
```

---

## General Instructions for Any Update

If none of the above templates match your need, use this general template:

```
First, read AGENTS.md to understand the document structure and HTML conventions.
Then, in index.html:
[Describe exactly what you want to add, change, or remove, and in which section.]
After making the change:
- Add a Changelog row in Section 21 with today's date.
- Do not change the color tokens, section IDs, Part dividers, or UX scripts.
- Sync the change to phase2_synthetic_data_strategy.html.
```
