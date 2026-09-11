# 02 · Fluxurile de date din starea actuală (baseline pentru reformă)

## 2.1 Tabelul fluxurilor — starea actuală

| # | Sursă | Destinație | Tip de date | Temei legal | Auditabilitate | Risc |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | Colectare SRI | Baza internă SRI | SIGINT/HUMINT/OSINT brut | Autorizare internă | Scăzută | Stocare în masă, fără mandat extern |
| C2 | Colectare SIE | Baza internă SIE | Informații externe | Autorizare internă | Scăzută | Fără supraveghere internă a operațiunilor externe |
| C3 | SRI ↔ SIE | Partajare ad-hoc | Mixte | Decizie CSAT / informal | Foarte scăzută | Fără trasabilitate la nivel de caz |
| C4 | SRI → DIICOT | Sesizări | Rezumate de probe | Codul de procedură penală | Medie | Dezvăluire selectivă |
| C5 | SRI → CSAT | Informări | Evaluări | Legea securității naționale | Scăzută | Filtrare politică |
| C6 | SRI → Comisia parlamentară | Rapoarte | Rezumate | Legea 14/1992 | Scăzută | Fără acces brut, fără subpoena |
| C7 | STS → SRI | Interceptări tehnice | Metadate/conținut | Mandat (teoretic) | Medie | Infrastructură comună, separare neclară |
| C8 | SRI → ANSPDCP | Notificări | Descrieri de procesare | GDPR / Legea 190/2018 | Scăzută | Abuz de excepția pentru serviciile de informații |
| C9 | SIE → Președinție | Informări | Evaluări externe | Intern | Foarte scăzută | Fără vizibilitate parlamentară |
| C10 | SRI/SIE → Presă/public | Operațiuni de dezinformare | Narative | N/A | Nicio | Fără atribuire sau audit |
| C11 | Colectare SPP | Baza internă SPP | Jurnale de acces, dosare ale persoanelor protejate | Autorizare internă | Foarte scăzută | Stocare fără mandat; cel mai slab control dintre toate serviciile |
| C12 | SPP → Președinție | Rapoarte operaționale | Informații de protecție | Legea 191/1998 (autoritate prezidențială) | Scăzută | Lanț prezidențial fără verificare independentă |
| C13 | SPP → Comisiile de apărare | Rapoarte | Rezumate filtrate | Legea 191/1998 (control parlamentar) | Foarte scăzută | Cel mai slab control: fără comisie dedicată, fără subpoena |

## 2.2 Legendă

- **Roșu** = agenții cu putere de date concentrată, neauditată.
- **Galben** = organe de supraveghere cu acces limitat.

Vezi graful interactiv în aplicația demo (fila „Starea actuală") — nodurile și muchiile sunt clicabile pentru detalii.
