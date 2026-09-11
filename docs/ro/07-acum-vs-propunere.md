# 07 · Acum vs Propunere — Comparație detaliată

> **Convenție:** instituțiile sunt desemnate prin **acronimele românești** în tot acest document
> și în demo. Extinderea în română/engleză este dată o singură dată, în paranteze, la prima
> apariție. Instituțiile noi create de reformă sunt marcate **NOU**.

## 7.1 Cele două arhitecturi, față în față

| | Actual (baseline) | Propunere (reformă) |
| --- | --- | --- |
| **Topologie** | Două servicii militare de informații (SRI, SIE) plus STS, fiecare cu putere de date concentrată, neauditată; partajare bilaterală ad-hoc | Hub-and-spoke: **vault-uri de caz** ale agențiilor în jurul unui broker fără stare (**IADE**); datele rămân la sursă |
| **Poartă legală** | Colectare autorizată intern; informările parlamentare sunt filtrate | **SSC** (Curtea de Supraveghere Specializată) emite **tokenuri criptografice de mandat** care leagă fiecare transfer de conținut de un temei legal |
| **Transport** | Punct-la-punct, informal (C3) | Fiecare cerere/răspuns interinstituțional este rutat și validat prin **IADE** (T3–T6) |
| **Registru** | Fără pistă de audit independentă | **Registru de audit** append-only, înlănțuit prin hash-uri; intrare pentru fiecare tranzacție |
| **Supraveghere** | Informări și rapoarte anuale (C5, C6, C9) | **IG** acces complet la jurnalele de audit · **JPC** metrici agregate + putere de subpoena · **ITAP** validare tehnică · **ANSPDCP** notificări de risc ridicat |
| **Separarea civilă** | STS rulează interceptările tehnice; DNSC are flux informațional limitat | Interceptările sub SRI/SIE cu mandate judiciare; **DNSC** este singurul actor civil de apărare cibernetică (T7–T8) |

## 7.2 Instituție cu instituție

