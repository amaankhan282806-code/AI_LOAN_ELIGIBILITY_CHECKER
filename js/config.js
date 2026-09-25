/**
 * AI Loan Eligibility Checker - Central Application Configuration
 * 
 * IMPORTANT:
 * - Do NOT place any secret API keys (such as Claude API keys) in this frontend file.
 * - GOOGLE_APPS_SCRIPT_URL acts as the secure serverless gateway for Google Sheets logging
 *   and Claude AI server-side proxying.
 */

const APP_CONFIG = {
  // Google Apps Script Web App Deployment URL (Placeholder - will be inserted upon deployment)
  GOOGLE_APPS_SCRIPT_URL: "",

  // Feature Flag to enable AI-powered financial advisory via Google Apps Script server-side proxy
  AI_ENABLED: false
};
