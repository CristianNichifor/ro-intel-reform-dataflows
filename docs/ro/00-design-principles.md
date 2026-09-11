# 00 · Principii de proiectare pentru arhitectura fluxurilor de date

| Principiu | Implicație pentru fluxurile de date |
| --- | --- |
| **Fără bază de date masivă unică** | Datele rămân la sursă; partajarea este bazată pe evenimente, nu pe depozitare centralizată |
| **Limitarea scopului** | Fiecare flux este legat de un temei legal (categorie de amenințare + ID de mandat) |
| **Handshake de la caz la caz** | Accesul interinstituțional necesită o tranzacție auditată și înregistrată cerere–aprobare |
| **Poartă judiciară** | Conținutul de supraveghere circulă doar printr-un token de mandat emis de instanța specializată |
| **Vizibilitate de supraveghere ≠ acces operațional** | Organele de supraveghere văd metadate și jurnale de audit, nu conținut operațional brut |
| **Agenții civile demilitarizate** | Fluxurile se termină în lanțuri de autoritate civile (Guvern / Parlament / Justiție) |

Starea țintă este o arhitectură de tip **hub-and-spoke cu tokenuri de mandat**:

- **Spițe (vault-uri de caz ale agențiilor):** fiecare agenție își păstrează propriile dosare de caz criptate, legate de scop.
- **Hub (Schimbul de date interinstituțional — IADE):** un broker minimal, fără stare, care nu stochează conținut, rutează cererile și răspunsurile între spițe, înregistrează fiecare tranzacție într-un registru de audit imutabil și necesită un token de mandat pentru orice transfer de conținut.
- **Registrul tokenurilor de mandat (SSC):** instanța specializată emite tokenuri criptografice legate de ID caz, temei legal (categorie de amenințare), identificatorii subiecților, fereastră de timp și agenția destinatară autorizată.
- **Registrul de audit:** append-only, verificabil criptografic; lizibil de IG, ITAP și JPC (cu redactări pentru surse/metode).
