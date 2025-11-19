import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Settings, Trash2 } from 'lucide-react'
import { useStore, type ChartConfig } from '../store/useStore'

interface ChartProps {
  chart: ChartConfig
  dashboardId: string
}

export const Chart: React.FC<ChartProps> = ({ chart, dashboardId }) => {
  const { dataSources, updateChart, deleteChart } = useStore()
  const [showSettings, setShowSettings] = useState(false)

  const dataSource = dataSources.find((ds) => ds.id === chart.dataSourceId)

  if (!dataSource) {
    return (
      <div className="w-full h-full brutal-card flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="font-bold text-red-500">No data source found!</p>
          <p className="text-sm text-gray-600 mt-2">
            Please select a valid data source.
          </p>
        </div>
      </div>
    )
  }

  const getChartOption = () => {
    const data = dataSource.data

    switch (chart.type) {
      case 'bar':
        return {
          title: { text: chart.title, textStyle: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 'bold' } },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: data.map((d) => d[chart.xAxis || dataSource.columns[0]]),
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            axisTick: { lineStyle: { width: 3, color: '#000' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            splitLine: { lineStyle: { width: 2, color: '#000', type: 'dashed' } },
          },
          series: [
            {
              data: data.map((d) => d[chart.yAxis as string || dataSource.columns[1]]),
              type: 'bar',
              itemStyle: {
                color: chart.color || '#00BFFF',
                borderColor: '#000',
                borderWidth: 3,
              },
            },
          ],
        }

      case 'line':
        return {
          title: { text: chart.title, textStyle: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 'bold' } },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: data.map((d) => d[chart.xAxis || dataSource.columns[0]]),
            axisLine: { lineStyle: { width: 3, color: '#000' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            splitLine: { lineStyle: { width: 2, color: '#000', type: 'dashed' } },
          },
          series: [
            {
              data: data.map((d) => d[chart.yAxis as string || dataSource.columns[1]]),
              type: 'line',
              smooth: true,
              lineStyle: { width: 4, color: chart.color || '#00FF7F' },
              itemStyle: {
                color: chart.color || '#00FF7F',
                borderColor: '#000',
                borderWidth: 3,
              },
            },
          ],
        }

      case 'pie':
        return {
          title: { text: chart.title, textStyle: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 'bold' } },
          tooltip: { trigger: 'item' },
          series: [
            {
              type: 'pie',
              radius: '70%',
              data: data.map((d) => ({
                name: d[chart.xAxis || dataSource.columns[0]],
                value: d[chart.yAxis as string || dataSource.columns[1]],
              })),
              itemStyle: {
                borderColor: '#000',
                borderWidth: 3,
              },
              label: {
                fontFamily: 'Space Grotesk',
                fontWeight: 'bold',
              },
            },
          ],
        }

      case 'scatter':
        return {
          title: { text: chart.title, textStyle: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 'bold' } },
          tooltip: { trigger: 'item' },
          xAxis: {
            type: 'value',
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            splitLine: { lineStyle: { width: 2, color: '#000', type: 'dashed' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            splitLine: { lineStyle: { width: 2, color: '#000', type: 'dashed' } },
          },
          series: [
            {
              type: 'scatter',
              data: data.map((d) => [
                d[chart.xAxis || dataSource.columns[0]],
                d[chart.yAxis as string || dataSource.columns[1]],
              ]),
              symbolSize: 12,
              itemStyle: {
                color: chart.color || '#9D4EDD',
                borderColor: '#000',
                borderWidth: 2,
              },
            },
          ],
        }

      case 'area':
        return {
          title: { text: chart.title, textStyle: { fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 'bold' } },
          tooltip: { trigger: 'axis' },
          xAxis: {
            type: 'category',
            data: data.map((d) => d[chart.xAxis || dataSource.columns[0]]),
            axisLine: { lineStyle: { width: 3, color: '#000' } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { width: 3, color: '#000' } },
            splitLine: { lineStyle: { width: 2, color: '#000', type: 'dashed' } },
          },
          series: [
            {
              data: data.map((d) => d[chart.yAxis as string || dataSource.columns[1]]),
              type: 'line',
              smooth: true,
              areaStyle: {
                color: chart.color || '#FFD700',
                opacity: 0.7,
              },
              lineStyle: { width: 4, color: '#000' },
              itemStyle: {
                color: chart.color || '#FFD700',
                borderColor: '#000',
                borderWidth: 3,
              },
            },
          ],
        }

      case 'table':
        return null

      default:
        return {}
    }
  }

  if (chart.type === 'table') {
    return (
      <div className="w-full h-full brutal-card overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-3 border-b-4 border-black bg-brutal-yellow">
          <h3 className="font-bold uppercase text-sm">{chart.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => deleteChart(dashboardId, chart.id)}
              className="p-1 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-black text-white sticky top-0">
              <tr>
                {dataSource.columns.map((col) => (
                  <th key={col} className="px-4 py-2 text-left font-bold uppercase text-xs">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              {dataSource.data.slice(0, 100).map((row, idx) => (
                <tr key={idx} className="border-b-2 border-black hover:bg-brutal-yellow">
                  {dataSource.columns.map((col) => (
                    <td key={col} className="px-4 py-2">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const option = getChartOption()

  return (
    <div className="w-full h-full brutal-card overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-2 border-b-4 border-black bg-brutal-yellow">
        <h3 className="font-bold uppercase text-sm">{chart.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 hover:bg-black hover:text-white transition-colors"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => deleteChart(dashboardId, chart.id)}
            className="p-1 hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="p-3 border-b-4 border-black bg-gray-50">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <label className="font-bold text-xs uppercase">X-Axis</label>
              <select
                value={chart.xAxis || dataSource.columns[0]}
                onChange={(e) =>
                  updateChart(dashboardId, chart.id, { xAxis: e.target.value })
                }
                className="brutal-input w-full py-1 text-sm"
              >
                {dataSource.columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-xs uppercase">Y-Axis</label>
              <select
                value={chart.yAxis as string || dataSource.columns[1]}
                onChange={(e) =>
                  updateChart(dashboardId, chart.id, { yAxis: e.target.value })
                }
                className="brutal-input w-full py-1 text-sm"
              >
                {dataSource.columns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-2">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}
