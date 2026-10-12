import {
  LegalArticle,
  LegalStatute,
  CourtTier,
  CaseRecord,
  LegalNotification,
  BookmarkItem,
} from '../types';

export const CONSTITUTION_ARTICLES: LegalArticle[] = [
  {
    number: 'Article 14',
    title: 'Equality before Law & Equal Protection of the Laws',
    part: 'Part III – Fundamental Rights',
    description:
      'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    keyCaseLaws: [
      'E.P. Royappa v. State of Tamil Nadu (1974)',
      'Maneka Gandhi v. Union of India (1978)',
      'Shayara Bano v. Union of India (2017)',
    ],
    tags: ['Equality', 'Rule of Law', 'Arbitrariness'],
  },
  {
    number: 'Article 19',
    title: 'Protection of Certain Rights regarding Freedom of Speech, etc.',
    part: 'Part III – Fundamental Rights',
    description:
      'All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely throughout India.',
    keyCaseLaws: [
      'Romesh Thappar v. State of Madras (1950)',
      'Shreya Singhal v. Union of India (2015)',
      'Anuradha Bhasin v. Union of India (2020)',
    ],
    tags: ['Freedom of Speech', 'Reasonable Restrictions', 'Expression'],
  },
  {
    number: 'Article 21',
    title: 'Protection of Life and Personal Liberty',
    part: 'Part III – Fundamental Rights',
    description:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law (interpreted as due process).',
    keyCaseLaws: [
      'A.K. Gopalan v. State of Madras (1950)',
      'Maneka Gandhi v. Union of India (1978)',
      'K.S. Puttaswamy v. Union of India (Right to Privacy, 2017)',
    ],
    tags: ['Life & Liberty', 'Right to Privacy', 'Due Process'],
  },
  {
    number: 'Article 32',
    title: 'Remedies for Enforcement of Rights (Writs by Supreme Court)',
    part: 'Part III – Fundamental Rights',
    description:
      'The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari). Dr. Ambedkar described this as the Heart and Soul of the Constitution.',
    keyCaseLaws: [
      'Bandhua Mukti Morcha v. Union of India (1984)',
      'L. Chandra Kumar v. Union of India (1997)',
    ],
    tags: ['Writ Jurisdiction', 'Apex Remedy', 'Basic Structure'],
  },
  {
    number: 'Article 226',
    title: 'Power of High Courts to issue certain writs',
    part: 'Part VI – The States (The High Courts)',
    description:
      'Empowers High Courts to issue writs not only for the enforcement of Fundamental Rights but also for any other legal right.',
    keyCaseLaws: [
      'Whirlpool Corporation v. Registrar of Trade Marks (1998)',
      'Radhey Shyam v. Chhabi Nath (2015)',
    ],
    tags: ['High Court Writs', 'Writ Jurisdiction', 'Judicial Review'],
  },
  {
    number: 'Article 368',
    title: 'Power of Parliament to Amend the Constitution & Procedure',
    part: 'Part XX – Amendment of the Constitution',
    description:
      'Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision, subject to the doctrine of Basic Structure.',
    keyCaseLaws: [
      'Kesavananda Bharati v. State of Kerala (1973 - Basic Structure Doctrine)',
      'Minerva Mills v. Union of India (1980)',
    ],
    tags: ['Constitutional Amendment', 'Basic Structure', 'Parliamentary Power'],
  },
];

