/**
 * AI Loan Eligibility Checker - Credit Score Analyzer Module
 * Analyzes applicant credit score according to documented classifications
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('credit-score-form');
  const resultPlaceholder = document.getElementById('result-placeholder');
  const resultContent = document.getElementById('result-content');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const scoreInput = document.getElementById('credit-score-input');
    const score = parseInt(scoreInput.value, 10);

    if (isNaN(score) || score < 300 || score > 900) {
      alert('Please enter a valid credit score between 300 and 900.');
      return;
    }

    // Classification Rules:
    // 750–900: Excellent
    // 650–749: Good
    // 300–649: Poor
    let classification = '';
    let badgeClass = '';
    let assessment = '';
    let advice = '';

    if (score >= 750) {
      classification = 'Excellent';
      badgeClass = 'badge-success';
      assessment = 'Outstanding credit standing with high probability of instantaneous loan approval at competitive interest rates.';
      advice = 'Maintain low credit utilization ratio (<30%) and timely bill payments to keep this top-tier rating.';
    } else if (score >= 650) {
      classification = 'Good';
      badgeClass = 'badge-warning';
      assessment = 'Healthy credit history. Most lending institutions consider this acceptable for standard personal and home loans.';
      advice = 'Consistently pay all EMIs on schedule and avoid applying for multiple new credit lines at once.';
    } else {
      classification = 'Poor';
      badgeClass = 'badge-danger';
      assessment = 'Suboptimal credit history with elevated risk indicators. High chance of loan rejection or higher interest rates.';
      advice = 'Clear overdue balances, dispute any credit report inaccuracies, and avoid taking on new uncollateralized debt.';
    }

    if (resultPlaceholder) resultPlaceholder.style.display = 'none';
    if (resultContent) {
      resultContent.style.display = 'block';

      const statusBadge = document.getElementById('credit-status-badge');
      const scoreDisplay = document.getElementById('display-score');
      const assessmentText = document.getElementById('credit-assessment');
      const adviceText = document.getElementById('credit-advice');

      if (statusBadge) {
        statusBadge.className = `result-badge ${badgeClass}`;
        statusBadge.textContent = classification;
      }
      if (scoreDisplay) scoreDisplay.textContent = score;
      if (assessmentText) assessmentText.textContent = assessment;
      if (adviceText) adviceText.textContent = advice;
    }
  });
});
