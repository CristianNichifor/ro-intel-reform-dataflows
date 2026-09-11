import type { Localized } from '../i18n/messages'

export interface InstitutionRow {
  id: string
  full: Localized
  today: Localized
  proposal: Localized
  isNew?: boolean
}

export interface SwotRow {
  key: 'weaknesses' | 'benefits' | 'risks'
  current: Localized
  proposal: Localized
}

export interface IntlRow {
  id: string
  country: Localized
  model: Localized
  lesson: Localized
}

export const institutionComparison: InstitutionRow[] = [
  {
    id: 'PRES',
    full: { en: 'Presidency', ro: 'Președinția' },
    today: {
      en: 'Receives direct SIE briefings (C9) with no parliamentary visibility.',
      ro: 'Primește informări directe de la SIE (C9), fără vizibilitate parlamentară.',
    },
    proposal: {
      en: 'Receives only aggregated strategic summaries via CSAT (T16); the existence of briefings is logged.',
      ro: 'Primește doar rezumate strategice agregate via CSAT (T16); existența informărilor este înregistrată.',
    },
  },
  {
    id: 'CSAT',
    full: {
      en: 'Supreme Council of National Defence',
      ro: 'Consiliul Suprem de Apărare a Țării',
    },
    today: {
      en: 'Coordinates with limited transparency; filtered inputs (C5).',
      ro: 'Coordonează cu transparență limitată; intrări filtrate (C5).',
    },
    proposal: {
      en: 'Same strategic role; briefings logged on the ledger; no operational data access.',
      ro: 'Același rol strategic; informările înregistrate în registru; fără acces la date operaționale.',
    },
  },
  {
    id: 'SRI',
    full: { en: 'Romanian Intelligence Service', ro: 'Serviciul Român de Informații' },
    today: {
      en: 'Domestic intelligence (military); receives, stores and correlates data without a unified warrant ledger (C1).',
      ro: 'Informații interne (militar); primește, stochează și corelează date fără un registru unic de mandate (C1).',
    },
    proposal: {
      en: 'Civilianized; keeps its own encrypted case vault; sharing only via SSC warrant tokens; SIGINT under judicial warrants.',
      ro: 'Civilianizat; își păstrează propriul vault de caz criptat; partajare doar prin tokenuri SSC; SIGINT sub mandate judiciare.',
    },
  },
  {
    id: 'SIE',
    full: { en: 'Foreign Intelligence Service', ro: 'Serviciul de Informații Externe' },
    today: {
      en: 'Foreign intelligence (military); foreign operations with no domestic oversight (C2, C9).',
      ro: 'Informații externe (militar); operațiuni externe fără supraveghere internă (C2, C9).',
    },
    proposal: {
      en: 'Civilianized; case vault; any domestic nexus requires an SSC token (T3–T6).',
      ro: 'Civilianizat; vault de caz; orice nexus intern necesită un token SSC (T3–T6).',
    },
  },
  {
    id: 'STS',
    full: {
      en: 'Special Telecommunications Service',
      ro: 'Serviciul de Telecomunicații Speciale',
    },
    today: {
      en: 'Technical intercepts on shared infrastructure; separation from SRI unclear (C7).',
      ro: 'Interceptări tehnice pe infrastructură comună; separarea față de SRI neclară (C7).',
    },
    proposal: {
      en: 'Not present in the target state — interception capacity moves under SRI/SIE with SSC warrants; civilian comms security to DNSC.',
      ro: 'Nu apare în starea țintă — capacitatea de interceptare trece sub SRI/SIE cu mandate SSC; securitatea comunicațiilor civile la DNSC.',
    },
  },
  {
    id: 'DIICOT',
    full: { en: 'DIICOT / PICCJ — Prosecution', ro: 'DIICOT / PICCJ — Procurori' },
    today: {
      en: 'Receives referrals, not traceable evidence chains (C4).',
      ro: 'Primește sesizări, nu lanțuri de probe trasabile (C4).',
    },
    proposal: {
      en: 'Receives warranted evidence packages with chain-of-custody hashes (T9).',
      ro: 'Primește pachete de probe cu mandat și hash de lanț de custodie (T9).',
    },
  },
  {
    id: 'ICCJ',
    full: { en: 'High Court of Cassation and Justice', ro: 'Înalta Curte de Casație și Justiție' },
    today: {
      en: 'Adjudicates without independent technical validation of digital evidence.',
      ro: 'Judecă fără validarea tehnică independentă a probelor digitale.',
    },
    proposal: {
      en: 'Can request ITAP validation of evidence integrity (T10).',
      ro: 'Poate solicita validarea ITAP a integrității probelor (T10).',
    },
  },
  {
    id: 'JPC',
    full: { en: 'Joint Parliamentary Committee', ro: 'Comisia parlamentară comună' },
    today: {
      en: 'Receives filtered briefings; no subpoena power (C6).',
      ro: 'Primește informări filtrate; fără putere de subpoena (C6).',
    },
    proposal: {
      en: 'Aggregated metrics by default; subpoena power for specific files (T12, T18).',
      ro: 'Metrici agregate implicit; putere de subpoena pentru fișiere specifice (T12, T18).',
    },
  },
  {
    id: 'ANSPDCP',
    full: { en: 'Data Protection Authority', ro: 'Autoritatea pentru Protecția Datelor' },
    today: {
      en: 'Notified, but the services lean on the national-security exception (C8).',
      ro: 'Notificată, dar serviciile invocă excepția securității naționale (C8).',
    },
    proposal: {
      en: 'Receives high-risk processing notifications with DPIAs; the exception is narrowed (T14).',
      ro: 'Primește notificări de procesare cu risc ridicat, cu DPIA; excepția este restrânsă (T14).',
    },
  },
  {
    id: 'OMB',
    full: { en: 'Ombudsman (Avocatul Poporului)', ro: 'Avocatul Poporului' },
    today: {
      en: 'Receives citizen complaints with limited visibility into the services.',
      ro: 'Primește plângerile cetățenilor, cu vizibilitate limitată asupra serviciilor.',
    },
    proposal: {
      en: 'Complaints can trigger IG reviews (T17); statutory standing.',
      ro: 'Plângerile pot declanșa verificări IG (T17); calitate statutară.',
    },
  },
  {
    id: 'DNSC',
    full: { en: 'National Cyber Security Directorate', ro: 'Directoratul Național de Securitate Cibernetică' },
    today: {
      en: 'Civilian cyber defense, information-limited.',
      ro: 'Apărare cibernetică civilă, cu flux informațional limitat.',
    },
    proposal: {
      en: 'Sole civilian cyber defense; threat indicators under MOU; APT escalation channel (T7–T8).',
      ro: 'Singurul actor civil de apărare cibernetică; indicatori de amenințare sub MOU; canal de escaladare APT (T7–T8).',
    },
  },
  {
    id: 'SSC',
    full: { en: 'Specialized Surveillance Court', ro: 'Curtea de Supraveghere Specializată' },
    today: { en: '—', ro: '—' },
    proposal: {
      en: 'Judicial gate: issues/denies warrant tokens after the double-check (predicate + specificity).',
      ro: 'Poartă judiciară: emite/respinge tokenuri de mandat după verificarea dublă (temei + specificitate).',
    },
    isNew: true,
  },
  {
    id: 'IADE',
    full: { en: 'Inter-Agency Data Exchange', ro: 'Schimb de date interinstituțional' },
    today: { en: '—', ro: '—' },
    proposal: {
      en: 'Stateless broker: routes requests/responses, never stores content, logs every transaction to the audit ledger.',
      ro: 'Broker fără stare: rutează cereri/răspunsuri, nu stochează niciodată conținut, înregistrează fiecare tranzacție în registrul de audit.',
    },
    isNew: true,
  },
  {
    id: 'IG',
    full: { en: 'Inspector General', ro: 'Inspector General' },
    today: { en: '—', ro: '—' },
    proposal: {
      en: 'Independent statutory oversight: full audit-log access; no raw content without a separate warrant.',
      ro: 'Supraveghere statutară independentă: acces complet la jurnalele de audit; fără conținut brut decât cu mandat separat.',
    },
    isNew: true,
  },
  {
    id: 'ITAP',
    full: { en: 'Independent Technical Advisory Panel', ro: 'Panel Tehnic Consultativ Independent' },
    today: { en: '—', ro: '—' },
    proposal: {
      en: 'Validates technical claims; audits systems (e.g. “IADE cannot store content”).',
      ro: 'Validează afirmațiile tehnice; auditează sistemele (de ex. „IADE nu poate stoca conținut”).',
    },
    isNew: true,
  },
]

