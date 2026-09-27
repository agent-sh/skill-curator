# AGENTS.md for skill-curator

This repository maintains the canonical guidance for writing production-grade skills in the agent-sh / agentsys ecosystem.

## Core Mission

Produce skills that:
- Activate reliably across Claude Code, Cursor, Codex, OpenCode, Kiro and other tools
- Keep the skill file short and move detail into `references/` when scope is broad
- Carry what the agent would otherwise get wrong, with reasons, and nothing it already knows
- Pass `agnix` validation cleanly
- Remain useful after model upgrades

## When Working on This Repo

- Treat the main `skills/skill-curator/SKILL.md` as the single source of truth for "how to write a skill".
- Reflect any guidance change in the skill itself before considering the work complete.
- New examples should be realistic and cross-tool.
- Keep the core skill well under the spec's 500-line guidance. Use references for deeper material.

## Release Process

1. Update the skill content
2. Bump version in frontmatter
3. Update CHANGELOG.md
4. Run `agnix` on the skill file (must be clean)
5. Test activation in at least two different agent tools
6. Tag and release

## Related Work

This skill is the counterpart to `system-prompt-curator`. Together they form the foundation for high-quality agent configuration in the ecosystem.

## Additional maintainer guidance

Follow the Karpathy Guidelines (simplicity, surgical changes, clear success criteria) when editing this plugin.

This skill is the authoritative reference for writing SKILL.md files. Any guidance here must also be reflected in `skills/skill-curator/SKILL.md`.

## Key Constraints

- Keep the main skill file as the best single source of truth.
- Prefer cross-tool features and clearly gate any tool-specific behavior.
- Guidance matches current practice (agentskills.io spec and best practices): goal, constraints with reasons, done criteria, short trigger descriptions. No advice to add emphasis, chain-of-thought prompts or XML tags the model has to emit.
- Keep the core skill reasonably short; move deep examples into reference files if needed.

## Testing

Before considering changes complete:
- Run `agnix` on the skill (zero errors)
- Verify it activates on realistic prompts in Claude Code and at least one other tool (Cursor or Codex recommended)

## Validation scope

Choose checks that cover the changed behavior. For CPU-only tooling, documentation
and configuration changes, run the relevant CPU tests, static checks and configuration
validation. Do not require a blanket GPU gate for those changes. Require GPU
qualification when GPU, runtime or model behavior, or related claims, change.
Preserve applicable native, model and hardware qualification gates. CPU checks do
not qualify GPU behavior.
