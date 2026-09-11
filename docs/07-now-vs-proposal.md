# 07 · Now vs Proposal — Detailed Comparison

> **Convention:** institutions are referred to by their **Romanian acronyms** throughout this
> document and the demo. The English expansion is given once, in parentheses, on first use.
> New institutions created by the reform are marked **NEW**.

## 7.1 The two architectures, side by side

| | Current (baseline) | Proposal (reform) |
| --- | --- | --- |
| **Topology** | Two military intelligence services (SRI, SIE) plus STS, each with concentrated, unaudited data power; ad-hoc bilateral sharing | Hub-and-spoke: agency **case vaults** around a stateless broker (**IADE**); data stays at the source |
| **Legal gate** | Internally authorized collection; parliamentary briefings are filtered | **SSC** (Specialized Surveillance Court) issues cryptographic **warrant tokens** that bind every content transfer to a legal predicate |
| **Transport** | Point-to-point, informal (C3) | Every cross-agency request/response is routed and validated through **IADE** (T3–T6) |
| **Record** | No independent audit trail | Append-only, hash-chained **audit ledger**; entry for every transaction |
| **Oversight** | Briefings and annual reports (C5, C6, C9) | **IG** full audit-log access · **JPC** aggregated metrics + subpoena power · **ITAP** technical validation · **ANSPDCP** high-risk notifications |
| **Civilian split** | STS runs technical intercepts; DNSC has limited information flow | Interception under SRI/SIE with judicial warrants; **DNSC** is the sole civilian cyber defense actor (T7–T8) |

## 7.2 Institution by institution

| Institution | Today | Under the proposal |
| --- | --- | --- |
| **PRES** — Presidency | Receives direct SIE briefings (C9) with no parliamentary visibility | Receives only aggregated strategic summaries via CSAT (T16); the existence of briefings is logged |
| **CSAT** | Coordinates with limited transparency; filtered inputs (C5) | Same strategic role; briefings logged on the ledger; no operational data access |
| **SRI** | Domestic intelligence (military); receives, stores and correlates data without a unified warrant ledger (C1) | Civilianized; keeps its own encrypted case vault; sharing only via SSC warrant tokens; SIGINT under judicial warrants |
| **SIE** | Foreign intelligence (military); foreign operations with no domestic oversight (C2, C9) | Civilianized; case vault; any domestic nexus requires an SSC token (T3–T6) |
| **STS** | Technical intercepts on shared infrastructure; separation from SRI unclear (C7) | Not present in the target state — interception capacity moves under SRI/SIE with SSC warrants; civilian comms security to DNSC |
| **DIICOT / PICCJ** | Receives referrals, not traceable evidence chains (C4) | Receives warranted evidence packages with chain-of-custody hashes (T9) |
| **ICCJ** | Adjudicates without independent technical validation of digital evidence | Can request ITAP validation of evidence integrity (T10) |
| **JPC** | Receives filtered briefings; no subpoena power (C6) | Aggregated metrics by default; subpoena power for specific files (T12, T18) |
| **ANSPDCP** | Notified, but the services lean on the national-security exception (C8) | Receives high-risk processing notifications with DPIAs; the exception is narrowed (T14) |
| **OMB** — Ombudsman (Avocatul Poporului) | Receives citizen complaints with limited visibility into the services | Complaints can trigger IG reviews (T17); statutory standing |
| **DNSC** | Civilian cyber defense, information-limited | Sole civilian cyber defense; threat indicators under MOU; APT escalation channel (T7–T8) |
| **SSC** — Specialized Surveillance Court · **NEW** | — | Judicial gate: issues/denies warrant tokens after the double-check (predicate + specificity) |
| **IADE** — Inter-Agency Data Exchange · **NEW** | — | Stateless broker: routes requests/responses, never stores content, logs every transaction to the audit ledger |
| **IG** — Inspector General · **NEW** | — | Independent statutory oversight: full audit-log access; no raw content without a separate warrant |
| **ITAP** — Independent Technical Advisory Panel · **NEW** | — | Validates technical claims; audits systems (e.g. “IADE cannot store content”) |

## 7.3 Weaknesses, benefits and risks

| | Current architecture | Proposed architecture |
| --- | --- | --- |
| **Weaknesses** | Concentrated, unaudited data power in military agencies; ad-hoc sharing without case-level traceability; oversight sees filtered summaries, not verifiable data; no independent audit trail; prosecutors get referrals without chain-of-custody | New institutions (SSC, IADE, IG, ITAP) must be built from scratch with no local precedent; depends on disciplined cryptographic key management; needs primary legislation and sustained funding; sharing is slower than today's ad-hoc speed |
| **Benefits** | Speed of ad-hoc coordination; operational flexibility; simple top-down control | Every content transfer bound to a warrant token and logged; chain-of-custody for prosecutors and courts; oversight with real visibility (full audit access / aggregated metrics / subpoena); aligned with ECHR case law and GDPR; attribution and public accountability |
| **Risks** | Dragnet surveillance without case linkage; political instrumentalization; ECHR violations; erosion of public trust; unattributed influence operations | Token-gate bottleneck or rubber-stamping at SSC; metadata leakage from the ledger; insider threat at the broker (mitigated by statelessness); scope creep beyond statutory predicates; a half-built implementation could be worse than the baseline — mitigated by ITAP validation, IG oversight and an open spec |

