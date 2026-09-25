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

Milestone 1 — Project Planning & Architecture Setup