| Instituție | Astăzi | În propunere |
| --- | --- | --- |
| **PRES** — Președinția | Primește informări directe de la SIE (C9), fără vizibilitate parlamentară | Primește doar rezumate strategice agregate via CSAT (T16); existența informărilor este înregistrată |
| **CSAT** | Coordonează cu transparență limitată; intrări filtrate (C5) | Același rol strategic; informările înregistrate în registru; fără acces la date operaționale |
| **SRI** | Informații interne (militar); primește, stochează și corelează date fără un registru unic de mandate (C1) | Civilianizat; își păstrează propriul vault de caz criptat; partajare doar prin tokenuri SSC; SIGINT sub mandate judiciare |
| **SIE** | Informații externe (militar); operațiuni externe fără supraveghere internă (C2, C9) | Civilianizat; vault de caz; orice nexus intern necesită un token SSC (T3–T6) |
| **STS** | Interceptări tehnice pe infrastructură comună; separarea față de SRI neclară (C7) | Nu apare în starea țintă — capacitatea de interceptare trece sub SRI/SIE cu mandate SSC; securitatea comunicațiilor civile la DNSC |
| **SPP** — Protecție și Pază | Sub autoritate prezidențială; controlat doar de comisiile de apărare, slabe — fără comisie dedicată, fără subpoena; registre de protecție fără mandat (C11–C13) | Intră în regimul de mandate (W3); acces complet IG la audit (T20); notificări ANSPDCP (T21); puterea de subpoena a JPC se extinde la el (T18c); canalul direct de raportare către Președinție este închis |
| **DIICOT / PICCJ** | Primește sesizări, nu lanțuri de probe trasabile (C4) | Primește pachete de probe cu mandat și hash de lanț de custodie (T9) |
| **ICCJ** | Judecă fără validarea tehnică independentă a probelor digitale | Poate solicita validarea ITAP a integrității probelor (T10) |
| **JPC** | Primește informări filtrate; fără putere de subpoena (C6) | Metrici agregate implicit; putere de subpoena pentru fișiere specifice (T12, T18) |
| **ANSPDCP** | Notificată, dar serviciile invocă excepția securității naționale (C8) | Primește notificări de procesare cu risc ridicat, cu DPIA; excepția este restrânsă (T14) |
| **OMB** — Avocatul Poporului | Primește plângerile cetățenilor, cu vizibilitate limitată asupra serviciilor | Plângerile pot declanșa verificări IG (T17); calitate statutară |
| **DNSC** | Apărare cibernetică civilă, cu flux informațional limitat | Singurul actor civil de apărare cibernetică; indicatori de amenințare sub MOU; canal de escaladare APT (T7–T8) |
| **SSC** — Curtea de Supraveghere Specializată · **NOU** | — | Poartă judiciară: emite/respinge tokenuri de mandat după verificarea dublă (temei + specificitate) |
| **IADE** — Schimb de date interinstituțional · **NOU** | — | Broker fără stare: rutează cereri/răspunsuri, nu stochează niciodată conținut, înregistrează fiecare tranzacție în registrul de audit |
| **IG** — Inspector General · **NOU** | — | Supraveghere statutară independentă: acces complet la jurnalele de audit; fără conținut brut decât cu mandat separat |
| **ITAP** — Panel Tehnic Consultativ Independent · **NOU** | — | Validează afirmațiile tehnice; auditează sistemele (de ex. „IADE nu poate stoca conținut") |

## 7.3 Puncte slabe, beneficii și riscuri

| | Arhitectura actuală | Arhitectura propusă |
| --- | --- | --- |
| **Puncte slabe** | Putere de date concentrată, neauditată, în agenții militare; partajare ad-hoc fără trasabilitate la nivel de caz; supravegherea vede rezumate filtrate, nu date verificabile; fără pistă de audit independentă; procurorii primesc sesizări fără lanț de custodie; SPP (protecție și pază) răspunde doar comisiilor de apărare, slabe — cel mai subțire control dintre toate | Instituții noi (SSC, IADE, IG, ITAP) construite de la zero, fără precedent local; depinde de o disciplină riguroasă a cheilor criptografice; necesită legislație primară și finanțare susținută; partajarea e mai lentă decât viteza ad-hoc de astăzi |
| **Beneficii** | Viteza coordonării ad-hoc; flexibilitate operațională; control ierarhic simplu | Fiecare transfer de conținut legat de un token de mandat și înregistrat; lanț de custodie pentru procurori și instanțe; supraveghere cu vizibilitate reală (acces complet la audit / metrici agregate / subpoena); aliniat la jurisprudența CEDO și GDPR; atribuire și responsabilitate publică |
| **Riscuri** | Supraveghere dragnet fără legătură cu un caz; instrumentalizare politică; încălcări CEDO; erodarea încrederii publice; operațiuni de influență neatribuite | Blocaj sau aprobare formalistă la poarta SSC; scurgeri de metadate din registru; amenințare internă la broker (atenuată de lipsa stării); extinderea scopului dincolo de temeiurile statutare; o implementare pe jumătate ar putea fi mai rea decât baseline-ul — atenuat de validarea ITAP, supravegherea IG și o specificație deschisă |

## 7.4 Repere — sisteme de supraveghere din UE și din lume

| Țara | Model / mecanism | Împrumutat sau respins de propunere |
| --- | --- | --- |
| **Estonia (EE)** | X-Road: strat național de schimb de date — datele rămân la sursă, interogări pe bază de servicii, jurnalizare obligatorie cu semnături cu marcaj de timp; blockchain-ul KSI pentru integritatea registrelor | **Împrumutat:** tiparul broker fără stare + registru de audit înlănțuit prin hash-uri (IADE). Notă: X-Road deservește date guvernamentale neclasificate |
| **Germania (DE)** | Legea G10: autorizare ex-ante de către Comisia parlamentară G10 sau, pentru supravegherea externă a BND, de către Consiliul de control G10 (Kontrollrat), cu statut judiciar; supraveghere parlamentară PKGr, întărită după afacerea BND/NSA din 2015 | **Împrumutat:** poartă ex-ante independentă cu statut judiciar (SSC); întărirea statutară după scandal |
| **Franța (FR)** | Legea informațiilor din 2015 + CNCTR: autoritate independentă care emite avize ex-ante asupra tehnicilor autorizate de premier, cu puteri reale de inspecție; apel la Conseil d'État; control judiciar extins după hotărârile CJUE din 2021 | **Împrumutat:** control ex-ante independent + inspecție tehnică (SSC + ITAP) |
| **Țările de Jos (NL)** | Wiv 2017: comitetul de control CTIVD cu constatări obligatorii; TIB emite decizii ex-ante obligatorii pentru puterile speciale; reformat prin legea interimară din 2021, după referendumul din 2018 | **Împrumutat:** decizii ex-ante obligatorii și constatări ex-post obligatorii (SSC + IG) |
| **Belgia (BE)** | Comitetul I (Comité permanent R): supraveghere parlamentară cu puteri extinse de investigație; din 2023, Comisia BIM formată din judecători autorizează ex-ante metodele excepționale de date | **Împrumutat:** supraveghere stratificată parlamentară + judiciară (JPC + SSC) |
| **Norvegia (NO)** | Comitetul EOS (înființat în 1996): supraveghere parlamentară cu acces complet la toate dosarele serviciilor; rapoarte publice anuale | **Împrumutat:** supraveghere parlamentară cu acces complet și raportare publică (JPC) |
| **Suedia (SE)** | FIDO — Curtea de Informații Externe (2009) autorizează ex-ante interceptarea semnalelor de către FRA; SIN efectuează inspecții statutare | **Împrumutat:** instanță dedicată serviciilor de informații (SSC) |
| **Regatul Unit (UK)** | Investigatory Powers Act 2016: mandate aprobate de ministru și revizuite ex-ante de comisari judiciari (IPCO); tribunalul de plângeri IPT; puterile de colectare în masă restrânse după *Big Brother Watch v UK* (CEDO 2021) | **Împrumutat:** verificare ex-ante cu dublă încuietoare (SSC); garanții impuse de CEDO |
| **Canada (CA)** | CSE Act 2019: Comisarul de informații (judecători pensionați) pre-autorizează activitățile CSE; NSIRA efectuează control consolidat cu acces complet, plângeri și rapoarte publice | **Împrumutat — cel mai apropiat model:** autorizare ex-ante cvasi-judiciară + organ de control cu acces complet (SSC + IG) |
| **Statele Unite (US)** | Curtea FISA emite mandate ex-ante; criticată ca necontradictorială; programele de colectare în masă Section 702 contestate de la dezvăluirile Snowden; supraveghere prin PCLOB și comitetele Congresului | **Respins:** instanță necontradictorială și excepții de colectare în masă — testul de specificitate interzice colectarea dragnet |
| **Australia (AU)** | IGIS: inspector statutar cu anchete din oficiu și acces obligatoriu la dosarele agențiilor; comitetul parlamentar PJCIS | **Împrumutat:** modelul inspectorului cu puteri din oficiu (IG) |

## 7.5 Ce ne învață comparația

1. **Autorizarea judiciară ex-ante este norma UE** (Kontrollrat în DE, FIDO în SE, dubla încuietoare în UK, CNCTR în FR, Comisarul de informații în CA) — SSC nu este o excepție; România este în prezent excepția pentru că *nu* o are.
2. **Controlul ex-post trebuie să aibă dinți** — constatările obligatorii CTIVD (NL), accesul complet EOS (NO), puterile din oficiu IGIS (AU), controlul consolidat NSIRA (CA). IG din propunere le oglindește.
3. **Validarea tehnică este o funcție distinctă** — puterile de inspecție CNCTR (FR) și inspectorii IPCO (UK) arată că supravegherea are nevoie de capacitate tehnică; de aici ITAP.
4. **Colectarea în masă este modul recurent de eșec** — Section 702 (US) și regimurile UK pre-reformă au fost țintele hotărârilor CEDO/CJUE; testul de specificitate este răspunsul explicit al propunerii.
5. **Schimbul de date poate fi proiectat astfel încât datele să rămână la sursă** — X-Road din Estonia demonstrează tiparul broker-ului fără stare la scară națională, pentru date neclasificate; IADE aplică aceeași disciplină fluxurilor clasificate.

## 7.6 Întrebări deschise ridicate de comparație

- Volumul de lucru și încadrarea SSC — câți judecători, ce nivel de acces, ce termene de decizie pentru amenințări urgente?
- Scurgerile de metadate — registrul e vizibil supravegherii; cum se redactează sursele și metodele fără a rupe verificabilitatea?
- Independența finanțării — cum sunt protejate bugetele IG și ITAP față de agențiile pe care le supraveghează?
- Alinierea la CEDO — cum se mapează fluxurile T pe garanțiile din *Big Brother Watch v UK* și *Centrum för Rättvisa v Suedia* (notificare, metrici publice, remedii)?
