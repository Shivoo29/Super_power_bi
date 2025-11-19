# Components Directory

This directory contains all React components for the DataForge application.

## Component Overview

### Core Components

#### 1. Sidebar.tsx
**Purpose:** Left sidebar for data source management and chart creation

**Features:**
- Data source upload (CSV, Excel, JSON)
- Data source preview (rows, columns, column names)
- Chart type selection (6 chart types)
- Collapsible interface

**State used:**
- `dataSources` - Array of loaded data sources
- `addDataSource` - Function to add new data source
- `addChart` - Function to create new chart
- `sidebarOpen` - Toggle sidebar visibility

**Props:** None (uses Zustand store)

**Usage:**
```tsx
import { Sidebar } from './components/Sidebar'

<Sidebar />
```

#### 2. Topbar.tsx
**Purpose:** Top navigation bar with dashboard controls

**Features:**
- Dashboard selector dropdown
- New dashboard button
- SQL editor button
- Export dashboard button
- Current dashboard info

**State used:**
- `dashboards` - All dashboards
- `currentDashboardId` - Active dashboard
- `addDashboard` - Create new dashboard
- `setCurrentDashboard` - Switch dashboard
- `setSqlEditorOpen` - Open SQL editor

**Props:** None (uses Zustand store)

**Usage:**
```tsx
import { Topbar } from './components/Topbar'

<Topbar />
```

#### 3. DashboardCanvas.tsx
**Purpose:** Main canvas area with drag-and-drop grid for charts

**Features:**
- Grid layout with react-grid-layout
- Drag charts to reposition
- Resize charts
- Empty state when no charts
- Responsive grid

**State used:**
- `dashboards` - All dashboards
- `currentDashboardId` - Active dashboard
- `updateChart` - Update chart position/size

**Props:** None (uses Zustand store)

**Usage:**
```tsx
import { DashboardCanvas } from './components/DashboardCanvas'

<DashboardCanvas />
```

#### 4. Chart.tsx
**Purpose:** Individual chart component with visualization

**Features:**
- Renders 6 chart types (bar, line, pie, scatter, area, table)
- Configurable axes (X-axis, Y-axis)
- Settings panel
- Delete button
- ECharts integration

**State used:**
- `dataSources` - For data lookup
- `updateChart` - Update chart config
- `deleteChart` - Remove chart

**Props:**
```typescript
interface ChartProps {
  chart: ChartConfig        // Chart configuration
  dashboardId: string       // Parent dashboard ID
}
```

**Usage:**
```tsx
import { Chart } from './components/Chart'

<Chart chart={chartConfig} dashboardId="dashboard-1" />
```

**Chart Types:**
- **Bar:** Category comparison
- **Line:** Trends over time
- **Pie:** Part-to-whole relationships
- **Scatter:** Correlation between variables
- **Area:** Cumulative trends
- **Table:** Raw data view

#### 5. SQLEditor.tsx
**Purpose:** Modal SQL editor with Monaco Editor

**Features:**
- Monaco Editor (VS Code editor)
- SQL syntax highlighting
- Execute button
- Results display
- Data source info
- Closeable modal

**State used:**
- `sqlEditorOpen` - Visibility state
- `setSqlEditorOpen` - Toggle visibility
- `dataSources` - Show available sources

**Props:** None (uses Zustand store)

**Usage:**
```tsx
import { SQLEditor } from './components/SQLEditor'

<SQLEditor />
```

**Note:** SQL execution is planned (DuckDB WASM integration in progress)

## Component Architecture

### Data Flow

```
App.tsx
  ├── Topbar (dashboard controls)
  ├── Sidebar (data & chart management)
  ├── DashboardCanvas
  │   └── Chart (rendered for each chart in dashboard)
  └── SQLEditor (modal)
```

### State Management

All components use Zustand store (`src/store/useStore.ts`):

```typescript
// Reading state
const dataSources = useStore((state) => state.dataSources)

// Calling actions
const addChart = useStore((state) => state.addChart)

// Multiple selections
const { dashboards, currentDashboardId } = useStore()
```

### Styling

All components use:
- **Tailwind CSS** for styling
- **Neo-brutalism** design system
- **Custom classes** from `src/index.css`

