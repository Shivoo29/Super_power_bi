# DataForge Usage Guide

Complete guide to using DataForge for data visualization and analysis.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Loading Data](#loading-data)
3. [Creating Visualizations](#creating-visualizations)
4. [Dashboard Management](#dashboard-management)
5. [SQL Editor](#sql-editor)
6. [Export & Share](#export--share)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Tips & Tricks](#tips--tricks)
9. [Common Use Cases](#common-use-cases)

## Quick Start

### 1. Launch the App

```bash
cd dataforge
npm install
npm run dev
```

### 2. Add Your First Data Source

1. Click **"Add Data Source"** in the left sidebar
2. Select a CSV, Excel, or JSON file
3. Your data is automatically parsed and ready to use!

### 3. Create Your First Chart

1. Switch to the **"Charts"** tab in the sidebar
2. Click on any chart type (e.g., Bar Chart)
3. A chart appears on the dashboard
4. Click the ⚙️ icon to configure axes

### 4. Customize

- **Drag** charts to reposition
- **Resize** by dragging corners
- **Delete** with the 🗑️ icon
- **Configure** axes with the ⚙️ icon

## Loading Data

### Supported Formats

#### CSV Files
```csv
name,sales,region
Product A,1500,North
Product B,2300,South
Product C,1800,East
```

**Loading CSV:**
1. Click "Add Data Source"
2. Select your `.csv` file
3. DataForge auto-detects headers and data types

#### Excel Files (.xlsx, .xls)
- Supports first sheet by default
- Auto-detects column names from first row
- Handles numeric and text data

**Loading Excel:**
1. Click "Add Data Source"
2. Select your `.xlsx` or `.xls` file
3. First sheet is imported automatically

#### JSON Files

**Array format:**
```json
[
  { "name": "Product A", "sales": 1500, "region": "North" },
  { "name": "Product B", "sales": 2300, "region": "South" }
]
```

**Object format (with data key):**
```json
{
  "data": [
    { "name": "Product A", "sales": 1500 }
  ]
}
```

**Loading JSON:**
1. Click "Add Data Source"
2. Select your `.json` file
3. DataForge handles both array and object formats

### Data Source Management

**View Data Sources:**
- Open sidebar → "Data" tab
- See all loaded data sources
- View row count, column count, and column names

**Remove Data Source:**
- Currently not available in UI
- Will be added in future updates

## Creating Visualizations

### Chart Types

#### 1. Bar Chart
**Best for:** Comparing categories

**Example:**
- X-Axis: Region (North, South, East, West)
- Y-Axis: Sales ($)

**Configuration:**
1. Create bar chart
2. Click ⚙️ settings
3. Set X-Axis: `region`
4. Set Y-Axis: `sales`

#### 2. Line Chart
**Best for:** Trends over time

**Example:**
- X-Axis: Date
- Y-Axis: Revenue

**Configuration:**
1. Create line chart
2. Set X-Axis to your time column
3. Set Y-Axis to your value column

#### 3. Pie Chart
**Best for:** Part-to-whole relationships

**Example:**
- Categories: Product types
- Values: Market share %

**Configuration:**
1. Create pie chart
2. X-Axis: Category names
3. Y-Axis: Values

#### 4. Scatter Plot
**Best for:** Relationships between two variables

**Example:**
- X-Axis: Marketing spend
- Y-Axis: Sales
- Shows correlation

#### 5. Area Chart
**Best for:** Cumulative trends

**Example:**
- X-Axis: Month
- Y-Axis: Cumulative revenue

#### 6. Table View
**Best for:** Detailed data inspection

Shows all rows and columns in a searchable table.

### Chart Configuration

**Accessing Settings:**
1. Click ⚙️ icon on any chart
2. Settings panel appears

**Available Options:**
- **X-Axis:** Choose column for horizontal axis
- **Y-Axis:** Choose column for vertical axis
- **Color:** Change chart color (coming soon)

**Tips:**
- Numeric columns work best for Y-axis
- Text/category columns for X-axis in bar/pie charts
- Date columns for X-axis in line/area charts

## Dashboard Management

### Creating Dashboards

1. Click **"New"** button in top bar
2. New dashboard is created
3. Switch between dashboards using dropdown

### Organizing Charts

**Drag & Drop:**
- Click and hold chart header
- Drag to new position
- Drop to place

**Resize:**
- Hover over chart corners
- Drag to resize

**Delete:**
- Click 🗑️ icon on chart

### Multiple Dashboards

**Use Cases:**
- Sales dashboard
- Marketing dashboard
- Executive summary
- Team-specific views

**Switching:**
- Use dropdown in top bar
- Select dashboard name

### Dashboard Names

**Rename Dashboard:**
1. Currently shows as "Dashboard 1", "Dashboard 2", etc.
2. Renaming feature coming in future update

## SQL Editor

### Opening SQL Editor

Click the **"SQL"** button in the top bar.

### SQL Capabilities (Planned)

**Note:** SQL execution is currently in development using DuckDB WASM.

**Future Features:**
- Write SQL queries
- Transform data on the fly
- Join multiple data sources
- Aggregate and filter
- Create calculated columns

**Example Queries:**
```sql
-- Aggregate sales by region
SELECT
  region,
  SUM(sales) as total_sales,
  AVG(sales) as avg_sales
FROM data
GROUP BY region
ORDER BY total_sales DESC;

-- Filter data
SELECT *
FROM data
WHERE sales > 2000
  AND region = 'North';

-- Join data sources
SELECT
  a.product,
  a.sales,
  b.cost
FROM sales_data a
JOIN cost_data b
  ON a.product = b.product;
```

### Editor Features

- **Monaco Editor:** Same editor as VS Code
- **Syntax Highlighting:** SQL keywords highlighted
- **Auto-complete:** (Coming soon)
- **Execute:** Press Run button or Ctrl+Enter

## Export & Share

### Export Dashboard

1. Click **"Export"** button in top bar
2. Save as JSON file
3. Share with teammates

### Export Format

```json
{
  "dashboard": {
    "id": "abc123",
    "name": "Sales Dashboard",
    "charts": [
      {
        "id": "chart1",
        "type": "bar",
        "title": "Sales by Region",
        "dataSourceId": "data1",
        "xAxis": "region",
        "yAxis": "sales",
        "position": { "x": 0, "y": 0, "w": 6, "h": 4 }
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  },
  "exportedAt": "2024-01-02T12:00:00.000Z"
}
```

### Import Dashboard (Coming Soon)

Future feature: Import dashboards from JSON.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + N` | New dashboard |
| `Ctrl/Cmd + S` | Save/export dashboard |
| `Ctrl/Cmd + Q` | Open SQL editor |
| `Delete` | Delete selected chart |
| `Esc` | Close modal/panel |

**Note:** Some shortcuts are planned features.

## Tips & Tricks

### Performance

**Large Datasets:**
- DataForge works best with <100K rows
- For larger datasets, use SQL to filter first
- Table view shows first 100 rows only

**Optimize Charts:**
- Use aggregated data for charts
- Avoid too many data points in scatter plots
- Use sampling for large time series

### Data Quality

**Before Loading:**
- Ensure CSV files have headers
- Check for missing values
- Verify number formats (use `.` for decimals)

**Clean Data:**
- Remove duplicate rows
- Handle null values
- Ensure consistent date formats

### Neo-Brutalism UI

**Design Philosophy:**
- Bold, high-contrast colors
- Thick borders (3-5px)
- Strong drop shadows
- No rounded corners
- Uppercase, bold text

**Customization:**
- Edit `tailwind.config.js` for colors
- Modify `src/index.css` for global styles
- Update component classes for local changes

## Common Use Cases

### 1. Sales Analysis

**Data:** CSV with sales, region, product, date

**Dashboard:**
1. Bar chart: Sales by Region
2. Line chart: Sales over Time
3. Pie chart: Market Share by Product
4. Table: Top 10 Sales

**Steps:**
1. Load sales CSV
2. Create bar chart (region vs sales)
3. Create line chart (date vs sales)
4. Create pie chart (product vs sales)
5. Create table view

### 2. Marketing Metrics

**Data:** Excel with campaign, clicks, conversions, spend

**Dashboard:**
1. Scatter plot: Spend vs Conversions
2. Bar chart: Clicks by Campaign
3. Area chart: Cumulative Conversions
4. Table: ROI by Campaign

**SQL (future):**
```sql
SELECT
  campaign,
  clicks,
  conversions,
  spend,
  conversions / NULLIF(spend, 0) as roi
FROM marketing_data
ORDER BY roi DESC;
```

### 3. Product Analytics

**Data:** JSON with product, views, purchases, revenue

**Dashboard:**
1. Bar chart: Revenue by Product
2. Scatter plot: Views vs Purchases
3. Pie chart: Revenue Distribution
4. Line chart: Daily Active Users

### 4. Financial Reporting

**Data:** CSV with date, revenue, expenses, profit

**Dashboard:**
1. Line chart: Revenue & Expenses over Time
2. Area chart: Cumulative Profit
3. Bar chart: Monthly Breakdown
4. Table: Financial Summary

**SQL (future):**
```sql
SELECT
  DATE_TRUNC('month', date) as month,
  SUM(revenue) as total_revenue,
  SUM(expenses) as total_expenses,
  SUM(profit) as total_profit
FROM financials
GROUP BY month
ORDER BY month;
```

### 5. A/B Testing Results

**Data:** CSV with variant, users, conversions, revenue

**Dashboard:**
1. Bar chart: Conversion Rate by Variant
2. Bar chart: Revenue by Variant
3. Table: Detailed Metrics

**Analysis:**
- Compare A vs B variants
- Calculate statistical significance
- Determine winning variant

## Troubleshooting

### Data Won't Load

**Check:**
- File format is CSV, Excel, or JSON
- CSV has headers in first row
- Excel has data in first sheet
- JSON is array or object with array

**Solution:**
- Verify file isn't corrupted
- Check for special characters
- Ensure proper encoding (UTF-8)

### Chart Appears Empty

**Check:**
- Data source has rows
- X-axis and Y-axis are configured
- Columns exist in data

**Solution:**
- Click ⚙️ and reconfigure axes
- Verify column names match
- Check data types

### App Crashes

**Solution:**
- Restart the app
- Clear `dist/` and `dist-electron/` folders
- Run `npm run build` again
- Check console for errors (Ctrl+Shift+I)

## Getting Help

### Resources

- **GitHub Issues:** Report bugs and request features
- **Documentation:** Read DEVELOPER.md for technical details
- **Examples:** See sample dashboards in `examples/` (coming soon)

### Community

- Star the repository on GitHub
- Share your dashboards
- Contribute improvements

---

**Start visualizing your data today! 📊**
