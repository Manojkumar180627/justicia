import { LegalDocument, DocumentType } from '../types/legalDataset';

const DATASET_STORAGE_KEY = 'justicia_legal_dataset_v1';

// Initial seed dataset containing official legal records with full 16-field metadata
export const INITIAL_LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    document_id: 'doc-const-art-14',
    title: 'Article 14 - Equality before Law & Equal Protection of Laws',
    document_type: 'Constitution',
    jurisdiction: 'India',
    court: 'Supreme Court of India',
    law_name: 'Constitution of India',
    act_name: 'Constitution of India',
    article_or_section: 'Article 14',
    article_number: '14',
    chapter: 'Part III - Fundamental Rights',
    part: 'Part III',
    citation: 'Article 14, Constitution of India (1950)',
    official_citation: 'Article 14, Constitution of India (1950)',
    year: 1950,
    date: '1950-01-26',
    source: 'Official Gazette / Legislative Department, Ministry of Law and Justice',
    source_name: 'Official Gazette of India',
    source_url: 'https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa5d4323ee6122d7d599/uploads/2023/05/2023050195.pdf',
    content:
      'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.\n\nEquality before law is a negative concept borrowed from English Common Law, signifying the absence of any special privilege in favor of any individual. Equal protection of the laws is a positive concept derived from the American Constitution, requiring equal treatment in equal circumstances.',
    summary: 'Guarantees equality before law and equal protection of laws to all persons in India.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_art_14_eq_1950_v1',
    simple_explanation:
      'Article 14 guarantees that the law applies equally to all people in India without discrimination. It forbids arbitrary state action and ensures equal protection under the law for everyone.',
    scope_and_applicability:
      'Applies across the entire territory of India to both Indian citizens and foreign nationals.',
    important_conditions: [
      'Classification must be founded on an intelligible differentia which distinguishes persons or things that are grouped together from others left out.',
      'The differentia must have a rational relation to the object sought to be achieved by the statute.',
    ],
    exceptions_or_limitations: [
      'Allows reasonable classification by the legislature (not class legislation).',
      'President of India and Governors enjoy constitutional immunity under Article 361.',
      'Foreign sovereigns and diplomats enjoy diplomatic immunity.',
    ],
    procedure: 'Enforceable directly via Writ Petitions under Article 32 (Supreme Court) or Article 226 (High Courts).',
    key_points: [
      'Prohibits class legislation while permitting reasonable classification based on intelligible differentia.',
      'Non-arbitrariness doctrine established in E.P. Royappa (1974) and Maneka Gandhi (1978).',
      'Applies to both citizens and non-citizens within the territory of India.',
      'Forms an integral part of the Basic Structure of the Indian Constitution.',
    ],
    related_provisions: ['Article 15', 'Article 16', 'Article 19', 'Article 21', 'Article 32', 'Article 226'],
    relevant_precedents: [
      'E.P. Royappa v. State of Tamil Nadu (1974) 4 SCC 3',
      'Maneka Gandhi v. Union of India (1978) 1 SCC 248',
      'Shayara Bano v. Union of India (2017) 9 SCC 1 (Triple Talaq Unconstitutionality)',
    ],
    amendments_or_updates: 'Affirmed as an unamendable pillar of the Basic Structure Doctrine.',
  },
  {
    document_id: 'doc-const-art-19',
    title: 'Article 19 - Protection of Certain Rights regarding Freedom of Speech, etc.',
    document_type: 'Constitution',
    jurisdiction: 'India',
    court: 'Supreme Court of India',
    law_name: 'Constitution of India',
    act_name: 'Constitution of India',
    article_or_section: 'Article 19',
    article_number: '19',
    chapter: 'Part III - Fundamental Rights',
    part: 'Part III',
    citation: 'Article 19, Constitution of India (1950)',
    official_citation: 'Article 19, Constitution of India (1950)',
    year: 1950,
    date: '1950-01-26',
    source: 'Official Gazette / Legislative Department',
    source_name: 'Official Gazette of India',
    source_url: 'https://legislative.gov.in/constitution-of-india/',
    content:
      '19. (1) All citizens shall have the right—\n(a) to freedom of speech and expression;\n(b) to assemble peaceably and without arms;\n(c) to form associations or unions or co-operative societies;\n(d) to move freely throughout the territory of India;\n(e) to reside and settle in any part of the territory of India; and\n(g) to practise any profession, or to carry on any occupation, trade or business.\n\n(2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality or in relation to contempt of court, defamation or incitement to an offence.',
    summary: 'Guarantees six fundamental freedoms to citizens of India subject to reasonable state restrictions.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_art_19_speech_1950_v1',
    simple_explanation:
      'Article 19 guarantees six basic freedoms to Indian citizens, including freedom of speech, assembly, association, movement, residence, and profession. These rights are subject to reasonable restrictions imposed by law for state security, public order, and decency.',
    scope_and_applicability:
      'Available exclusively to citizens of India across all States and Union Territories.',
    important_conditions: [
      'Restrictions imposed by the State must be reasonable under Article 19(2) through 19(6).',
      'Must be authorized by a law enacted by a competent legislature.',
    ],
    exceptions_or_limitations: [
      'Reasonable restrictions on speech: Sovereignty & integrity of India, Security of State, Public Order, Decency, Defamation, Contempt of Court.',
      'Right to Property (sub-clause f) omitted by 44th Constitutional Amendment Act, 1978.',
    ],
    procedure: 'Enforceable directly via Article 32 in Supreme Court and Article 226 in High Courts.',
    key_points: [
      'Freedom of speech includes freedom of the press, internet access, and commercial speech.',
      'Restrictions must satisfy the Test of Reasonableness under Article 19(2) to 19(6).',
      'Rights under Article 19 are available exclusively to citizens of India.',
      'Shreya Singhal (2015) struck down Section 66A IT Act for violating Article 19(1)(a).',
    ],
    related_provisions: ['Article 14', 'Article 21', 'Article 32', 'Section 66A IT Act (Struck Down)'],
    relevant_precedents: [
      'Romesh Thappar v. State of Madras (1950) SCR 594',
      'Shreya Singhal v. Union of India (2015) 5 SCC 1',
      'Anuradha Bhasin v. Union of India (2020) 3 SCC 637 (Internet Freedom in J&K)',
    ],
    amendments_or_updates: '1st Amendment Act 1951 added "public order"; 44th Amendment Act 1978 removed Right to Property.',
  },
  {
    document_id: 'doc-const-art-21',
    title: 'Article 21 - Protection of Life and Personal Liberty & Right to Privacy',
    document_type: 'Constitution',
    jurisdiction: 'India',
    court: 'Supreme Court of India',
    law_name: 'Constitution of India',
    act_name: 'Constitution of India',
    article_or_section: 'Article 21',
    article_number: '21',
    chapter: 'Part III - Fundamental Rights',
    part: 'Part III',
    citation: 'Article 21, Constitution of India (1950)',
    official_citation: 'Article 21, Constitution of India (1950)',
    year: 1950,
    date: '1950-01-26',
    source: 'Official Gazette / Supreme Court Records',
    source_name: 'Official Gazette of India',
    source_url: 'https://main.sci.gov.in/constitution-provisions',
    content:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law.\n\nIn Maneka Gandhi (1978), the Supreme Court expanded "procedure established by law" to mean a procedure that is fair, just, and reasonable (Due Process). In Puttaswamy (2017), a 9-Judge Bench ruled that Right to Privacy is an intrinsic component of Article 21.',
    summary: 'Protects right to life and personal liberty; includes right to privacy, clean environment, and dignity.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_art_21_privacy_1950_v1',
    simple_explanation:
      'Article 21 protects every individual from arbitrary deprivation of life or personal liberty by the State. It encompasses the Right to Privacy, clean environment, speedy trial, livelihood, bodily autonomy, and dignity.',
    scope_and_applicability:
      'Applies to all persons (citizens and non-citizens) within the territory of India.',
    important_conditions: [
      'Deprivation must be by a procedure established by law.',
      'Procedure must satisfy the Due Process test: must be fair, just, non-arbitrary, and reasonable.',
      'Privacy intrusions must satisfy the 3-Fold Test: Legality, Legitimate State Aim, and Proportionality.',
    ],
    exceptions_or_limitations: [
      'Lawful arrest and detention under statutory laws satisfying constitutional procedural safeguards.',
      'Cannot be suspended even during a National Emergency (Article 359).',
    ],
    procedure: 'Immediate relief available via Habeas Corpus and Article 32/226 writ petitions.',
    key_points: [
      'Guarantees right to live with human dignity, not mere animal existence.',
      'Right to Privacy recognized as a Fundamental Right in Puttaswamy (2017) 10 SCC 1.',
      'Any state intrusion must pass the Three-Fold Test: Legality, Legitimate State Aim, and Proportionality.',
      'Cannot be suspended even during a National Emergency under Article 359.',
    ],
    related_provisions: ['Article 14', 'Article 19', 'Article 21A', 'Article 22', 'Article 32', 'BNSS Section 482'],
    relevant_precedents: [
      'A.K. Gopalan v. State of Madras (1950) SCR 88',
      'Maneka Gandhi v. Union of India (1978) 1 SCC 248',
      'Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1 (9-Judge Bench)',
    ],
    amendments_or_updates: 'Enhanced by 44th Amendment Act 1978 prohibiting suspension during National Emergency; 86th Amendment Act 2002 inserted Article 21A (Right to Education).',
  },
  {
    document_id: 'doc-const-art-32',
    title: 'Article 32 - Right to Constitutional Remedies (Supreme Court Writs)',
    document_type: 'Constitution',
    jurisdiction: 'India',
    court: 'Supreme Court of India',
    law_name: 'Constitution of India',
    act_name: 'Constitution of India',
    article_or_section: 'Article 32',
    article_number: '32',
    chapter: 'Part III - Fundamental Rights',
    part: 'Part III',
    citation: 'Article 32, Constitution of India (1950)',
    official_citation: 'Article 32, Constitution of India (1950)',
    year: 1950,
    date: '1950-01-26',
    source: 'Official Gazette / Legislative Department',
    source_name: 'Official Gazette of India',
    source_url: 'https://legislative.gov.in/constitution-of-india/',
    content:
      '32. (1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.\n(2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by Part III.\n\nDr. B.R. Ambedkar termed Article 32 as the "Heart and Soul of the Constitution".',
    summary: 'Guarantees direct access to Supreme Court for enforcement of Fundamental Rights via prerogative writs.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_art_32_writs_1950_v1',
    simple_explanation:
      'Article 32 gives citizens direct right to approach the Supreme Court of India to enforce Fundamental Rights via five prerogative writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari.',
    scope_and_applicability:
      'Applicable strictly for the enforcement of Part III Fundamental Rights before the apex court.',
    important_conditions: [
      'Involves infringement of a Fundamental Right.',
      'Public Interest Litigation (PIL) standing permits locus standi relaxation for vulnerable persons.',
    ],
    exceptions_or_limitations: [
      'Supreme Court may direct petitioner to approach High Court under Article 226 first unless grave urgency exists.',
    ],
    procedure: 'Filing Writ Petition under Supreme Court Rules 2013 before a 2-Judge or 3-Judge Bench.',
    key_points: [
      'Direct apex remedy for Fundamental Rights violations.',
      'Five writs: Habeas Corpus (Produce Body), Mandamus (Command Duty), Quo Warranto (By What Authority), Certiorari (Quash Order), Prohibition (Prevent Excess Jurisdiction).',
      'Formally declared part of the immutable Basic Structure of the Constitution.',
      'Public Interest Litigation (PIL) standing developed primarily through Article 32.',
    ],
    related_provisions: ['Article 226', 'Article 136', 'Article 141', 'Article 142'],
    relevant_precedents: [
      'Bandhua Mukti Morcha v. Union of India (1984) 3 SCC 161',
      'L. Chandra Kumar v. Union of India (1997) 3 SCC 261',
    ],
    amendments_or_updates: 'Basic Structure pillar established in Kesavananda Bharati (1973).',
  },
  {
    document_id: 'doc-bns-sec-103',
    title: 'Section 103 - Punishment for Murder & Mob Lynching under Bharatiya Nyaya Sanhita, 2023',
    document_type: 'Sanhita',
    jurisdiction: 'India',
    court: 'Supreme Court of India / Sessions Courts',
    law_name: 'Bharatiya Nyaya Sanhita, 2023 (BNS)',
    act_name: 'Bharatiya Nyaya Sanhita, 2023',
    article_or_section: 'Section 103',
    section_number: '103',
    chapter: 'Chapter VI - Of Offences Affecting the Human Body',
    citation: 'Section 103, Bharatiya Nyaya Sanhita, 2023 (Act 45 of 2023)',
    official_citation: 'Section 103, Bharatiya Nyaya Sanhita, 2023 (Act 45 of 2023)',
    year: 2023,
    date: '2023-12-25',
    source: 'Gazette of India, Extraordinary, Part II, Section 1 (Act No. 45 of 2023)',
    source_name: 'Gazette of India',
    source_url: 'https://e-gazette.gov.in/WriteReadData/2023/250883.pdf',
    content:
      'Section 103. Punishment for murder.—\n(1) Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.\n\n(2) When a group of five or more persons acting in concert commits murder on the ground of race, caste or community, sex, place of birth, language, personal belief or any other similar ground, each member of such group shall be punished with death or with imprisonment for life, and shall also be liable to fine.',
    summary: 'Prescribes punishment for murder and codifies statutory death penalty/life imprisonment for mob lynching.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_bns_sec_103_murder_2023_v1',
    simple_explanation:
      'Section 103 of BNS 2023 replaces IPC Section 302. Section 103(1) prescribes punishment for murder (death penalty or life imprisonment + fine). Section 103(2) introduces explicit statutory punishment for hate crimes and mob lynching committed by 5 or more persons.',
    scope_and_applicability:
      'Applies to offenses committed on or post 1 July 2024 throughout India.',
    important_conditions: [
      'Intent or knowledge under Section 101 BNS (Culpable Homicide amounting to murder) must be proved beyond reasonable doubt.',
      'Section 103(2) requires group of 5+ persons acting in concert based on identity grounds.',
    ],
    exceptions_or_limitations: [
      'Culpable homicide not amounting to murder under Section 101 BNS exceptions (Grave & sudden provocation, self-defense excess, public servant duty, sudden fight, consent).',
    ],
    punishment_or_penalty: 'Death Penalty OR Life Imprisonment + Mandatory Fine.',
    procedure: 'Cognizable, Non-Bailable, Non-Compoundable offense. Triable by Court of Session.',
    key_points: [
      'BNS Section 103(1) replaces IPC Section 302 for general murder punishment.',
      'BNS Section 103(2) is a newly added provision targeting mob lynching and group hate killings.',
      'Requires application of the "Rarest of Rare Cases" doctrine for death penalty under Bachan Singh (1980).',
      'Effective across India from 1 July 2024.',
    ],
    related_provisions: ['Section 101 BNS', 'Section 102 BNS', 'BNSS Section 482', 'IPC Section 302 (Repealed)'],
    relevant_precedents: [
      'Bachan Singh v. State of Punjab (1980) 2 SCC 684 (Rarest of Rare Doctrine)',
      'Machhi Singh v. State of Punjab (1983) 3 SCC 470',
      'Tehseen S. Poonawalla v. Union of India (2018) 9 SCC 501 (Directives on Mob Lynching)',
    ],
    amendments_or_updates: 'Replaced IPC 1860 with effect from July 1, 2024 under Bharatiya Nyaya Sanhita 2023.',
  },
  {
    document_id: 'doc-bnss-sec-482',
    title: 'Section 482 - Anticipatory Bail under Bharatiya Nagarik Suraksha Sanhita, 2023',
    document_type: 'Sanhita',
    jurisdiction: 'India',
    court: 'High Courts & Sessions Courts',
    law_name: 'Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)',
    act_name: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    article_or_section: 'Section 482',
    section_number: '482',
    chapter: 'Chapter XXXV - Provisions as to Bail and Bonds',
    citation: 'Section 482, Bharatiya Nagarik Suraksha Sanhita, 2023 (Act 46 of 2023)',
    official_citation: 'Section 482, Bharatiya Nagarik Suraksha Sanhita, 2023 (Act 46 of 2023)',
    year: 2023,
    date: '2023-12-25',
    source: 'Gazette of India, Extraordinary (Act No. 46 of 2023)',
    source_name: 'Gazette of India',
    source_url: 'https://e-gazette.gov.in/WriteReadData/2023/250884.pdf',
    content:
      'Section 482. Direction for grant of bail to person apprehending arrest.—\n(1) When any person has reason to believe that he may be arrested on an accusation of having committed a non-bailable offence, he may apply to the High Court or the Court of Session for a direction under this section; and that Court may, if it thinks fit, direct that in the event of such arrest, he shall be released on bail.\n\n(2) When the High Court or the Court of Session makes a direction under sub-section (1), it may include such conditions as it may think fit, including—\n(i) a condition that the person shall make himself available for interrogation by a police officer as and when required;\n(ii) a condition that the person shall not, directly or indirectly, make any inducement, threat or promise to any person acquainted with the facts of the case;\n(iii) a condition that the person shall not leave India without the previous permission of the Court.',
    summary: 'Empowers Sessions Courts and High Courts to grant pre-arrest (anticipatory) bail for non-bailable offenses.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_bnss_sec_482_anticipatory_bail_2023_v1',
    simple_explanation:
      'Section 482 of BNSS 2023 corresponds to Section 438 of the repealed CrPC 1973. It empowers High Courts and Sessions Courts to grant pre-arrest (anticipatory) bail to individuals apprehending arrest in non-bailable offenses under statutory safeguards.',
    scope_and_applicability:
      'Applicable for non-bailable criminal allegations across India.',
    important_conditions: [
      'Applicant must show genuine apprehension of arrest on non-bailable accusation.',
      'Must join investigation when summoned by Investigating Officer.',
      'Prohibition on tempering with witnesses or leaving the country without judicial permission.',
    ],
    exceptions_or_limitations: [
      'Not applicable where specialized statutes explicitly bar anticipatory bail (e.g. SC/ST POA Act Section 18/18A).',
    ],
    procedure: 'Filing Anticipatory Bail Application before District Sessions Court or High Court.',
    key_points: [
      'Replaces Section 438 CrPC 1973 for anticipatory bail.',
      'Concurrent jurisdiction given to Sessions Court and High Court.',
      'Sushila Aggarwal (2020) 5-Judge Constitution Bench principles apply: Anticipatory bail is not limited by time unless exceptional circumstances exist.',
      'Mandates co-operation with investigation and restriction on tampering witnesses.',
    ],
    related_provisions: ['BNSS Section 480', 'BNSS Section 483', 'CrPC Section 438 (Repealed)'],
    relevant_precedents: [
      'Gurbaksh Singh Sibbia v. State of Punjab (1980) 2 SCC 565',
      'Sushila Aggarwal v. State (NCT of Delhi) (2020) 5 SCC 1 (5-Judge Constitution Bench)',
      'Satender Kumar Antil v. CBI (2022) 10 SCC 51 (Guidelines on Bail)',
    ],
    amendments_or_updates: 'Replaced CrPC Section 438 with statutory enhancements under BNSS 2023.',
  },
  {
    document_id: 'doc-bsa-sec-63',
    title: 'Section 63 - Special Provisions as to Evidence Relating to Electronic Record under BSA, 2023',
    document_type: 'Sanhita',
    jurisdiction: 'India',
    court: 'All Courts & Tribunals in India',
    law_name: 'Bharatiya Sakshya Adhiniyam, 2023 (BSA)',
    act_name: 'Bharatiya Sakshya Adhiniyam, 2023',
    article_or_section: 'Section 63',
    section_number: '63',
    chapter: 'Chapter V - Of Documentary Evidence',
    citation: 'Section 63, Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023)',
    official_citation: 'Section 63, Bharatiya Sakshya Adhiniyam, 2023 (Act 47 of 2023)',
    year: 2023,
    date: '2023-12-25',
    source: 'Gazette of India, Extraordinary (Act No. 47 of 2023)',
    source_name: 'Gazette of India',
    source_url: 'https://e-gazette.gov.in/WriteReadData/2023/250885.pdf',
    content:
      'Section 63. Admissibility of electronic records.—\n(1) Notwithstanding anything contained in this Adhiniyam, any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media or digital form produced by a computer shall be deemed to be also a document...\n(4) In any proceedings where it is desired to give a statement in evidence by virtue of this section, a certificate doing any of the following things, that is to say,—\n(a) identifying the electronic record containing the statement;\n(b) giving such particulars of any device involved in the production of that electronic record...\nshall be submitted along with the electronic record signed by a person occupying a responsible official position in relation to the operation of the relevant device.',
    summary: 'Governs mandatory certification and admissibility requirements for electronic and digital evidence in court.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_bsa_sec_63_elec_evidence_2023_v1',
    simple_explanation:
      'Section 63 of BSA 2023 replaces Section 65B of the Indian Evidence Act 1872. It establishes mandatory certification requirements for admitting digital evidence (emails, server logs, mobile chats, CCTV) into Indian court proceedings.',
    scope_and_applicability:
      'Applies to all civil and criminal judicial proceedings in courts and tribunals across India.',
    important_conditions: [
      'Section 63 Certificate signed by responsible device custodian or technical expert is mandatory for secondary digital evidence.',
      'Device must be operating properly during data generation period.',
    ],
    exceptions_or_limitations: [
      'Primary digital evidence (the original device itself presented directly in court) does not require a Certificate under Arjun Panditrao Khotkar principles.',
    ],
    procedure: 'Filing Section 63 Certificate along with digital media output at trial stage.',
    key_points: [
      'Replaces Section 65B of Indian Evidence Act 1872.',
      'Mandates Section 63 Certificate signed by authorized device custodian or technical expert.',
      'Arjun Panditrao Khotkar (2020) 3-Judge Bench ratio applies: Section 63 certificate is mandatory for secondary electronic evidence.',
      'Covers modern cloud data, smartphones, encryption hashes, and digital logs.',
    ],
    related_provisions: ['BSA Section 61', 'BSA Section 62', 'Indian Evidence Act Section 65B (Repealed)'],
    relevant_precedents: [
      'Anvar P.V. v. P.K. Basheer (2014) 10 SCC 473',
      'Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal (2020) 7 SCC 1 (3-Judge Bench)',
    ],
    amendments_or_updates: 'Replaced Evidence Act Section 65B with modernized digital evidence standards under BSA 2023.',
  },
  {
    document_id: 'doc-sc-kesavananda',
    title: 'Kesavananda Bharati v. State of Kerala (1973) - Basic Structure Doctrine',
    document_type: 'Supreme Court Judgment',
    jurisdiction: 'India',
    court: 'Supreme Court of India',
    law_name: 'Constitution of India (Article 368)',
    act_name: 'Constitution of India',
    article_or_section: 'Article 368 & Basic Structure',
    citation: '(1973) 4 SCC 225 / AIR 1973 SC 1461',
    official_citation: '(1973) 4 SCC 225 / AIR 1973 SC 1461',
    case_name: 'Kesavananda Bharati v. State of Kerala',
    year: 1973,
    date: '1973-04-24',
    source: 'Supreme Court Reports / SCC',
    source_name: 'Supreme Court of India Records',
    source_url: 'https://main.sci.gov.in/judgments',
    content:
      'Landmark 13-Judge Constitution Bench ruling in Kesavananda Bharati Sripadagalvaru v. State of Kerala.\n\nRatio (7:6 Majority):\nWhile Parliament possesses wide constituent power under Article 368 to amend any part of the Constitution including Fundamental Rights, it CANNOT amend, alter, or destroy the basic structure or essential framework of the Constitution.\n\nBasic features include Supremacy of the Constitution, Republican and Democratic form of Government, Secular character, Separation of Powers, Judicial Review, and Federalism.',
    summary: 'Landmark 13-Judge Bench decision establishing the Basic Structure Doctrine restricting constitutional amendments.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_sc_kesavananda_1973_v1',
    simple_explanation:
      'Kesavananda Bharati (1973) is the most critical constitutional decision in Indian history. It established the "Basic Structure Doctrine", ensuring Parliament cannot use Article 368 to destroy core constitutional pillars like democracy, secularism, rule of law, and judicial review.',
    scope_and_applicability:
      'Binding on all Courts, Parliament, and State Legislatures under Article 141 of the Constitution.',
    important_conditions: [
      'Constitutional amendments passing Parliament must not violate any pillar of the Basic Structure.',
    ],
    exceptions_or_limitations: [
      'Parliament retains broad power to amend non-basic constitutional provisions.',
    ],
    procedure: 'Judicial review of Constitutional Amendments before Supreme Court under Article 32 or 136.',
    key_points: [
      '13-Judge Bench — Largest Constitution Bench in Supreme Court history.',
      'Limits Parliament constituent power under Article 368.',
      'Safeguards Fundamental Rights from arbitrary abrogation.',
      'Re-affirmed and enforced in Minerva Mills (1980) and I.R. Coelho (2007).',
    ],
    related_provisions: ['Article 368', 'Article 13', 'Article 32', 'Article 141'],
    relevant_precedents: [
      'Golaknath v. State of Punjab (1967) AIR 1967 SC 1643 (Overruled in part)',
      'Indira Nehru Gandhi v. Raj Narain (1975) Supp SCC 1',
      'Minerva Mills Ltd. v. Union of India (1980) 3 SCC 625',
      'I.R. Coelho v. State of Tamil Nadu (2007) 2 SCC 1 (9-Judge Bench)',
    ],
    amendments_or_updates: '24th, 25th, and 29th Constitutional Amendments reviewed and partially upheld.',
  },
  {
    document_id: 'doc-ipc-sec-302',
    title: 'Section 302 - Punishment for Murder under Indian Penal Code, 1860 (IPC)',
    document_type: 'Statute',
    jurisdiction: 'India',
    court: 'Supreme Court of India / Sessions Courts',
    law_name: 'Indian Penal Code, 1860 (IPC)',
    act_name: 'Indian Penal Code, 1860 (IPC)',
    article_or_section: 'Section 302',
    section_number: '302',
    chapter: 'Chapter XVI - Of Offences Affecting the Human Body',
    citation: 'Section 302, Indian Penal Code, 1860 (Act 45 of 1860)',
    official_citation: 'Section 302, Indian Penal Code, 1860 (Act 45 of 1860)',
    year: 1860,
    date: '1860-10-06',
    source: 'Official Gazette / Legislative Department, Ministry of Law and Justice',
    source_name: 'Official Gazette of India',
    source_url: 'https://indiacode.nic.in/handle/123456789/2263',
    content:
      'Section 302. Punishment for murder.—\nWhoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.\n\nStatutory Transition Note: For criminal offences committed on or after 1 July 2024, Section 302 IPC is succeeded by Section 103 of Bharatiya Nyaya Sanhita (BNS), 2023.',
    summary: 'Historical provision for murder punishment under IPC 1860, succeeded by BNS Section 103 on 1 July 2024.',
    language: 'en',
    last_updated: '2026-08-28T00:00:00.000Z',
    content_hash: 'hash_ipc_sec_302_murder_1860_v1',
    simple_explanation:
      'Section 302 IPC prescribes the punishment for murder under the 1860 code (death penalty or life imprisonment + fine). For offences committed on or post July 1, 2024, BNS Section 103 applies.',
    scope_and_applicability:
      'Applies to offenses committed prior to 1 July 2024.',
    important_conditions: ['Must satisfy murder definition under Section 300 IPC.'],
    punishment_or_penalty: 'Death Penalty OR Life Imprisonment + Mandatory Fine.',
    procedure: 'Cognizable, Non-Bailable, Triable by Sessions Court.',
    key_points: [
      'Prescribes capital punishment or life imprisonment for murder under Indian Penal Code 1860.',
      'Succeeded by Section 103 under the Bharatiya Nyaya Sanhita (BNS) 2023.',
      'Rarest of Rare cases doctrine established in Bachan Singh (1980) applies for capital punishment.',
    ],
    related_provisions: ['Section 300 IPC', 'BNS Section 103 (Successor Law)'],
    relevant_precedents: [
      'Bachan Singh v. State of Punjab (1980) 2 SCC 684 (Rarest of Rare Doctrine)',
      'Machhi Singh v. State of Punjab (1983) 3 SCC 470',
    ],
    amendments_or_updates: 'Repealed and replaced by BNS 2023 with effect from 1 July 2024.',
  },
];

