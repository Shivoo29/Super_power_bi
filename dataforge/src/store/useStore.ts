import { create } from 'zustand'

export interface DataSource {
  id: string
  name: string
  type: 'csv' | 'excel' | 'json' | 'sql'
  filePath?: string
  data: any[]
  columns: string[]
  createdAt: Date
}

export interface ChartConfig {
  id: string
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'heatmap' | 'table'
  title: string
  dataSourceId: string
  xAxis?: string
  yAxis?: string | string[]
  color?: string
  position: { x: number; y: number; w: number; h: number }
  options: any
}

export interface Dashboard {
  id: string
  name: string
  charts: ChartConfig[]
  createdAt: Date
  updatedAt: Date
}

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

export const useStore = create<AppState>((set, get) => ({
  // Data sources
  dataSources: [],
  addDataSource: (source) =>
    set((state) => ({ dataSources: [...state.dataSources, source] })),
  removeDataSource: (id) =>
    set((state) => ({
      dataSources: state.dataSources.filter((s) => s.id !== id),
    })),
  updateDataSource: (id, data) =>
    set((state) => ({
      dataSources: state.dataSources.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
    })),

  // Dashboards
  dashboards: [
    {
      id: 'default',
      name: 'My First Dashboard',
      charts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  currentDashboardId: 'default',
  addDashboard: (dashboard) =>
    set((state) => ({ dashboards: [...state.dashboards, dashboard] })),
  setCurrentDashboard: (id) => set({ currentDashboardId: id }),
  updateDashboard: (id, data) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === id ? { ...d, ...data, updatedAt: new Date() } : d
      ),
    })),
  deleteDashboard: (id) =>
    set((state) => ({
      dashboards: state.dashboards.filter((d) => d.id !== id),
      currentDashboardId:
        state.currentDashboardId === id
          ? state.dashboards[0]?.id || null
          : state.currentDashboardId,
    })),

  // Charts
  addChart: (dashboardId, chart) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboardId
          ? { ...d, charts: [...d.charts, chart], updatedAt: new Date() }
          : d
      ),
    })),
  updateChart: (dashboardId, chartId, data) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboardId
          ? {
              ...d,
              charts: d.charts.map((c) =>
                c.id === chartId ? { ...c, ...data } : c
              ),
              updatedAt: new Date(),
            }
          : d
      ),
    })),
  deleteChart: (dashboardId, chartId) =>
    set((state) => ({
      dashboards: state.dashboards.map((d) =>
        d.id === dashboardId
          ? {
              ...d,
              charts: d.charts.filter((c) => c.id !== chartId),
              updatedAt: new Date(),
            }
          : d
      ),
    })),

  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  selectedChartId: null,
  setSelectedChartId: (id) => set({ selectedChartId: id }),
  sqlEditorOpen: false,
  setSqlEditorOpen: (open) => set({ sqlEditorOpen: open }),
}))