export const STATUTES_DATA: LegalStatute[] = [
  {
    id: 'bns-2023',
    title: 'Bharatiya Nyaya Sanhita (BNS)',
    shortCode: 'Act No. 45 of 2023',
    year: 2023,
    category: 'Criminal',
    description:
      'The principal criminal code in India replacing the Indian Penal Code (IPC) 1860, consolidating modern substantive criminal law with streamlined definitions.',
    totalSections: 358,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 103',
        title: 'Punishment for Murder',
        summary: 'Prescribes death penalty or imprisonment for life, with special provisions on mob lynching.',
      },
      {
        section: 'Section 111',
        title: 'Organised Crime',
        summary: 'Introduces comprehensive definition and rigorous punishment for syndicate and organised offenses.',
      },
      {
        section: 'Section 69',
        title: 'Sexual intercourse by deceitful means / false promise of marriage',
        summary: 'Codifies offenses relating to false promise of employment or marriage.',
      },
      {
        section: 'Section 152',
        title: 'Act endangering sovereignty, unity and integrity of India',
        summary: 'Modernised provision addressing subversive acts against national sovereignty without colonial sedition clauses.',
      },
    ],
  },
  {
    id: 'bnss-2023',
    title: 'Bharatiya Nagarik Suraksha Sanhita (BNSS)',
    shortCode: 'Act No. 46 of 2023',
    year: 2023,
    category: 'Criminal',
    description:
      'The law on criminal procedure replacing the Code of Criminal Procedure (CrPC) 1973, mandating electronic evidence, forensic investigations, and strict trial timelines.',
    totalSections: 531,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 173',
        title: 'Information in cognizable cases (e-FIR & Zero FIR)',
        summary: 'Permits registration of Zero FIR anywhere and electronic FIR filing.',
      },
      {
        section: 'Section 176(3)',
        title: 'Mandatory Forensic Investigation',
        summary: 'Mandates forensic experts to visit crime scenes for offenses punishable with 7+ years.',
      },
      {
        section: 'Section 356',
        title: 'Inquiry, trial or judgment in absentia of proclaimed offender',
        summary: 'Provides trial in absentia when an accused has absconded.',
      },
    ],
  },
  {
    id: 'bsa-2023',
    title: 'Bharatiya Sakshya Adhiniyam (BSA)',
    shortCode: 'Act No. 47 of 2023',
    year: 2023,
    category: 'Criminal',
    description:
      'Consolidates the law of evidence in India replacing the Indian Evidence Act 1872, recognizing comprehensive digital and electronic records as primary evidence.',
    totalSections: 170,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 61',
        title: 'Admissibility of Electronic or Digital Records',
        summary: 'Gives digital evidence the same legal standing as paper documents.',
      },
      {
        section: 'Section 63',
        title: 'Special provisions as to evidence relating to electronic record',
        summary: 'Certificates and validation standards for digital server logs, smartphones, and emails.',
      },
    ],
  },
  {
    id: 'cpc-1908',
    title: 'Code of Civil Procedure (CPC)',
    shortCode: 'Act No. 5 of 1908',
    year: 1908,
    category: 'Civil',
    description:
      'The procedural law related to administration of civil proceedings in India, regulating plaints, written statements, appeals, injunctions, and execution.',
    totalSections: 158,
    enactedBy: 'Imperial Legislative Council (as amended)',
    keySections: [
      {
        section: 'Section 9',
        title: 'Courts to try all civil suits unless barred',
        summary: 'General civil jurisdiction of courts over disputes of civil nature.',
      },
      {
        section: 'Section 89',
        title: 'Settlement of disputes outside the Court (ADR)',
        summary: 'Mediation, Conciliation, Arbitration, and Lok Adalat references.',
      },
      {
        section: 'Order 39 Rules 1 & 2',
        title: 'Temporary Injunctions and Interlocutory Orders',
        summary: 'Standard legal tests for granting interim stay and status quo.',
      },
    ],
  },
  {
    id: 'companies-act-2013',
    title: 'Companies Act, 2013',
    shortCode: 'Act No. 18 of 2013',
    year: 2013,
    category: 'Commercial',
    description:
      'Governs the incorporation, management, corporate governance, CSR, mergers, and winding up of companies in India under NCLT/NCLAT jurisdiction.',
    totalSections: 470,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 135',
        title: 'Corporate Social Responsibility (CSR)',
        summary: 'Mandatory 2% spend for eligible corporations on societal development.',
      },
      {
        section: 'Section 166',
        title: 'Duties of Directors',
        summary: 'Fiduciary duties of good faith, care, and avoidance of conflict of interest.',
      },
    ],
  },
  {
    id: 'it-act-2000',
    title: 'Information Technology Act, 2000',
    shortCode: 'Act No. 21 of 2000',
    year: 2000,
    category: 'Technology',
    description:
      'The primary law in India dealing with cybercrime, electronic commerce, digital signatures, and intermediary liability rules.',
    totalSections: 90,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 43A & 72A',
        title: 'Data Protection & Breach of Confidentiality',
        summary: 'Compensation for failure to protect sensitive personal data.',
      },
      {
        section: 'Section 79',
        title: 'Safe Harbour Exemption of Intermediaries',
        summary: 'Conditional immunity for online platforms fulfilling due diligence requirements.',
      },
    ],
  },
  {
    id: 'ipc-1860',
    title: 'Indian Penal Code (IPC) [Repealed]',
    shortCode: 'Act No. 45 of 1860',
    year: 1860,
    category: 'Criminal',
    description:
      'The former substantive criminal code of India (in force 1860–2024). Repealed and replaced by Bharatiya Nyaya Sanhita (BNS) with effect from 1 July 2024.',
    totalSections: 575,
    enactedBy: 'Governor-General in Council (Repealed by BNS 2023)',
    keySections: [
      {
        section: 'Section 302',
        title: 'Punishment for Murder (IPC)',
        summary: 'Death penalty or imprisonment for life and fine. Replaced by Section 103 BNS.',
      },
      {
        section: 'Section 420',
        title: 'Cheating and dishonestly inducing delivery of property',
        summary: 'Imprisonment up to 7 years and fine. Replaced by Section 318(4) BNS.',
      },
      {
        section: 'Section 378 / 379',
        title: 'Theft & Punishment for Theft',
        summary: 'Dishonest taking of movable property without consent. Replaced by Section 303 BNS.',
      },
      {
        section: 'Section 124A',
        title: 'Sedition (IPC)',
        summary: 'Colonial sedition clause omitted in modern BNS in favor of Section 152.',
      },
    ],
  },
  {
    id: 'crpc-1973',
    title: 'Code of Criminal Procedure (CrPC) [Repealed]',
    shortCode: 'Act No. 2 of 1974',
    year: 1973,
    category: 'Criminal',
    description:
      'The former procedural law for administration of criminal justice in India. Repealed and replaced by Bharatiya Nagarik Suraksha Sanhita (BNSS) with effect from 1 July 2024.',
    totalSections: 525,
    enactedBy: 'Parliament of India (Repealed by BNSS 2023)',
    keySections: [
      {
        section: 'Section 154',
        title: 'Information in cognizable cases (FIR)',
        summary: 'Statutory basis for First Information Report. Replaced by Section 173 BNSS.',
      },
      {
        section: 'Section 438',
        title: 'Direction for grant of bail to person apprehending arrest (Anticipatory Bail)',
        summary: 'Pre-arrest bail discretion vested in Sessions Court and High Court. Replaced by Section 482 BNSS.',
      },
      {
        section: 'Section 482',
        title: 'Saving of inherent powers of High Court',
        summary: 'Quashing of FIRs and abuse of judicial process. Replaced by Section 528 BNSS.',
      },
    ],
  },
  {
    id: 'iea-1872',
    title: 'Indian Evidence Act (IEA) [Repealed]',
    shortCode: 'Act No. 1 of 1872',
    year: 1872,
    category: 'Criminal',
    description:
      'The former statutory framework governing admissibility of evidence and burden of proof in Indian courts. Repealed and replaced by Bharatiya Sakshya Adhiniyam (BSA) with effect from 1 July 2024.',
    totalSections: 184,
    enactedBy: 'Imperial Legislative Council (Repealed by BSA 2023)',
    keySections: [
      {
        section: 'Section 65B',
        title: 'Admissibility of electronic records (IEA)',
        summary: 'Mandatory certificate rule for secondary electronic evidence. Replaced by Section 63 BSA.',
      },
      {
        section: 'Section 25 / 27',
        title: 'Confession to police officer & Discovery of fact',
        summary: 'Inadmissibility of police confessions and recovery exceptions. Replaced by Sections 23 & 25 BSA.',
      },
    ],
  },
  {
    id: 'mva-1988',
    title: 'Motor Vehicles Act (MVA)',
    shortCode: 'Act No. 59 of 1988',
    year: 1988,
    category: 'Civil',
    description:
      'The primary central statute regulating road transport, driving licences, motor vehicle registration, traffic offences, third-party insurance, and Motor Accident Claims Tribunals (MACT).',
    totalSections: 256,
    enactedBy: 'Parliament of India',
    keySections: [
      {
        section: 'Section 166',
        title: 'Application for compensation (MACT Claim)',
        summary: 'Statutory claim procedure for motor accident injury or fatality before Claims Tribunal.',
      },
      {
        section: 'Section 185',
        title: 'Driving by a drunken person or by a person under the influence of drugs',
        summary: 'Penalties for driving under influence (>30mg alcohol per 100ml blood).',
      },
      {
        section: 'Section 194B',
        title: 'Use of safety belts and seating of children',
        summary: 'Mandatory seatbelt compliance and protective child headgear/harness standards.',
      },
    ],
  },
  {
    id: 'nia-1881',
    title: 'Negotiable Instruments Act (NIA)',
    shortCode: 'Act No. 26 of 1881',
    year: 1881,
    category: 'Commercial',
    description:
      'Governs promissory notes, bills of exchange, and cheques in India. Famously contains Section 138 criminal penalties for dishonour of cheques for insufficiency of funds.',
    totalSections: 156,
    enactedBy: 'Imperial Legislative Council (as amended)',
    keySections: [
      {
        section: 'Section 138',
        title: 'Dishonour of cheque for insufficiency, etc., of funds in the account',
        summary: 'Punishable with imprisonment up to 2 years, or with fine up to twice the cheque amount, or both.',
      },
      {
        section: 'Section 141',
        title: 'Offences by companies (Cheque Bounce)',
        summary: 'Vicarious criminal liability of directors in charge and responsible for company conduct.',
      },
      {
        section: 'Section 143A',
        title: 'Power to direct interim compensation',
        summary: 'Magistrate power to direct drawer of cheque to pay up to 20% interim compensation.',
      },
    ],
  },
];

