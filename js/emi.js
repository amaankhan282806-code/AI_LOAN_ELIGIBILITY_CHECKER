/**
 * AI Loan Eligibility Checker - EMI Calculator Module
 * Calculates Equated Monthly Installment using standard reducing-balance formula
 * EMI = (P × R × (1 + R)^N) / ((1 + R)^N − 1)
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('emi-form');
  const resultPlaceholder = document.getElementById('result-placeholder');
  const resultContent = document.getElementById('result-content');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const principal = parseFloat(document.getElementById('loan-amount').value) || 0;
    const annualRate = parseFloat(document.getElementById('interest-rate').value) || 0;
    const tenureMonths = parseInt(document.getElementById('loan-tenure').value, 10) || 0;

    if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
      alert('Please enter valid positive values for all fields.');
      return;
    }

    // Monthly interest rate R
    const monthlyRate = (annualRate / 12) / 100;
    const n = tenureMonths;

    // EMI Calculation: P * R * (1+R)^N / ((1+R)^N - 1)
    let emi;

    if (monthlyRate === 0) {
      emi = principal / n;
    } else {
      const factor = Math.pow(1 + monthlyRate, n);
      emi = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    if (resultPlaceholder) resultPlaceholder.style.display = 'none';
    if (resultContent) {
      resultContent.style.display = 'block';

      const emiDisplay = document.getElementById('res-emi-amount');
      const principalDisplay = document.getElementById('res-principal');
      const interestDisplay = document.getElementById('res-total-interest');
      const totalPaymentDisplay = document.getElementById('res-total-payable');
      const tenureDisplay = document.getElementById('res-tenure-months');

      if (emiDisplay) emiDisplay.textContent = formatCurrency(Math.round(emi));
      if (principalDisplay) principalDisplay.textContent = formatCurrency(principal);
      if (interestDisplay) interestDisplay.textContent = formatCurrency(Math.round(totalInterest));
      if (totalPaymentDisplay) totalPaymentDisplay.textContent = formatCurrency(Math.round(totalPayment));
      if (tenureDisplay) tenureDisplay.textContent = `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Yrs)`;
    }
  });
});
