import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { DashboardCanvas } from './components/DashboardCanvas'
import { SQLEditor } from './components/SQLEditor'
import { useStore } from './store/useStore'

function App() {
  const { sidebarOpen } = useStore()

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Topbar */}
      <Topbar />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard Canvas */}
        <div className={`flex-1 overflow-hidden transition-all ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
          <DashboardCanvas />
        </div>
      </div>

      {/* SQL Editor Modal */}
      <SQLEditor />
    </div>
  )
}

export default App