export const COURT_TIERS: CourtTier[] = [
  {
    id: 'supreme-court',
    name: 'Supreme Court of India',
    hindiName: 'भारत का सर्वोच्च न्यायालय',
    level: 'Apex',
    presidedBy: 'Chief Justice of India + up to 33 Judges',
    jurisdiction:
      'Original (Art. 131), Appellate (Art. 132-136), Advisory (Art. 143), and Review Jurisdiction (Art. 137). Final court of appeal for the Republic of India.',
    benchesCount: 'Seat: Tilak Marg, New Delhi',
    description:
      'Inaugurated on 28 January 1950 under Part V, Chapter IV of the Indian Constitution. The law declared by the Supreme Court is binding on all courts within the territory of India (Article 141).',
    powers: [
      'Guardian of Fundamental Rights (Art. 32 Writs)',
      'Basic Structure Custodian & Judicial Review',
      'Special Leave Petitions (Art. 136)',
      'Complete Justice Powers (Art. 142)',
    ],
  },
  {
    id: 'high-courts',
    name: 'High Courts of India (25 Courts)',
    hindiName: 'उच्च न्यायालय',
    level: 'State',
    presidedBy: 'Chief Justice of High Court & Puisne Judges',
    jurisdiction:
      'Writ Jurisdiction under Art. 226/227, Civil & Criminal Appeals, Original Jurisdiction in certain Presidency towns (Delhi, Bombay, Calcutta, Madras).',
    benchesCount: '25 High Courts across 28 States & 8 UTs',
    description:
      'The highest judicial authority in a State or group of States/UTs. They exercise superintendence over all subordinate courts and tribunals across their territorial jurisdiction.',
    powers: [
      'Writ Jurisdiction wider than Art. 32 (Art. 226)',
      'Superintendence over all Subordinate Courts (Art. 227)',
      'Court of Record with Power to Punish for Contempt (Art. 215)',
      'First & Second Appeals in Civil/Criminal Matters',
    ],
  },
  {
    id: 'district-courts',
    name: 'District & Sessions Courts',
    hindiName: 'जिला एवं सत्र न्यायालय',
    level: 'District',
    presidedBy: 'Principal District & Sessions Judge',
    jurisdiction:
      'Original & appellate jurisdiction in both civil and criminal matters across each judicial district in India.',
    benchesCount: '670+ Judicial Districts across India',
    description:
      'The principal court of original civil jurisdiction in the district (District Court) and the highest criminal court in the district (Sessions Court) empowered to pass any sentence authorized by law including capital punishment (subject to High Court confirmation).',
    powers: [
      'Trial of major criminal offenses & capital offenses',
      'Unlimited pecuniary jurisdiction in original civil suits',
      'Appeals from Civil Judges (Senior Division) and Magistrates',
      'Granting of Regular & Anticipatory Bail',
    ],
  },
  {
    id: 'subordinate-judiciary',
    name: 'Subordinate & Magisterial Courts',
    hindiName: 'अधीनस्थ न्यायालय',
    level: 'Subordinate',
    presidedBy: 'Civil Judges (Junior/Senior Div.) & Judicial Magistrates (CJM / JMFC)',
    jurisdiction:
      'Civil suits according to pecuniary limits; summary and cognizable trials up to 7 years imprisonment (CJM) or 3 years (JMFC).',
    benchesCount: 'Taluk / Tehsil level courts nationwide',
    description:
      'The grassroots level of the Indian judicial pyramid where the majority of litigation originates, including Lok Adalats and Gram Nyayalayas for expedited rural dispute resolution.',
    powers: [
      'Cognizance of Police Reports and Private Complaints',
      'Summary trials and committal of sessions cases',
      'Injunctions and small cause property disputes',
      'Cheque bounce matters under Section 138 NI Act',
    ],
  },
  {
    id: 'tribunals',
    name: 'Specialized Judicial Tribunals',
    hindiName: 'विशिष्ट अधिकरण',
    level: 'Tribunal',
    presidedBy: 'Judicial & Technical Members / Retired Judges',
    jurisdiction:
      'Domain-specific disputes: Company law (NCLT/NCLAT), Environment (NGT), Armed forces (AFT), Administrative services (CAT/SAT), Tax (ITAT/CESTAT).',
    benchesCount: 'Benches in major metropolitan judicial circuits',
    description:
      'Quasi-judicial and specialized appellate authorities established under Articles 323A and 323B to relieve docket load and provide specialized domain adjudication.',
    powers: [
      'Insolvency & Bankruptcy Code (IBC) adjudication',
      'Environmental clearances and polluter-pays directives',
      'Central civil services service conditions and pension disputes',
    ],
  },
];

