import React from 'react'
import {
  Download,
  Code,
  Plus,
} from 'lucide-react'
import { useStore } from '../store/useStore'

export const Topbar: React.FC = () => {
  const {
    dashboards,
    currentDashboardId,
    setCurrentDashboard,
    addDashboard,
    setSqlEditorOpen,
  } = useStore()

  const currentDashboard = dashboards.find((d) => d.id === currentDashboardId)

  const handleNewDashboard = () => {
    const newDashboard = {
      id: crypto.randomUUID(),
      name: `Dashboard ${dashboards.length + 1}`,
      charts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    addDashboard(newDashboard)
    setCurrentDashboard(newDashboard.id)
  }

  const handleExport = () => {
    if (!currentDashboard) return

    const data = {
      dashboard: currentDashboard,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentDashboard.name.replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-16 border-b-4 border-black bg-white flex items-center justify-between px-4">
      {/* Left section - Dashboard selector */}
      <div className="flex items-center gap-4">
        <select
          value={currentDashboardId || ''}
          onChange={(e) => setCurrentDashboard(e.target.value)}
          className="brutal-input py-2 font-bold uppercase"
        >
          {dashboards.map((dashboard) => (
            <option key={dashboard.id} value={dashboard.id}>
              {dashboard.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleNewDashboard}
          className="brutal-button bg-brutal-green text-black px-4 py-2"
        >
          <Plus size={20} className="inline mr-1" />
          New
        </button>
      </div>

      {/* Center section - Title */}
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          {currentDashboard?.name || 'DataForge'}
        </h1>
        <p className="text-xs text-gray-600 font-mono">
          {currentDashboard?.charts.length || 0} charts •{' '}
          {new Date(currentDashboard?.updatedAt || new Date()).toLocaleString()}
        </p>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSqlEditorOpen(true)}
          className="px-4 py-2 bg-brutal-purple text-white border-4 border-black font-bold uppercase text-sm shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Code size={18} className="inline mr-1" />
          SQL
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-brutal-blue text-white border-4 border-black font-bold uppercase text-sm shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Download size={18} className="inline mr-1" />
          Export
        </button>
      </div>
    </div>
  )
}
