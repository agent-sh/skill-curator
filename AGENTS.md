# AGENTS.md for skill-curator

This repository holds the agent-sh guidance for writing SKILL.md files: one skill (`skills/skill-curator/SKILL.md` with `references/`), the `/skill-curator` command, and plugin manifests. It is the counterpart to `system-prompt-curator`.

## Working on this repo

- `skills/skill-curator/SKILL.md` is the product and the single source of truth for how to write a skill. A guidance change is done when the skill says it.
- The guidance follows the agentskills.io spec and current practice: goal, constraints with reasons, done criteria, short trigger descriptions. The skill should not recommend added emphasis, chain-of-thought prompts or XML tags the model has to emit.
- Skills it produces should trigger reliably across Claude Code, Cursor, Codex, OpenCode and Kiro, carry only what the agent would otherwise get wrong, pass `agnix`, and stay useful after model upgrades.
- Keep the skill short (the tests cap it at 250 lines) and move depth into `skills/skill-curator/references/`. Examples should be realistic and work across tools; mark any tool-specific behavior as such.

## Testing

- `npm test` checks the package, manifest, skill and command contracts.
- Run `agnix` on the repo (`agnix .`) and fix every error; CI runs it too.
- For a trigger or description change, check that the skill activates on realistic prompts in Claude Code and one other tool (Cursor or Codex).

## Release

Bump the version in the skill frontmatter, `package.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` and the tests, update `CHANGELOG.md`, run `npm test` and `agnix .`, then tag and release.
