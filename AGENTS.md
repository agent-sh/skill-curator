# AGENTS.md for skill-curator

This repository maintains the canonical guidance for writing production-grade skills in the agent-sh / agentsys ecosystem.

## Core Mission

Produce skills that:
- Activate reliably across Claude Code, Cursor, Codex, OpenCode, Kiro and other tools
- Follow the router pattern when scope is broad
- Contain concrete `Skip unless:` gates for every pattern
- Pass `agnix` validation cleanly
- Remain useful after model upgrades

## When Working on This Repo

- Treat the main `skills/skill-curator/SKILL.md` as the single source of truth for "how to write a skill".
- Reflect any guidance change in the skill itself before considering the work complete.
- New examples should be realistic and cross-tool.
- Target under 250 lines for the core skill. Use references for deeper material when a topic needs more space.

## Release Process

1. Update the skill content
2. Bump version in frontmatter
3. Update CHANGELOG.md
4. Run `agnix` on the skill file (must be clean)
5. Test activation in at least two different agent tools
6. Tag and release

## Related Work

This skill is the counterpart to `system-prompt-curator`. Together they form the foundation for high-quality agent configuration in the ecosystem.
