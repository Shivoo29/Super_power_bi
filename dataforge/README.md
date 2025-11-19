# DataForge 🔥

**A Modern, Developer-Friendly Power BI Alternative**

DataForge is a cross-platform desktop application for data visualization and business intelligence, designed specifically for developers and data analysts who want power, flexibility, and style.

![DataForge](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## ✨ Features

### 🎨 Neo-Brutalism Design
- Bold, high-contrast UI with thick borders and strong shadows
- Custom fonts: **Space Grotesk** for UI, **JetBrains Mono** for code
- Eye-catching color palette optimized for data visualization
- Responsive and modern interface

### 📊 Powerful Data Visualization
- **Multiple Chart Types**: Bar, Line, Pie, Scatter, Area, and Table views
- **Interactive Charts**: Powered by Apache ECharts with smooth animations
- **Drag & Drop**: Rearrange and resize charts with react-grid-layout
- **Real-time Updates**: Charts update instantly when data changes

### 💾 Flexible Data Sources
- **CSV Files**: Import comma-separated values with auto-detection
- **Excel Files**: Support for .xlsx and .xls formats
- **JSON Files**: Handle both array and object-based JSON
- **SQL Support**: Built-in SQL editor for advanced queries (DuckDB integration)

### 🛠️ Developer-Friendly Features
- **SQL Editor**: Write and execute SQL queries with Monaco Editor (VS Code's editor)
- **Code Export**: Export dashboards as JSON for version control
- **Type Safety**: Built with TypeScript for better DX
- **Hot Module Replacement**: Fast development with Vite
- **Extensible**: Clean architecture for easy customization

### 🚀 Cross-Platform
- **Windows**: NSIS installer and portable executable
- **macOS**: DMG and ZIP distributions
- **Linux**: AppImage, DEB, RPM, and Snap packages

## 📥 Installation

### Build from Source

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Package for distribution
npm run package           # Current platform
npm run package:win       # Windows
npm run package:mac       # macOS
npm run package:linux     # Linux
```

## 📖 Documentation

- **[USAGE.md](USAGE.md)** - Complete user guide with examples
- **[DEVELOPER.md](DEVELOPER.md)** - Development guide and API reference
- **[CONTRIBUTING.md](#contributing)** - How to contribute

## 🎯 Quick Start

### 1. Add Data Source
- Click **"Add Data Source"** in the sidebar
- Select a CSV, Excel, or JSON file
- Your data will be automatically parsed and displayed

### 2. Create Charts
- Switch to the **"Charts"** tab in the sidebar
- Click on any chart type (Bar, Line, Pie, etc.)
- A new chart will be added to your dashboard

### 3. Customize
- Click the **settings icon** on any chart to configure X/Y axes
- **Drag** charts to reposition them
- **Resize** charts by dragging corners
- Change chart titles by clicking the edit icon

### 4. Use SQL Editor
- Click the **"SQL"** button in the top bar
- Write SQL queries to transform your data
- Execute with **Ctrl+Enter** or the Run button

### 5. Export
- Click **"Export"** to save your dashboard as JSON
- Share dashboards with teammates
- Version control your analytics!

## 🏗️ Architecture

```
dataforge/
├── electron/           # Electron main and preload processes
│   ├── main.ts        # Main process (window management, IPC)
│   └── preload.ts     # Preload script (secure API exposure)
├── src/
│   ├── components/    # React components
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── Chart.tsx
│   │   ├── DashboardCanvas.tsx
│   │   └── SQLEditor.tsx
│   ├── store/         # Zustand state management
│   │   └── useStore.ts
│   ├── utils/         # Utility functions
│   │   └── dataLoader.ts
│   ├── types/         # TypeScript definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # React entry point
├── public/            # Static assets
└── dist/              # Built application
```

## 🔧 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Desktop Framework**: Electron
- **State Management**: Zustand
- **Charts**: Apache ECharts
- **Code Editor**: Monaco Editor
- **Styling**: Tailwind CSS
- **Data Processing**: PapaParse, SheetJS
- **SQL Engine**: DuckDB WASM (planned)
- **Layout**: react-grid-layout
- **Drag & Drop**: @dnd-kit

## 🎨 Customization

### Custom Themes

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  'brutal-yellow': '#FFD700',
  'brutal-pink': '#FF69B4',
  'brutal-blue': '#00BFFF',
  // Add your own colors!
}
```

### Custom Chart Types

Add new chart types in `src/components/Chart.tsx`:

```typescript
case 'custom':
  return {
    // Your ECharts configuration
  }
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for any purpose!

## 🙏 Acknowledgments

- **Apache ECharts** for amazing chart library
- **Electron** for cross-platform desktop framework
- **Tailwind CSS** for utility-first styling
- **Monaco Editor** for VS Code editor integration
- **Space Grotesk** & **JetBrains Mono** fonts

---

**Built with ❤️ for developers who hate ugly dashboards**
