# Create Specification

Create a new specification for a feature or task.

## Usage

```bash
cd apps/backend && python run.py --spec <SPEC_NUMBER> --create-spec
```

## Examples

```bash
# Create spec 005
cd apps/backend && python run.py --spec 005 --create-spec
```

## What it does

1. Launches the spec creation pipeline
2. Runs spec gatherer, researcher, writer, and critic agents
3. Creates `.aperant/specs/<SPEC_NUMBER>-<name>/` directory
4. Generates `spec.md`, `requirements.json`, `context.json`

## Spec Directory Structure

```
.aperant/specs/001-feature-name/
├── spec.md                    # Full specification document
├── requirements.json          # Structured requirements
├── context.json               # Project context gathered
├── implementation_plan.json   # Generated after planning
├── qa_report.md              # Generated after QA
└── QA_FIX_REQUEST.md         # Generated if fixes needed
```

## Next Steps

After spec creation:
1. Review the generated `spec.md`
2. Run planner: `python run.py --spec <NUM> --plan`
3. Run coder: `python run.py --spec <NUM> --code`
4. Run QA: `python run.py --spec <NUM> --qa`