## 7.4 Benchmarks — EU and world oversight systems

| Country | Model / mechanism | Borrowed or rejected by the proposal |
| --- | --- | --- |
| **Estonia (EE)** | X-Road: national data-exchange layer — data stays at the source, service-based queries, mandatory logging with timestamped signatures; KSI blockchain for registry integrity | **Borrowed:** the stateless broker + hash-chained audit ledger pattern (IADE). Note: X-Road serves non-classified government data |
| **Germany (DE)** | G10 Act: ex-ante authorization by the parliamentary G10 Commission or, for BND foreign surveillance, the independent G10 Review Board (Kontrollrat) with judicial standing; PKGr parliamentary oversight, tightened after the 2015 BND/NSA affair | **Borrowed:** independent ex-ante gate with judicial standing (SSC); statutory tightening after scandal |
| **France (FR)** | 2015 Intelligence Act + CNCTR: independent authority issues ex-ante opinions on PM-authorized techniques, with real inspection powers; Conseil d'État appeal; judicial review expanded after the 2021 CJEU rulings | **Borrowed:** ex-ante independent control + technical inspection (SSC + ITAP) |
| **Netherlands (NL)** | Wiv 2017: CTIVD review committee with binding findings; TIB issues binding ex-ante decisions for special powers; reformed by the interim law of 2021 after the 2018 referendum | **Borrowed:** binding ex-ante decisions and binding post-hoc findings (SSC + IG) |
| **Belgium (BE)** | Committee I (Comité permanent R): parliamentary oversight with far-reaching investigative powers; since 2023 the BIM Commission of judges authorizes exceptional data methods ex ante | **Borrowed:** layered parliamentary + judicial oversight (JPC + SSC) |
| **Norway (NO)** | EOS Committee (est. 1996): Storting oversight with full access to all service files; annual public reports | **Borrowed:** full-access parliamentary oversight with public reporting (JPC) |
| **Sweden (SE)** | FIDO — Foreign Intelligence Court (2009) authorizes FRA signals intelligence ex ante; SIN performs statutory inspections | **Borrowed:** dedicated intelligence court (SSC) |
| **United Kingdom (UK)** | Investigatory Powers Act 2016: warrants approved by the minister and reviewed ex ante by Judicial Commissioners (IPCO); IPT complaints tribunal; bulk powers narrowed after *Big Brother Watch v UK* (ECHR 2021) | **Borrowed:** double-lock ex-ante review (SSC); ECHR-driven safeguards |
| **Canada (CA)** | CSE Act 2019: the Intelligence Commissioner (retired judges) pre-authorizes CSE activities; NSIRA conducts consolidated review with full access, complaints and public reports | **Borrowed — closest model:** ex-ante quasi-judicial authorization + full-access reviewer (SSC + IG) |
| **United States (US)** | FISA Court issues ex-ante warrants; criticized as non-adversarial; Section 702 bulk programs contested since the Snowden disclosures; oversight via PCLOB and congressional committees | **Rejected:** non-adversarial court and bulk carve-outs — the specificity test forbids dragnet collection |
| **Australia (AU)** | IGIS: statutory inspector with own-motion inquiries and compelled access to agency records; PJCIS parliamentary committee | **Borrowed:** inspector model with own-motion powers (IG) |

## 7.5 What the comparison teaches

1. **Ex-ante judicial authorization is the EU norm** (DE Kontrollrat, SE FIDO, UK double-lock, FR CNCTR, CA Intelligence Commissioner) — the SSC is not an outlier; Romania is currently an outlier for *not* having it.
2. **Post-hoc review must have teeth** — NL CTIVD binding findings, NO EOS full access, AU IGIS own-motion powers, CA NSIRA consolidated review. The proposal's IG mirrors these.
3. **Technical validation is a distinct function** — FR CNCTR inspection powers and UK IPCO inspectors show oversight needs technical capacity; hence ITAP.
4. **Bulk collection is the recurring failure mode** — US Section 702 and pre-reform UK regimes were the targets of ECHR/CJEU rulings; the specificity test is the proposal's explicit answer.
5. **Data exchange can be designed to keep data at the source** — Estonia's X-Road demonstrates the stateless-broker pattern at national scale, for non-classified data; IADE applies the same discipline to classified flows.

## 7.6 Open questions the comparison raises

- SSC workload and staffing — how many judges, what clearance, what decision turnaround for time-sensitive threats?
- Metadata leakage — the ledger is visible to oversight; how are sources and methods redacted without breaking verifiability?
- Funding independence — how are IG and ITAP budgets protected from the agencies they oversee?
- ECHR alignment — how do the T-flows map to *Big Brother Watch v UK* and *Centrum för Rättvisa v Sweden* safeguards (notification, public metrics, remedies)?
