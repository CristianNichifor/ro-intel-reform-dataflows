# 00 · Design Principles for the Data-Flow Architecture

| Principle | Implication for Data Flows |
| --- | --- |
| **No single mass database** | Data stays at source; sharing is event-driven, not warehouse-driven |
| **Purpose limitation** | Every flow is bound to a legal predicate (threat category + warrant ID) |
| **Case-by-case handshake** | Cross-agency access requires an audited, logged request–approval transaction |
| **Judicial gate** | Surveillance content flows only through a warrant token issued by the specialized court |
| **Oversight visibility ≠ operational access** | Oversight bodies see metadata and audit logs, not raw operational content |
| **De-militarized civilian agencies** | Flows terminate in civilian authority chains (Government/Parliament/Justice) |

The target state is a **hub-and-spoke with warrant tokens** architecture:

- **Spokes (agency case vaults):** each agency retains its own encrypted, purpose-bound case files.
- **Hub (Inter-Agency Data Exchange — IADE):** a minimal, stateless broker that does not store content, routes requests and responses between spokes, logs every transaction to an immutable audit ledger, and requires a warrant token for any content transfer.
- **Warrant Token Registry (SSC):** the specialized court issues cryptographic tokens bound to case ID, legal predicate (threat category), subject identifiers, time window, and authorized receiving agency.
- **Audit Ledger:** append-only, cryptographically verifiable; readable by IG, ITAP, and JPC (with redactions for sources/methods).
