# 05 · Data-Flow Matrix (RACI-Style)

| Flow | Initiator | Approver | Broker | Receiver | Auditor | Oversight |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | SRI collector | SRI internal + SSC | — | SRI vault | IADE ledger | IG, ITAP |
| T2 | SIE collector | SIE internal + SSC | — | SIE vault | IADE ledger | IG, ITAP |
| T3 | SRI analyst | SSC | IADE | SIE | IADE ledger | IG, JPC (agg) |
| T4 | IADE | SSC token | IADE | SIE | IADE ledger | IG, JPC (agg) |
| T5 | SIE | SSC token | IADE | SRI | IADE ledger | IG, JPC (agg) |
| T6 | IADE | SSC token | IADE | SRI | IADE ledger | IG, JPC (agg) |
| T7 | SRI/SIE | MOU | — | DNSC | IADE ledger | IG, ANSPDCP |
| T8 | DNSC | MOU | — | SRI/SIE | IADE ledger | IG, ANSPDCP |
| T9 | SRI/SIE | SSC + DIICOT | — | DIICOT | IADE ledger | IG, JPC |
| T10 | DIICOT | ICCJ | — | ICCJ | Court record | Public |
| T11 | SRI/SIE/IADE | Statutory | — | IG | IG internal | JPC |
| T12 | IG | Statutory | — | JPC | IG internal | Public (summary) |
| T13 | JPC | Contract | — | ITAP | ITAP internal | JPC |
| T14 | SRI/SIE | GDPR | — | ANSPDCP | ANSPDCP | Public (annual) |
| T15 | SRI/SIE | Internal | — | CSAT | IADE ledger | IG (existence) |
| T16 | CSAT | Internal | — | Presidency | IADE ledger | IG (existence) |
| T17 | Ombudsman | Statutory | — | IG | IG internal | JPC (anonymized) |
| T18 | JPC | Subpoena | — | SRI/SIE/SPP | IADE ledger | Public (existence) |
| T19 | SPP collector | SPP internal + SSC | — | SPP vault | IADE ledger | IG, ITAP |
| T20 | SPP | Statutory | — | IG | IG internal | JPC |
| T21 | SPP | GDPR | — | ANSPDCP | ANSPDCP | Public (annual) |
| W3 | SSC | SSC | — | SPP | IADE ledger | IG, ITAP |
