import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { DataSource } from '../store/useStore'

export const loadCSVFile = async (file: File): Promise<DataSource> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data.filter((row: any) =>
          Object.values(row).some((val) => val !== null && val !== '')
        )
        const columns = results.meta.fields || []

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          type: 'csv',
          data,
          columns,
          createdAt: new Date(),
        })
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

export const loadExcelFile = async (file: File): Promise<DataSource> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // Get first sheet
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null })
        const columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : []

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          type: 'excel',
          data: jsonData,
          columns,
          createdAt: new Date(),
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const loadJSONFile = async (file: File): Promise<DataSource> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        let data = JSON.parse(content)

        // Handle different JSON formats
        if (!Array.isArray(data)) {
          if (typeof data === 'object' && data !== null) {
            // If it's an object with an array property, try to find it
            const arrayKey = Object.keys(data).find((key) =>
              Array.isArray(data[key])
            )
            if (arrayKey) {
              data = data[arrayKey]
            } else {
              // Convert single object to array
              data = [data]
            }
          } else {
            throw new Error('Invalid JSON format')
          }
        }

        const columns = data.length > 0 ? Object.keys(data[0]) : []

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          type: 'json',
          data,
          columns,
          createdAt: new Date(),
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read JSON file'))
    }

    reader.readAsText(file)
  })
}

export const loadDataFile = async (file: File): Promise<DataSource> => {
  const ext = file.name.split('.').pop()?.toLowerCase()

  switch (ext) {
    case 'csv':
      return loadCSVFile(file)
    case 'xlsx':
    case 'xls':
      return loadExcelFile(file)
    case 'json':
      return loadJSONFile(file)
    default:
      throw new Error(`Unsupported file type: ${ext}`)
  }
}

// Data transformation utilities
export const filterData = (data: any[], filters: Record<string, any>): any[] => {
  return data.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === null || value === undefined || value === '') return true
      return row[key] === value
    })
  })
}

export const aggregateData = (
  data: any[],
  groupBy: string,
  aggregations: { column: string; func: 'sum' | 'avg' | 'count' | 'min' | 'max' }[]
): any[] => {
  const groups = data.reduce((acc, row) => {
    const key = row[groupBy]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(row)
    return acc
  }, {} as Record<string, any[]>)

  return Object.entries(groups).map(([key, rows]) => {
    const result: any = { [groupBy]: key }

    aggregations.forEach(({ column, func }) => {
      const values = rows.map((r) => r[column]).filter((v) => v != null)

      switch (func) {
        case 'sum':
          result[`${column}_sum`] = values.reduce((a, b) => a + b, 0)
          break
        case 'avg':
          result[`${column}_avg`] =
            values.reduce((a, b) => a + b, 0) / values.length
          break
        case 'count':
          result[`${column}_count`] = values.length
          break
        case 'min':
          result[`${column}_min`] = Math.min(...values)
          break
        case 'max':
          result[`${column}_max`] = Math.max(...values)
          break
      }
    })

    return result
  })
}
