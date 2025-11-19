# DataForge Developer Guide

Welcome to the DataForge development documentation! This guide will help you understand the codebase, contribute to the project, and extend its functionality.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Architecture](#architecture)
5. [State Management](#state-management)
6. [Adding New Features](#adding-new-features)
7. [Testing](#testing)
8. [Build & Deployment](#build--deployment)
9. [Contributing](#contributing)

## Project Structure

```
dataforge/
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry (window management, IPC)
│   └── preload.ts        # Preload script (exposes APIs to renderer)
├── src/
│   ├── components/       # React components
│   │   ├── Chart.tsx            # Individual chart component
│   │   ├── DashboardCanvas.tsx  # Grid layout for charts
│   │   ├── Sidebar.tsx          # Data sources & chart picker
│   │   ├── SQLEditor.tsx        # Monaco-based SQL editor
│   │   └── Topbar.tsx           # Dashboard controls
│   ├── store/            # State management
│   │   └── useStore.ts          # Zustand store
│   ├── utils/            # Utility functions
│   │   └── dataLoader.ts        # CSV/Excel/JSON parsers
│   ├── types/            # TypeScript definitions
│   │   └── electron.d.ts        # Electron API types
│   ├── App.tsx           # Root component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles (Tailwind)
├── public/               # Static assets
├── dist/                 # Built React app
├── dist-electron/        # Built Electron files
├── release/              # Packaged apps (AppImage, DMG, etc.)
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── vite.config.ts        # Vite configuration
```

## Tech Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Electron** - Desktop application framework
- **Vite** - Build tool & dev server

### UI & Styling
- **Tailwind CSS 3.x** - Utility-first CSS
- **Lucide React** - Icon library
- **Custom CSS** - Neo-brutalism design system

### Data Visualization
- **Apache ECharts** - Chart rendering
- **echarts-for-react** - React wrapper for ECharts

### State Management
- **Zustand** - Lightweight state management

### Data Processing
- **PapaParse** - CSV parsing
- **SheetJS (xlsx)** - Excel file processing
- **DuckDB WASM** - SQL queries (planned)

### Layout & Interaction
- **react-grid-layout** - Drag-and-drop grid
- **@dnd-kit** - Drag and drop utilities

### Code Editor
- **Monaco Editor** - VS Code editor for SQL

## Getting Started

### Prerequisites
- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dataforge

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open in Electron with hot-reload enabled.

### Development Workflow

1. **Make changes** to React components in `src/`
2. **Save** - Vite will hot-reload the changes
3. **Test** in the Electron window
4. **Build** when ready: `npm run build`

### Scripts

```json
{
  "dev": "vite",                    // Start dev server
  "build": "tsc -b && vite build",  // Build app
  "package": "npm run build && electron-builder",  // Package for all platforms
  "package:win": "...",             // Package for Windows
  "package:mac": "...",             // Package for macOS
  "package:linux": "...",           // Package for Linux
  "lint": "eslint ."                // Lint code
}
```

## Architecture

### Electron Process Model

DataForge uses Electron's multi-process architecture:

1. **Main Process** (`electron/main.ts`)
   - Creates browser windows
   - Handles file system operations
   - Manages IPC (Inter-Process Communication)

2. **Renderer Process** (`src/`)
   - React application
   - UI rendering
   - User interactions

3. **Preload Script** (`electron/preload.ts`)
   - Bridges main and renderer processes
   - Exposes safe APIs via `contextBridge`

### Data Flow

```
User Action
    ↓
React Component
    ↓
Zustand Store (updateChart, addDataSource, etc.)
    ↓
State Update
    ↓
React Re-render
    ↓
ECharts Update
```

### File Loading Flow

```
User selects file
    ↓
Sidebar component (handleFileUpload)
    ↓
dataLoader utility (loadCSVFile, loadExcelFile, loadJSONFile)
    ↓
Parse file → DataSource object
    ↓
addDataSource action
    ↓
Store updated → Sidebar re-renders
```

## State Management

DataForge uses **Zustand** for state management. The entire app state is in `src/store/useStore.ts`.

### Store Structure

```typescript
interface AppState {
  // Data sources
  dataSources: DataSource[]
  addDataSource: (source: DataSource) => void
  removeDataSource: (id: string) => void
  updateDataSource: (id: string, data: Partial<DataSource>) => void

  // Dashboards
  dashboards: Dashboard[]
  currentDashboardId: string | null
  addDashboard: (dashboard: Dashboard) => void
  setCurrentDashboard: (id: string) => void
  updateDashboard: (id: string, data: Partial<Dashboard>) => void
  deleteDashboard: (id: string) => void

  // Charts
  addChart: (dashboardId: string, chart: ChartConfig) => void
  updateChart: (dashboardId: string, chartId: string, data: Partial<ChartConfig>) => void
  deleteChart: (dashboardId: string, chartId: string) => void

  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  selectedChartId: string | null
  setSelectedChartId: (id: string | null) => void
  sqlEditorOpen: boolean
  setSqlEditorOpen: (open: boolean) => void
}
```

### Using the Store

```typescript
import { useStore } from '../store/useStore'

function MyComponent() {
  // Select only what you need
  const dataSources = useStore((state) => state.dataSources)
  const addDataSource = useStore((state) => state.addDataSource)

  // Or destructure
  const { dashboards, currentDashboardId } = useStore()

  return <div>...</div>
}
```

## Adding New Features

### 1. Add a New Chart Type

**Step 1:** Update types in `src/store/useStore.ts`

```typescript
export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'table' | 'gauge' // Add 'gauge'
  // ...
}
```

**Step 2:** Add chart configuration in `src/components/Chart.tsx`

```typescript
case 'gauge':
  return {
    series: [{
      type: 'gauge',
      data: [{ value: data[0][yAxis] }],
      // ... gauge options
    }]
  }
```

**Step 3:** Add button in `src/components/Sidebar.tsx`

```tsx
<button
  onClick={() => handleAddChart('gauge')}
  className="brutal-card p-4 hover:bg-brutal-blue transition-colors"
>
  <Gauge size={32} />
  <span className="font-bold text-xs uppercase">Gauge</span>
</button>
```

### 2. Add a New Data Source Type

**Step 1:** Update types

```typescript
export interface DataSource {
  type: 'csv' | 'excel' | 'json' | 'sql' | 'api' // Add 'api'
  // ...
}
```

**Step 2:** Create loader in `src/utils/dataLoader.ts`

```typescript
export const loadAPIData = async (url: string): Promise<DataSource> => {
  const response = await fetch(url)
  const data = await response.json()

  return {
    id: crypto.randomUUID(),
    name: `API: ${url}`,
    type: 'api',
    data,
    columns: Object.keys(data[0] || {}),
    createdAt: new Date(),
  }
}
```

**Step 3:** Add to file loader switch

```typescript
export const loadDataFile = async (file: File | string): Promise<DataSource> => {
  if (typeof file === 'string') {
    // URL
    return loadAPIData(file)
  }
  // ... existing code
}
```

### 3. Add a New UI Component

**Step 1:** Create component file

```tsx
// src/components/MyNewComponent.tsx
import React from 'react'
import { useStore } from '../store/useStore'

export const MyNewComponent: React.FC = () => {
  const { /* state */ } = useStore()

  return (
    <div className="brutal-card">
      {/* Your component */}
    </div>
  )
}
```

**Step 2:** Import in `App.tsx`

```tsx
import { MyNewComponent } from './components/MyNewComponent'

function App() {
  return (
    <div>
      {/* ... */}
      <MyNewComponent />
    </div>
  )
}
```

## Testing

### Manual Testing Checklist

- [ ] Load CSV file
- [ ] Load Excel file
- [ ] Load JSON file
- [ ] Create bar chart
- [ ] Create line chart
- [ ] Create pie chart
- [ ] Create scatter chart
- [ ] Create area chart
- [ ] Create table view
- [ ] Drag chart to new position
- [ ] Resize chart
- [ ] Delete chart
- [ ] Configure chart axes
- [ ] Open SQL editor
- [ ] Export dashboard
- [ ] Create new dashboard
- [ ] Switch between dashboards

### Future: Unit Tests

```bash
npm install --save-dev vitest @testing-library/react
```

Example test:

```typescript
import { render } from '@testing-library/react'
import { Chart } from './Chart'

test('renders chart with data', () => {
  const chart = {
    id: '1',
    type: 'bar',
    title: 'Test Chart',
    // ...
  }

  const { getByText } = render(<Chart chart={chart} dashboardId="1" />)
  expect(getByText('Test Chart')).toBeInTheDocument()
})
```

## Build & Deployment

### Building for Development

```bash
npm run build
```

This compiles TypeScript and bundles with Vite. Output:
- `dist/` - React app
- `dist-electron/` - Electron main/preload

### Packaging for Distribution

```bash
# All platforms (uses current platform)
npm run package

# Specific platform
npm run package:win
npm run package:mac
npm run package:linux
```

Output: `release/` directory with installers

### Platform-Specific Notes

**Windows:**
- NSIS installer (`.exe`)
- Portable executable

**macOS:**
- DMG image
- ZIP archive
- Requires code signing for distribution

**Linux:**
- AppImage (universal)
- DEB (Debian/Ubuntu)
- RPM (Fedora/RHEL)
- Snap package

### CI/CD

Example GitHub Actions workflow:

```yaml
name: Build
on: [push, pull_request]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run package
```

## Contributing

### Code Style

- Use TypeScript for all new files
- Use functional components with hooks
- Use Tailwind CSS for styling
- Follow the neo-brutalism design pattern
- Keep components small and focused

### Neo-Brutalism Design Guidelines

- **Bold borders:** Use `border-4` or `border-3`
- **Strong shadows:** Use `shadow-brutal` classes
- **High contrast:** Black borders on white/colored backgrounds
- **Simple shapes:** Rectangles, no rounded corners
- **Bright colors:** Use `brutal-yellow`, `brutal-pink`, etc.
- **Bold typography:** Use `font-bold` and `uppercase`

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Update documentation
6. Submit pull request
7. Address review feedback

### Commit Messages

Use conventional commits:

```
feat: Add gauge chart type
fix: Resolve Excel parsing issue
docs: Update developer guide
style: Apply neo-brutalism to buttons
refactor: Simplify data loading logic
test: Add chart component tests
```

## Troubleshooting

### Build Fails

```bash
# Clear caches
rm -rf node_modules dist dist-electron release
npm install
npm run build
```

### Type Errors

```bash
# Check types without building
npx tsc --noEmit
```

### Electron Won't Start

- Check `dist-electron/main.js` exists
- Verify `package.json` has `"main": "dist-electron/main.js"`
- Check console for errors

### Charts Not Rendering

- Verify data source has data
- Check chart configuration (xAxis, yAxis)
- Open browser DevTools in Electron (Ctrl+Shift+I)

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [ECharts Documentation](https://echarts.apache.org/en/index.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Vite](https://vitejs.dev)

---

**Happy coding! Build something amazing! 🔥**
