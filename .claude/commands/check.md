# Full Validation

Run complete validation: lint, typecheck, and all tests.

## Steps

1. Run linting:
```bash
npm run lint
```

2. Run TypeScript type checking:
```bash
cd apps/frontend && npm run typecheck
```

3. Run frontend unit tests:
```bash
npm test
```

4. Run backend tests:
```bash
npm run test:backend
```

## Quick one-liner

```bash
npm run lint && cd apps/frontend && npm run typecheck && npm test && npm run test:backend
```

## What it validates

| Check | Scope |
|-------|-------|
| Biome lint | Frontend TS/TSX/JSON |
| TypeScript | Strict type checking |
| Vitest | Frontend unit tests |
| pytest | Backend Python tests |

## CI Equivalent

This matches what CI runs on every PR.
