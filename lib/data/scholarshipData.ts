export interface ScholarshipItem {
  id: string
  name: string
  country: string
  funding: string
  eligible: string
  openingDate: string
  closingDate: string
  fields: string
  applyUrl: string
  image: string
  notes?: string
  featured?: boolean
}

export interface GermanEposCourse {
  id: number
  university: string
  program: string
  field: string
  funding: string
  opening: string
  closing: string
  applyUrl: string
  image: string
}

export interface PakistaniUniversity {
  id: number
  name: string
  city: string
  meritAid: string
  needAid: string
  graduateAid: string
  fields: string
  opening: string
  closing: string
  applyUrl: string
  image: string
}

export interface MinorityAid {
  title: string
  target: string
  level: string
  funding: string
  eligibility: string
  fields: string
  opening: string
  closing: string
  applyUrl: string
  image: string
}

export const internationalScholarships: ScholarshipItem[] = [
  {
    id: 'chevening',
    name: 'Chevening Scholarship (UK Government)',
    country: 'United Kingdom 🇬🇧',
    funding: '✅ Fully Funded (Tuition + Monthly Stipend + Airfare)',
    eligible: '✅ Pakistan & Eligible Countries',
    openingDate: 'Early August (e.g. 4 Aug 2026)',
    closingDate: 'Early October (e.g. 6 Oct 2026)',
    fields: 'Almost all Master’s fields except Clinical Medicine. Public Policy, Education, Law, Development, Business, Climate, IT, Economics.',
    applyUrl: 'https://www.chevening.org/apply/',
    image: '/images/scholarship-chevening-uk.jpg',
    featured: true,
    notes: 'Requires 2 years (2,800 hours) work experience and leadership potential. Return to Pakistan for 2 years after study.'
  },
  {
    id: 'fulbright',
    name: 'Fulbright Foreign Student Program (USEFP)',
    country: 'United States 🇺🇸',
    funding: '✅ Fully Funded (Tuition + Stipend + Airfare + Health)',
    eligible: '✅ Pakistan & Eligible Countries',
    openingDate: 'February annually',
    closingDate: 'April / May (check USEFP Pakistan)',
    fields: 'All academic disciplines except Clinical Medicine. Engineering, Computer Science, AI, Education, Business, Economics, Public Admin.',
    applyUrl: 'https://www.usefp.org/scholarships/fulbright-degree-program.cfm',
    image: '/images/scholarship-fulbright-usa.jpg',
    featured: true,
    notes: 'GRE General Test required for most applicants. Administered in Pakistan directly by USEFP Islamabad.'
  },
  {
    id: 'erasmus',
    name: 'Erasmus Mundus Joint Masters (EMJM)',
    country: 'Europe (Multiple Countries) 🇪🇺',
    funding: '✅ Fully Funded (€1,400/mo Stipend + Full Tuition + Travel)',
    eligible: '✅ Open to Pakistanis (Category A)',
    openingDate: 'October annually',
    closingDate: 'December – February (varies by program)',
    fields: 'Engineering, Artificial Intelligence, Computer Science, Data Science, Renewable Energy, Public Policy, Education, Business.',
    applyUrl: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
    image: '/images/scholarship-erasmus-europe.jpg',
    featured: true,
    notes: 'Study in at least 2 to 3 European countries during a single Master’s program. No GRE required.'
  },
  {
    id: 'daad-epos',
    name: 'DAAD EPOS (Development Postgraduate Courses)',
    country: 'Germany 🇩🇪',
    funding: '✅ Fully Funded (€934/mo Master’s + Tuition + Travel)',
    eligible: '✅ Pakistan & Developing Nations',
    openingDate: 'August – September',
    closingDate: 'October – December (program specific)',
    fields: 'Economics, Public Policy, Development Studies, Engineering, Environmental Sciences, Public Health, Agriculture, Urban Planning.',
    applyUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    image: '/images/scholarship-daad-germany.jpg',
    featured: true,
    notes: 'Required: Minimum 2 years of professional working experience after Bachelor’s degree.'
  },
  {
    id: 'stipendium-hungaricum',
    name: 'Stipendium Hungaricum (Hungarian Government)',
    country: 'Hungary 🇭🇺',
    funding: '✅ Fully Funded (Tuition + Stipend + Housing + Medical)',
    eligible: '✅ Pakistan (via HEC / Direct Portal)',
    openingDate: 'November annually',
    closingDate: '15 January 2026',
    fields: 'Engineering, Computer Science, Medicine, Agriculture, Business, Economics, Natural Sciences, Arts, Social Sciences, Education, Law.',
    applyUrl: 'https://stipendiumhungaricum.hu/',
    image: '/images/scholarship-hungary-stipendium.jpg',
    featured: true,
    notes: 'HEC conducts HAT test in Pakistan for nominations (approx. 100 Master’s seats for Pakistan).'
  },
  {
    id: 'turkiye-burslari',
    name: 'Türkiye Burslari (Turkiye Scholarships)',
    country: 'Turkiye 🇹🇷',
    funding: '✅ Fully Funded (Tuition + Monthly Stipend + Housing + Airfare)',
    eligible: '✅ Pakistan & Global Applicants',
    openingDate: '10 January 2026',
    closingDate: '20 February 2026',
    fields: 'Engineering, Health Sciences, Medicine, Islamic Studies, Social Sciences, International Relations, Business, Agriculture, Architecture.',
    applyUrl: 'https://tbbs.turkiyeburslari.gov.tr',
    image: '/images/scholarship-turkiye-burslari.jpg',
    featured: true,
    notes: 'Includes a 1-year free Turkish Language course even if degree program is taught in English.'
  },
  {
    id: 'mext',
    name: 'MEXT Scholarship (Japanese Government)',
    country: 'Japan 🇯🇵',
    funding: '✅ Fully Funded (Tuition + ¥144,000/mo Stipend + Airfare)',
    eligible: '✅ Pakistani Citizens',
    openingDate: 'April annually',
    closingDate: 'May – June (via Japanese Embassy Islamabad/Karachi)',
    fields: 'Engineering, Computer Science, Robotics, Artificial Intelligence, Natural Sciences, Agriculture, Economics, Business, Education.',
    applyUrl: 'https://www.pk.emb-japan.go.jp/itpr_en/culture_education.html',
    image: '/images/scholarship-mext-japan.jpg',
    notes: 'Two tracks: Embassy Track (recommended via Embassy test & interview in Pakistan) and University Recommendation Track.'
  },
  {
    id: 'gks',
    name: 'Global Korea Scholarship (GKS / KGSP)',
    country: 'South Korea 🇰🇷',
    funding: '✅ Fully Funded (Tuition + Monthly Allowance + Airfare)',
    eligible: '✅ Pakistani Citizens',
    openingDate: 'February annually',
    closingDate: 'March (Embassy Track); University deadlines vary',
    fields: 'Engineering, ICT, Artificial Intelligence, Business, Economics, International Studies, Natural Sciences, Biotechnology, Education.',
    applyUrl: 'https://www.studyinkorea.go.kr',
    image: '/images/scholarship-gks-korea.jpg',
    notes: 'Requires 1 year Korean language preparatory course before commencing Master’s or PhD.'
  },
  {
    id: 'csc-china',
    name: 'Chinese Government Scholarship (CSC / HEC LOA)',
    country: 'China 🇨🇳',
    funding: '✅ Fully Funded (Tuition + 3,000 RMB/mo Stipend + Free Dorm)',
    eligible: '✅ Pakistani Students',
    openingDate: 'November / December',
    closingDate: 'February – April (varies by Chinese university)',
    fields: 'Engineering, Information Technology, Artificial Intelligence, Medicine, Agriculture, Business, Economics, Natural Sciences.',
    applyUrl: 'https://www.campuschina.org',
    image: '/images/scholarship-csc-china.jpg',
    notes: 'Apply via HEC Learning Opportunities Abroad (LOA) portal for bilateral seats or direct Type B university track.'
  },
  {
    id: 'swedish-institute',
    name: 'Swedish Institute Scholarship for Global Professionals',
    country: 'Sweden 🇸🇪',
    funding: '✅ Fully Funded (Tuition + SEK 12,000/mo Stipend + Travel Grant)',
    eligible: '✅ Pakistan & Selected Nations',
    openingDate: 'October (Admissions open)',
    closingDate: 'January – February',
    fields: 'Sustainability, Environmental Sciences, Climate Change, Public Admin, Human Rights, Business, Innovation, Engineering, IT.',
    applyUrl: 'https://si.se/en/apply/scholarships/',
    image: '/images/scholarship-swedish-institute.jpg',
    notes: 'Requires demonstrated leadership experience and at least 3,000 hours of professional work experience.'
  },
  {
    id: 'australia-awards',
    name: 'Australia Awards Scholarships (DFAT)',
    country: 'Australia 🇦🇺',
    funding: '✅ Fully Funded (Tuition + Airfare + Living Allowance + Health)',
    eligible: '✅ Pakistani Citizens',
    openingDate: 'February annually',
    closingDate: 'April / May',
    fields: 'Education, Public Policy, Governance, Gender Studies, Agriculture, Climate Change, Environmental Management, Public Health.',
    applyUrl: 'https://www.australiaawards.gov.au',
    image: '/images/scholarship-australia-awards.jpg',
    notes: 'Direct application through DFAT Australia Awards portal. Requires returning to Pakistan for 2 years.'
  },
  {
    id: 'commonwealth',
    name: 'Commonwealth Master’s Scholarships (UK FCDO)',
    country: 'United Kingdom 🇬🇧',
    funding: '✅ Fully Funded (Tuition + Airfare + Stipend + Thesis Grant)',
    eligible: '✅ Pakistani Citizens & Commonwealth Nations',
    openingDate: 'September',
    closingDate: 'October annually',
    fields: 'Education, Public Health, Engineering, Environmental Sciences, Agriculture, Climate Change, Development Studies, Economics.',
    applyUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/',
    image: '/images/scholarship-commonwealth-uk.jpg',
    notes: 'In Pakistan, HEC conducts HAT testing for official Commonwealth PhD/Master’s nominations.'
  },
  {
    id: 'great-scholarships',
    name: 'GREAT Scholarships (British Council & FCDO)',
    country: 'United Kingdom 🇬🇧',
    funding: '🪙 Substantial Partial (£10,000+ per student towards Master’s tuition)',
    eligible: '✅ Pakistani Citizens',
    openingDate: 'November / January',
    closingDate: 'April – May (varies by participating UK university)',
    fields: 'Business & Management, Engineering, Computer Science, Artificial Intelligence, Law, Education, Public Health, Creative Arts.',
    applyUrl: 'https://www.britishcouncil.org/study-work-abroad/in-uk/great-scholarships',
    image: '/images/scholarship-great-uk.jpg',
    notes: 'Offered by participating universities in England, Scotland, Wales, and Northern Ireland.'
  },
  {
    id: 'russian-gov',
    name: 'Russian Government Scholarship (Open Doors Olympiad)',
    country: 'Russia 🇷🇺',
    funding: '✅ Full Tuition Waiver + Monthly Stipend + Placement',
    eligible: '✅ Pakistani Citizens',
    openingDate: 'September',
    closingDate: 'December annually',
    fields: 'Engineering, Medicine, Computer Science, Mathematics, Physics, Aerospace, Natural Sciences, Agriculture, Economics, Business.',
    applyUrl: 'https://od.globaluni.ru',
    image: '/images/scholarship-russian-gov.jpg',
    notes: 'Olympiad track allows direct full-tuition admission to top Russian institutions.'
  },
  {
    id: 'az-heydar',
    name: 'HEC Azerbaijan (Heydar Aliyev Scholarship)',
    country: 'Azerbaijan 🇦🇿',
    funding: '✅ Fully Funded (Tuition + Stipend + Visa + Airfare)',
    eligible: '✅ Pakistani Nominations via HEC',
    openingDate: 'May – June',
    closingDate: '20 March / July (subject to annual HEC announcement)',
    fields: 'Engineering, Energy Studies, Information Technology, Economics, Business Admin, International Relations, Agriculture, Medicine.',
    applyUrl: 'https://scholarships.hec.gov.pk',
    image: '/images/scholarship-azerbaijan-heydar.jpg',
    notes: 'Official nomination route through Higher Education Commission (HEC) Islamabad.'
  }
]

