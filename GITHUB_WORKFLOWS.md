# GitHub Workflows for Taggy Module

This document describes the GitHub workflows set up for this project to automate the release process and ensure code quality.

## Overview

Two GitHub workflows have been implemented:

1. **Pull Request Workflow** - Validates code quality for all PRs to the main branch
2. **Release Workflow** - Handles semantic versioning and publishing to GitHub Packages

## Pull Request Workflow

The PR workflow runs automatically when a pull request is created or updated against the main branch.

### What it does:

- Lints the code
- Performs type checking
- Runs tests
- Builds the package

### How to use it:

1. Create a pull request against the main branch
2. The workflow will run automatically
3. Check the status of the workflow in the PR checks section
4. Fix any issues if the workflow fails
5. Once all checks pass, the PR can be merged

## Release Workflow

The release workflow runs automatically when code is pushed to the main branch (typically through merging a PR).

### What it does:

- Analyzes commits to determine the next version number (using semantic-release)
- Updates the version in package.json
- Generates/updates the CHANGELOG.md file
- Creates a GitHub release with release notes
- Publishes the package to GitHub Packages
- Commits changes and pushes tags

### How to use it:

1. Merge a PR to the main branch
2. The workflow will run automatically
3. A new version will be published based on your commit messages

## Commit Message Format

To properly use semantic versioning, commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat: add new feature` - Triggers a minor version bump (e.g., 1.0.0 -> 1.1.0)
- `fix: resolve bug` - Triggers a patch version bump (e.g., 1.0.0 -> 1.0.1)
- `BREAKING CHANGE: change API` or `feat!: change API` - Triggers a major version bump (e.g., 1.0.0 -> 2.0.0)

## Manual Release

If you need to trigger a release manually:

```bash
npm run release
```

This will:
1. Run linting
2. Run tests
3. Build the package
4. Run semantic-release to publish a new version

## Authentication

The workflows use the `GITHUB_TOKEN` that is automatically provided by GitHub Actions for authentication. No additional setup is required for basic functionality.

However, if you need to publish packages with custom scopes or to different registries, you may need to set up additional secrets in your repository settings.
