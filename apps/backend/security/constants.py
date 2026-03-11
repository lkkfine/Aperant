"""
Security Constants
==================

Shared constants for the security module.
"""

from constants import ALLOWLIST_FILENAME, SECURITY_FILENAME

# Environment variable name for the project directory
# Set by agents (coder.py, loop.py) at startup to ensure security hooks
# can find the correct project directory even in worktree mode.
PROJECT_DIR_ENV_VAR = "APERANT_PROJECT_DIR"

# Security configuration filenames (imported from central constants)
# These are the files that control which commands are allowed to run.
# ALLOWLIST_FILENAME and SECURITY_FILENAME are now defined in constants.py
PROFILE_FILENAME = SECURITY_FILENAME
