# 03 · Target-State Data Flows (Reform Architecture)

## 3.1 Core Architectural Pattern: "Hub-and-Spoke with Warrant Tokens"

Instead of a central mass database, the target state uses:

- **Spokes (agency case vaults):** each agency retains its own encrypted, purpose-bound case files.
- **Hub (IADE):** minimal, stateless broker — does not store content; routes requests/responses; logs every transaction to an immutable audit ledger; requires a warrant token for any content transfer.
- **Warrant Token Registry (SSC):** issues cryptographic tokens bound to case ID, legal predicate, subject identifiers, time window, and authorized receiving agency.
- **Audit Ledger:** append-only, cryptographically verifiable; readable by IG, ITAP, and JPC (with redactions for sources/methods).

## 3.2 Target-State Flow Table

| # | Source | Destination | Data Type | Legal Gate | Audit Ledger Entry | Oversight Visibility |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | SRI collection | SRI case vault | Raw intel | Internal + SSC warrant (if surveillance) | Yes (warrant ID) | IG, ITAP |
| T2 | SIE collection | SIE case vault | Foreign intel | Internal + SSC warrant (if domestic nexus) | Yes | IG, ITAP |
| T3 | SRI vault | IADE | Case-linked request | Warrant token required | Yes | IG, JPC (aggregate) |
| T4 | IADE | SIE vault | Approved request | Warrant token validated | Yes | IG, JPC (aggregate) |
| T5 | SIE vault | IADE | Response package | Token-bound, minimized | Yes | IG, JPC (aggregate) |
| T6 | IADE | SRI vault | Response package | Token-bound, minimized | Yes | IG, JPC (aggregate) |
| T7 | SRI/SIE | DNSC | Cyber threat indicators | Standing MOU + no personal data | Yes | IG, ANSPDCP |
| T8 | DNSC | SRI/SIE | State-sponsored APT indicators | Standing MOU | Yes | IG, ANSPDCP |
| T9 | SRI/SIE | DIICOT | Warranted evidence package | SSC warrant + chain-of-custody | Yes | IG, JPC, ICCJ |
| T10 | DIICOT | ICCJ | Case file | Criminal procedure | Yes | Public (court record) |
| T11 | SRI/SIE | IG | Audit logs + system metadata | Statutory right of access | Yes | IG internal |
| T12 | IG | JPC | Audit findings | Statutory reporting | Yes | JPC |
| T13 | ITAP | JPC | Technical validation reports | Contracted expert mandate | Yes | JPC |
| T14 | SRI/SIE | ANSPDCP | High-risk processing notifications | GDPR + intelligence law | Yes | ANSPDCP |
| T15 | SRI/SIE | CSAT | Strategic threat assessments | Aggregated, no raw data | Yes | IG (existence only) |
| T16 | CSAT | Presidency | Strategic summaries | Aggregated | Yes | IG (existence only) |
| T17 | Ombudsman | IG | Complaints triggering review | Statutory | Yes | IG, JPC (anonymized) |
| T18 | JPC | SRI/SIE | Subpoena for specific files | Parliamentary subpoena power | Yes | Public (existence of subpoena) |

## 3.3 Legend

- **Blue** = stateless broker (IADE).
- **Green** = judicial gate (SSC).
- **Pink** = oversight bodies.
- **Neutral** = civilianized agencies (former "red" agencies removed).
