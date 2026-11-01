# Vendored anti-slop Oxlint plugin

Source: [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop), copied from the `install-anti-slop` skill's `assets/anti-slop/` directory.

## Source identity

- Upstream commit: unknown. The skill was installed with the `skills` CLI, which records a folder tree hash rather than a commit.
- Skill folder (`skills/install-anti-slop`) git tree: `97962dc9fad565ca7695bf57805d9d0138ce1def`, as recorded in `~/.agents/.skill-lock.json` (skill updated 2026-11-01T20:15:21Z). Recomputed from the local skill copy before installing; it matched.
- Copied assets (`skills/install-anti-slop/assets/anti-slop`) git tree: `54b50f11bed7f52ca1948f8802f4df591644762f`. Any upstream commit containing this tree is a pristine snapshot of these files.
- Installed: 2026-11-01.

## Installed paths

- `tools/oxlint/anti-slop/index.ts` — generic `anti-slop` plugin, registered in `.oxlintrc.json`.
- `tools/oxlint/anti-slop/rules/`, `tools/oxlint/anti-slop/shared/` — rule implementations and helpers.
- `tools/oxlint/anti-slop/vendor/eslint-stylistic/` — vendored ESLint Stylistic rule with its `LICENSE` and `UPSTREAM.md`.
- `tools/oxlint/anti-slop/effect/` — opt-in Effect plugin. Copied but not registered, because this project does not depend on `effect`.

## Intentional deviations

- No source changes to the copied files. This `UPSTREAM.md` is the only added file.
- Project integration, outside this directory:
  - `tsconfig.json` sets `allowImportingTsExtensions`, because the plugin imports with `.ts` extensions and `tsc` type-checks every `**/*.ts` file.
  - `.oxfmtrc.json` ignores this directory and agent tooling directories, so oxfmt does not reformat vendored code.
  - `@oxlint/plugins` is pinned to exactly the installed `oxlint` version (1.90.0).
