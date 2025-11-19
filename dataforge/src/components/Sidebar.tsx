import React, { useState } from 'react'
import {
  Database,
  Plus,
  FileSpreadsheet,
  BarChart3,
  Table,
  PieChart,
  LineChart,
  ScatterChart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { loadDataFile } from '../utils/dataLoader'

export const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    dataSources,
    addDataSource,
    addChart,
    currentDashboardId,
  } = useStore()

  const [activeTab, setActiveTab] = useState<'data' | 'charts'>('data')

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    try {
      const file = files[0]
      const dataSource = await loadDataFile(file)
      addDataSource(dataSource)
    } catch (error) {
      console.error('Error loading file:', error)
      alert('Error loading file: ' + (error as Error).message)
    }
  }

  const handleAddChart = (
    type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'table'
  ) => {
    if (!currentDashboardId) return
    if (dataSources.length === 0) {
      alert('Please add a data source first!')
      return
    }

    const newChart = {
      id: crypto.randomUUID(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      dataSourceId: dataSources[0].id,
      position: { x: 0, y: 0, w: 6, h: 4 },
      options: {},
    }

    addChart(currentDashboardId, newChart)
  }

  if (!sidebarOpen) {
    return (
      <div className="fixed left-0 top-0 h-full z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mt-20 ml-2 p-2 bg-brutal-yellow border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    )
  }

  return (
    <div className="w-80 h-full bg-white border-r-4 border-black flex flex-col animate-slide-in">
      {/* Header */}
      <div className="p-4 border-b-4 border-black bg-brutal-yellow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold uppercase tracking-tight">
            DataForge
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-4 border-black">
        <button
          onClick={() => setActiveTab('data')}
          className={`flex-1 py-3 font-bold uppercase text-sm transition-colors ${
            activeTab === 'data'
              ? 'bg-brutal-blue text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <Database className="inline mr-2" size={16} />
          Data
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`flex-1 py-3 font-bold uppercase text-sm transition-colors border-l-4 border-black ${
            activeTab === 'charts'
              ? 'bg-brutal-blue text-white'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <BarChart3 className="inline mr-2" size={16} />
          Charts
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'data' && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="file-upload"
                className="brutal-button-primary w-full text-center flex items-center justify-center cursor-pointer"
              >
                <Plus size={20} className="mr-2" />
                Add Data Source
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="brutal-divider"></div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase text-sm mb-2">Data Sources</h3>
              {dataSources.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No data sources yet. Add one to get started!
                </p>
              ) : (
                dataSources.map((source) => (
                  <div
                    key={source.id}
                    className="brutal-card p-3 bg-white cursor-pointer hover:bg-brutal-yellow transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet size={16} />
                          <span className="font-bold text-sm truncate">
                            {source.name}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          {source.data.length} rows • {source.columns.length} columns
                        </div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {source.columns.slice(0, 3).map((col) => (
                            <span
                              key={col}
                              className="brutal-badge bg-brutal-pink text-white text-xs"
                            >
                              {col}
                            </span>
                          ))}
                          {source.columns.length > 3 && (
                            <span className="brutal-badge bg-gray-200 text-xs">
                              +{source.columns.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="space-y-4">
            <h3 className="font-bold uppercase text-sm mb-3">Add Chart</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAddChart('bar')}
                className="brutal-card p-4 hover:bg-brutal-blue hover:text-white transition-colors flex flex-col items-center gap-2"
              >
                <BarChart3 size={32} />
                <span className="font-bold text-xs uppercase">Bar</span>
              </button>
              <button
                onClick={() => handleAddChart('line')}
                className="brutal-card p-4 hover:bg-brutal-green hover:text-black transition-colors flex flex-col items-center gap-2"
              >
                <LineChart size={32} />
                <span className="font-bold text-xs uppercase">Line</span>
              </button>
              <button
                onClick={() => handleAddChart('pie')}
                className="brutal-card p-4 hover:bg-brutal-pink hover:text-white transition-colors flex flex-col items-center gap-2"
              >
                <PieChart size={32} />
                <span className="font-bold text-xs uppercase">Pie</span>
              </button>
              <button
                onClick={() => handleAddChart('scatter')}
                className="brutal-card p-4 hover:bg-brutal-purple hover:text-white transition-colors flex flex-col items-center gap-2"
              >
                <ScatterChart size={32} />
                <span className="font-bold text-xs uppercase">Scatter</span>
              </button>
              <button
                onClick={() => handleAddChart('area')}
                className="brutal-card p-4 hover:bg-brutal-yellow transition-colors flex flex-col items-center gap-2"
              >
                <TrendingUp size={32} />
                <span className="font-bold text-xs uppercase">Area</span>
              </button>
              <button
                onClick={() => handleAddChart('table')}
                className="brutal-card p-4 hover:bg-brutal-red hover:text-white transition-colors flex flex-col items-center gap-2"
              >
                <Table size={32} />
                <span className="font-bold text-xs uppercase">Table</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
