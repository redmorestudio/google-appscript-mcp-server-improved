# IMPORTANT: OAuth Scope Fix

The main fix in `lib/oauth-helper.js` is the OAuth scopes. The original code had:

```javascript
const SCOPES = [
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/script.projects.readonly',
  'https://www.googleapis.com/auth/script.deployments',
  'https://www.googleapis.com/auth/script.deployments.readonly',
  'https://www.googleapis.com/auth/script.metrics',
  'https://www.googleapis.com/auth/script.processes',
  'https://www.googleapis.com/auth/script.webapp.deploy',
  'https://www.googleapis.com/auth/script.external_request'
];
```

This has been updated to include the scopes your script actually needs:

```javascript
const SCOPES = [
  // Google Apps Script API - Full access
  'https://www.googleapis.com/auth/script.projects',
  'https://www.googleapis.com/auth/script.projects.readonly',
  'https://www.googleapis.com/auth/script.deployments',
  'https://www.googleapis.com/auth/script.deployments.readonly',
  'https://www.googleapis.com/auth/script.metrics',
  'https://www.googleapis.com/auth/script.processes',
  'https://www.googleapis.com/auth/script.webapp.deploy',
  // CRITICAL: Add scope for executing scripts
  'https://www.googleapis.com/auth/script.external_request',
  // Add the scopes that the SCRIPT requires (from appsscript.json)
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/gmail.send'
];
```

Also added login hint:

```javascript
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
  login_hint: 'seth@redmore.studio'  // Force specific account
});
```

## Other Key Files to Fix

1. **lib/tokenManager.js** - Comment out emoji console.logs
2. **tools/google-app-script-api/apps-script-api/script-scripts-run.js** - Fix parameter handling

You'll need to clone the original repository and apply these fixes to get the full working version.