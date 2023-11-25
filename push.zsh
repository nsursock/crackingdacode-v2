#!/bin/zsh

# Prompt the user for a commit message
echo -n "Enter your commit message: "
read message

# Execute the git commands
git add .
git commit -m "$message"
git push -u origin main