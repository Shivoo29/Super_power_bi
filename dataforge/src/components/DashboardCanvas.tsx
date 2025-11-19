import React from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useStore } from '../store/useStore'
import { Chart } from './Chart'

export const DashboardCanvas: React.FC = () => {
  const { dashboards, currentDashboardId, updateChart } = useStore()

  const currentDashboard = dashboards.find((d) => d.id === currentDashboardId)

  if (!currentDashboard) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center brutal-card p-8">
          <h2 className="text-2xl font-bold uppercase mb-4">No Dashboard Selected</h2>
          <p className="text-gray-600">Please create or select a dashboard to get started.</p>
        </div>
      </div>
    )
  }

  if (currentDashboard.charts.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center brutal-card p-8 bg-white">
          <h2 className="text-2xl font-bold uppercase mb-4">Empty Dashboard</h2>
          <p className="text-gray-600 mb-4">
            Add data sources and charts from the sidebar to get started!
          </p>
          <div className="flex flex-col gap-2 text-sm font-mono text-left">
            <div className="flex items-center gap-2">
              <span className="brutal-badge bg-brutal-blue text-white">1</span>
              <span>Add a data source (CSV, Excel, or JSON)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="brutal-badge bg-brutal-green text-black">2</span>
              <span>Choose a chart type from the Charts tab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="brutal-badge bg-brutal-pink text-white">3</span>
              <span>Drag and resize charts to customize your layout</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const layout = currentDashboard.charts.map((chart) => ({
    i: chart.id,
    x: chart.position.x,
    y: chart.position.y,
    w: chart.position.w,
    h: chart.position.h,
    minW: 2,
    minH: 2,
  }))

  const handleLayoutChange = (newLayout: any[]) => {
    newLayout.forEach((item) => {
      const chart = currentDashboard.charts.find((c) => c.id === item.i)
      if (chart && currentDashboardId) {
        updateChart(currentDashboardId, chart.id, {
          position: { x: item.x, y: item.y, w: item.w, h: item.h },
        })
      }
    })
  }

  return (
    <div className="w-full h-full overflow-auto p-4 bg-gray-50">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={80}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        compactType="vertical"
      >
        {currentDashboard.charts.map((chart) => (
          <div key={chart.id} className="drag-handle">
            <Chart chart={chart} dashboardId={currentDashboard.id} />
          </div>
        ))}
      </GridLayout>
    </div>
  )
}
