# Build and Launch

Clean build the project and launch the Electron app from the `build/compiled/` directory.

## Directory Structure

```
build/
├── compiled/           # Compiled output (intermediate artifacts)
│   ├── main/          # Electron main process (index.js + node_modules)
│   ├── preload/       # Preload script (index.mjs)
│   └── renderer/      # React UI (index.html + assets/)
└── releases/          # Release packages (final installers)
    ├── win/           # Windows installers
    ├── mac/           # macOS installers
    └── linux/         # Linux installers
```

## Steps

1. Clean previous build artifacts:
```bash
npm run build:clean
```

2. Build all (main + preload + renderer) to `build/compiled/`:
```bash
npm run build
```

3. Launch the Electron app:
```bash
npm run build:start
```

## Quick Commands

```bash
npm run build:full    # Clean + build + package
npm run build:dev     # Build then start dev server
npm run build:check   # Build + typecheck + test
```

## Verification

After launch, check the terminal output for:
- `✓ Build Report` with artifact sizes
- No errors in the Electron startup log