export const hecSpecialSchemes: ScholarshipItem[] = [
  {
    id: 'hec-commonwealth',
    name: 'HEC Commonwealth Master’s Scholarship',
    country: 'United Kingdom 🇬🇧',
    funding: '✅ Fully Funded (UK Government FCDO)',
    eligible: 'Minimum 16 years education, HAT Score >= 60, Pakistani/AJK Nationality',
    openingDate: 'September',
    closingDate: 'October annually',
    fields: 'Priority development fields: STEM, Public Health, Agriculture, Engineering, Public Policy.',
    applyUrl: 'https://scholarships.hec.gov.pk',
    image: '/images/hec-commonwealth-scheme.jpg',
    notes: 'Step 1: Submit on HEC portal & take HAT test. Step 2: Apply on official CSC UK portal.'
  },
  {
    id: 'hec-hungary',
    name: 'HEC Stipendium Hungaricum',
    country: 'Hungary 🇭🇺',
    funding: '✅ Fully Funded (Hungarian Gov + HEC coordination)',
    eligible: 'Pakistani & AJK Nationals with 12/16 years education for Bachelor/Master',
    openingDate: 'November',
    closingDate: '15 January 2026',
    fields: 'Engineering, Computer Science, Medicine, Agriculture, Natural Sciences, Economics.',
    applyUrl: 'https://scholarships.hec.gov.pk',
    image: '/images/hec-hungary-scheme.jpg',
    notes: 'Must apply on BOTH HEC Pakistan online portal and Tempus Public Foundation (Hungary) portal.'
  },
  {
    id: 'hec-csc',
    name: 'HEC Chinese Government Scholarship (CSC / LOA)',
    country: 'China 🇨🇳',
    funding: '✅ Fully Funded (Tuition + Living Stipend)',
    eligible: 'Pakistani/AJK citizens with valid academic degrees & medical clearance',
    openingDate: 'December',
    closingDate: 'February annually',
    fields: 'Artificial Intelligence, IT, Engineering, Medicine, Agriculture, Economics, Environmental Science.',
    applyUrl: 'https://scholarships.hec.gov.pk',
    image: '/images/hec-china-scheme.jpg',
    notes: 'HEC Learning Opportunities Abroad portal required along with campuschina.org application.'
  },
  {
    id: 'hec-azerbaijan',
    name: 'HEC Azerbaijan (Heydar Aliyev Scholarship)',
    country: 'Azerbaijan 🇦🇿',
    funding: '✅ Fully Funded (Diplomatic Nomination)',
    eligible: 'Top merit holders from Pakistan & AJK',
    openingDate: 'May / June',
    closingDate: 'March / July (Annual specific dates)',
    fields: 'Energy Studies, Engineering, IT, Medicine, Public Administration, Economics.',
    applyUrl: 'https://scholarships.hec.gov.pk',
    image: '/images/hec-azerbaijan-scheme.jpg',
    notes: 'One official diplomatic Master’s / PhD nomination from Pakistan each year.'
  }
]

