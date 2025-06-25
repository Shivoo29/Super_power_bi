# Power BI Setup Instructions

This guide will help you set up the Power BI side of the data automation pipeline.

## Prerequisites

- Power BI Pro or Premium license
- Admin access to a Power BI workspace
- Azure Active Directory access (for service principal setup)

## Step 1: Create or Identify Your Workspace

1. Log in to [Power BI Service](https://app.powerbi.com)
2. Create a new workspace or use an existing one
3. Note the workspace ID from the URL: `https://app.powerbi.com/groups/{workspace-id}/...`

## Step 2: Create a Dataset

### Option A: Upload CSV File Method
1. Upload your initial `cleaned_data.csv` file to Power BI
2. Create a dataset from this file
3. Note the dataset ID from the dataset settings

### Option B: Connect to Data Source
1. Create a new dataset connected to your data source (SharePoint, OneDrive, etc.)
2. Configure the data source to point to where your CSV file will be stored
3. Set up scheduled refresh if needed

## Step 3: Get Dataset ID

1. Go to your workspace in Power BI Service
2. Click on the dataset settings (gear icon)
3. The dataset ID will be in the URL: `https://app.powerbi.com/groups/{workspace-id}/datasets/{dataset-id}/...`

## Step 4: Authentication Setup

### Option A: Service Principal (Recommended for Production)

1. **Register an Application in Azure AD:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to Azure Active Directory > App registrations
   - Click "New registration"
   - Name your app (e.g., "PowerBI Data Pipeline")
   - Register the application

2. **Configure API Permissions:**
   - In your app registration, go to "API permissions"
   - Add permission > Power BI Service
   - Add these delegated permissions:
     - `Dataset.ReadWrite.All`
     - `Workspace.Read.All`
   - Grant admin consent

3. **Create Client Secret:**
   - Go to "Certificates & secrets"
   - Create a new client secret
   - Copy the secret value (you won't see it again!)

4. **Add Service Principal to Power BI:**
   - In Power BI Admin Portal, enable service principal access
   - Add the service principal to your workspace with Admin or Member permissions

5. **Get Access Token:**
   ```python
   # Example code to get access token
   import requests
   
   def get_access_token(client_id, client_secret, tenant_id):
       url = f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"
       data = {
           'grant_type': 'client_credentials',
           'client_id': client_id,
           'client_secret': client_secret,
           'scope': 'https://analysis.windows.net/powerbi/api/.default'
       }
       response = requests.post(url, data=data)
       return response.json()['access_token']
   \`\`\`

### Option B: User Token (For Development/Testing)

1. Use the [Power BI REST API documentation](https://docs.microsoft.com/en-us/rest/api/power-bi/)
2. Get a user access token using OAuth 2.0 flow
3. This method requires user interaction and tokens expire frequently

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your values:
   \`\`\`env
   POWERBI_WORKSPACE_ID=12345678-1234-1234-1234-123456789012
   POWERBI_DATASET_ID=87654321-4321-4321-4321-210987654321
   POWERBI_ACCESS_TOKEN=your-access-token-here
   \`\`\`

## Step 6: Test the Connection

Run this test script to verify your setup:

```python
from refresh import PowerBIRefresher
from config import Config

config = Config()
refresher = PowerBIRefresher(config)

# Test getting refresh status
status = refresher.get_refresh_status()
if status:
    print("✅ Power BI connection successful!")
    print(f"Latest refresh status: {status}")
else:
    print("❌ Power BI connection failed. Check your configuration.")
