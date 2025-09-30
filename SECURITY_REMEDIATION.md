# Security Remediation: Leaked Google API Key

## Issue Summary
A Google Firebase API Key was publicly exposed in the repository in the file `src/services/firebase.js`.

**Leaked Credential:**
- API Key: `AIzaSyBlc_Rmm3CPxl7*********************` (redacted for security)

## Remediation Steps (IMPORTANT - ACTION REQUIRED)

### 1. ✅ Code Changes (Completed)
The following changes have been implemented in this PR:
- Removed hardcoded Firebase credentials from source code
- Updated Firebase configuration to use environment variables
- Added `.env` to `.gitignore` to prevent future leaks
- Created `.env.example` as a template for configuration

### 2. 🔴 ROTATE/REVOKE THE API KEY (Action Required by Repository Owner)

**CRITICAL**: Even though the key has been removed from the code, it remains in the Git history and may have been compromised. You MUST take these actions:

#### Steps to Rotate Firebase API Key:

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Select your project: `comercio-eletronico-733e9`

2. **Navigate to API Credentials:**
   - Go to: APIs & Services → Credentials
   - Or visit directly: https://console.cloud.google.com/apis/credentials

3. **Find and Revoke the Leaked Key:**
   - Look for the API key starting with: `AIzaSyBlc_Rmm3CPxl7...`
   - Click on the key name to view details
   - Click "DELETE" or "Regenerate Key" button
   - Confirm the deletion

4. **Create a New API Key:**
   - Click "Create Credentials" → "API Key"
   - Restrict the key to specific APIs (Firebase services)
   - Add application restrictions (HTTP referrers or Android/iOS app restrictions)
   - Save the new key

5. **Configure the New Key:**
   - Copy the new API key
   - Create a `.env` file in the project root (NOT in the repository)
   - Add your Firebase credentials to the `.env` file (see `.env.example` for format)

### 3. 🔍 Check Security Logs

Review your Firebase/Google Cloud logs for any unauthorized access:

1. **Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select project: `comercio-eletronico-733e9`
   - Check: Authentication → Users (look for unexpected users)
   - Check: Firestore Database → Usage (look for unusual activity)

2. **Google Cloud Console Logs:**
   - Visit: https://console.cloud.google.com/logs
   - Filter by the leaked API key
   - Look for suspicious API calls, especially from unknown IP addresses

### 4. ⚙️ Set Up Environment Variables

After rotating the key, configure your local development environment:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your NEW Firebase credentials in `.env`:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your-new-api-key-here
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=comercio-eletronico-733e9.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=comercio-eletronico-733e9
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=comercio-eletronico-733e9.firebasestorage.app
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=952477633637
   EXPO_PUBLIC_FIREBASE_APP_ID=1:952477633637:web:fdf93e1ea1d8f5c23a4a8c
   ```

3. **IMPORTANT**: Never commit the `.env` file

### 5. ✅ Additional Security Measures

To prevent future leaks:

1. **Enable Firebase App Check:**
   - Protects your Firebase resources from abuse
   - Visit: https://console.firebase.google.com/ → App Check

2. **Set up API Key Restrictions:**
   - Restrict by IP address (for server-side apps)
   - Restrict by HTTP referrer (for web apps)
   - Restrict by Android/iOS app (for mobile apps)

3. **Enable Security Rules:**
   - Review your Firestore security rules
   - Ensure they don't allow unauthorized access

4. **Set up Monitoring:**
   - Enable Firebase monitoring and alerts
   - Set up budget alerts in Google Cloud Console

### 6. ✅ Close the Security Alert

After completing steps 1-5:
1. Verify the old API key has been revoked
2. Verify no suspicious activity in logs
3. Verify the application works with the new credentials
4. Mark this security alert as "revoked" in your security dashboard

## Prevention

To avoid similar issues in the future:

1. **Never commit sensitive data** to version control
2. **Always use environment variables** for credentials
3. **Use `.env` files** (and add them to `.gitignore`)
4. **Review code before committing** (look for API keys, tokens, passwords)
5. **Use pre-commit hooks** to scan for secrets (e.g., git-secrets)
6. **Enable secret scanning** in GitHub repository settings

## Resources

- [Firebase Security Best Practices](https://firebase.google.com/docs/projects/api-keys)
- [Google Cloud API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)

## Questions?

If you need help with any of these steps, refer to the documentation or contact your security team.
