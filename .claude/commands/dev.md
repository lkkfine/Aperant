# Start Development Server

Launch Aperant in development mode with hot module replacement (HMR).

```bash
npm run dev
```

This runs `electron-vite dev` which:
1. Builds main process and preload to `build/`
2. Starts Vite dev server for the renderer at `http://localhost:5173/`
3. Launches Electron with HMR enabled

For debug mode with verbose output:
```bash
npm run dev:debug
```

For MCP remote debugging:
```bash
npm run dev:mcp
```