export const swotComparison: SwotRow[] = [
  {
    key: 'weaknesses',
    current: {
      en: 'Concentrated, unaudited data power in military agencies; ad-hoc sharing without case-level traceability; oversight sees filtered summaries, not verifiable data; no independent audit trail; prosecutors get referrals without chain-of-custody.',
      ro: 'Putere de date concentrată, neauditată, în agenții militare; partajare ad-hoc fără trasabilitate la nivel de caz; supravegherea vede rezumate filtrate, nu date verificabile; fără pistă de audit independentă; procurorii primesc sesizări fără lanț de custodie.',
    },
    proposal: {
      en: 'New institutions (SSC, IADE, IG, ITAP) must be built from scratch with no local precedent; depends on disciplined cryptographic key management; needs primary legislation and sustained funding; sharing is slower than today’s ad-hoc speed.',
      ro: 'Instituții noi (SSC, IADE, IG, ITAP) construite de la zero, fără precedent local; depinde de o disciplină riguroasă a cheilor criptografice; necesită legislație primară și finanțare susținută; partajarea e mai lentă decât viteza ad-hoc de astăzi.',
    },
  },
  {
    key: 'benefits',
    current: {
      en: 'Speed of ad-hoc coordination; operational flexibility; simple top-down control.',
      ro: 'Viteza coordonării ad-hoc; flexibilitate operațională; control ierarhic simplu.',
    },
    proposal: {
      en: 'Every content transfer bound to a warrant token and logged; chain-of-custody for prosecutors and courts; oversight with real visibility (full audit access / aggregated metrics / subpoena); aligned with ECHR case law and GDPR; attribution and public accountability.',
      ro: 'Fiecare transfer de conținut legat de un token de mandat și înregistrat; lanț de custodie pentru procurori și instanțe; supraveghere cu vizibilitate reală (acces complet la audit / metrici agregate / subpoena); aliniat la jurisprudența CEDO și GDPR; atribuire și responsabilitate publică.',
    },
  },
  {
    key: 'risks',
    current: {
      en: 'Dragnet surveillance without case linkage; political instrumentalization; ECHR violations; erosion of public trust; unattributed influence operations.',
      ro: 'Supraveghere dragnet fără legătură cu un caz; instrumentalizare politică; încălcări CEDO; erodarea încrederii publice; operațiuni de influență neatribuite.',
    },
    proposal: {
      en: 'Token-gate bottleneck or rubber-stamping at SSC; metadata leakage from the ledger; insider threat at the broker (mitigated by statelessness); scope creep beyond statutory predicates; a half-built implementation could be worse than the baseline — mitigated by ITAP validation, IG oversight and an open spec.',
      ro: 'Blocaj sau aprobare formalistă la poarta SSC; scurgeri de metadate din registru; amenințare internă la broker (atenuată de lipsa stării); extinderea scopului dincolo de temeiurile statutare; o implementare pe jumătate ar putea fi mai rea decât baseline-ul — atenuat de validarea ITAP, supravegherea IG și o specificație deschisă.',
    },
  },
]

