"""
Aperant Application Constants
==============================

Centralized constants for the application.
"""

# ============================================
# Data Directory
# ============================================

# Runtime data directory name for Aperant.
# All project-specific data (specs, roadmap, ideation, etc.) is stored here.
# Named to match the application name.
DATA_DIR = ".aperant"

# ============================================
# Security Files
# ============================================

# Allowlist for command execution
ALLOWLIST_FILENAME = f"{DATA_DIR}-allowlist"

# Security configuration file
SECURITY_FILENAME = f"{DATA_DIR}-security.json"

# ============================================
# Gitignore Entries
# ============================================

# All entries that should be added to .gitignore for Aperant projects
GITIGNORE_ENTRIES = [
    f"{DATA_DIR}/",
    SECURITY_FILENAME,
    f"{DATA_DIR}-status",
    ".claude_settings.json",
    ".worktrees/",
    ".security-key",
    "logs/security/",
]
