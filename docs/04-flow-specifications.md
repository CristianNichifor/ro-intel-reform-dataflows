# 04 · Detailed Flow Specifications

## 4.1 Flow T3–T6: Cross-Agency Data Handshake (The "Double-Check" in Action)

Sequence:

1. **SRI analyst** identifies a need for SIE-held foreign intelligence relevant to a domestic case.
2. Analyst creates a **Request Object** containing: case ID (SRI internal), legal predicate (e.g. "foreign state-sponsored espionage"), subject identifiers (minimized), requested data fields, justification.
3. Request Object is sent to **SSC** for a cross-agency warrant token.
4. **SSC validates:** predicate falls within statutory national security scope; request is not a fishing expedition (specificity test); no less intrusive means available.
5. SSC issues a **cryptographic warrant token** bound to the request hash.
6. SRI sends Request + Token to **IADE**.
7. **IADE:** validates token signature; logs transaction (request ID, timestamp, agencies, token ID, predicate category — *not content*); routes request to SIE.
8. **SIE** validates token, retrieves matching data from its vault, applies the **minimization filter**, and returns a **Response Package** to IADE.
9. IADE logs response metadata (size, fields, token ID) and routes to SRI.
10. SRI decrypts response, attaches to case file, and records token ID in its own audit log.
11. **IG** and **ITAP** can query the IADE audit ledger for all transactions matching a case ID, agency, or time window.

## 4.2 Flow T7–T8: Intelligence ↔ Civilian Cyber Defense (DNSC)

**Principle:** intelligence agencies focus on state-sponsored cyber-espionage; DNSC handles civilian cyber defense (critical infrastructure, private sector, citizens).

**Flow rules:**

- **SRI/SIE → DNSC:** only technical indicators (IPs, hashes, TTPs) with no personal data unless warranted.
- **DNSC → SRI/SIE:** state-sponsored APT indicators that exceed civilian response capacity.
- **Standing MOU** defines: data schema (STIX/TAXII compatible); automatic logging to IADE audit ledger; ANSPDCP notification for any personal data transfer; annual joint review by IG and ITAP.

## 4.3 Flow T9–T10: Intelligence → Prosecution → Courts

**Chain-of-custody requirements:**

- Evidence package must include: SSC warrant token ID; IADE audit ledger hash for all data provenance; minimization certificate; handling instructions (classification, dissemination limits).
- DIICOT can request IG review of the package's legality before filing.
- ICCJ can request ITAP technical validation of digital evidence integrity.

## 4.4 Flow T11–T18: Oversight Data Flows

**Key distinction:**

- **IG** gets full audit-log access (metadata + transaction records) but not raw content unless a separate warrant is issued.
- **JPC** gets aggregated metrics (number of warrants, categories, agencies) + subpoena power for specific files.
- **ITAP** gets system access to validate technical claims (e.g. "the IADE cannot store content").
- **ANSPDCP** gets notifications of high-risk processing.
- **Ombudsman** can trigger IG reviews based on citizen complaints.
