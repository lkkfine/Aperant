# Run All Tests

Execute the full test suite: frontend unit tests, type checking, linting, and backend tests.

## Frontend

```bash
cd apps/frontend && npm test
```

Type checking:
```bash
cd apps/frontend && npm run typecheck
```

Lint check:
```bash
cd apps/frontend && npm run lint
```

Auto-fix lint issues:
```bash
cd apps/frontend && npm run lint:fix
```

## Backend

```bash
npm run test:backend
```

With coverage:
```bash
npm run test:coverage
```

## Full validation (run all sequentially)

```bash
cd apps/frontend && npm run typecheck && npm run lint && npm test && cd ../.. && npm run test:backend
```
