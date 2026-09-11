# 03 · Fluxurile de date din starea țintă (arhitectura reformei)

## 3.1 Tiparul arhitectural de bază: „Hub-and-spoke cu tokenuri de mandat"

În locul unei baze de date masive centralizate, starea țintă folosește:

- **Spițe (vault-uri de caz ale agențiilor):** fiecare agenție își păstrează propriile dosare de caz criptate, legate de scop.
- **Hub (IADE):** broker minimal, fără stare — nu stochează conținut; rutează cereri/răspunsuri; înregistrează fiecare tranzacție într-un registru de audit imutabil; necesită un token de mandat pentru orice transfer de conținut.
- **Registrul tokenurilor de mandat (SSC):** emite tokenuri criptografice legate de ID caz, temei legal, identificatorii subiecților, fereastră de timp și agenția destinatară autorizată.
- **Registrul de audit:** append-only, verificabil criptografic; lizibil de IG, ITAP și JPC (cu redactări pentru surse/metode).

## 3.2 Tabelul fluxurilor din starea țintă

| # | Sursă | Destinație | Tip de date | Poartă legală | Înregistrare în registrul de audit | Vizibilitate supraveghere |
| --- | --- | --- | --- | --- | --- | --- |
| T1 | Colectare SRI | Vault de caz SRI | Informații brute | Intern + mandat SSC (dacă e supraveghere) | Da (ID mandat) | IG, ITAP |
| T2 | Colectare SIE | Vault de caz SIE | Informații externe | Intern + mandat SSC (dacă există nexus intern) | Da | IG, ITAP |
| T3 | Vault SRI | IADE | Cerere legată de caz | Necesită token de mandat | Da | IG, JPC (agregat) |
| T4 | IADE | Vault SIE | Cerere aprobată | Token de mandat validat | Da | IG, JPC (agregat) |
| T5 | Vault SIE | IADE | Pachet de răspuns | Legat de token, minimizat | Da | IG, JPC (agregat) |
| T6 | IADE | Vault SRI | Pachet de răspuns | Legat de token, minimizat | Da | IG, JPC (agregat) |
| T7 | SRI/SIE | DNSC | Indicatori de amenințare cibernetică | MOU permanent + fără date personale | Da | IG, ANSPDCP |
| T8 | DNSC | SRI/SIE | Indicatori APT de stat | MOU permanent | Da | IG, ANSPDCP |
| T9 | SRI/SIE | DIICOT | Pachet de probe cu mandat | Mandat SSC + lanț de custodie | Da | IG, JPC, ICCJ |
| T10 | DIICOT | ICCJ | Dosar de caz | Procedură penală | Da | Public (registrul instanței) |
| T11 | SRI/SIE | IG | Jurnale de audit + metadate de sistem | Drept legal de acces | Da | Intern IG |
| T12 | IG | JPC | Constatări de audit | Raportare legală | Da | JPC |
| T13 | ITAP | JPC | Rapoarte de validare tehnică | Mandat de expert contractat | Da | JPC |
| T14 | SRI/SIE | ANSPDCP | Notificări de procesare cu risc ridicat | GDPR + legea serviciilor | Da | ANSPDCP |
| T15 | SRI/SIE | CSAT | Evaluări strategice de amenințare | Agregat, fără date brute | Da | IG (doar existența) |
| T16 | CSAT | Președinție | Rezumate strategice | Agregat | Da | IG (doar existența) |
| T17 | Avocatul Poporului | IG | Plângeri care declanșează verificări | Statutar | Da | IG, JPC (anonimizat) |
| T18 | JPC | SRI/SIE | Subpoena pentru fișiere specifice | Puterea parlamentară de subpoena | Da | Public (existența subpoenei) |

## 3.3 Legendă

- **Albastru** = broker fără stare (IADE).
- **Verde** = poartă judiciară (SSC).
- **Roz** = organe de supraveghere.
- **Neutru** = agenții civilianizate (fostele agenții „roșii" au dispărut).
