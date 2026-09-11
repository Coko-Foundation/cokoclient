# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Linting and type checking

- `yarn coko-lint run` — runs eslint, prettier, and stylelint. Use this instead of invoking `eslint`/`prettier`/`stylelint` directly.
- `yarn typecheck` — runs the TypeScript compiler (`tsc --noEmit`) to check types.

Run both after making code changes, before considering a change complete.
