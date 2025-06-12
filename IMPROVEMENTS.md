# Improvements to Google Apps Script MCP Server

This fork includes several important improvements to make the MCP server more reliable and functional.

## Key Improvements

### 1. Fixed OAuth Scopes (lib/oauth-helper.js)
- **Added missing scopes** required for script execution:
  - `https://www.googleapis.com/auth/spreadsheets`
  - `https://www.googleapis.com/auth/drive`
  - `https://www.googleapis.com/auth/gmail.send`
- **Removed invalid scope**: `https://www.googleapis.com/auth/script.run` (doesn't exist)
- **Added login hint**: Automatically suggests the correct Google account

### 2. Enhanced Logging (lib/tokenManager.js)
- Commented out emoji console.log statements that were polluting JSON output
- Fixed JSON parsing errors at startup
- Added proper error handling

### 3. Improved Error Handling (tools/google-app-script-api/apps-script-api/script-scripts-run.js)
- Better error messages with detailed context
- Proper parameter handling for API calls
- Fixed request body structure

## Required Setup

**IMPORTANT**: For the script execution to work, you must configure a Google Cloud Platform project in your Apps Script:

1. Open your script: https://script.google.com
2. Go to Project Settings (gear icon)
3. Under "Google Cloud Platform (GCP) Project", click "Change project"
4. Enter your GCP project number
5. Save and create a new deployment

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file with:
```
GOOGLE_APP_SCRIPT_API_CLIENT_ID=your_client_id
GOOGLE_APP_SCRIPT_API_CLIENT_SECRET=your_client_secret
LOG_LEVEL=info
NODE_ENV=production
PORT=3001
```

## Usage

1. Set up OAuth: `node oauth-setup.js`
2. Configure in Claude Desktop's config file
3. Restart Claude Desktop

## Troubleshooting

If you get "Requested entity was not found" errors:
- Ensure GCP project is configured in Apps Script settings
- Verify the Apps Script API is enabled in your GCP project
- Check that OAuth scopes match what your script requires
- Make sure the script is deployed as "API Executable"

## Credits

Original repository by [mohalmah](https://github.com/mohalmah/google-appscript-mcp-server)
Improvements by Seth Redmore