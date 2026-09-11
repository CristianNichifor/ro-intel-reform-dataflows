# 02 · Current-State Data Flows (Baseline for Reform)

## 2.1 Flow Table — Current State

| # | Source | Destination | Data Type | Legal Basis | Auditability | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | SRI collection | SRI internal database | Raw SIGINT/HUMINT/OSINT | Internal authorization | Low | Mass storage, no external warrant |
| C2 | SIE collection | SIE internal database | Foreign intel | Internal authorization | Low | No domestic oversight of foreign ops |
| C3 | SRI ↔ SIE | Ad-hoc sharing | Mixed | CSAT decision / informal | Very low | No case-level traceability |
| C4 | SRI → DIICOT | Referral files | Evidence summaries | Criminal Procedure Code | Medium | Selective disclosure |
| C5 | SRI → CSAT | Briefings | Assessments | National security law | Low | Political filtering |
| C6 | SRI → Parliamentary Committee | Reports | Summaries | Law 14/1992 | Low | No raw access, no subpoena |
| C7 | STS → SRI | Technical intercepts | Metadata/content | Warrant (theoretical) | Medium | Shared infrastructure, unclear separation |
| C8 | SRI → ANSPDCP | Notifications | Processing descriptions | GDPR / Law 190/2018 | Low | Intelligence exemption overuse |
| C9 | SIE → Presidency | Briefings | Foreign assessments | Internal | Very low | No parliamentary visibility |
| C10 | SRI/SIE → Media/public | Disinformation ops | Narratives | N/A | None | No attribution or audit |

## 2.2 Legend

- **Red** = agencies with concentrated, unaudited data power.
- **Yellow** = oversight bodies with limited access.

See the interactive graph in the demo app (`Current State` tab) — nodes and edges are clickable for details.
