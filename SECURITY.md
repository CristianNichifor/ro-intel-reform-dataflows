# Security Policy

## Reporting a Vulnerability

This is a demonstration repository — it contains no real data and runs entirely in the browser.

If you find a security issue in the demo application (for example: XSS, dependency
vulnerabilities, or unsafe handling of the mock cryptographic code), please report it
responsibly:

1. **Do not open a public issue** for confirmed vulnerabilities.
2. Send an email to the repository owner with:
   - a short description of the issue
   - steps to reproduce
   - the affected version / commit
3. You will receive an acknowledgement within 7 days.

## Scope

- The demo app (Vite + React + TypeScript) and its GitHub Actions workflows.
- The mock warrant/ledger implementation is a simulation and is **not** production-grade
  cryptography (HMAC-SHA-256 stands in for Ed25519).

## Security features in this repository

- Branch protection on `main` (pull requests + CI checks required)
- CI: lint, typecheck, production build on every push and PR
- Weekly `npm audit` (fails on high severity) + Dependabot updates (npm + GitHub Actions)
- GitHub secret scanning with push protection
