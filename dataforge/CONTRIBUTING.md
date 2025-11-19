# Contributing to DataForge

Thank you for your interest in contributing to DataForge! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)
8. [Feature Requests](#feature-requests)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

**Positive behaviors:**
- Being respectful and inclusive
- Providing constructive feedback
- Focusing on what's best for the community
- Showing empathy towards others

**Unacceptable behaviors:**
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 8 or higher
- Git
- Code editor (VS Code recommended)

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Super_power_bi.git
cd Super_power_bi/dataforge

# Add upstream remote
git remote add upstream https://github.com/Shivoo29/Super_power_bi.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

## Development Workflow

### 1. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards below
- Add tests if applicable
- Update documentation

### 3. Test Your Changes

```bash
# Type check
npx tsc --noEmit

# Build
npm run build

# Test in Electron
npm run dev
```

**Manual testing checklist:**
- [ ] Load CSV file
- [ ] Load Excel file
- [ ] Load JSON file
- [ ] Create each chart type
- [ ] Drag and resize charts
- [ ] Configure chart settings
- [ ] Export dashboard
- [ ] No console errors

### 4. Commit Changes

```bash
git add .
git commit -m "type: description"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- **Use TypeScript** for all new files
- **Avoid `any`** type - use proper types or `unknown`
- **Use interfaces** for objects
- **Export types** when shared across files

**Example:**
```typescript
// Good
interface ChartData {
  labels: string[]
  values: number[]
}

export const processData = (data: ChartData): number => {
  return data.values.reduce((a, b) => a + b, 0)
}

// Bad
export const processData = (data: any) => {
  return data.values.reduce((a, b) => a + b, 0)
}
```

### React Components

- **Use functional components** with hooks
- **Use TypeScript** for props
- **Export as named exports**, not default
- **One component per file**

**Example:**
```typescript
import React from 'react'

interface MyComponentProps {
  title: string
  count: number
  onUpdate: (value: number) => void
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, count, onUpdate }) => {
  return (
    <div className="brutal-card">
      <h2>{title}</h2>
      <p>{count}</p>
    </div>
  )
}
```

### Styling

- **Use Tailwind CSS** classes
- **Follow neo-brutalism** design patterns
- **Use custom classes** from `src/index.css`

**Neo-brutalism guidelines:**
```tsx
// Good - neo-brutalism style
<div className="brutal-card bg-white border-4 border-black shadow-brutal">
  <button className="brutal-button-primary">Click Me</button>
</div>

// Bad - soft modern style
<div className="rounded-lg shadow-md border border-gray-200">
  <button className="rounded-full px-4 py-2">Click Me</button>
</div>
```

### File Organization

```
src/
├── components/       # React components
│   ├── Chart.tsx
│   └── Sidebar.tsx
├── store/           # State management
│   └── useStore.ts
├── utils/           # Utility functions
│   └── dataLoader.ts
├── types/           # Type definitions
│   └── electron.d.ts
└── App.tsx         # Root component
```

### Import Order

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react'

// 2. Third-party libraries
import { create } from 'zustand'
import { Plus, Settings } from 'lucide-react'

// 3. Internal imports
import { useStore } from '../store/useStore'
import { loadDataFile } from '../utils/dataLoader'
import type { ChartConfig } from '../types'

// 4. Styles (if needed)
import './MyComponent.css'
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat: add gauge chart type"

# Bug fix
git commit -m "fix: resolve Excel parsing for empty cells"

# Documentation
git commit -m "docs: update installation instructions"

# Refactor
git commit -m "refactor: simplify data loading logic"

# Multiple changes
git commit -m "feat: add real-time data refresh

- Add auto-refresh interval setting
- Update charts on data change
- Add refresh indicator UI"
```

## Pull Request Process

### Before Submitting

1. **Update from main:**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run checks:**
   ```bash
   npx tsc --noEmit  # Type check
   npm run build     # Build test
   npm run lint      # Lint code
   ```

3. **Update documentation** if needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All chart types work
- [ ] No console errors

## Screenshots (if UI change)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** promptly
4. **Squash commits** if requested
5. **Merge** when approved

## Reporting Bugs

### Before Reporting

1. **Search existing issues** - might already be reported
2. **Try latest version** - might be already fixed
3. **Reproduce the bug** - ensure it's consistent

### Bug Report Template

```markdown
**Describe the bug**
Clear description of what's wrong

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- Node version: [e.g., 18.17.0]
- DataForge version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

### Submitting

Create an issue on GitHub with the template filled out.

## Feature Requests

We welcome feature ideas!

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Other approaches you thought about

**Additional context**
Mockups, examples, use cases
```

### Roadmap

Check [CHANGELOG.md](CHANGELOG.md) for planned features.

**Upcoming priorities:**
- SQL execution (v1.1.0)
- Database connectors (v1.2.0)
- Real-time data (v1.2.0)
- Collaboration features (v1.3.0)

## Areas for Contribution

### Good First Issues

- Add more chart types (gauge, funnel, treemap)
- Improve error messages
- Add keyboard shortcuts
- Improve documentation
- Add sample dashboards

### Advanced Contributions

- Implement DuckDB WASM for SQL
- Add database connectors
- Create plugin system
- Add automated tests
- Performance optimizations

## Questions?

- **Documentation:** See [DEVELOPER.md](DEVELOPER.md)
- **Usage help:** See [USAGE.md](USAGE.md)
- **Discussions:** GitHub Discussions
- **Issues:** GitHub Issues

## Recognition

Contributors will be:
- Added to README contributors section
- Acknowledged in release notes
- Eligible for maintainer role if active

---

**Thank you for contributing to DataForge! 🔥**
