# QA Validation

Run QA validation on a completed spec implementation.

## Usage

```bash
cd apps/backend && python run.py --spec <SPEC_NUMBER> --qa
```

## Examples

```bash
# Run QA on spec 001
cd apps/backend && python run.py --spec 001 --qa

# Run QA with verbose output
cd apps/backend && python run.py --spec 001 --qa --verbose
```

## What it does

1. Loads the spec from `.aperant/specs/<SPEC_NUMBER>-<name>/`
2. Runs the QA reviewer agent to validate implementation
3. If issues found, runs the QA fixer agent
4. Generates `qa_report.md` with results

## E2E Testing (Electron MCP)

For UI validation, ensure Electron MCP is enabled:

1. Start the app in MCP mode: `npm run dev:mcp`
2. Set `ELECTRON_MCP_ENABLED=true` in `apps/backend/.env`
3. Run QA with E2E support

## Prerequisites

- Spec must have completed implementation phase
- `.aperant/specs/<SPEC_NUMBER>-*/spec.md` must exist
- Implementation plan must be present