export const germanEposCourses: GermanEposCourse[] = [
  { id: 1, university: 'University of Bonn', program: 'MSc Agricultural Sciences & Resource Management (ARTS)', field: 'Agriculture', funding: '✅ EPOS Fully Funded', opening: 'August', closing: 'October', applyUrl: 'https://www.arts.uni-bonn.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 2, university: 'University of Bonn', program: 'MSc Global Health', field: 'Public Health', funding: '✅ EPOS Fully Funded', opening: 'December', closing: 'March', applyUrl: 'https://www.uni-bonn.de/en/studies/degree-programs', image: '/images/scholarship-daad-germany.jpg' },
  { id: 3, university: 'University of Freiburg', program: 'MSc Environmental Governance (MEG)', field: 'Environment & Sustainability', funding: '✅ EPOS Fully Funded', opening: 'July', closing: '15 October 2026', applyUrl: 'https://www.meg.uni-freiburg.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 4, university: 'University of Freiburg', program: 'MSc Global Urban Health', field: 'Public Health', funding: '✅ EPOS Fully Funded', opening: 'December', closing: 'March', applyUrl: 'https://www.uni-freiburg.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 5, university: 'TH Köln', program: 'MSc Natural Resources Management and Development (NRM)', field: 'Sustainability', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '31 October 2026', applyUrl: 'https://www.th-koeln.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 6, university: 'TH Köln', program: 'MSc Integrated Water Resources Management (IWRM)', field: 'Water Resources', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '31 October 2026', applyUrl: 'https://www.th-koeln.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 7, university: 'TH Köln', program: 'MSc Renewable Energy Management (REM)', field: 'Renewable Energy', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '31 October 2026', applyUrl: 'https://www.th-koeln.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 8, university: 'TU Darmstadt', program: 'MSc Tropical Hydrogeology and Environmental Engineering', field: 'Environmental Engineering', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '15 October 2026', applyUrl: 'https://www.trophee.tu-darmstadt.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 9, university: 'University of Bremen', program: 'MSc International Studies in Aquatic Tropical Ecology', field: 'Marine Biology', funding: '✅ EPOS Fully Funded', opening: 'September', closing: '15 January 2026', applyUrl: 'https://www.isatec.uni-bremen.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 10, university: 'Charité–Berlin / Freie Uni', program: 'MSc International Health', field: 'Public Health', funding: '✅ EPOS Fully Funded', opening: 'October', closing: 'January', applyUrl: 'https://internationalhealth.charite.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 11, university: 'Heidelberg University', program: 'MSc International Health', field: 'Public Health', funding: '✅ EPOS Fully Funded', opening: 'October', closing: 'January', applyUrl: 'https://www.klinikum.uni-heidelberg.de/international-health', image: '/images/scholarship-daad-germany.jpg' },
  { id: 12, university: 'Munich IP Law Center', program: 'LL.M. Intellectual Property & Competition Law', field: 'Law & IP', funding: '✅ EPOS Fully Funded', opening: 'September', closing: '30 April 2026', applyUrl: 'https://www.miplc.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 13, university: 'University of Stuttgart', program: 'MSc Infrastructure Planning', field: 'Urban Planning', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '15 October 2026', applyUrl: 'https://www.uni-stuttgart.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 14, university: 'RPTU Kaiserslautern', program: 'MSc Regional Planning', field: 'Planning & Civil', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '15 October 2026', applyUrl: 'https://rptu.de/en', image: '/images/scholarship-daad-germany.jpg' },
  { id: 15, university: 'Ruhr University Bochum', program: 'MA Development Management', field: 'Development Studies', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '30 September 2026', applyUrl: 'https://www.development-research.org', image: '/images/scholarship-daad-germany.jpg' },
  { id: 16, university: 'University of Leipzig', program: 'MBA Small Enterprise Promotion & Training (SEPT)', field: 'Entrepreneurship', funding: '✅ EPOS Fully Funded', opening: 'August', closing: '01 October 2026', applyUrl: 'https://www.sept.uni-leipzig.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 17, university: 'HTW Berlin', program: 'MBA Building Sustainability', field: 'Sustainable Construction', funding: '✅ EPOS Fully Funded', opening: 'November', closing: 'March', applyUrl: 'https://www.htw-berlin.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 18, university: 'Hochschule Bonn-Rhein-Sieg', program: 'MBA CSR & NGO Management', field: 'NGO Management', funding: '✅ EPOS Fully Funded', opening: 'January', closing: 'May', applyUrl: 'https://www.h-brs.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 19, university: 'University of Hohenheim', program: 'MSc Agricultural Economics', field: 'Economics & Agri', funding: '✅ DAAD Funded', opening: 'August', closing: '15 December 2026', applyUrl: 'https://www.uni-hohenheim.de', image: '/images/scholarship-daad-germany.jpg' },
  { id: 20, university: 'University of Passau', program: 'MA Development Studies', field: 'International Dev', funding: '✅ DAAD Funded', opening: 'April', closing: '30 June 2026', applyUrl: 'https://www.uni-passau.de/en', image: '/images/scholarship-daad-germany.jpg' }
]

export const pakistaniUniversities: PakistaniUniversity[] = [
  { id: 1, name: 'Lahore University of Management Sciences (LUMS)', city: 'Lahore', meritAid: '✅ Yes (Up to 50% for GMAT 700+/GRE equivalent)', needAid: '✅ Yes (Interest-free loan / tuition waivers)', graduateAid: 'Extensive Support', fields: 'Business, Economics, Computer Science, AI, Data Science, Law, Education, Public Policy', opening: 'November', closing: 'February', applyUrl: 'https://admissions.lums.edu.pk', image: '/images/uni-lums-lahore.jpg' },
  { id: 2, name: 'Institute of Business Administration (IBA)', city: 'Karachi', meritAid: '✅ Highly Competitive Awards', needAid: '✅ Yes (Financial Aid & Donor Scholarships)', graduateAid: 'Full Support', fields: 'Business Admin, Accounting & Finance, Economics, AI, Computer Science, Public Policy', opening: 'April (Fall) / Oct (Spring)', closing: 'June (Fall) / Dec (Spring)', applyUrl: 'https://admissions.iba.edu.pk', image: '/images/uni-iba-karachi.jpg' },
  { id: 3, name: 'National University of Sciences & Tech (NUST)', city: 'Islamabad / Rawalpindi', meritAid: '✅ High CGPA / Entry Merit', needAid: '✅ NUST Need Based & Ehsaas / HEC', graduateAid: 'Research Assistantships', fields: 'Engineering, Computer Science, Aerospace, AI, Business, Natural Sciences, Architecture', opening: 'May', closing: 'July', applyUrl: 'https://nust.edu.pk/admissions', image: '/images/uni-nust-islamabad.jpg' },
  { id: 4, name: 'FAST - NUCES', city: 'Multiple Campuses', meritAid: '✅ Top position holders waivers', needAid: 'Limited Hardship Assistance', graduateAid: 'Merit Scholarships', fields: 'Computer Science, Software Engineering, AI, Cyber Security, Data Science, Electrical', opening: 'May', closing: 'July', applyUrl: 'https://admissions.nu.edu.pk', image: '/images/uni-fast-nuces.jpg' },
  { id: 5, name: 'University of Management & Technology (UMT)', city: 'Lahore / Sialkot', meritAid: '✅ CGPA based up to 60% Waiver (3.75+ = 60%)', needAid: '✅ Need assessment support', graduateAid: 'Extensive Graduate Aid', fields: 'Business Admin, Computer Science, AI, Engineering, Education, Psychology, Social Sciences', opening: 'May', closing: 'August', applyUrl: 'https://admissions.umt.edu.pk', image: '/images/uni-umt-lahore.jpg' },
  { id: 6, name: 'University of Central Punjab (UCP)', city: 'Lahore', meritAid: '✅ Merit waivers on prior degree', needAid: '✅ Demonstrated hardship aid', graduateAid: 'Full Support', fields: 'Business Admin, Accounting, Computer Science, Pharmacy, Engineering, Law, Media', opening: 'May', closing: 'August', applyUrl: 'https://www.ucp.edu.pk/admissions', image: '/images/uni-ucp-lahore.jpg' },
  { id: 7, name: 'Superior University', city: 'Lahore', meritAid: '✅ Talent & Merit fee waivers', needAid: '✅ Need-based financial evaluation', graduateAid: 'Available', fields: 'Business Admin, AI, Engineering, Health Sciences, Pharmacy, Law, Education, Agriculture', opening: 'May', closing: 'August', applyUrl: 'https://admissions.superior.edu.pk', image: '/images/uni-superior-lahore.jpg' },
  { id: 8, name: 'SZABIST', city: 'Karachi / Islamabad / Larkana', meritAid: '✅ Academic performance awards', needAid: '✅ Hardship & family income evaluation', graduateAid: 'Extensive', fields: 'Business Admin, AI, Data Science, Media Sciences, Public Health, Social Sciences, Education', opening: 'June (Fall) / Nov (Spring)', closing: 'August / January', applyUrl: 'https://www.szabist.edu.pk/admissions', image: '/images/uni-szabist.jpg' },
  { id: 9, name: 'COMSATS University', city: 'Multiple Campuses', meritAid: '✅ High merit scholarships', needAid: 'Limited Financial Aid', graduateAid: 'Selected Programs', fields: 'Engineering, Computer Science, AI, Data Science, Biosciences, Environmental Sciences', opening: 'May / November', closing: 'July / January', applyUrl: 'https://admissions.comsats.edu.pk', image: '/images/uni-comsats.jpg' },
  { id: 10, name: 'Institute of Business Management (IoBM)', city: 'Karachi', meritAid: '✅ High CGPA concessions', needAid: '✅ Tuition fee support on hardship', graduateAid: 'Available', fields: 'Business Admin, Marketing, Supply Chain, Computer Science, Engineering, Economics, Media', opening: 'May', closing: 'July', applyUrl: 'https://admissions.iobm.edu.pk', image: '/images/uni-iobm-karachi.jpg' },
  { id: 11, name: 'Bahria University', city: 'Islamabad / Karachi / Lahore', meritAid: '✅ Academic Excellence Awards', needAid: 'Limited Hardship', graduateAid: 'Yes', fields: 'Business Admin, Computer Science, AI, Engineering, Maritime Studies, Health Sciences, Psychology', opening: 'May / November', closing: 'July / January', applyUrl: 'https://bahria.edu.pk/admissions', image: '/images/uni-bahria.jpg' },
  { id: 12, name: 'University of Lahore (UOL)', city: 'Lahore', meritAid: '✅ High percentage / CGPA concessions', needAid: '✅ Need assessment support', graduateAid: 'Yes', fields: 'Medicine, Pharmacy, Engineering, Business Admin, AI, Law, Allied Health Sciences', opening: 'May', closing: 'August', applyUrl: 'https://admissions.uol.edu.pk', image: '/images/uni-uol-lahore.jpg' },
  { id: 13, name: 'Riphah International University', city: 'Islamabad / Rawalpindi / Lahore', meritAid: '✅ Merit Scholarships', needAid: '✅ Financial Assistance', graduateAid: 'Available', fields: 'Health Sciences, Pharmacy, Rehabilitation, Business Admin, Computing, Psychology', opening: 'May / November', closing: 'July / January', applyUrl: 'https://admissions.riphah.edu.pk', image: '/images/uni-riphah.jpg' },
  { id: 14, name: 'Air University', city: 'Islamabad / Multan / Kamra', meritAid: '✅ Merit Awards', needAid: 'Limited Support', graduateAid: 'Available', fields: 'Aerospace Engineering, Cyber Security, AI, Electrical Engineering, Business, Avionics', opening: 'May / November', closing: 'July / January', applyUrl: 'https://portals.au.edu.pk/admissions', image: '/images/uni-air-university.jpg' },
  { id: 15, name: 'Beaconhouse National University (BNU)', city: 'Lahore', meritAid: '✅ Academic Excellence', needAid: '✅ Demonstrated Need Support', graduateAid: 'Selected Programs', fields: 'Fine Arts, Architecture, Design, Media Studies, Liberal Arts, Psychology, Visual Arts', opening: 'May', closing: 'July', applyUrl: 'https://www.bnu.edu.pk/admissions', image: '/images/uni-bnu-lahore.jpg' },
  { id: 16, name: 'Foundation University', city: 'Islamabad / Rawalpindi', meritAid: '✅ Tuition Concessions', needAid: 'Limited', graduateAid: 'Available', fields: 'Business Admin, Engineering, Computer Science, Pharmacy, Medical Sciences, Psychology', opening: 'May', closing: 'July', applyUrl: 'https://www.fui.edu.pk', image: '/images/uni-foundation.jpg' },
  { id: 17, name: 'DHA Suffa University', city: 'Karachi', meritAid: '✅ Merit Scholarships', needAid: 'Limited Support', graduateAid: 'Available', fields: 'Engineering, Computer Science, Software Engineering, AI, Business Administration, Architecture', opening: 'June', closing: 'August', applyUrl: 'https://www.dsu.edu.pk/admissions', image: '/images/uni-dha-suffa.jpg' },
  { id: 18, name: 'Habib University', city: 'Karachi', meritAid: '✅ Generous Merit Aid', needAid: '✅ Yohsin Need Scholarships', graduateAid: 'Limited Graduate Programs', fields: 'Computer Science, Electrical Engineering, Liberal Arts, Social Development & Policy', opening: 'November', closing: 'March', applyUrl: 'https://habib.edu.pk/admissions', image: '/images/uni-habib-karachi.jpg' },
  { id: 19, name: 'Mohamad Ali Jinnah University (MAJU)', city: 'Karachi', meritAid: '✅ Merit Awards', needAid: '✅ Financial Assistance', graduateAid: 'Available', fields: 'Business Admin, Computer Science, AI, Software Engineering, Mathematics, Economics', opening: 'May', closing: 'August', applyUrl: 'https://jinnah.edu', image: '/images/uni-maju-karachi.jpg' },
  { id: 20, name: 'Indus University', city: 'Karachi', meritAid: '✅ Merit Scholarships', needAid: '✅ Hardship Aid', graduateAid: 'Yes', fields: 'Engineering, Computer Science, AI, Business Admin, Media Sciences, Architecture', opening: 'May', closing: 'August', applyUrl: 'https://indus.edu.pk', image: '/images/uni-indus-karachi.jpg' },
  { id: 21, name: 'Hamdard University', city: 'Karachi / Islamabad', meritAid: '✅ Merit Support', needAid: '✅ Need & Hardship Concessions', graduateAid: 'Yes', fields: 'Medicine, Pharmacy, Eastern Medicine, Engineering, Computer Science, Business Admin', opening: 'May', closing: 'July', applyUrl: 'https://hamdard.edu.pk/admissions', image: '/images/uni-hamdard.jpg' },
  { id: 22, name: 'GIFT University', city: 'Gujranwala', meritAid: '✅ Academic Awards', needAid: '✅ Need & Family Aid', graduateAid: 'Yes', fields: 'Business Admin, Computer Science, AI, Software Engineering, Law, Psychology, Education', opening: 'May', closing: 'August', applyUrl: 'https://gift.edu.pk', image: '/images/uni-gift-gujranwala.jpg' },
  { id: 23, name: 'Minhaj University', city: 'Lahore', meritAid: '✅ Merit & Talent Aid', needAid: '✅ Financial Hardship Support', graduateAid: 'Yes', fields: 'Business Admin, AI, Computer Science, Islamic Studies, Education, Psychology, Media', opening: 'May', closing: 'August', applyUrl: 'https://mul.edu.pk/admissions', image: '/images/uni-minhaj-lahore.jpg' },
  { id: 24, name: 'National Textile University (NTU)', city: 'Faisalabad', meritAid: '✅ Top Performers', needAid: '✅ Need Based Support', graduateAid: 'Yes', fields: 'Textile Engineering, Materials Engineering, Fashion Design, Business Admin, Computer Science', opening: 'May', closing: 'July', applyUrl: 'https://ntu.edu.pk/admissions', image: '/images/uni-ntu-faisalabad.jpg' },
  { id: 25, name: 'Capital University of Science & Tech (CUST)', city: 'Islamabad', meritAid: '✅ Merit Concessions', needAid: 'Limited', graduateAid: 'Available', fields: 'Engineering, Computer Science, AI, Data Science, Mathematics, Business Admin, Psychology', opening: 'May', closing: 'July', applyUrl: 'https://cust.edu.pk/admissions', image: '/images/uni-cust-islamabad.jpg' }
]

export const pakistaniMinorityScholarships: MinorityAid[] = [
  {
    title: 'Punjab Human Rights & Minorities Affairs (HR&MA) Scholarship',
    target: 'Christians, Hindus, Sikhs, Parsis, Bahá’ís, Kalash & recognized minorities',
    level: 'Matric to PhD (Master’s up to PKR 70,000 / Professional up to PKR 100,000)',
    funding: '✅ Up to PKR 100,000 Cash Grant',
    eligibility: 'Punjab domicile, regular student in recognized institution, min 40% marks in last exam, family income below threshold.',
    fields: 'Engineering, Computer Science, Business Admin, Medicine, Pharmacy, Education, Law, Agriculture, Social Sciences.',
    opening: 'September',
    closing: 'November annually',
    applyUrl: 'https://hrma.punjab.gov.pk',
    image: '/images/minority-punjab-hrma.jpg'
  },
  {
    title: 'PEEF – HR&MA Minority Scholarship Scheme',
    target: 'Religious Minorities residing in Punjab',
    level: 'Intermediate, Bachelor’s & Master’s Degrees',
    funding: '✅ Full Tuition Support + Monthly Stipend via PEEF',
    eligibility: 'Punjab domicile, academic merit, genuine financial need, admission in HEC recognized institution.',
    fields: 'All disciplines offered by HEC recognized public and eligible private universities across Pakistan.',
    opening: 'September',
    closing: 'October annually',
    applyUrl: 'https://www.peef.org.pk',
    image: '/images/minority-peef-hrma.jpg'
  },
  {
    title: 'Ministry of Religious Affairs & Interfaith Harmony (MoRA) Minorities Welfare Fund',
    target: 'Christians, Hindus, Sikhs, Buddhists, Parsis & Non-Muslim minorities',
    level: 'School to Higher Education / Graduate level',
    funding: '✅ Merit & Need Financial Assistance',
    eligibility: 'Regular student enrolled in recognized institution across Pakistan with good academic standing.',
    fields: 'Open to all academic disciplines including STEM, Health Sciences, Business, Agriculture, Law & Humanities.',
    opening: 'August',
    closing: 'October annually',
    applyUrl: 'https://mora.gov.pk',
    image: '/images/minority-mora-welfare.jpg'
  },
  {
    title: 'Khyber Pakhtunkhwa (KP) Minority Scholarship',
    target: 'Religious minorities domiciled in KP',
    level: 'Intermediate to PhD (MS/MPhil up to PKR 150,000; PhD up to PKR 250,000)',
    funding: '✅ PKR 150,000 to PKR 250,000 Grant',
    eligibility: 'KP domicile, enrolled in public sector university, not receiving another concurrent government scholarship.',
    fields: 'Engineering, Computer Science, Medicine, Pharmacy, Business Administration, Education, Agriculture & Arts.',
    opening: 'September',
    closing: 'November annually',
    applyUrl: 'https://www.kp.gov.pk',
    image: '/images/minority-kp-scheme.jpg'
  },
  {
    title: 'University of the Punjab – Institutional Minority Scholarship',
    target: 'Minority regular students enrolled at PU Lahore',
    level: 'BS 4-Year, Master’s (MS/MPhil) & above',
    funding: '✅ Merit Tuition Waiver & Financial Aid',
    eligibility: 'Recognized minority status and valid active enrollment at University of the Punjab.',
    fields: 'All Master’s and postgraduate departments at PU: Computer Science, Engineering, Law, Pharmacy, Business.',
    opening: 'October',
    closing: 'December (varies by academic term)',
    applyUrl: 'https://pu.edu.pk',
    image: '/images/minority-pu-lahore.jpg'
  }
]

export const internationalWomenScholarships: ScholarshipItem[] = [
  {
    id: 'aauw',
    name: 'AAUW International Fellowship for Women',
    country: 'United States 🇺🇸',
    funding: '✅ Up to $20,000–$50,000 Fellowship Grant',
    eligible: '✅ Women (Non-U.S. Citizens)',
    openingDate: '1 August 2026',
    closingDate: '30 September 2026',
    fields: 'STEM Master’s & PhD, Education, Business, Law, Public Policy, Social Sciences, Engineering, Computer Science.',
    applyUrl: 'https://www.aauw.org',
    image: '/images/women-aauw-fellowship.jpg',
    notes: 'Empowering women since 1881. Highly focused on STEM and community leadership.'
  },
  {
    id: 'bc-women-stem',
    name: 'British Council Women in STEM Scholarship',
    country: 'United Kingdom 🇬🇧',
    funding: '✅ Fully Funded (Tuition + Monthly Stipend + Airfare + Visa & Childcare Support)',
    eligible: '✅ Pakistani Women with STEM background',
    openingDate: 'January annually',
    closingDate: 'March (varies by participating UK university)',
    fields: 'Computer Science, Artificial Intelligence, Data Science, Renewable Energy, Engineering, Mathematics, Physics.',
    applyUrl: 'https://www.britishcouncil.org/study-work-abroad/in-uk/scholarship-women-stem',
    image: '/images/women-stem-uk.jpg',
    notes: 'Specially designed for South Asian women pursuing Master’s in scientific and technical disciplines in the UK.'
  },
  {
    id: 'owsd',
    name: 'OWSD Fellowships (Women in Science for Developing World)',
    country: 'Multiple International Hubs 🌐',
    funding: '✅ Fully Funded Research & Postgraduate Grant',
    eligible: '✅ Women from Pakistan & Developing Nations',
    openingDate: 'March annually',
    closingDate: 'April annually',
    fields: 'Biology, Chemistry, Physics, Mathematics, Computer Science, AI, Environmental Sciences, Agriculture, Biotech.',
    applyUrl: 'https://owsd.net/fellowships',
    image: '/images/women-owsd-fellowship.jpg',
    notes: 'Administered in coordination with UNESCO and TWAS for scientific advancement of developing world women.'
  },
  {
    id: 'amelia-earhart',
    name: 'Amelia Earhart Fellowship (Zonta International)',
    country: 'Worldwide ✈️',
    funding: '✅ $10,000 Fellowship Cash Grant',
    eligible: '✅ Women in Aerospace / Aeronautical Engineering',
    openingDate: 'July annually',
    closingDate: '15 November 2026',
    fields: 'Aerospace Engineering, Aeronautical Engineering, Space Sciences, Astronomy, Astrophysics, Aviation, Planetary Science.',
    applyUrl: 'https://www.zonta.org/ameliaearhartfellowship',
    image: '/images/women-amelia-earhart.jpg',
    notes: 'Dedicated exclusively to women conducting doctoral or postgraduate aerospace-related research.'
  },
  {
    id: 'peo-peace',
    name: 'PEO International Peace Scholarship',
    country: 'USA & Canada 🇺🇸 🇨🇦',
    funding: '🪙 Substantial Graduate Study Funding (up to $12,500/year)',
    eligible: '✅ International Women pursuing Master’s & PhD',
    openingDate: '15 September 2026',
    closingDate: '15 December 2026',
    fields: 'All disciplines: Business, Education, Engineering, Computer Science, Health Sciences, Social Sciences, Humanities.',
    applyUrl: 'https://www.peointernational.org/ips',
    image: '/images/women-peo-peace.jpg',
    notes: 'Requires confirmed admission to an accredited North American university graduate school.'
  }
]
