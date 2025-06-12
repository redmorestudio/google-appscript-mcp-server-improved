# Google Apps Script MCP Server (Improved)

An enhanced Model Context Protocol (MCP) server for Google Apps Script with fixes for common issues.

## What's Fixed in This Version

1. ✅ Correct OAuth scopes for script execution
2. ✅ Clean JSON output (no emoji pollution)
3. ✅ Better error handling and debugging
4. ✅ Support for scripts that use Sheets, Drive, and Gmail

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OAuth Credentials
Create `.env` file:
```bash
GOOGLE_APP_SCRIPT_API_CLIENT_ID=your_client_id
GOOGLE_APP_SCRIPT_API_CLIENT_SECRET=your_client_secret
```

### 3. Authenticate
```bash
node oauth-setup.js
```

### 4. Configure Claude Desktop
Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "google-apps-script": {
    "command": "node",
    "args": ["/path/to/gas-mcp-improved/mcpServer.js"],
    "env": {
      "LOG_LEVEL": "error"
    }
  }
}
```

### 5. Configure Your Apps Script
**CRITICAL**: Your Google Apps Script must have a GCP project configured:
1. Open script at https://script.google.com
2. Click Settings (gear icon)
3. Under "Google Cloud Platform (GCP) Project", add your project number
4. Save and deploy as "API Executable"

## Available Functions

- `script_projects_get` - Get script metadata
- `script_projects_get_content` - Get script code
- `script_projects_versions_create` - Create new version
- `script_projects_deployments_create` - Deploy script
- `script_run` - Execute functions in your script
- `update_script_content` - Update script code

## Example Usage

```javascript
// Execute a function in your script
await script_run({
  scriptId: "your_script_id",
  functionName: "myFunction",
  parameters: [param1, param2]
});

// Get script content
await script_projects_get_content({
  scriptId: "your_script_id"
});
```

## Troubleshooting

### "Requested entity was not found" Error
- Make sure GCP project is configured in script settings
- Verify Apps Script API is enabled in GCP
- Check script is deployed as "API Executable"

### "Invalid scope" Error
- Re-run `node oauth-setup.js` to get new tokens with correct scopes
- Clear old tokens: `rm -rf ~/.apps-script-mcp/tokens/`

### JSON Parse Errors
- This version fixes emoji logging issues
- Set `LOG_LEVEL=error` in Claude config

## Changes from Original

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for detailed list of improvements.

## License

MIT (same as original)