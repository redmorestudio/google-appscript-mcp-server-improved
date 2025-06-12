# Getting Started

## Prerequisites

1. **Google Cloud Project** with:
   - Google Apps Script API enabled
   - OAuth 2.0 credentials (Web application type)
   - Authorized redirect URI: `http://localhost:3001/oauth/callback`

2. **Google Apps Script** with:
   - GCP project number configured in settings
   - Deployed as "API Executable"
   - Shared with your OAuth account

## Installation Steps

1. **Clone and install**:
   ```bash
   git clone https://github.com/redmorestudio/google-appscript-mcp-server-improved.git
   cd google-appscript-mcp-server-improved
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your OAuth credentials
   ```

3. **Authenticate**:
   ```bash
   npm run setup-oauth
   ```

4. **Configure Claude Desktop**:
   Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "google-apps-script": {
         "command": "node",
         "args": ["/absolute/path/to/mcpServer.js"],
         "env": {
           "LOG_LEVEL": "error"
         }
       }
     }
   }
   ```

5. **Restart Claude Desktop**

## Verification

Test in Claude:
```
Use script_projects_get with scriptId "your-script-id"
```

Expected response: Script metadata including title, creator, etc.

## Common Issues

### "Requested entity was not found"
- Verify GCP project number in Apps Script settings
- Ensure script is deployed as API Executable
- Check OAuth account has access to script

### "Invalid scope"
- Clear tokens: `rm -rf ~/.apps-script-mcp/tokens/`
- Re-run: `npm run setup-oauth`

### JSON Parse Errors
- Ensure `LOG_LEVEL=error` in Claude config
- Update to this improved version