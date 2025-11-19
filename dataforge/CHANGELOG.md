# Changelog

All notable changes to DataForge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-19

### Added

#### Core Features
- **Cross-platform desktop application** using Electron
- **React 19** + **TypeScript** for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Neo-brutalism design system** with custom Tailwind configuration

#### Data Sources
- **CSV file support** with PapaParse
- **Excel file support** (.xlsx, .xls) with SheetJS
- **JSON file support** with flexible format handling
- Automatic data type detection
- Column name extraction
- Data preview in sidebar

#### Visualizations
- **Bar charts** with configurable axes
- **Line charts** for trend analysis
- **Pie charts** for part-to-whole relationships
- **Scatter plots** for correlation analysis
- **Area charts** for cumulative trends
- **Table view** for detailed data inspection
- **Interactive charts** powered by Apache ECharts
- **Drag-and-drop** chart positioning with react-grid-layout
- **Resizable charts** for custom layouts
- **Chart configuration** (X-axis, Y-axis selection)

#### Dashboard Management
- **Multiple dashboards** support
- **Dashboard switching** via dropdown
- **Export dashboards** as JSON
- Auto-save dashboard layouts
- Real-time chart updates

#### Developer Features
- **SQL Editor** with Monaco Editor (VS Code editor)
- **TypeScript** for full type safety
- **Component-based architecture** for easy extension
- **Zustand state management** for predictable data flow
- **Hot Module Replacement** for fast development

#### UI/UX
- **Neo-brutalism design** with bold colors and thick borders
- **Custom fonts:** Space Grotesk (UI) and JetBrains Mono (code)
- **Responsive layout** that adapts to window size
- **Collapsible sidebar** for more screen space
- **Keyboard shortcuts** (planned)
- **Dark mode** (planned)

#### Build & Distribution
- **Windows:** NSIS installer and portable .exe
- **macOS:** DMG and ZIP packages
- **Linux:** AppImage, DEB, RPM, and Snap
- Automated build pipeline with electron-builder

#### Documentation
- Comprehensive README with features and quick start
- DEVELOPER.md with architecture and contribution guidelines
- USAGE.md with examples and common use cases
- CHANGELOG.md for version tracking

### Technical Details

#### Dependencies
- React 19.2.0
- Electron 39.2.2
- TypeScript 5.9.3
- Vite 7.2.2
- Tailwind CSS 3.4.18
- ECharts 6.0.0
- Zustand 5.0.8
- Monaco Editor 4.7.0
- PapaParse 5.5.3
- SheetJS (xlsx) 0.18.5

#### Architecture
- **Main Process:** Window management, IPC, file operations
- **Renderer Process:** React application with full UI
- **Preload Script:** Secure bridge between main and renderer
- **State Management:** Centralized Zustand store
- **Component Structure:** Modular, reusable React components

### Known Issues
- SQL execution not yet implemented (DuckDB WASM integration in progress)
- Dashboard renaming not available in UI
- Data source removal not available in UI
- Large datasets (>100K rows) may cause performance issues
- Chart color customization only partially implemented

### Future Roadmap

#### v1.1.0 (Planned)
- Full SQL execution with DuckDB WASM
- Dashboard import functionality
- Chart templates and themes
- Data source removal in UI
- Dashboard renaming in UI

#### v1.2.0 (Planned)
- Real-time data refresh
- Database connectors (PostgreSQL, MySQL, MongoDB)
- API data sources
- Advanced chart customization
- Keyboard shortcuts

#### v1.3.0 (Planned)
- Collaboration features
- Cloud sync
- Shared dashboards
- User authentication
- Team workspaces

#### v2.0.0 (Planned)
- Plugin system for extensions
- Custom data transformations
- Advanced analytics and ML integration
- Mobile companion app
- Custom themes and branding

---

## Version History

### [1.0.0] - 2024-11-19
- Initial release

---

## Links

- [GitHub Repository](https://github.com/Shivoo29/Super_power_bi)
- [Issue Tracker](https://github.com/Shivoo29/Super_power_bi/issues)
- [Releases](https://github.com/Shivoo29/Super_power_bi/releases)
