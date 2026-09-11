# 05 · Matricea fluxurilor de date (stil RACI)

| Flux | Inițiator | Aprobator | Broker | Destinatar | Auditor | Supraveghere |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Colector SRI | Intern SRI + SSC | — | Vault SRI | Registru IADE | IG, ITAP |
| T2 | Colector SIE | Intern SIE + SSC | — | Vault SIE | Registru IADE | IG, ITAP |
| T3 | Analist SRI | SSC | IADE | SIE | Registru IADE | IG, JPC (agr.) |
| T4 | IADE | Token SSC | IADE | SIE | Registru IADE | IG, JPC (agr.) |
| T5 | SIE | Token SSC | IADE | SRI | Registru IADE | IG, JPC (agr.) |
| T6 | IADE | Token SSC | IADE | SRI | Registru IADE | IG, JPC (agr.) |
| T7 | SRI/SIE | MOU | — | DNSC | Registru IADE | IG, ANSPDCP |
| T8 | DNSC | MOU | — | SRI/SIE | Registru IADE | IG, ANSPDCP |
| T9 | SRI/SIE | SSC + DIICOT | — | DIICOT | Registru IADE | IG, JPC |
| T10 | DIICOT | ICCJ | — | ICCJ | Registrul instanței | Public |
| T11 | SRI/SIE/IADE | Statutar | — | IG | Intern IG | JPC |
| T12 | IG | Statutar | — | JPC | Intern IG | Public (rezumat) |
| T13 | JPC | Contract | — | ITAP | Intern ITAP | JPC |
| T14 | SRI/SIE | GDPR | — | ANSPDCP | ANSPDCP | Public (anual) |
| T15 | SRI/SIE | Intern | — | CSAT | Registru IADE | IG (existența) |
| T16 | CSAT | Intern | — | Președinție | Registru IADE | IG (existența) |
| T17 | Avocatul Poporului | Statutar | — | IG | Intern IG | JPC (anonimizat) |
| T18 | JPC | Subpoena | — | SRI/SIE | Registru IADE | Public (existența) |
