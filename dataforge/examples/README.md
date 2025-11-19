# DataForge Examples

This folder contains sample data files and example dashboards to help you get started with DataForge.

## Sample Data Files

### 1. sample-sales.csv
**Sales data by region and product**

**Columns:**
- `region` - Geographic region (North, South, East, West)
- `product` - Product name (Product A, B, C)
- `sales` - Revenue in dollars
- `quantity` - Units sold
- `date` - Transaction date

**Use cases:**
- Sales by region (bar chart)
- Sales trends over time (line chart)
- Regional market share (pie chart)
- Product performance comparison (bar chart)

**How to use:**
1. Open DataForge
2. Click "Add Data Source"
3. Select `sample-sales.csv`
4. Create charts from the Charts tab

### 2. sample-metrics.json
**Marketing campaign performance metrics**

**Fields:**
- `campaign` - Campaign name
- `impressions` - Ad impressions
- `clicks` - Click-through count
- `conversions` - Conversion count
- `spend` - Marketing spend ($)
- `revenue` - Generated revenue ($)

**Use cases:**
- ROI by campaign (bar chart)
- Spend vs Revenue (scatter plot)
- Conversion funnel (bar chart)
- Performance comparison (table view)

**How to use:**
1. Open DataForge
2. Click "Add Data Source"
3. Select `sample-metrics.json`
4. Create visualizations

## Example Dashboards

### Sales Dashboard
**Recommended charts:**
1. **Bar Chart**: Sales by Region
   - X-Axis: `region`
   - Y-Axis: `sales`

2. **Line Chart**: Sales Trends
   - X-Axis: `date`
   - Y-Axis: `sales`

3. **Pie Chart**: Market Share by Region
   - X-Axis: `region`
   - Y-Axis: `sales`

4. **Table**: Detailed Sales Data
   - All columns visible

### Marketing Dashboard
**Recommended charts:**
1. **Scatter Plot**: Spend vs Revenue
   - X-Axis: `spend`
   - Y-Axis: `revenue`

2. **Bar Chart**: Conversions by Campaign
   - X-Axis: `campaign`
   - Y-Axis: `conversions`

3. **Bar Chart**: ROI Comparison
   - X-Axis: `campaign`
   - Y-Axis: Calculate ROI = (revenue - spend) / spend

4. **Table**: Campaign Performance
   - All metrics

## Creating Your Own Data

### CSV Format
```csv
column1,column2,column3
value1,value2,value3
value4,value5,value6
```

**Tips:**
- First row should be column headers
- Use consistent data types per column
- Avoid special characters in headers
- Use ISO date format (YYYY-MM-DD)

### JSON Format
```json
[
  {
    "name": "Item 1",
    "value": 100,
    "category": "A"
  },
  {
    "name": "Item 2",
    "value": 200,
    "category": "B"
  }
]
```

**Tips:**
- Use array format for table data
- Keep field names consistent
- Use camelCase for field names
- Numeric values should be numbers, not strings

### Excel Format
- Use first row for column headers
- Keep data in first sheet
- Avoid merged cells
- Use consistent formatting

## Quick Start Tutorial

### Step 1: Load Sales Data
1. Launch DataForge
2. Click "Add Data Source"
3. Select `sample-sales.csv`
4. You'll see: "24 rows • 5 columns"

### Step 2: Create Bar Chart
1. Go to "Charts" tab
2. Click "Bar" chart
3. Chart appears on canvas
4. Click ⚙️ settings icon
5. Set X-Axis: `region`
6. Set Y-Axis: `sales`

### Step 3: Add Line Chart
1. Click "Line" chart
2. Set X-Axis: `date`
3. Set Y-Axis: `sales`
4. See sales trends over time

### Step 4: Organize Dashboard
1. Drag charts to arrange
2. Resize by dragging corners
3. Click "Export" to save

## Advanced Examples

### Multi-Source Dashboard
1. Load `sample-sales.csv`
2. Load `sample-metrics.json`
3. Create charts from each source
4. Compare sales and marketing performance

### Calculated Fields (Coming Soon)
Future feature: SQL transformations
```sql
SELECT
  region,
  SUM(sales) as total_sales,
  AVG(sales) as avg_sales,
  COUNT(*) as transaction_count
FROM sales_data
GROUP BY region
```

## Troubleshooting

**Problem:** Chart is empty
**Solution:** Check that X-Axis and Y-Axis are configured properly

**Problem:** Data doesn't load
**Solution:** Ensure file format matches (CSV header row, valid JSON)

**Problem:** Can't find example files
**Solution:** Files are in `dataforge/examples/` folder

## Next Steps

- Try creating your own data files
- Experiment with different chart types
- Build multi-chart dashboards
- Share your dashboards with teammates
- Read [USAGE.md](../USAGE.md) for detailed features
- Check [DEVELOPER.md](../DEVELOPER.md) for customization

---

**Happy visualizing! 📊**
