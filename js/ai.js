/**
 * AI Loan Eligibility Checker - AI Guidance & Tips Service
 * 
 * Secure AI client abstraction:
 * - Never calls api.anthropic.com directly from the browser.
 * - Never stores or exposes Claude API keys in client-side code.
 * - Securely routes AI requests through the Google Apps Script server-side proxy when AI_ENABLED is true.
 * - Handles offline/disabled state gracefully without disrupting core application features.
 */

/**
 * Requests personalized financial guidance from the backend AI proxy.
 * 
 * @param {Object} financialData
 * @param {string} financialData.name - Applicant name
 * @param {number} financialData.salary - Monthly salary (INR)
 * @param {number} financialData.creditScore - Credit score (300-900)
 * @param {number} financialData.existingEmi - Existing EMI obligations (INR)
 * @param {number} financialData.age - Applicant age
 * @param {string} financialData.eligibilityResult - Approved or Rejected
 * @param {number} financialData.eligibleLoanAmount - Calculated loan capacity
 * @returns {Promise<{success: boolean, guidance?: string, message?: string}>}
 */
async function getAIFinancialGuidance(financialData) {
  // 1. Verify if AI is enabled and endpoint is configured
  const isAiEnabled = typeof APP_CONFIG !== 'undefined' && APP_CONFIG.AI_ENABLED === true;
  const endpoint = typeof APP_CONFIG !== 'undefined' && APP_CONFIG.GOOGLE_APPS_SCRIPT_URL
    ? APP_CONFIG.GOOGLE_APPS_SCRIPT_URL.trim()
    : '';

  if (!isAiEnabled || !endpoint) {
    return {
      success: false,
      message: 'AI guidance is temporarily unavailable. Your eligibility result is still valid.'
    };
  }

  // 2. Prepare request payload for Apps Script serverless proxy
  const payload = {
    type: 'ai_guidance',
    data: {
      name: financialData.name || 'Applicant',
      salary: Number(financialData.salary) || 0,
      creditScore: Number(financialData.creditScore) || 0,
      existingEmi: Number(financialData.existingEmi) || 0,
      age: Number(financialData.age) || 0,
      eligibilityResult: financialData.eligibilityResult || 'N/A',
      eligibleLoanAmount: Number(financialData.eligibleLoanAmount) || 0
    }
  };

  // 3. Dispatch POST request
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        message: 'AI guidance is temporarily unavailable. Your eligibility result is still valid.'
      };
    }

    const result = await response.json();

    if (result && result.success && result.guidance) {
      return {
        success: true,
        guidance: result.guidance
      };
    }

    return {
      success: false,
      message: result.message || 'AI guidance is temporarily unavailable. Your eligibility result is still valid.'
    };
  } catch (error) {
    console.warn('[AI Service] Error contacting AI proxy:', error.message || error);
    return {
      success: false,
      message: 'AI guidance is temporarily unavailable. Your eligibility result is still valid.'
    };
  }
}

/**
 * DOM Initializer for Interactive AI Prompt on Tips Page
 */
document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('ai-prompt-input');
  const askBtn = document.getElementById('ai-ask-btn');
  const aiResponseBox = document.getElementById('ai-response-box');

  if (askBtn && promptInput && aiResponseBox) {
    askBtn.addEventListener('click', async () => {
      const query = promptInput.value.trim();
      if (!query) return;

      const isAiEnabled = typeof APP_CONFIG !== 'undefined' && APP_CONFIG.AI_ENABLED === true;
      const endpoint = typeof APP_CONFIG !== 'undefined' && APP_CONFIG.GOOGLE_APPS_SCRIPT_URL
        ? APP_CONFIG.GOOGLE_APPS_SCRIPT_URL.trim()
        : '';

      aiResponseBox.style.display = 'block';

      if (!isAiEnabled || !endpoint) {
        aiResponseBox.innerHTML = `
          <div class="result-badge badge-warning" style="margin-bottom: 8px;">AI Service Offline</div>
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">
            AI guidance is temporarily unavailable. Your eligibility result is still valid. Explore the curated financial guides below for expert insights on savings, credit scoring, and debt optimization.
          </p>
        `;
        return;
      }

      // Show loading indicator
      aiResponseBox.innerHTML = `
        <div style="font-size: 0.875rem; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-spinner fa-spin"></i> Generating intelligent financial guidance...
        </div>
      `;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            type: 'ai_guidance',
            data: { prompt: query }
          })
        });

        const result = await response.json();
        if (result && result.success && result.guidance) {
          aiResponseBox.innerHTML = `
            <div class="result-badge badge-success" style="margin-bottom: 8px;">FINAI Advisor</div>
            <p style="font-size: 0.875rem; color: var(--text-primary); line-height: 1.6; white-space: pre-line;">${result.guidance}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 10px;">
              * AI guidance is informational and does not constitute a formal loan underwriting decision.
            </div>
          `;
        } else {
          aiResponseBox.innerHTML = `
            <div class="result-badge badge-warning" style="margin-bottom: 8px;">Notice</div>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">
              ${result.message || 'AI guidance is temporarily unavailable. Your eligibility result is still valid.'}
            </p>
          `;
        }
      } catch (err) {
        aiResponseBox.innerHTML = `
          <div class="result-badge badge-warning" style="margin-bottom: 8px;">Notice</div>
          <p style="font-size: 0.875rem; color: var(--text-secondary);">
            AI guidance is temporarily unavailable. Your eligibility result is still valid.
          </p>
        `;
      }
    });
  }
});
