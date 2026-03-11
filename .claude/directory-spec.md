# Aperant Directory Specification

This document defines the directory structure, naming conventions, and organizational rules for the Aperant project.

## Root Directory Structure

```
Aperant/
├── .claude/              # Claude AI configuration and commands
├── .github/              # GitHub workflows, actions, and templates
├── apps/                 # Application source code
│   ├── backend/          # Python backend (CLI + agents)
│   └── frontend/         # Electron/React desktop UI
├── build/                # Build output (generated, gitignored)
├── docs/                 # Documentation
│   └── guides/           # User guides and tutorials
├── scripts/              # Build and utility scripts
├── tests/                # Backend test suite
├── node_modules/         # Node dependencies (gitignored)
├── CLAUDE.md             # Claude Code project instructions
├── CONTRIBUTING.md       # Contribution guidelines
├── README.md             # Project overview
├── RELEASE.md            # Release process documentation
├── LICENSE               # AGPL-3.0 license
├── CHANGELOG.md          # Version history
├── package.json          # Root workspace configuration
└── package-lock.json     # Dependency lock file
```

## Directory Specifications

### `.claude/` - Claude Configuration
Purpose: Claude Code AI assistant configuration

```
.claude/
├── CLAUDE.md              # Local project instructions
├── directory-spec.md      # This file - directory rules
├── commands/              # Custom slash commands
│   ├── build.md           # /build - Build and launch
│   ├── check.md           # /check - Full validation
│   ├── dev.md             # /dev - Start dev server
│   ├── qa.md              # /qa - QA validation
│   ├── review.md          # /review - Code review
│   ├── self-iterate.md    # /self-iterate - Self-improvement
│   ├── setup-statusline.md # /setup-statusline - Status line setup
│   ├── spec.md            # /spec - Create specification
│   └── test.md            # /test - Run all tests
└── settings.json          # Claude Code settings
```

Rules:
- Commands must be valid markdown files with proper YAML frontmatter
- Each command should have a clear, single responsibility
- Command names use kebab-case

### `apps/backend/` - Python Backend
Purpose: Core agent logic, CLI, and backend services

```
apps/backend/
├── agents/                # AI agent implementations
│   ├── planner.py         # Task planning agent
│   ├── coder.py           # Code implementation agent
│   ├── session.py         # Session management
│   └── tools_pkg/         # Agent tools and utilities
├── cli/                   # Command-line interface
│   ├── commands/          # Individual CLI commands
│   ├── main.py            # CLI entry point
│   └── utils/             # CLI utilities
├── core/                  # Core framework
│   ├── client.py          # Claude SDK client factory
│   ├── auth.py            # Authentication
│   ├── platform/          # Cross-platform abstractions
│   ├── workspace/         # Workspace management
│   └── v1/, v2/           # Version-specific implementations
├── context/               # Task context building
├── integrations/          # External service integrations
│   ├── graphiti/          # Graphiti memory system
│   ├── github/            # GitHub API integration
│   └── linear/            # Linear API integration
├── merge/                 # Merge and conflict resolution
├── project/               # Project analysis and management
├── prompts/               # AI agent system prompts (.md)
│   ├── github/            # GitHub-specific prompts
│   └── mcp_tools/         # MCP tool prompts
├── qa/                    # Quality assurance pipeline
├── runners/               # Standalone execution runners
├── security/              # Security framework
├── services/              # Background services
├── spec/                  # Specification pipeline
├── task_logger/           # Task logging utilities
├── run.py                 # Main entry point
├── spec_runner.py         # Spec creation runner
├── requirements.txt       # Python dependencies
└── pyproject.toml         # Python project config
```

Naming Rules:
- Python files: `snake_case.py`
- Directories: `snake_case/`
- Test files: `test_*.py` or `*_test.py`
- Private modules: prefix with `_`

### `apps/frontend/` - Electron/React Frontend
Purpose: Desktop application UI

```
apps/frontend/
├── src/
│   ├── main/              # Electron main process
│   │   ├── agent/         # Agent queue and management
│   │   ├── claude-profile/ # Multi-profile credentials
│   │   ├── terminal/      # PTY terminal integration
│   │   ├── platform/      # Platform abstractions
│   │   ├── ipc-handlers/  # IPC handlers by domain
│   │   ├── services/      # Background services
│   │   ├── updater/       # Auto-updater
│   │   ├── changelog/     # Changelog generation
│   │   └── utils/         # Main process utilities
│   ├── preload/           # Electron preload scripts
│   │   ├── api/           # Safe API bridge modules
│   │   └── index.ts       # Preload entry
│   ├── renderer/          # React UI (renderer process)
│   │   ├── components/    # UI components
│   │   ├── stores/        # Zustand state stores
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── styles/        # CSS/Tailwind styles
│   │   └── App.tsx        # Root component
│   ├── shared/            # Shared code (main + renderer)
│   │   ├── constants/     # App constants (themes, etc.)
│   │   ├── i18n/          # Internationalization
│   │   │   └── locales/   # Translation files
│   │   ├── types/         # Shared TypeScript types
│   │   └── utils/         # Shared utilities
│   └── types/             # TypeScript type definitions
├── electron.vite.config.ts # Build configuration
├── tsconfig.json          # TypeScript config
├── biome.json             # Linting/formatting config
└── package.json           # Frontend dependencies
```

