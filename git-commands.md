# 📚 Git Commands & Deployment Guide

Complete reference for Git commands and deployment instructions for the portfolio.

---

## 📖 Table of Contents

1. [Initial Setup](#initial-setup)
2. [Daily Workflow](#daily-workflow)
3. [Deployment](#deployment)
4. [Troubleshooting](#troubleshooting)

---

## 🔧 Initial Setup

### 1. Clone Repository (First Time)

```bash
# Clone via HTTPS (recommended)
git clone https://github.com/thiagopeteanselma/Thiago-Selma-Portfolio.git

# OR clone via SSH (if SSH keys configured)
git clone git@github.com:thiagopeteanselma/Thiago-Selma-Portfolio.git

# Navigate to folder
cd Thiago-Selma-Portfolio

# Verify remote
git remote -v
# Output:
# origin  https://github.com/thiagopeteanselma/Thiago-Selma-Portfolio.git (fetch)
# origin  https://github.com/thiagopeteanselma/Thiago-Selma-Portfolio.git (push)
```

### 2. Configure Git User (First Time on Machine)

```bash
# Set global user
git config --global user.name "Thiago Petean Selma"
git config --global user.email "thiagopetean@gmail.com"

# Verify configuration
git config --global user.name
git config --global user.email

# Optional: Set for current repo only
git config --local user.name "Thiago Petean Selma"
```

### 3. Create Local Branch (Optional)

```bash
# List all branches
git branch -a

# Create new feature branch
git checkout -b feature/my-feature

# Or create and checkout in one command
git switch -c feature/my-feature

# Verify current branch
git branch
```

---

## 💼 Daily Workflow

### 1. Check Status

```bash
# See changes summary
git status

# See detailed changes
git diff

# See changes for specific file
git diff src/js/config.js

# See staged changes
git diff --staged
```

### 2. Stage Changes

```bash
# Stage single file
git add index.html

# Stage multiple files
git add src/js/ src/css/

# Stage all changes
git add .

# Stage with confirmation (interactive)
git add -p
```

### 3. Commit Changes

```bash
# Commit with message
git commit -m "feat: add new portfolio section"

# Commit with longer description
git commit -m "feat: add new portfolio section" -m "
- Add timeline section for experience
- Add tooltips on hover
- Responsive on mobile devices
"

# Amend last commit (if not pushed yet)
git commit --amend --no-edit

# Amend with new message
git commit --amend -m "new message"
```

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting (no logic change)
- `refactor` - Code restructure
- `perf` - Performance improvement
- `test` - Test changes
- `chore` - Build, deps, tools

**Examples:**
```bash
git commit -m "feat(i18n): add Spanish language support"
git commit -m "fix(theme): light theme button not toggling"
git commit -m "docs: update README with setup instructions"
git commit -m "refactor: extract Sanitizer module"
```

### 4. Push Changes

```bash
# Push current branch
git push

# Or specify remote and branch
git push origin main

# Push new branch for first time
git push -u origin feature/my-feature

# Push all branches
git push --all

# Force push (⚠️ only if you know what you're doing)
git push --force
```

### 5. Pull Latest Changes

```bash
# Pull changes (fetch + merge)
git pull

# Specific remote and branch
git pull origin main

# Fetch only (don't merge immediately)
git fetch origin

# Fetch and rebase (cleaner history)
git pull --rebase
```

---

## 🚀 Deployment

### Method 1: GitHub Pages (Recommended)

#### Prerequisites
- Repository pushed to GitHub main branch
- GitHub account with access to repository

#### Steps

1. **Navigate to Repository Settings**
   ```
   GitHub.com → Your Repository → Settings → Pages
   ```

2. **Configure Pages**
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click "Save"

3. **Wait for Deployment**
   - Yellow dot 🟡 = Processing
   - Green dot 🟢 = Live
   - Red dot 🔴 = Error

4. **Access Your Site**
   ```
   https://thiagopeteanselma.github.io/Thiago-Selma-Portfolio/
   ```

#### Troubleshooting
- **Build fails:** Check Actions tab for error logs
- **Site not updating:** Hard refresh (Ctrl+Shift+R)
- **404 errors:** Verify file paths start with `/`

### Method 2: Deploy to Custom Domain

1. **Buy domain** (e.g., thiagopetean.dev)
2. **GitHub Settings → Pages**
   - Add custom domain: `thiagopetean.dev`
3. **DNS Provider Settings**
   ```
   CNAME → thiagopeteanselma.github.io
   ```
4. **Wait 5-10 minutes for DNS propagation**

### Method 3: Manual Deployment (Alternative)

#### Using Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.

# Follow prompts to authorize and configure
```

#### Using Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts
```

#### Using AWS S3
```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Deploy to S3
aws s3 sync . s3://my-bucket/ --delete
```

---

## 📊 Common Git Tasks

### Undo Changes

```bash
# Discard changes in working directory
git checkout -- index.html

# Discard all changes
git checkout -- .

# Unstage file
git reset HEAD src/js/config.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### View History

```bash
# Show commit history
git log

# One line per commit
git log --oneline

# Show last 5 commits
git log -5

# Show commits by author
git log --author="Thiago"

# Show commits since date
git log --since="2024-01-01"

# Show commits with changes
git log -p
```

### Branch Management

```bash
# List branches
git branch

# List remote branches
git branch -r

# List all branches
git branch -a

# Rename branch
git branch -m old-name new-name

# Delete local branch
git branch -d feature/old-feature

# Force delete
git branch -D feature/old-feature

# Delete remote branch
git push origin --delete feature/old-feature
```

### Merge & Rebase

```bash
# Merge feature branch into main
git checkout main
git pull origin main
git merge feature/my-feature

# Delete feature branch after merge
git branch -d feature/my-feature
git push origin --delete feature/my-feature

# Rebase instead of merge (cleaner history)
git checkout main
git pull origin main
git rebase feature/my-feature
```

### Stash Changes

```bash
# Temporarily save changes
git stash

# List stashed changes
git stash list

# Apply last stash
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}
```

---

## 🐛 Troubleshooting

### Issue: "Permission denied (publickey)"

**Solution:** Configure SSH keys
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "thiagopetean@gmail.com"

# Add to GitHub
# Settings → SSH and GPG keys → New SSH key
# Paste output of:
cat ~/.ssh/id_ed25519.pub

# Test connection
ssh -T git@github.com
```

### Issue: "fatal: refusing to merge unrelated histories"

**Solution:**
```bash
git pull origin main --allow-unrelated-histories
git commit -m "Merge remote and local histories"
git push origin main
```

### Issue: Merge conflict

**Solution:**
```bash
# View conflicted files
git status

# Edit conflicted file manually, then:
git add conflicted-file.js
git commit -m "resolve: merge conflicts"
git push origin main
```

### Issue: Need to undo push

**Solution:**
```bash
# Revert specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit
git reset --hard <commit-hash>
git push origin main --force  # ⚠️ Be careful!
```

---

## 📋 Quick Reference

### Most Used Commands

```bash
# Clone
git clone <url>

# Add & Commit
git add .
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main

# Status
git status

# Log
git log --oneline

# Diff
git diff

# Branch
git branch -a
git checkout -b new-branch

# Merge
git merge feature-branch
```

### Aliases (Optional - Makes Work Faster)

```bash
# Add aliases to ~/.gitconfig
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'

# Usage:
git st          # Same as git status
git co -b dev   # Same as git checkout -b dev
git ci -m "msg" # Same as git commit -m "msg"
```

---

## 🔗 Resources

- [GitHub Docs](https://docs.github.com)
- [Git Official Docs](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Last Updated:** August 2026
