# Build and Launch

Clean build the project and launch the Electron app from the `build/` directory.

## Steps

1. Clean previous build artifacts:
```bash
npm run build:clean
```

2. Build all (main + preload + renderer) to `build/`:
```bash
npm run build
```

3. Launch the Electron app:
```bash
npm run build:start
```

## Verification

After launch, check the terminal output for:
- `electron main process built successfully`
- `electron preload scripts built successfully`
- No errors in the Electron startup log

## Quick one-liner
```bash
npm run build:clean && npm run build:start
```
