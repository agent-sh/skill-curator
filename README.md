# skill-curator

Production-grade guidance for writing, reviewing, and maintaining high-quality `SKILL.md` files across the entire agent ecosystem.

This plugin provides the canonical reference for creating skills that activate reliably in Claude Code, Cursor, Codex, OpenCode, Kiro, Gemini CLI, and other tools that support the Agent Skills standard.

## What it does

- Teaches the principles of excellent skill design (trigger phrases, router pattern, "Skip unless" gates, token efficiency)
- Helps you write new skills from scratch
- Reviews and improves existing skills with specific, actionable feedback
- Ensures compatibility with `agnix` linting and the broader agentsys ecosystem

## Installation

```bash
agentsys install skill-curator
```

Or clone this repository and link it into your skills directory.

## Usage

```bash
/skill-curator "create a skill for reviewing background job implementations"
```

```bash
/skill-curator --improve path/to/existing/SKILL.md --category review
```

## Philosophy

Good skills are:
- **Triggerable** — the description makes the model route to them at the right moment
- **Focused** — they load only what is needed (router pattern preferred for large domains)
- **Gated** — every decision rule has concrete `Skip unless:` conditions
- **Cross-tool** — they work beyond a single agent implementation
- **Maintainable** — they pass `agnix` and survive model upgrades

## Related Plugins

- `system-prompt-curator` — for system prompts and agent identity
- `enhance` — for improving existing plugins, agents, and prompts
- `agnix` — the linter that validates your skills

## Contributing

See `CONTRIBUTING.md` and the skill itself for the expected structure and quality bar.

## License

MIT
