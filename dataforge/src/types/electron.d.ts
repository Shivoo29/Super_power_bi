export interface ElectronAPI {
  openFile: () => Promise<{ filePath?: string; content?: string; canceled: boolean }>
  saveFile: (data: string) => Promise<{ success: boolean; filePath?: string }>
  readFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>
  writeFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
