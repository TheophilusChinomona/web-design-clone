#!/usr/bin/env bash

# Website Cloner — One-Command Initializer Script
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/TheophilusChinomona/website-cloner-platform/master/scripts/init.sh | bash -s -- my-new-site [target-url]

set -e

PROJECT_NAME="${1:-cloned-website}"
TARGET_URL="$2"
REPO_URL="https://github.com/TheophilusChinomona/website-cloner-platform.git"

echo -e "\033[1;35m🚀 Initializing Website Cloner Workspace: ${PROJECT_NAME}...\033[0m"

# 1. Clone template
if [ ! -d "$PROJECT_NAME" ]; then
  git clone "$REPO_URL" "$PROJECT_NAME"
fi

cd "$PROJECT_NAME"

# 2. Register plugin globally
node scripts/install-plugin.mjs --global || true

# 3. Install dependencies
npm install

echo -e "\n\033[1;32m✓ Setup complete!\033[0m"
echo -e "To start cloning:"
echo -e "  cd $PROJECT_NAME"
echo -e "  agy"
if [ -n "$TARGET_URL" ]; then
  echo -e "  /clone-website $TARGET_URL"
else
  echo -e "  /clone-website <target-url>"
fi
echo -e "  /convert-to-webapp\n"