interface RawSection {
  act_code: string;
  chapter_number?: string | null;
  chapter_title?: string | null;
  section_number: string;
  section_title: string;
  text: string;
}

const ACT_METADATA: Record<string, {
  name: string;
  type: DocumentType;
  year: number;
  repealed?: boolean;
  replacedBy?: string;
}> = {
  BNS: { name: 'Bharatiya Nyaya Sanhita, 2023', type: 'Sanhita', year: 2023 },
  BNSS: { name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', type: 'Sanhita', year: 2023 },
  BSA: { name: 'Bharatiya Sakshya Adhiniyam, 2023', type: 'Sanhita', year: 2023 },
  IPC: { name: 'Indian Penal Code, 1860', type: 'Statute', year: 1860, repealed: true, replacedBy: 'BNS (Bharatiya Nyaya Sanhita, 2023)' },
  CRPC: { name: 'Code of Criminal Procedure, 1973', type: 'Statute', year: 1973, repealed: true, replacedBy: 'BNSS (Bharatiya Nagarik Suraksha Sanhita, 2023)' },
  IEA: { name: 'Indian Evidence Act, 1872', type: 'Statute', year: 1872, repealed: true, replacedBy: 'BSA (Bharatiya Sakshya Adhiniyam, 2023)' },
  COI: { name: 'Constitution of India', type: 'Constitution', year: 1950 },
  CPC: { name: 'Code of Civil Procedure, 1908', type: 'Statute', year: 1908 },
  MVA: { name: 'Motor Vehicles Act, 1988', type: 'Statute', year: 1988 },
  NIA: { name: 'Negotiable Instruments Act, 1881', type: 'Statute', year: 1881 },
};

class LegalDatasetStore {
  private documents: LegalDocument[] = [];
  private userCreatedDocs: LegalDocument[] = [];
  private listeners: Array<() => void> = [];
  private isFullDatasetLoaded: boolean = false;
  private loadPromise: Promise<void> | null = null;

  constructor() {
    this.loadDataset();
  }

  private loadDataset(): void {
    try {
      const stored = localStorage.getItem(DATASET_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.userCreatedDocs = parsed;
        }
      }
    } catch {
      // Ignore parse error and fallback
    }

    this.documents = [...this.userCreatedDocs, ...INITIAL_LEGAL_DOCUMENTS];

    // Asynchronously load the 3,391 comprehensive sections from /data/sections.json
    this.loadComprehensiveDataset();
  }

  public async loadComprehensiveDataset(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      try {
        const response = await fetch('/data/sections.json');
        if (!response.ok) return;

        const rawSections: RawSection[] = await response.json();
        if (!Array.isArray(rawSections)) return;

        const convertedDocs: LegalDocument[] = rawSections.map((sec) => {
          const actMeta = ACT_METADATA[sec.act_code] || {
            name: `${sec.act_code} Act`,
            type: 'Statute' as DocumentType,
            year: 2024,
          };

          const isConstitution = sec.act_code === 'COI';
          const provisionLabel = isConstitution ? `Article ${sec.section_number}` : `Section ${sec.section_number}`;
          const docId = `doc-${sec.act_code.toLowerCase()}-${sec.section_number.toLowerCase()}`;

          return {
            document_id: docId,
            title: `${sec.act_code} ${provisionLabel} - ${sec.section_title || 'Untitled Provision'}`,
            document_type: actMeta.type,
            jurisdiction: 'India',
            act_name: actMeta.name,
            article_or_section: provisionLabel,
            section_number: sec.section_number,
            article_number: isConstitution ? sec.section_number : undefined,
            chapter: sec.chapter_title
              ? `Chapter ${sec.chapter_number} - ${sec.chapter_title}`
              : (sec.chapter_number ? `Chapter ${sec.chapter_number}` : undefined),
            citation: `${sec.act_code} ${provisionLabel}`,
            official_citation: `${sec.act_code} ${provisionLabel} (${actMeta.year})`,
            year: actMeta.year,
            date: `${actMeta.year}-01-01`,
            source: 'Official Gazette of India / Legislative Department',
            source_name: 'Official Gazette of India',
            source_url: 'https://www.indiacode.nic.in',
            content: sec.text || `${sec.section_title}`,
            summary: sec.section_title + (actMeta.repealed ? ` (Repealed law - replaced by ${actMeta.replacedBy})` : ''),
            language: 'en' as const,
            last_updated: '2026-08-28T00:00:00.000Z',
            content_hash: `hash_${sec.act_code}_${sec.section_number}`,
            simple_explanation: sec.text
              ? (sec.text.length > 220 ? sec.text.slice(0, 220) + '...' : sec.text)
              : sec.section_title,
            scope_and_applicability: 'Territory of India',
            amendments_or_updates: actMeta.repealed
              ? `Repealed and replaced by ${actMeta.replacedBy} with effect from 1 July 2024.`
              : undefined,
          };
        });

        // Merge: Keep seed and user docs, then append all statutory sections not already present
        const existingIds = new Set(this.documents.map((d) => d.document_id));
        const newUniqueDocs = convertedDocs.filter((d) => !existingIds.has(d.document_id));

        this.documents = [...this.documents, ...newUniqueDocs];
        this.isFullDatasetLoaded = true;
        this.notifyListeners();
      } catch (e) {
        console.warn('Could not load /data/sections.json:', e);
      }
    })();

    return this.loadPromise;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch (err) {
        console.error('Error in LegalDatasetStore listener:', err);
      }
    });
  }

  private saveDataset(): void {
    try {
      localStorage.setItem(DATASET_STORAGE_KEY, JSON.stringify(this.userCreatedDocs));
    } catch (e) {
      console.warn('Unable to persist dataset to localStorage:', e);
    }
  }

  public getAllDocuments(): LegalDocument[] {
    return [...this.documents];
  }

  public getDocumentById(id: string): LegalDocument | undefined {
    return this.documents.find((doc) => doc.document_id === id);
  }

  public addOrUpdateDocument(doc: LegalDocument): { success: boolean; isDuplicate: boolean; docId: string } {
    const existingIndex = this.documents.findIndex(
      (d) => d.content_hash === doc.content_hash || d.document_id === doc.document_id
    );

    if (existingIndex >= 0) {
      if (this.documents[existingIndex].content_hash === doc.content_hash) {
        return { success: true, isDuplicate: true, docId: this.documents[existingIndex].document_id };
      }
      this.documents[existingIndex] = {
        ...doc,
        last_updated: new Date().toISOString(),
      };
      this.userCreatedDocs = this.userCreatedDocs.map((d) =>
        d.document_id === doc.document_id ? { ...doc, last_updated: new Date().toISOString() } : d
      );
      this.saveDataset();
      this.notifyListeners();
      return { success: true, isDuplicate: false, docId: doc.document_id };
    }

    this.documents.unshift({
      ...doc,
      last_updated: new Date().toISOString(),
    });
    this.userCreatedDocs.unshift({
      ...doc,
      last_updated: new Date().toISOString(),
    });
    this.saveDataset();
    this.notifyListeners();
    return { success: true, isDuplicate: false, docId: doc.document_id };
  }

  public filterDocuments(type?: DocumentType, actName?: string, query?: string): LegalDocument[] {
    return this.documents.filter((doc) => {
      if (type && type !== ('ALL' as unknown) && doc.document_type !== type) return false;
      if (actName && !doc.act_name.toLowerCase().includes(actName.toLowerCase())) return false;
      if (query) {
        const q = query.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesProvision = doc.article_or_section.toLowerCase().includes(q);
        const matchesContent = doc.content.toLowerCase().includes(q);
        const matchesCitation = doc.official_citation.toLowerCase().includes(q);
        return matchesTitle || matchesProvision || matchesContent || matchesCitation;
      }
      return true;
    });
  }

  public resetToSeedData(): void {
    this.userCreatedDocs = [];
    this.documents = [...INITIAL_LEGAL_DOCUMENTS];
    this.saveDataset();
    this.isFullDatasetLoaded = false;
    this.loadPromise = null;
    this.loadComprehensiveDataset();
  }

  public getDatasetStats() {
    const totalDocs = this.documents.length;
    const typesCount: Record<string, number> = {};
    const courtsCount: Record<string, number> = {};

    this.documents.forEach((doc) => {
      typesCount[doc.document_type] = (typesCount[doc.document_type] || 0) + 1;
      if (doc.court) {
        courtsCount[doc.court] = (courtsCount[doc.court] || 0) + 1;
      }
    });

    return {
      totalDocs,
      typesCount,
      courtsCount,
      isFullDatasetLoaded: this.isFullDatasetLoaded,
      lastUpdated: this.documents.length > 0 ? this.documents[0].last_updated : null,
    };
  }
}

export const legalDatasetStore = new LegalDatasetStore();