export const internationalSystems: IntlRow[] = [
  {
    id: 'EE',
    country: { en: 'Estonia', ro: 'Estonia' },
    model: {
      en: 'X-Road: national data-exchange layer — data stays at the source, service-based queries, mandatory logging with timestamped signatures; KSI blockchain for registry integrity.',
      ro: 'X-Road: strat național de schimb de date — datele rămân la sursă, interogări pe bază de servicii, jurnalizare obligatorie cu semnături cu marcaj de timp; blockchain-ul KSI pentru integritatea registrelor.',
    },
    lesson: {
      en: 'BORROWED — the stateless broker + hash-chained audit ledger pattern (IADE). Note: X-Road serves non-classified government data.',
      ro: 'ÎMPRUMUTAT — tiparul broker fără stare + registru de audit înlănțuit prin hash-uri (IADE). Notă: X-Road deservește date guvernamentale neclasificate.',
    },
  },
  {
    id: 'DE',
    country: { en: 'Germany', ro: 'Germania' },
    model: {
      en: 'G10 Act: ex-ante authorization by the parliamentary G10 Commission or, for BND foreign surveillance, the independent G10 Review Board (Kontrollrat) with judicial standing; PKGr parliamentary oversight, tightened after the 2015 BND/NSA affair.',
      ro: 'Legea G10: autorizare ex-ante de către Comisia parlamentară G10 sau, pentru supravegherea externă a BND, de către Consiliul de control G10 (Kontrollrat), cu statut judiciar; supraveghere parlamentară PKGr, întărită după afacerea BND/NSA din 2015.',
    },
    lesson: {
      en: 'BORROWED — independent ex-ante gate with judicial standing (SSC); statutory tightening after scandal.',
      ro: 'ÎMPRUMUTAT — poartă ex-ante independentă cu statut judiciar (SSC); întărirea statutară după scandal.',
    },
  },
  {
    id: 'FR',
    country: { en: 'France', ro: 'Franța' },
    model: {
      en: '2015 Intelligence Act + CNCTR: independent authority issues ex-ante opinions on PM-authorized techniques, with real inspection powers; Conseil d’État appeal; judicial review expanded after the 2021 CJEU rulings.',
      ro: 'Legea informațiilor din 2015 + CNCTR: autoritate independentă care emite avize ex-ante asupra tehnicilor autorizate de premier, cu puteri reale de inspecție; apel la Conseil d’État; control judiciar extins după hotărârile CJUE din 2021.',
    },
    lesson: {
      en: 'BORROWED — ex-ante independent control + technical inspection (SSC + ITAP).',
      ro: 'ÎMPRUMUTAT — control ex-ante independent + inspecție tehnică (SSC + ITAP).',
    },
  },
  {
    id: 'NL',
    country: { en: 'Netherlands', ro: 'Țările de Jos' },
    model: {
      en: 'Wiv 2017: CTIVD review committee with binding findings; TIB issues binding ex-ante decisions for special powers; reformed by the interim law of 2021 after the 2018 referendum.',
      ro: 'Wiv 2017: comitetul de control CTIVD cu constatări obligatorii; TIB emite decizii ex-ante obligatorii pentru puterile speciale; reformat prin legea interimară din 2021, după referendumul din 2018.',
    },
    lesson: {
      en: 'BORROWED — binding ex-ante decisions and binding post-hoc findings (SSC + IG).',
      ro: 'ÎMPRUMUTAT — decizii ex-ante obligatorii și constatări ex-post obligatorii (SSC + IG).',
    },
  },
  {
    id: 'BE',
    country: { en: 'Belgium', ro: 'Belgia' },
    model: {
      en: 'Committee I (Comité permanent R): parliamentary oversight with far-reaching investigative powers; since 2023 the BIM Commission of judges authorizes exceptional data methods ex ante.',
      ro: 'Comitetul I (Comité permanent R): supraveghere parlamentară cu puteri extinse de investigație; din 2023, Comisia BIM formată din judecători autorizează ex-ante metodele excepționale de date.',
    },
    lesson: {
      en: 'BORROWED — layered parliamentary + judicial oversight (JPC + SSC).',
      ro: 'ÎMPRUMUTAT — supraveghere stratificată parlamentară + judiciară (JPC + SSC).',
    },
  },
  {
    id: 'NO',
    country: { en: 'Norway', ro: 'Norvegia' },
    model: {
      en: 'EOS Committee (est. 1996): Storting oversight with full access to all service files; annual public reports.',
      ro: 'Comitetul EOS (înființat în 1996): supraveghere parlamentară cu acces complet la toate dosarele serviciilor; rapoarte publice anuale.',
    },
    lesson: {
      en: 'BORROWED — full-access parliamentary oversight with public reporting (JPC).',
      ro: 'ÎMPRUMUTAT — supraveghere parlamentară cu acces complet și raportare publică (JPC).',
    },
  },
  {
    id: 'SE',
    country: { en: 'Sweden', ro: 'Suedia' },
    model: {
      en: 'FIDO — Foreign Intelligence Court (2009) authorizes FRA signals intelligence ex ante; SIN performs statutory inspections.',
      ro: 'FIDO — Curtea de Informații Externe (2009) autorizează ex-ante interceptarea semnalelor de către FRA; SIN efectuează inspecții statutare.',
    },
    lesson: {
      en: 'BORROWED — dedicated intelligence court (SSC).',
      ro: 'ÎMPRUMUTAT — instanță dedicată serviciilor de informații (SSC).',
    },
  },
  {
    id: 'UK',
    country: { en: 'United Kingdom', ro: 'Regatul Unit' },
    model: {
      en: 'Investigatory Powers Act 2016: warrants approved by the minister and reviewed ex ante by Judicial Commissioners (IPCO); IPT complaints tribunal; bulk powers narrowed after Big Brother Watch v UK (ECHR 2021).',
      ro: 'Investigatory Powers Act 2016: mandate aprobate de ministru și revizuite ex-ante de comisari judiciari (IPCO); tribunalul de plângeri IPT; puterile de colectare în masă restrânse după Big Brother Watch v UK (CEDO 2021).',
    },
    lesson: {
      en: 'BORROWED — double-lock ex-ante review (SSC); ECHR-driven safeguards.',
      ro: 'ÎMPRUMUTAT — verificare ex-ante cu dublă încuietoare (SSC); garanții impuse de CEDO.',
    },
  },
  {
    id: 'CA',
    country: { en: 'Canada', ro: 'Canada' },
    model: {
      en: 'CSE Act 2019: the Intelligence Commissioner (retired judges) pre-authorizes CSE activities; NSIRA conducts consolidated review with full access, complaints and public reports.',
      ro: 'CSE Act 2019: Comisarul de informații (judecători pensionați) pre-autorizează activitățile CSE; NSIRA efectuează control consolidat cu acces complet, plângeri și rapoarte publice.',
    },
    lesson: {
      en: 'BORROWED — closest model: ex-ante quasi-judicial authorization + full-access reviewer (SSC + IG).',
      ro: 'ÎMPRUMUTAT — cel mai apropiat model: autorizare ex-ante cvasi-judiciară + organ de control cu acces complet (SSC + IG).',
    },
  },
  {
    id: 'US',
    country: { en: 'United States', ro: 'Statele Unite' },
    model: {
      en: 'FISA Court issues ex-ante warrants; criticized as non-adversarial; Section 702 bulk programs contested since the Snowden disclosures; oversight via PCLOB and congressional committees.',
      ro: 'Curtea FISA emite mandate ex-ante; criticată ca necontradictorială; programele de colectare în masă Section 702 contestate de la dezvăluirile Snowden; supraveghere prin PCLOB și comitetele Congresului.',
    },
    lesson: {
      en: 'REJECTED — non-adversarial court and bulk carve-outs; the specificity test forbids dragnet collection.',
      ro: 'RESPINS — instanță necontradictorială și excepții de colectare în masă; testul de specificitate interzice colectarea dragnet.',
    },
  },
  {
    id: 'AU',
    country: { en: 'Australia', ro: 'Australia' },
    model: {
      en: 'IGIS: statutory inspector with own-motion inquiries and compelled access to agency records; PJCIS parliamentary committee.',
      ro: 'IGIS: inspector statutar cu anchete din oficiu și acces obligatoriu la dosarele agențiilor; comitetul parlamentar PJCIS.',
    },
    lesson: {
      en: 'BORROWED — inspector model with own-motion powers (IG).',
      ro: 'ÎMPRUMUTAT — modelul inspectorului cu puteri din oficiu (IG).',
    },
  },
]
