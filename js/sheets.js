/**
 * AI Loan Eligibility Checker - Google Sheets Service
 * 
 * Handles sending eligibility submission records to the Google Apps Script Web App.
 * Saving records is a secondary background operation and will never disrupt
 * or crash the core client-side eligibility checker.
 */

/**
 * Saves an applicant eligibility evaluation record to Google Sheets via Apps Script.
 * 
 * @param {Object} data
 * @param {string} data.name - Applicant full name
 * @param {number} data.salary - Monthly salary (INR)
 * @param {number} data.creditScore - Credit score (300-900)
 * @param {number} data.existingEmi - Existing monthly EMI obligations (INR)
 * @param {number} data.age - Applicant age (years)
 * @param {string} data.result - Approved or Rejected
 * @param {number} data.eligibleLoanAmount - Maximum eligible loan capacity (INR)
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function saveEligibilityRecord(data) {
  // 1. Verify if Apps Script endpoint is configured
  const endpoint = typeof APP_CONFIG !== 'undefined' && APP_CONFIG.GOOGLE_APPS_SCRIPT_URL
    ? APP_CONFIG.GOOGLE_APPS_SCRIPT_URL.trim()
    : '';

  if (!endpoint) {
    console.warn('[Sheets Service] Google Apps Script URL is not configured in js/config.js. Record saving skipped in development.');
    return {
      success: false,
      message: 'Record saving unavailable (endpoint not configured)'
    };
  }

  // 2. Prepare payload structure
  const payload = {
    type: 'eligibility',
    name: data.name || 'Applicant',
    salary: Number(data.salary) || 0,
    creditScore: Number(data.creditScore) || 0,
    existingEmi: Number(data.existingEmi) || 0,
    age: Number(data.age) || 0,
    result: data.result || 'N/A',
    eligibleLoanAmount: Number(data.eligibleLoanAmount) || 0
  };

  // 3. Send POST request with timeout and error handling
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8' // Text/plain avoids CORS preflight issues with Apps Script
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[Sheets Service] HTTP Error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        message: 'Record saving unavailable'
      };
    }

    const result = await response.json();
    return {
      success: Boolean(result.success),
      message: result.message || (result.success ? 'Record saved' : 'Record saving unavailable')
    };
  } catch (error) {
    // Graceful network or timeout failure
    console.warn('[Sheets Service] Network error or timeout saving record:', error.message || error);
    return {
      success: false,
      message: 'Record saving unavailable'
    };
  }
}