export const RECENT_NOTIFICATIONS: LegalNotification[] = [
  {
    id: 'notif-1',
    title: 'Supreme Court Constitution Bench: Digital Evidence Directives',
    category: 'Supreme Court',
    time: '15 mins ago',
    unread: true,
    summary:
      'Standard Operating Procedure issued for mandatory electronic hash validation under BSA 2023 for all Trial Courts.',
    linkText: 'View Order in SLP (Crl) No. 4120/2026',
  },
  {
    id: 'notif-2',
    title: 'Ministry of Law & Justice: High Court Judge Elevation Gazette',
    category: 'Gazette',
    time: '2 hours ago',
    unread: true,
    summary:
      'President of India appoints 6 new judges to the High Court of Judicature at Bombay and Delhi High Court.',
    linkText: 'Gazette Notification No. S.O. 1892(E)',
  },
  {
    id: 'notif-3',
    title: 'Bar Council of India: All India Bar Exam (AIBE) Notification',
    category: 'Bar Council',
    time: '5 hours ago',
    unread: false,
    summary:
      'Updated schedule for verification of state rolls and syllabus alignment with new criminal statutes.',
    linkText: 'BCI Circular 44/2026',
  },
  {
    id: 'notif-4',
    title: 'Delhi High Court: Commercial Division e-Filing Protocol',
    category: 'High Court',
    time: '1 day ago',
    unread: false,
    summary:
      'Mandatory PDF/A format with digital signatures now enforced for all pleadings in commercial suits above ₹3 Lakhs.',
    linkText: 'Practice Direction 08/2026',
  },
];

