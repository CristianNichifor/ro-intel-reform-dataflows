# 01 · Institutional Actor Map (Nodes)

## 1.1 Current-State Actors (pre-reform)

```
┌───────────────────────────────────────────────┐
│ EXECUTIVE / PRESIDENTIAL ADMINISTRATION       │
│ • CSAT (Supreme Council of National Defence)  │
│ • Presidential Administration                 │
└───────────────────────────────────────────────┘
            │              │              │
            ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌───────────────────┐
│ SRI         │  │ SIE         │  │ STS (Telecom/IT)  │
│ (domestic)  │  │ (foreign)   │  │ SPP (protection & │
│ military    │  │ military    │  │ guard, under the  │
│             │  │             │  │ President) + other │
│             │  │             │  │ (SGP, DGPI)       │
└──────┬──────┘  └──────┬──────┘  └─────────┬─────────┘
       │                │                  │
       └───────┬────────┴────────┬─────────┘
               ▼                 ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ CSAT Secretariat │  │ DIICOT / PICCJ   │
    │ (coordination)   │  │ (prosecutors)    │
    └────────┬─────────┘  └────────┬─────────┘
             ▼                     ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ Joint Parliament.│  │ High Court of    │
    │ Committee (SRI/  │  │ Cassation (ICCJ) │
    │ SIE)             │  └──────────────────┘
    └──────────────────┘
```

**Current-state flow pathologies:**

- SRI can receive, store, and correlate data from multiple sources without a unified warrant ledger.
- SPP (protection and guard) sits under presidential authority and answers only to the weak parliamentary defence committees — the thinnest oversight of any service.
- CSAT acts as a coordination node with limited transparency.
- Parliamentary committee receives *filtered* briefings, not verifiable data.
- Prosecutors receive *referrals*, not traceable evidence chains.
- No independent audit trail linking a piece of data to a legal predicate.

## 1.2 Target-State Actors (post-reform)

| Actor | Type | Role in Data Flow |
| --- | --- | --- |
| **SRI** (civilianized) | Domestic intelligence agency | Source of domestic intel; holds its own case files |
| **SIE** (civilianized) | Foreign intelligence agency | Source of foreign intel; holds its own case files |
| **SPP** (reformed) | Protection & Guard service | Protection intelligence in its own case vault; SSC warrants; IG audit access |
| **DNSC** | Civilian cyber defense | National cyber incident response; receives threat indicators |
| **Specialized Surveillance Court (SSC)** | Judicial | Issues/denies warrant tokens; holds warrant registry |
| **Inspector General (IG)** | Independent statutory oversight | Full audit-log access; no raw content unless warranted |
| **Joint Parliamentary Committee (JPC)** | Legislative oversight | Receives aggregated metrics + can subpoena specific files |
| **Independent Technical Advisory Panel (ITAP)** | Expert body attached to JPC | Validates technical claims; audits systems |
| **CSAT** | Strategic coordination | Receives threat assessments; no direct operational data |
| **DIICOT / PICCJ** | Prosecutors | Receives warranted evidence packages with chain-of-custody |
| **Data Protection Authority (ANSPDCP)** | Civil rights oversight | Receives notification of high-risk processing |
| **Ombudsman** | Civil rights oversight | Receives complaints; can trigger IG review |
