import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

test("package and plugin manifests describe skill-curator consistently", () => {
  const pkg = readJson("package.json");
  const claude = readJson(".claude-plugin/plugin.json");
  const codex = readJson(".codex-plugin/plugin.json");
  const marketplace = readJson(".claude-plugin/marketplace.json");

  assert.equal(pkg.name, "@agent-sh/skill-curator");
  assert.equal(pkg.version, "1.0.0");
  assert.equal(claude.name, "skill-curator");
  assert.equal(claude.version, pkg.version);
  assert.equal(marketplace.plugins[0].name, "skill-curator");
  assert.equal(marketplace.plugins[0].version, pkg.version);
  assert.equal(codex.skills, "./skills");
});

test("command delegates to the skill and the skill has a strong trigger", () => {
  const skill = readFileSync("skills/skill-curator/SKILL.md", "utf8");
  const command = readFileSync("commands/skill-curator.md", "utf8");

  assert.match(skill, /^name: skill-curator$/m);
  assert.match(skill, /description: "Curate production-grade SKILL\.md files/);
  assert.match(skill, /Skip unless/);
  assert.match(command, /skills\/skill-curator\/SKILL\.md/);
});