export const INITIAL_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'bm-1',
    title: 'Article 21: Right to Privacy & Bodily Autonomy',
    category: 'Article',
    reference: 'Constitution of India • Part III',
    savedDate: 'Today, 09:30 AM',
  },
  {
    id: 'bm-2',
    title: 'Bharatiya Nyaya Sanhita – Section 103 (Murder & Lynching)',
    category: 'Statute',
    reference: 'BNS 2023 • Act 45 of 2023',
    savedDate: 'Yesterday',
  },
  {
    id: 'bm-3',
    title: 'K.S. Puttaswamy v. Union of India (2017) 10 SCC 1',
    category: 'Judgement',
    reference: '9-Judge Bench • Supreme Court of India',
    savedDate: '3 days ago',
  },
  {
    id: 'bm-4',
    title: 'Standard Format for Commercial Summary Plaints under Order 37',
    category: 'Court Guide',
    reference: 'CPC 1908 • High Court Practice Rules',
    savedDate: '1 week ago',
  },
];

export const MOCK_CASES: CaseRecord[] = [
  {
    cnrNumber: 'DLHC010049212025',
    caseType: 'W.P.(C) - Writ Petition (Civil)',
    caseNumber: '14298/2025',
    year: 2025,
    petitioner: 'M/s Horizon Technologies India Pvt. Ltd.',
    respondent: 'Union of India & Ors. (Ministry of Electronics & IT)',
    court: 'High Court of Delhi at New Delhi',
    bench: 'Division Bench - Courtroom 03',
    stage: 'Arguments on Interim Relief',
    nextHearingDate: '04-Sep-2026',
    status: 'Listed',
    coram: 'Hon’ble The Chief Justice & Justice Rajiv Narain',
  },
  {
    cnrNumber: 'SCIN010012892026',
    caseType: 'SLP (Crl) - Special Leave Petition',
    caseNumber: '3819/2026',
    year: 2026,
    petitioner: 'Dr. Anandvardhan Sharma',
    respondent: 'State of Maharashtra & Anr.',
    court: 'Supreme Court of India',
    bench: 'Bench No. 04 (Criminal Appeals)',
    stage: 'Notice Returnable / Counter Affidavit',
    nextHearingDate: '11-Sep-2026',
    status: 'Pending',
    coram: 'Hon’ble Mr. Justice Sanjiv Khanna & Hon’ble Mr. Justice Dipankar Datta',
  },
  {
    cnrNumber: 'MHBB010098442024',
    caseType: 'COMM. SUIT - Commercial Summary Suit',
    caseNumber: '891/2024',
    year: 2024,
    petitioner: 'Bharat Capital Advisors LLP',
    respondent: 'Apex Infrastructure & Logistics Ltd.',
    court: 'High Court of Judicature at Bombay (Original Side)',
    bench: 'Commercial Division - Single Judge',
    stage: 'Final Hearing & Decree',
    nextHearingDate: '18-Sep-2026',
    status: 'Reserved',
    coram: 'Hon’ble Mr. Justice F.P. Pooniwalla',
  },
];
