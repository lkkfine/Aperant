# Self-Iteration Workflow

Use this when Aperant is being used to develop itself.

## Setup

1. Build the project:
```bash
npm run build:clean && npm run build
```

2. Launch the built app:
```bash
npm run build:start
```

3. In the running Aperant instance, open the Aperant project directory as a git repo.

4. Create tasks in Aperant's Kanban board to work on its own source code.

## Key Principles

- Source code lives in `apps/` — edit here
- Build output goes to `build/` — never edit here
- The running Aperant reads from `build/`, the source stays clean
- After making changes, rebuild with `npm run build` and relaunch
- For incremental work, use `npm run dev` for HMR during development

## Git Workflow

Always work on feature branches off `develop`:
```bash
git checkout develop
git checkout -b feature/my-improvement
# ... make changes ...
git add -A && git commit -m "feat: description"
git push -u origin feature/my-improvement
```
