# Code Review Checklist

Before submitting changes, verify all of the following:

## 1. Type Safety
```bash
cd apps/frontend && npm run typecheck
```
Ensure no TypeScript errors.

## 2. Lint
```bash
cd apps/frontend && npm run lint
```
Fix any Biome issues with `npm run lint:fix`.

## 3. Tests Pass
```bash
cd apps/frontend && npm test
npm run test:backend
```

## 4. Build Succeeds
```bash
npm run build
```
Verify all three targets (main, preload, renderer) build without errors to `build/`.

## 5. Manual Checks
- [ ] No hardcoded UI strings (use `react-i18next`)
- [ ] No direct `process.platform` usage (use platform abstraction)
- [ ] No `console.log` for production diagnostics (use Sentry)
- [ ] No `anthropic.Anthropic()` (use `create_client()` from `core.client`)
- [ ] Path resolution works in both dev and packaged builds
- [ ] i18n keys added to ALL language files (en + fr)
- [ ] PR targets `develop` branch
