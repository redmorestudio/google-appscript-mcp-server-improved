#!/usr/bin/env node

/**
 * Debug script for testing script.run functionality
 */

import { getAuthHeaders } from './lib/oauth-helper.js';

async function debugScriptRun() {
  const scriptId = process.argv[2];
  const functionName = process.argv[3] || 'testScriptRun';
  
  if (!scriptId) {
    console.error('Usage: node debug-script-run.js <scriptId> [functionName]');
    process.exit(1);
  }

  console.log('🔍 Debugging script.run for:');
  console.log(`   Script ID: ${scriptId}`);
  console.log(`   Function: ${functionName}`);
  console.log('');

  try {
    // Get auth headers
    console.log('1️⃣ Getting authentication headers...');
    const headers = await getAuthHeaders();
    console.log('✅ Auth headers obtained');
    console.log(`   Authorization: Bearer ${headers.Authorization.substring(0, 50)}...`);
    console.log('');

    // Prepare request
    const url = `https://script.googleapis.com/v1/scripts/${scriptId}:run`;
    const body = {
      function: functionName,
      parameters: [],
      devMode: false
    };

    console.log('2️⃣ Making API request...');
    console.log(`   URL: ${url}`);
    console.log(`   Body: ${JSON.stringify(body, null, 2)}`);
    console.log('');

    // Make request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log('3️⃣ Response received:');
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Headers: ${JSON.stringify(Object.fromEntries(response.headers), null, 2)}`);
    console.log('');

    const responseData = await response.json();
    console.log('4️⃣ Response body:');
    console.log(JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      console.log('\n❌ API call failed!');
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Verify the script ID is correct');
      console.log('2. Check that the script has a GCP project configured in Settings');
      console.log('3. Ensure the GCP project has Apps Script API enabled');
      console.log('4. Verify the script is deployed as "API Executable"');
      console.log('5. Check that the OAuth account has access to the script');
      console.log('6. Try creating a new deployment after GCP configuration');
    } else {
      console.log('\n✅ Success! Script executed correctly.');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugScriptRun();