---
name: skill-curator
description: "Use when user asks to create, improve, or review production-grade SKILL.md files for Claude Code, Cursor, Codex, OpenCode, Kiro, and other agent tools. Focuses on trigger quality, structure, cross-tool compatibility, and reliable activation."
version: 1.0.1
argument-hint: "[skill-purpose or --improve path/to/SKILL.md] [--category implementation|review|research|orchestration|analysis] [--minimal]"
---

# Skill Curator

Expert guidance for writing high-quality, reliable `SKILL.md` files that work consistently across the entire agent ecosystem (Claude Code, Cursor, Codex, OpenCode, Kiro, Gemini CLI, and others).

## Parse Arguments

Use `$ARGUMENTS` as the requested skill purpose, improvement target, category, and scope flags:

```text
$ARGUMENTS
```

- `--improve <path>` means read the existing `SKILL.md`, critique it, then rewrite or patch it.
- `--category implementation|review|research|orchestration|analysis` sets the skill's primary workflow style.
- `--minimal` means keep the result compact and omit optional examples.

## Why Skills Matter

Skills are the primary mechanism for giving agents specialized, on-demand knowledge without bloating every context window. A good skill:
- Activates reliably when relevant (strong trigger phrases)
- Loads only the necessary content (router pattern or tight scope)
- Survives model changes and tool updates
- Passes `agnix` validation with zero errors/warnings
- Provides clear, actionable guidance with "Skip unless" gates

## Frontmatter Standards

Every skill must start with a clean frontmatter block:

```yaml
---
name: <kebab-case-name>                    # 3-8 words, lowercase, hyphens
description: <imperative trigger phrase>   # 1-3 sentences, ≤ 512 chars
version: 1.0.1
argument-hint: "[optional args]"           # Shown in /help and slash command
allowed-tools: Bash, Read, Edit, ...       # Restrict when possible
---
```

### Description (Trigger Phrase) Rules — Most Important Field

The `description` is the primary activation signal. Models use it heavily for routing.

**Requirements:**
- Start with an **imperative verb phrase**: "Use when...", "Write when...", "Review when...", "Analyze when..."
- Be **specific** — mention file paths, function names, command names, or concrete situations
- Use vocabulary that will actually appear in user prompts or PR/issue text
- Include **negative signals** ("Does NOT apply to...") when scope could bleed
- Keep under 512 characters

**Good examples:**
- "Use when adding or modifying background job queues, workers, or schedulers in Node.js or TypeScript projects."
- "Review when a PR touches cluster replication, failover logic, or handshake code in the C server."
- "Use when the user wants to create or improve a production-grade SKILL.md file for any agent tool."

**Bad examples:**
- "Helps with background jobs." (too vague, no trigger)
- "I am an expert in queues." (first person, not imperative)

## Body Structure (Recommended Order)

Use this order for maximum model attention:

1. **Purpose** (short)
2. **Core Principles** or **When to Use**
3. **Frontmatter Requirements** (if relevant)
4. **Template / Structure**
5. **Patterns** (with `Skip unless:` gates — mandatory for review/analysis skills)
6. **Do NOT** / Anti-patterns
7. **Workflow** (step-by-step for the skill's task)
8. **Examples**
9. **Constraints / Token Budget**

### The "Skip unless" Rule (Critical for Reliability)

Every pattern or decision rule **must** contain a `Skip unless:` line that names a concrete, checkable condition (file name, function, identifier, command output, etc.).

Without this, the skill fires too broadly and generates noise.

Example:
```markdown
### Missing error handling on async operations
The diff looks correct but is dangerous when:
- An async function is added or modified without try/catch or .catch()

Skip unless: the changed file contains `async ` or `await ` and the function name appears in a call site without error handling.
```

## Router Pattern (For Complex Skills)

When a skill covers a broad domain, use the **router pattern**:

- The main `SKILL.md` contains only frontmatter + a routing table.
- It loads small, focused reference files on demand (`reference/specific-topic.md`).
- This keeps initial context tiny while still providing deep knowledge.

See `valkey-skills` and `agent-knowledge` for production examples of this pattern.

## Cross-Tool Compatibility

Skills should work (at minimum) with:
- Claude Code (`.claude/skills/`)
- Cursor (`.cursor/skills/`)
- Codex CLI
- OpenCode
- Kiro
- Gemini CLI (where supported)

**Rules for broad compatibility:**
- Avoid Claude-specific tool names in the skill body unless gated.
- Prefer standard Bash + file tools when possible.
- Use `allowed-tools` in frontmatter to declare dependencies.
- Test with `agnix --target all` or multiple targets.

## Length Budgets

| Type              | Target Lines | Hard Max | Notes |
|-------------------|--------------|----------|-------|
| Simple skill      | 40-80        | 150      | One clear responsibility |
| Standard skill    | 80-150       | 250      | Most common |
| Router + references | 30-60 (main) + small refs | 400 total | Preferred for large domains |
| Heavy institutional memory | 150-300 | 500 | Only when justified by density |

Above 250 lines, the model starts ignoring later sections. Use routers instead of monolithic files.

## Common Failure Modes (and Fixes)

- **Vague description** → Never activates. Fix: Make it imperative and specific with real tokens from the domain.
- **No "Skip unless"** → Fires on everything. Fix: Add concrete gate conditions for every pattern.
- **Buried rules** → Model misses them. Fix: Put critical constraints (confidence ladder, always-on checks, Do NOT) near the top.
- **First-person voice** → Breaks selection in some tools. Fix: Use third-person / imperative throughout.
- **Tool-specific assumptions** → Breaks on other platforms. Fix: Declare tools in frontmatter and keep body generic where possible.
- **Missing examples** → Agent doesn't know the expected output shape. Fix: Include at least one realistic before/after or full trajectory.

## Workflow When Using This Skill

1. Clarify the skill's purpose and target tools.
2. Decide on scope (single-purpose vs router).
3. Draft frontmatter with an excellent description.
4. Choose structure and write the body following the template above.
5. Add `Skip unless:` gates for every decision rule.
6. Run `agnix` on the resulting file (zero errors required).
7. Test activation with realistic prompts in the target tools.
8. Add to the appropriate skill registry or plugin.

## Output Requirements

When asked to create or improve a skill, always return:
- The complete `SKILL.md` content in a clean code block
- A short critique of the previous version (if improving)
- Token estimate for the frontmatter + body
- Recommended `allowed-tools` list
- Suggested test prompts that should trigger it

## Constraints

- Never write vague or marketing-style descriptions.
- Never omit the `Skip unless:` requirement for pattern-based skills.
- Never assume a specific tool's internal implementation details unless the skill is tool-specific.
- Always optimize for reliable, low-noise activation over cleverness.

_(Generic skill-curator guidance. Source: agent-sh/skill-curator)_
