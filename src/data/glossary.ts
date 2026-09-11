import type { Localized } from '../i18n/messages'

export const GLOSSARY: Record<string, Localized> = {
  csat: {
    en: 'Supreme Council of National Defence — the top strategic coordination body, chaired by the President.',
    ro: 'Consiliul Suprem de Apărare a Țării — organismul suprem de coordonare strategică, condus de Președinte.',
  },
  sri: {
    en: 'Romanian Intelligence Service — domestic intelligence agency (military in the current state, civilianized in the target state).',
    ro: 'Serviciul Român de Informații — agenția de informații interne (militară în starea actuală, civilianizată în starea țintă).',
  },
  sie: {
    en: 'Foreign Intelligence Service — collects intelligence outside Romania.',
    ro: 'Serviciul de Informații Externe — colectează informații în afara României.',
  },
  sts: {
    en: 'Special Telecommunications Service — state agency running telecom/IT infrastructure and intercepts.',
    ro: 'Serviciul de Telecomunicații Speciale — agenție de stat care operează infrastructura telecom/IT și interceptările.',
  },
  ssc: {
    en: 'Specialized Surveillance Court — the judicial gate that issues or denies warrant tokens.',
    ro: 'Curtea de Supraveghere Specializată — poarta judiciară care emite sau respinge tokenurile de mandat.',
  },
  iade: {
    en: 'Inter-Agency Data Exchange — the stateless broker that routes data requests between agencies and logs every transaction.',
    ro: 'Schimb de date interinstituțional — brokerul fără stare care rutează cererile de date între agenții și înregistrează fiecare tranzacție.',
  },
  ig: {
    en: 'Inspector General — independent oversight body with full audit-log access, but no raw content unless warranted.',
    ro: 'Inspector General — organ independent de supraveghere cu acces complet la jurnalele de audit, dar fără conținut brut decât cu mandat.',
  },
  jpc: {
    en: 'Joint Parliamentary Committee — parliamentary oversight; receives aggregated metrics and can subpoena specific files.',
    ro: 'Comisia parlamentară comună — supraveghere parlamentară; primește metrici agregate și poate emite subpoena pentru fișiere specifice.',
  },
  itap: {
    en: 'Independent Technical Advisory Panel — expert body that validates technical claims and audits systems.',
    ro: 'Panel Tehnic Consultativ Independent — organism de experți care validează afirmațiile tehnice și auditează sistemele.',
  },
  dnsc: {
    en: 'National Cyber Security Directorate — civilian cyber defense agency.',
    ro: 'Directoratul Național de Securitate Cibernetică — agenția civilă de apărare cibernetică.',
  },
  diicot: {
    en: 'Directorate for Investigating Organized Crime and Terrorism — the prosecution body.',
    ro: 'Direcția de Investigare a Infracțiunilor de Criminalitate Organizată și Terorism — organul de urmărire penală.',
  },
  piccj: {
    en: "Public Ministry / Prosecutor's Office attached to the High Court of Cassation and Justice.",
    ro: 'Ministerul Public / Parchetul de pe lângă Înalta Curte de Casație și Justiție.',
  },
  iccj: {
    en: "High Court of Cassation and Justice — Romania's supreme court.",
    ro: 'Înalta Curte de Casație și Justiție — instanța supremă a României.',
  },
  anspdcp: {
    en: 'National Supervisory Authority for Personal Data Processing — the Romanian data protection authority.',
    ro: 'Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal — autoritatea română de protecție a datelor.',
  },
  ombudsman: {
    en: "People's Advocate — civil rights institution that receives citizen complaints.",
    ro: 'Avocatul Poporului — instituția pentru drepturi civile care primește plângerile cetățenilor.',
  },
  sigint: {
    en: 'Signals intelligence — interception of communications and electronic signals.',
    ro: 'Informații din semnale — interceptarea comunicațiilor și a semnalelor electronice.',
  },
  humint: {
    en: 'Human intelligence — information gathered from human sources.',
    ro: 'Informații din surse umane — informații obținute de la surse umane.',
  },
  osint: {
    en: 'Open-source intelligence — information collected from publicly available sources.',
    ro: 'Informații din surse deschise — informații colectate din surse publice.',
  },
  apt: {
    en: 'Advanced persistent threat — a sophisticated, sustained cyber-espionage actor, typically state-sponsored.',
    ro: 'Amenințare persistentă avansată — un actor de spionaj cibernetic sofisticat și susținut, de obicei sponsorizat de stat.',
  },
  ttp: {
    en: 'Tactics, techniques and procedures — how an adversary operates.',
    ro: 'Tactici, tehnici și proceduri — modul în care operează un adversar.',
  },
  stix: {
    en: 'Structured Threat Information Expression — a standard format for sharing cyber threat data.',
    ro: 'Structured Threat Information Expression — format standard pentru partajarea datelor despre amenințări cibernetice.',
  },
  taxii: {
    en: 'Trusted Automated Exchange of Intelligence Information — transport protocol for STIX data.',
    ro: 'Trusted Automated Exchange of Intelligence Information — protocol de transport pentru datele STIX.',
  },
  gdpr: {
    en: 'General Data Protection Regulation — EU law governing the processing of personal data.',
    ro: 'Regulamentul general privind protecția datelor — legea UE care reglementează prelucrarea datelor personale.',
  },
  mou: {
    en: 'Memorandum of Understanding — a standing agreement defining how two agencies share data.',
    ro: 'Memorandum de înțelegere — acord permanent care definește modul în care două agenții partajează date.',
  },
  'warrant token': {
    en: 'A cryptographic authorization issued by the SSC, binding a data request to a legal predicate, subjects, time window and receiving agency.',
    ro: 'O autorizație criptografică emisă de SSC, care leagă o cerere de date de un temei legal, subiecți, fereastră de timp și agenție destinatară.',
  },
  predicate: {
    en: 'The statutory national-security threat category that legally justifies a data request.',
    ro: 'Categoria statutară de amenințare la securitatea națională care justifică legal o cerere de date.',
  },
  'double-check': {
    en: 'SSC validation of both the legal predicate and the specificity of a request.',
    ro: 'Validarea de către SSC atât a temeiului legal, cât și a specificității unei cereri.',
  },
  'specificity test': {
    en: 'The requirement that a request targets specific subjects and data — no fishing expeditions.',
    ro: 'Cerința ca o cerere să vizeze subiecți și date specifice — fără expediții de pescuit.',
  },
  'minimization filter': {
    en: 'Automated process that strips irrelevant personal data before transfer.',
    ro: 'Proces automatizat care elimină datele personale irelevante înainte de transfer.',
  },
  'chain-of-custody': {
    en: 'Cryptographic proof linking evidence to its audit-ledger entries.',
    ro: 'Dovadă criptografică care leagă probele de înregistrările din registrul de audit.',
  },
  'case vault': {
    en: 'Agency-specific encrypted storage for case files.',
    ro: 'Stocare criptată specifică agenției pentru dosarele de caz.',
  },
  'audit ledger': {
    en: 'An append-only, hash-chained log of all data-flow transactions.',
    ro: 'Un jurnal append-only, înlănțuit prin hash-uri, al tuturor tranzacțiilor de fluxuri de date.',
  },
  'hash chain': {
    en: 'An append-only sequence where each entry commits to the previous one, making tampering detectable.',
    ro: 'O secvență append-only în care fiecare intrare se leagă de cea anterioară, făcând manipularea detectabilă.',
  },
  'request object': {
    en: 'The structured request an analyst creates: case ID, predicate, subjects, fields, justification.',
    ro: 'Cererea structurată pe care o creează un analist: ID caz, temei, subiecți, câmpuri, justificare.',
  },
  subpoena: {
    en: 'A legal order compelling an agency to produce specific files.',
    ro: 'Un ordin legal care obligă o agenție să producă fișiere specifice.',
  },
  referral: {
    en: 'A file an agency forwards to prosecutors, summarizing evidence.',
    ro: 'Un dosar pe care o agenție îl transmite procurorilor, rezumând probele.',
  },
  dragnet: {
    en: 'Indiscriminate mass collection without case linkage — prohibited by the specificity test.',
    ro: 'Colectare în masă nediscriminatorie, fără legătură cu un caz — interzisă de testul de specificitate.',
  },
  handshake: {
    en: 'The request–token–route–response cycle between agencies via the IADE broker.',
    ro: 'Ciclul cerere–token–rutare–răspuns între agenții prin brokerul IADE.',
  },
  hmac: {
    en: 'Hash-based message authentication code — used in this demo as a stand-in for Ed25519 signatures.',
    ro: 'Cod de autentificare a mesajelor bazat pe hash — folosit în acest demo ca substitut pentru semnăturile Ed25519.',
  },
  ed25519: {
    en: 'A fast elliptic-curve signature scheme specified for warrant tokens in the architecture.',
    ro: 'O schemă rapidă de semnătură pe curbe eliptice, specificată pentru tokenurile de mandat în arhitectură.',
  },
  'sha-256': {
    en: 'A cryptographic hash function used to chain the audit ledger.',
    ro: 'O funcție hash criptografică folosită pentru înlănțuirea registrului de audit.',
  },
  'warrant id': {
    en: 'The unique identifier of the SSC warrant covering a specific data collection.',
    ro: 'Identificatorul unic al mandatului SSC care acoperă o anumită colectare de date.',
  },
  'law 14/1992': {
    en: 'Law on the organization and functioning of SRI.',
    ro: 'Legea privind organizarea și funcționarea SRI.',
  },
  'law 190/2018': {
    en: 'Law implementing GDPR for intelligence purposes in Romania.',
    ro: 'Legea de punere în aplicare a GDPR pentru scopuri de informații în România.',
  },
}
