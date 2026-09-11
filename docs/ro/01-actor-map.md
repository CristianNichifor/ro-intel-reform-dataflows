# 01 · Harta actorilor instituționali (noduri)

## 1.1 Actorii din starea actuală (pre-reformă)

```
┌───────────────────────────────────────────────┐
│ EXECUTIV / ADMINISTRAȚIA PREZIDENȚIALĂ        │
│ • CSAT (Consiliul Suprem de Apărare a Țării)  │
│ • Administrația Prezidențială                 │
└───────────────────────────────────────────────┘
            │              │              │
            ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌───────────────────┐
│ SRI         │  │ SIE         │  │ STS (Telecom/IT)  │
│ (intern)    │  │ (extern)    │  │ + alte servicii   │
│ militar     │  │ militar     │  │ (SGP, SPP, DGPI)  │
└──────┬──────┘  └──────┬──────┘  └─────────┬─────────┘
       │                │                  │
       └───────┬────────┴────────┬─────────┘
               ▼                 ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ Secretariat CSAT │  │ DIICOT / PICCJ   │
    │ (coordonare)     │  │ (procurori)      │
    └────────┬─────────┘  └────────┬─────────┘
             ▼                     ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ Comisia          │  │ Înalta Curte de  │
    │ parlamentară     │  │ Casație (ICCJ)   │
    │ comună (SRI/SIE) │  └──────────────────┘
    └──────────────────┘
```

**Patologiile fluxurilor din starea actuală:**

- SRI poate primi, stoca și corela date din mai multe surse fără un registru unic de mandate.
- CSAT acționează ca nod de coordonare cu transparență limitată.
- Comisia parlamentară primește informări *filtrate*, nu date verificabile.
- Procurorii primesc *sesizări*, nu lanțuri de probe trasabile.
- Nu există o pistă de audit independentă care să lege datele de un temei legal.

## 1.2 Actorii din starea țintă (post-reformă)

| Actor | Tip | Rol în fluxul de date |
| --- | --- | --- |
| **SRI** (civilianizat) | Agenție de informații interne | Sursă de informații interne; deține propriile dosare de caz |
| **SIE** (civilianizat) | Agenție de informații externe | Sursă de informații externe; deține propriile dosare de caz |
| **DNSC** | Apărare cibernetică civilă | Răspuns național la incidente cibernetice; primește indicatori de amenințare |
| **Curtea de Supraveghere Specializată (SSC)** | Judiciar | Emite/respinge tokenuri de mandat; deține registrul mandatelor |
| **Inspector General (IG)** | Supraveghere statutară independentă | Acces complet la jurnalele de audit; fără conținut brut decât cu mandat |
| **Comisia parlamentară comună (JPC)** | Supraveghere legislativă | Primește metrici agregate + poate emite subpoena pentru fișiere specifice |
| **Panel Tehnic Consultativ Independent (ITAP)** | Organ de experți atașat JPC | Validează afirmațiile tehnice; auditează sistemele |
| **CSAT** | Coordonare strategică | Primește evaluări de amenințare; fără date operaționale directe |
| **DIICOT / PICCJ** | Procurori | Primește pachete de probe cu mandat și lanț de custodie |
| **Autoritatea pentru Protecția Datelor (ANSPDCP)** | Supravegherea drepturilor civile | Primește notificări privind procesarea cu risc ridicat |
| **Avocatul Poporului** | Supravegherea drepturilor civile | Primește plângeri; poate declanșa verificări IG |