Naming Rules:
- React components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Stores: `kebab-case-store.ts`
- Types: `PascalCase.ts`
- Constants: `SCREAMING_SNAKE_CASE`
- Directories: `kebab-case/`

Path Aliases (tsconfig.json):
- `@/*` → `src/renderer/*`
- `@shared/*` → `src/shared/*`
- `@preload/*` → `src/preload/*`
- `@features/*` → `src/renderer/features/*`
- `@components/*` → `src/renderer/shared/components/*`
- `@hooks/*` → `src/renderer/shared/hooks/*`
- `@lib/*` → `src/renderer/shared/lib/*`

### `docs/` - Documentation
Purpose: Project documentation

```
docs/
├── guides/                # User guides
│   ├── CLI-USAGE.md       # CLI documentation
│   ├── linux.md           # Linux-specific guide
│   └── windows-development.md # Windows development
├── PROJECT_SPECIFICATION.md # Full project spec
├── CLAUDE_RULES.md        # Claude coding rules
└── README.md              # Documentation index
```

### `scripts/` - Build Utilities
Purpose: Build, release, and utility scripts

```
scripts/
├── bump-version.js        # Version bumping
├── install-backend.js     # Backend installation
├── test-backend.js        # Test runner wrapper
└── validate-release.js    # Release validation
```

### `tests/` - Test Suite
Purpose: Backend Python tests

```
tests/
├── agents/                # Agent tests
├── conftest.py            # pytest fixtures
├── qa_test_helpers.py     # QA test utilities
└── review_fixtures.py     # Test fixtures
```

### `.github/` - GitHub Configuration
Purpose: CI/CD and GitHub-specific files

```
.github/
├── ISSUE_TEMPLATE/        # Issue templates
├── actions/               # Reusable GitHub Actions
├── assets/                # README assets
└── workflows/             # CI/CD workflows
```

## Generated/Ignored Directories

These directories are generated at runtime and should not be modified directly:

| Directory | Purpose | Git Status |
|-----------|---------|------------|
| `build/` | Build output | gitignored |
| `node_modules/` | Node dependencies | gitignored |
| `apps/backend/.venv/` | Python virtual env | gitignored |
| `.aperant/` | Runtime data | gitignored |
| `.worktrees/` | Git worktrees | gitignored |

## File Placement Rules

### Where to Put New Files

| File Type | Location |
|-----------|----------|
| New CLI command | `apps/backend/cli/commands/` |
| New agent | `apps/backend/agents/` |
| New agent prompt | `apps/backend/prompts/` |
| New React component | `apps/frontend/src/renderer/components/` |
| New Zustand store | `apps/frontend/src/renderer/stores/` |
| New IPC handler | `apps/frontend/src/main/ipc-handlers/` |
| New shared type | `apps/frontend/src/shared/types/` |
| New translation | `apps/frontend/src/shared/i18n/locales/{en,fr}/` |
| New test | `tests/` (backend) or `apps/frontend/src/**/*.test.ts` |
| New documentation | `docs/` |
| New build script | `scripts/` |
| New Claude command | `.claude/commands/` |

## Cross-Platform Considerations

Never use `process.platform` directly. Use platform abstraction:

```typescript
// Frontend
import { isWindows, isMacOS, isLinux } from '@main/platform';

// Backend
from core.platform import is_windows, is_macos, is_linux
```

Path handling:
- Use `path.join()` or `joinPaths()` for cross-platform paths
- Never hardcode path separators (`/` or `\`)
- Use `findExecutable()` for cross-platform executable lookup

## Build Output

All build artifacts output to `build/`:

```
build/
├── main/       # Electron main process
├── preload/    # Preload scripts
├── renderer/   # React UI
└── dist/       # Packaged installers
```

## Version Control

- Default branch: `master`
- PR target: `develop` (for upstream)
- Commit convention: Conventional Commits
- Pre-commit hooks: Biome linting via Husky