**Example:**
```tsx
<div className="brutal-card bg-white border-4 border-black shadow-brutal">
  <button className="brutal-button-primary">Click Me</button>
</div>
```

## Adding a New Component

### 1. Create Component File

```tsx
// src/components/MyComponent.tsx
import React from 'react'
import { useStore } from '../store/useStore'

interface MyComponentProps {
  title: string
  onUpdate: (value: string) => void
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onUpdate }) => {
  const { /* state */ } = useStore()

  return (
    <div className="brutal-card">
      <h2 className="font-bold uppercase">{title}</h2>
      {/* Component content */}
    </div>
  )
}
```

### 2. Export from Index (Optional)

```tsx
// src/components/index.ts
export { Sidebar } from './Sidebar'
export { Topbar } from './Topbar'
export { Chart } from './Chart'
export { DashboardCanvas } from './DashboardCanvas'
export { SQLEditor } from './SQLEditor'
export { MyComponent } from './MyComponent'  // Add new component
```

### 3. Use in App or Other Components

```tsx
import { MyComponent } from './components/MyComponent'

function App() {
  return (
    <div>
      <MyComponent title="Hello" onUpdate={(val) => console.log(val)} />
    </div>
  )
}
```

## Component Guidelines

### TypeScript

- **Always use TypeScript** for props
- **Define interfaces** for complex props
- **Export types** if used elsewhere

```typescript
// Good
interface ChartProps {
  chart: ChartConfig
  dashboardId: string
}

export const Chart: React.FC<ChartProps> = ({ chart, dashboardId }) => {
  // ...
}

// Bad
export const Chart = (props: any) => {
  // ...
}
```

### State

- **Use Zustand store** for global state
- **Use useState** for local component state
- **Don't prop-drill** - use store instead

```typescript
// Good - using store
const { dataSources, addDataSource } = useStore()

// Bad - prop drilling through multiple components
<Parent>
  <Child dataSources={dataSources}>
    <GrandChild dataSources={dataSources} />
  </Child>
</Parent>
```

### Styling

- **Use Tailwind classes**
- **Follow neo-brutalism** design
- **Use custom brutal-* classes**

```tsx
// Good
<div className="brutal-card bg-brutal-yellow border-4 border-black shadow-brutal">
  <button className="brutal-button-primary uppercase font-bold">
    Click
  </button>
</div>

// Bad - not neo-brutalism
<div className="rounded-lg shadow-sm border border-gray-200">
  <button className="rounded-full bg-blue-500">Click</button>
</div>
```

### Performance

- **Use React.memo** for expensive components
- **Avoid inline functions** in render
- **Use useCallback** for callbacks

```typescript
// Good
const handleClick = useCallback(() => {
  updateChart(chartId, { title: 'New Title' })
}, [chartId, updateChart])

// Bad - creates new function every render
<button onClick={() => updateChart(chartId, { title: 'New Title' })}>
```

## Testing Components

### Manual Testing

1. **Visual inspection** - Check appearance
2. **Interaction testing** - Click, drag, type
3. **State changes** - Verify updates
4. **Error handling** - Test edge cases

### Future: Unit Tests

```typescript
import { render, screen } from '@testing-library/react'
import { Chart } from './Chart'

test('renders chart title', () => {
  const chart = {
    id: '1',
    type: 'bar',
    title: 'Test Chart',
    // ...
  }

  render(<Chart chart={chart} dashboardId="1" />)

  expect(screen.getByText('Test Chart')).toBeInTheDocument()
})
```

## Component Dependencies

```json
{
  "react": "UI library",
  "lucide-react": "Icons",
  "echarts-for-react": "Charts (Chart.tsx)",
  "react-grid-layout": "Grid (DashboardCanvas.tsx)",
  "@monaco-editor/react": "Code editor (SQLEditor.tsx)",
  "zustand": "State management (all components)"
}
```

## Troubleshooting

**Component not rendering:**
- Check import path
- Verify export syntax
- Check for TypeScript errors

**State not updating:**
- Verify Zustand action is called
- Check if component subscribes to correct state
- Look for console errors

**Styling issues:**
- Check Tailwind classes are valid
- Verify `index.css` is imported
- Check for conflicting styles

---

**For more details, see [DEVELOPER.md](../../DEVELOPER.md)**
