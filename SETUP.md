# How to Get the Full Source Code

This repository contains the documentation and key improvements for the Google Apps Script MCP Server. To get the full working version:

## Option 1: Quick Setup (Recommended)

1. **Clone the original repository**:
   ```bash
   git clone https://github.com/mohalmah/google-appscript-mcp-server.git
   cd google-appscript-mcp-server
   ```

2. **Apply the improvements**:
   
   **Fix OAuth scopes in `lib/oauth-helper.js`**:
   - Find the `SCOPES` array (around line 13)
   - Add these scopes:
     ```javascript
     'https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive',
     'https://www.googleapis.com/auth/gmail.send'
     ```
   - Add login hint in `generateAuthUrl` (around line 220):
     ```javascript
     login_hint: 'your-email@domain.com'
     ```

   **Fix logging in `lib/tokenManager.js`**:
   - Comment out all `console.log` lines with emojis
   - Or replace them with proper logger calls

   **Fix Claude Desktop config**:
   - Add `"LOG_LEVEL": "error"` to env section

3. **Install and run**:
   ```bash
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   node oauth-setup.js
   ```

## Option 2: Use Our Fork (Coming Soon)

We're working on a complete fork with all improvements. Check back soon!

## Key Files to Modify

### 1. lib/oauth-helper.js
- Add missing OAuth scopes
- Add login hint for account selection

### 2. lib/tokenManager.js  
- Remove emoji console.logs that break JSON

### 3. .env
- Add your OAuth credentials

### 4. Claude Desktop Config
- Set LOG_LEVEL=error

## Required GCP Setup

Your Google Apps Script MUST have:
1. A GCP project number configured in Settings
2. Be deployed as "API Executable"
3. Be shared with your OAuth account

Without these, you'll get "Requested entity was not found" errors.

## Support

Having issues? Check:
- [IMPROVEMENTS.md](IMPROVEMENTS.md) for what we fixed
- [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for setup guide
- [debug-script-run.js](debug-script-run.js) for troubleshooting

## Credits

- Original: [mohalmah/google-appscript-mcp-server](https://github.com/mohalmah/google-appscript-mcp-server)
- Improvements: This repository