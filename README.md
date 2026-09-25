# AI Loan Eligibility Checker

An AI-powered fintech web application designed to simplify financial decision-making.

## Features

- Loan Eligibility Checker
- Credit Score Analyzer
- EMI Calculator
- AI-powered Financial Guidance
- Google Sheets data storage
- Responsive Glassmorphism UI

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Claude AI API
- Google Apps Script
- Google Sheets
- Git & GitHub
- GitHub Pages
- Font Awesome
- Google Fonts

## Project Architecture

The application follows a lightweight client-side architecture using HTML, CSS, and JavaScript.

Financial calculations and eligibility rules are processed using JavaScript, while Claude AI provides contextual financial guidance. Google Apps Script and Google Sheets are used for serverless data storage.

## Core Modules

### Loan Eligibility Checker

Eligibility requirements:

- Monthly salary > ₹30,000
- Credit score > 700
- Existing EMI < ₹20,000
- Applicant age ≥ 21 years

Eligible loan amount:

Monthly Salary × 20

### Credit Score Analyzer

- 750–900: Excellent
- 650–749: Good
- 300–649: Poor

### EMI Calculator

Uses the standard reducing-balance EMI formula:

EMI = (P × R × (1 + R)^N) / ((1 + R)^N − 1)

## Project Status

- Milestone 1 — Project Planning & Architecture Setup (Completed)
- Milestone 2 — UI Layout & Glassmorphism System (Completed)
- Milestone 3 — Core Calculators & Logic Verification (Completed)
- Milestone 4 — Client Logic & Integration Architecture (Completed)

---

## Milestone 4 — Client Logic & Integration

### 1. Architectural Overview & Security Approach
The application operates as a zero-leakage, static client-side web application. All sensitive operations, API secrets (e.g. `YOUR_CLAUDE_API_KEY`), and database mutations are segregated behind a serverless gateway using Google Apps Script.

- **Client Layer:** HTML5, CSS3, Vanilla JavaScript (Deterministic calculation engine).
- **Serverless Proxy Layer:** Google Apps Script Web App (Secure intermediary).
- **Persistence Layer:** Google Sheets (Serverless tabular data storage).
- **AI Advisory Layer:** Claude AI API (`api.anthropic.com`) via server-side execution.

> **Security Rule:** No API keys, secret tokens, or credentials are hardcoded into HTML, CSS, JavaScript, or client files.

---

### 2. End-to-End Data Flows

#### Flow 1: Google Sheets Eligibility Logging
```
Applicant Form Submission
  │
  ▼
Client-Side Deterministic Rule Engine (js/eligibility.js)
  │ ──> Displays instant result on UI
  ▼
Sheets Service (js/sheets.js)
  │ ──> Dispatches asynchronous POST request (JSON payload)
  ▼
Google Apps Script Web App (doPost)
  │ ──> Appends record with UTC Timestamp
  ▼
Google Sheets (Tabular Storage)
```

#### Flow 2: Claude AI Financial Advisory
```
Applicant Financial Profile
  │
  ▼
AI Service Abstraction (js/ai.js)
  │ ──> Sends request payload to Apps Script endpoint
  ▼
Google Apps Script Web App (Server-side proxy)
  │ ──> Securely injects server-side CLAUDE_API_KEY
  ▼
Claude AI API (api.anthropic.com/v1/messages)
  │ ──> Contextual recommendations & financial counseling
  ▼
Apps Script Web App
  │ ──> Formats response { success: true, guidance: "..." }
  ▼
Client UI (js/ai.js on tips.html / eligibility.html)
```

---

### 3. Deterministic Engine vs. AI Advisory Boundary
The core loan qualification decision is **100% deterministic** and computed directly by client-side JavaScript rules:
- Monthly Salary > ₹30,000
- Credit Score > 700
- Existing EMI < ₹20,000
- Applicant Age ≥ 21
- Eligible Loan Amount = Monthly Salary × 20

Claude AI acts **strictly as an informational advisory layer**. Claude cannot overturn, contradict, or re-evaluate approved or rejected decisions rendered by the deterministic rule engine.

