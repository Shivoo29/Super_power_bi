import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { X, Play, Database } from 'lucide-react'
import { useStore } from '../store/useStore'

export const SQLEditor: React.FC = () => {
  const { sqlEditorOpen, setSqlEditorOpen, dataSources } = useStore()
  const [sql, setSql] = useState('-- Write SQL queries here\nSELECT * FROM data LIMIT 10;')
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  if (!sqlEditorOpen) return null

  const executeSQL = () => {
    try {
      // For now, just show a demo message
      // In a real implementation, we'd use DuckDB WASM here
      setError('SQL execution coming soon! DuckDB WASM integration in progress.')
      setResults([])
    } catch (err) {
      setError((err as Error).message)
      setResults([])
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[80vh] brutal-card bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-brutal-purple text-white">
          <div className="flex items-center gap-3">
            <Database size={24} />
            <h2 className="text-xl font-bold uppercase">SQL Editor</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={executeSQL}
              className="px-4 py-2 bg-brutal-green text-black border-4 border-black font-bold uppercase text-sm shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play size={18} className="inline mr-1" />
              Execute
            </button>
            <button
              onClick={() => setSqlEditorOpen(false)}
              className="p-2 hover:bg-white hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 border-b-4 border-black">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-light"
            value={sql}
            onChange={(value) => setSql(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              lineNumbers: 'on',
              renderLineHighlight: 'all',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Results */}
        <div className="h-64 overflow-auto p-4 bg-gray-50">
          <h3 className="font-bold uppercase text-sm mb-2">Results</h3>
          {error && (
            <div className="brutal-card bg-brutal-yellow p-3">
              <p className="font-mono text-sm text-red-600">{error}</p>
            </div>
          )}
          {results.length > 0 && (
            <table className="w-full text-sm brutal-card">
              <thead className="bg-black text-white">
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left font-bold uppercase text-xs">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono">
                {results.map((row, idx) => (
                  <tr key={idx} className="border-b-2 border-black">
                    {Object.values(row).map((val: any, i) => (
                      <td key={i} className="px-4 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!error && results.length === 0 && (
            <p className="text-gray-500 text-sm font-mono">
              Execute a query to see results here
            </p>
          )}
        </div>

        {/* Data Sources Info */}
        <div className="p-3 border-t-4 border-black bg-white">
          <p className="text-xs font-mono">
            <span className="font-bold">Available data sources:</span>{' '}
            {dataSources.map((ds) => ds.name).join(', ') || 'None'}
          </p>
        </div>
      </div>
    </div>
  )
}
