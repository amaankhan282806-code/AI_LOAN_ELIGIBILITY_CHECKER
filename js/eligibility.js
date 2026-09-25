/**
 * AI Loan Eligibility Checker - Module
 * Core logic and UI management for applicant loan eligibility
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eligibility-form');
  const resultPlaceholder = document.getElementById('result-placeholder');
  const resultContent = document.getElementById('result-content');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('applicant-name').value.trim();
    const salary = parseFloat(document.getElementById('monthly-salary').value) || 0;
    const creditScore = parseInt(document.getElementById('credit-score').value, 10) || 0;
    const existingEmi = parseFloat(document.getElementById('existing-emi').value) || 0;
    const age = parseInt(document.getElementById('applicant-age').value, 10) || 0;

    // Evaluate Loan Eligibility Criteria
    // Requirements: Salary > 30000, Credit Score > 700, Existing EMI < 20000, Age >= 21
    const isSalaryEligible = salary > 30000;
    const isCreditEligible = creditScore > 700;
    const isEmiEligible = existingEmi < 20000;
    const isAgeEligible = age >= 21;

    const isApproved = isSalaryEligible && isCreditEligible && isEmiEligible && isAgeEligible;

    // Display Result
    if (resultPlaceholder) resultPlaceholder.style.display = 'none';
    if (resultContent) {
      resultContent.style.display = 'block';

      const statusBadge = document.getElementById('eligibility-status');
      const loanAmountEl = document.getElementById('eligible-amount');
      const applicantNameEl = document.getElementById('res-applicant-name');
      const salaryEl = document.getElementById('res-salary');
      const creditScoreEl = document.getElementById('res-credit-score');
      const emiEl = document.getElementById('res-emi');
      const ageEl = document.getElementById('res-age');
      const summaryReasonEl = document.getElementById('eligibility-reason');

      if (applicantNameEl) applicantNameEl.textContent = name || 'Applicant';
      if (salaryEl) salaryEl.textContent = formatCurrency(salary);
      if (creditScoreEl) creditScoreEl.textContent = creditScore;
      if (emiEl) emiEl.textContent = formatCurrency(existingEmi);
      if (ageEl) ageEl.textContent = `${age} years`;

      if (isApproved) {
        const eligibleAmount = salary * 20;
        statusBadge.className = 'result-badge badge-success';
        statusBadge.textContent = 'Eligible for Loan';
        if (loanAmountEl) loanAmountEl.textContent = formatCurrency(eligibleAmount);
        if (summaryReasonEl) {
          summaryReasonEl.textContent = `Congratulations ${name || 'Applicant'}! You meet all financial and credit eligibility criteria. Your maximum eligible loan amount is calculated at 20x monthly salary.`;
        }
      } else {
        statusBadge.className = 'result-badge badge-danger';
        statusBadge.textContent = 'Not Eligible';
        if (loanAmountEl) loanAmountEl.textContent = '₹0';

        const reasons = [];
        if (!isSalaryEligible) reasons.push('Monthly salary must be greater than ₹30,000');
        if (!isCreditEligible) reasons.push('Credit score must be greater than 700');
        if (!isEmiEligible) reasons.push('Existing EMI obligations must be less than ₹20,000');
        if (!isAgeEligible) reasons.push('Applicant age must be at least 21 years');

        if (summaryReasonEl) {
          summaryReasonEl.textContent = `Criteria not met: ${reasons.join(', ')}.`;
        }
      }
    }
  });
});
