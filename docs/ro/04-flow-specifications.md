# 04 · Specificații detaliate ale fluxurilor

## 4.1 Fluxul T3–T6: Handshake de date interinstituțional („Verificarea dublă" în acțiune)

Secvența:

1. **Analistul SRI** identifică o nevoie de informații externe deținute de SIE, relevante pentru un caz intern.
2. Analistul creează un **Obiect de cerere** care conține: ID caz (intern SRI), temei legal (de ex. „spionaj extern de stat"), identificatorii subiecților (minimizați), câmpurile de date solicitate, justificarea.
3. Obiectul de cerere este trimis către **SSC** pentru un token de mandat interinstituțional.
4. **SSC validează:** temeiul se încadrează în sfera statutară de securitate națională; cererea nu este o expediție de pescuit (testul de specificitate); nu există mijloace mai puțin intruzive disponibile.
5. SSC emite un **token criptografic de mandat** legat de hash-ul cererii.
6. SRI trimite Cererea + Tokenul către **IADE**.
7. **IADE:** validează semnătura tokenului; înregistrează tranzacția (ID cerere, timestamp, agenții, ID token, categorie de temei — *nu conținut*); rutează cererea către SIE.
8. **SIE** validează tokenul, preia datele potrivite din vault, aplică **filtrul de minimizare** și returnează un **Pachet de răspuns** către IADE.
9. IADE înregistrează metadatele răspunsului (dimensiune, câmpuri, ID token) și rutează către SRI.
10. SRI decriptează răspunsul, îl atașează la dosarul de caz și înregistrează ID token în propriul jurnal de audit.
11. **IG** și **ITAP** pot interoga registrul de audit IADE pentru toate tranzacțiile care corespund unui ID de caz, unei agenții sau unei ferestre de timp.

## 4.2 Fluxul T7–T8: Informații ↔ Apărare cibernetică civilă (DNSC)

**Principiu:** agențiile de informații se concentrează pe spionajul cibernetic de stat; DNSC gestionează apărarea cibernetică civilă (infrastructură critică, sector privat, cetățeni).

**Regulile fluxului:**

- **SRI/SIE → DNSC:** doar indicatori tehnici (IP-uri, hash-uri, TTP-uri) fără date personale, decât cu mandat.
- **DNSC → SRI/SIE:** indicatori APT de stat care depășesc capacitatea civilă de răspuns.
- **MOU permanent** care definește: schema de date (compatibilă STIX/TAXII); înregistrarea automată în registrul de audit IADE; notificarea ANSPDCP pentru orice transfer de date personale; revizuire anuală comună de IG și ITAP.

## 4.3 Fluxul T9–T10: Informații → Parchet → Instanțe

**Cerințele lanțului de custodie:**

- Pachetul de probe trebuie să includă: ID token SSC; hash-ul din registrul de audit IADE pentru toată proveniența datelor; certificatul de minimizare; instrucțiuni de manipulare (clasificare, limite de diseminare).
- DIICOT poate solicita verificarea legalității pachetului de către IG înainte de depunere.
- ICCJ poate solicita validarea tehnică a integrității probelor digitale de către ITAP.

## 4.4 Fluxul T11–T18: Fluxurile de date ale supravegherii

**Distincția-cheie:**

- **IG** primește acces complet la jurnalele de audit (metadate + înregistrări de tranzacții), dar nu conținut brut decât cu un mandat separat.
- **JPC** primește metrici agregate (numărul de mandate, categorii, agenții) + putere de subpoena pentru fișiere specifice.
- **ITAP** primește acces la sisteme pentru validarea afirmațiilor tehnice (de ex. „IADE nu poate stoca conținut").
- **ANSPDCP** primește notificări privind procesarea cu risc ridicat.
- **Avocatul Poporului** poate declanșa verificări IG pe baza plângerilor cetățenilor.
