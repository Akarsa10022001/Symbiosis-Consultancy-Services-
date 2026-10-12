// All content below comes from @symbiosis.consultancy on Instagram (captions + posters, scraped 2026-10-12).
// `src` is the reel shortcode each fact was taken from.

export const CONTACT = {
  name: 'Symbiosis Education Consultancy',
  tagline: 'Your Future • Our Guidance',
  bio: 'Strategic guidance for medical & professional degrees. Admissions in India and overseas.',
  phone: '8200691036',            // "Call/WhatsApp" number printed on every poster
  whatsapp: '917284913204',       // wa.me link in the Instagram bio — bookings are sent here
  instagram: 'symbiosis.consultancy',
};

export const FIELDS = [
  { id: 'medical',     name: 'Medical & AYUSH',          icon: 'stetho',  blurb: 'MBBS, BDS, BAMS, BHMS, BUMS, BSMS and MD Yoga & Naturopathy.' },
  { id: 'pharmacy',    name: 'Pharmacy',                 icon: 'capsule', blurb: 'D.Pharm, B.Pharm and M.Pharm at RGPV and PCI-approved colleges.' },
  { id: 'paramedical', name: 'Paramedical & Nursing',    icon: 'cross',   blurb: 'B.Sc Nursing, BPT, OT technology and 1-year certificates after 10th.' },
  { id: 'engineering', name: 'Engineering',              icon: 'gear',    blurb: 'B.Tech, B.E and Diploma in all branches.' },
  { id: 'management',  name: 'Management',               icon: 'chart',   blurb: 'MBA Tourism & Hospitality and Executive MBA in Supply Chain.' },
  { id: 'education',   name: 'Teaching & Education',     icon: 'book',    blurb: 'D.El.Ed, B.Ed, M.Ed and M.A. Education in Balaghat.' },
  { id: 'creative',    name: 'Design & Media',           icon: 'pen',     blurb: 'Journalism & Mass Communication, B.Des and M.Des Animation.' },
  { id: 'more',        name: 'Law, Architecture & more', icon: 'scales',  blurb: 'LLB, B.Arch, Agriculture, Yoga and UG/PG programmes.' },
  { id: 'overseas',    name: 'MBBS Overseas',            icon: 'globe',   blurb: 'Georgia, Russia and Ukraine, with admission and visa support.' },
  { id: 'pro',         name: 'Working professionals',    icon: 'case',    blurb: 'UGC-recognised flexible degrees, PhD and M.Tech.' },
];

// fees: [label, value] rows. from: lowest yearly figure (₹) used for "from" labels; null = on counselling.
export const COURSES = [
  // ---------- Overseas
  { id: 'mbbs-georgia', field: 'overseas', name: 'MBBS in Georgia', univ: 'Caucasus International University (CIU)', place: 'Tbilisi, Georgia',
    duration: '6 years', eligibility: '12th PCB + NEET UG', total: '₹42 Lacs (approx.)', from: null, tag: 'Overseas',
    fees: [['Tuition fee', '₹30 Lacs (approx.)'], ['Hostel & expenses', '₹12 Lacs (approx.)'], ['Total package', '₹42 Lacs (approx.)']],
    points: ['NMC & WHO approved', 'English-medium teaching', 'Indian food & hostel', 'Admission & visa support', 'FMGE / NEXT preparation support'],
    src: 'DeCYE-VTxKz' },
  { id: 'mbbs-abroad', field: 'overseas', name: 'MBBS — Russia · Ukraine · India', univ: 'Verified medical colleges', place: 'Russia, Ukraine & India',
    duration: 'As per university', eligibility: '12th PCB + NEET UG', total: 'On counselling', from: null, tag: 'MBBS experts',
    fees: [], points: ['Verified medical colleges', 'Complete documentation support', 'B.A.M.S · B.H.M.S · B.U.M.S options in India'],
    src: 'DXQGF1Sk3LD' },

  // ---------- Medical & AYUSH
  { id: 'mbbs-india', field: 'medical', name: 'MBBS, BDS & AYUSH', univ: 'Medical colleges across India', place: 'Pan-India',
    duration: 'MBBS 5.5 yrs + 1 yr internship · AYUSH 4.5 yrs + internship', eligibility: '12th PCB + NEET UG', total: 'On counselling', from: null, tag: 'NEET UG',
    fees: [], points: ['MBBS (General Medicine)', 'BDS (Dental Surgery)', 'BAMS · BHMS · BUMS · BSMS', 'Current as well as distance options in some courses'],
    src: 'DX5wwTvK_P2' },
  { id: 'bams-roorkee', field: 'medical', name: 'BAMS', univ: 'Ayurveda college', place: 'Roorkee, Uttarakhand',
    duration: '4.5 years + internship', eligibility: '12th PCB + NEET UG', total: '₹8.7 Lakh tuition (3 yrs)', from: 290000, tag: 'Ayurveda',
    fees: [['Tuition', '₹2.9 Lakh / year'], ['Hostel + mess', '₹1 Lakh / year'], ['Complete tuition package', '₹8.7 Lakh (3 yrs of tuition)'], ['One-time payment (OTP)', '₹10,000 + documents']],
    points: ['Session 2026–27', 'DM “BAMS” for details'], src: 'DeWKPopKnrv' },
  { id: 'bhms-bhopal', field: 'medical', name: 'BHMS', univ: 'Homoeopathic medical college', place: 'Bhopal, Madhya Pradesh',
    duration: '4.5 years', eligibility: '12th PCB + NEET UG', total: '₹5,21,100 tuition', from: 115800, tag: 'Homoeopathy',
    fees: [['Tuition', '₹9,650 / month'], ['Total tuition package', '₹5,21,100'], ['Hostel', '₹25,000 / year'], ['Mess', '₹3,000 / month'], ['Consultancy & document handling', '₹25,000']],
    points: ['Exam & miscellaneous charges extra, as decided by the university', 'NEET, counselling and recognition rules are verified before admission'],
    src: 'DeRFAtPi5ze' },
  { id: 'md-yoga', field: 'medical', name: 'MD in Yoga & Naturopathy', univ: 'Postgraduate programme', place: 'Gujarat',
    duration: 'As per university', eligibility: 'As per university', total: '₹3.9 Lakh package', from: null, tag: 'Postgraduate',
    fees: [['Complete package', '₹3.9 Lakh']], points: ['Holistic wellness career', 'Seats and eligibility vary — ask us'], src: 'DdgdXcoq-7m' },

  // ---------- Pharmacy
  { id: 'pharm-gwalior', field: 'pharmacy', name: 'B.Pharm & D.Pharm', univ: 'RGPV University', place: 'Gwalior, Madhya Pradesh',
    duration: 'B.Pharm 4 yrs · D.Pharm 2 yrs', eligibility: '12th PCB / PCM', total: 'B.Pharm ₹1,60,000 · D.Pharm ₹80,000', from: 40000, tag: 'Lowest fees',
    fees: [['Tuition', '₹40,000 / year'], ['B.Pharm (4 yrs)', '₹1,60,000 total'], ['D.Pharm (2 yrs)', '₹80,000 total'], ['Hostel + mess', '₹6,000 / month'], ['One-time payment (OTP)', '₹10,000 + documents']],
    points: ['Degree from RGPV', 'Limited seats'], src: 'DeX3zvhz5M2' },
  { id: 'bpharm-rgpv', field: 'pharmacy', name: 'B.Pharm — budget plan', univ: 'RGPV University', place: 'Exam centre: Gwalior, MP',
    duration: '4 years', eligibility: '12th PCB / PCM', total: '₹1,80,000 tuition', from: 40000, tag: 'Lowest budget',
    fees: [['1st year', '₹60,000 (₹20,000 + ₹40,000)'], ['2nd – 4th year', '₹40,000 / year'], ['Registration', '₹5,000'], ['Enrollment', '₹2,000'], ['Examination', '₹3,000 / semester']],
    points: ['Degree from RGPV'], src: 'Dd9MGd6TpSJ' },
  { id: 'pharm-roorkee', field: 'pharmacy', name: 'B.Pharm & D.Pharm', univ: 'Pharmacy college', place: 'Roorkee, Uttarakhand',
    duration: 'B.Pharm 4 yrs · D.Pharm 2 yrs', eligibility: '12th PCB / PCM', total: 'B.Pharm ₹2,92,000 · D.Pharm ₹1,30,000', from: 65000, tag: 'Uttarakhand',
    fees: [['D.Pharm', '₹65,000 / year · ₹1,30,000 total'], ['B.Pharm', '₹73,000 / year · ₹2,92,000 total'], ['Admission registration (OTP)', '₹10,000'], ['Hostel & mess', 'Extra']],
    points: ['Documents included as specified'], src: 'DeUDMJNTCa0' },
  { id: 'bpharm-bhopal', field: 'pharmacy', name: 'B.Pharm', univ: 'PCI-approved college', place: 'Bhopal, Madhya Pradesh',
    duration: '4 years', eligibility: '12th PCB / PCM', total: '₹2,20,000 tuition', from: 55000, tag: '≈ ₹4,583 / month',
    fees: [['Tuition', '₹55,000 / year (≈ ₹4,583 / month)'], ['Registration + documents', '₹5,000'], ['One-time payment', '₹10,000'], ['Hostel', '₹25,000 / year'], ['Mess', '₹3,000 / month'], ['Bus (if not in hostel)', '₹25,000 / year']],
    points: ['PCI approved', 'Exam charges extra, as decided by the university'], src: 'DeDJAD5zEe0' },
  { id: 'bpharm-pci', field: 'pharmacy', name: 'B.Pharm (8 semesters)', univ: 'PCI-approved college', place: 'Madhya Pradesh',
    duration: '4 years · 8 semesters', eligibility: '12th PCB / PCM', total: '₹2,40,000 total', from: 55000, tag: 'PCI approved',
    fees: [['1st year', '₹75,000'], ['2nd – 4th year', '₹55,000 / year'], ['Total course fee', '₹2,40,000']], points: ['Limited seats'], src: 'DdWQztSzrdP' },
  { id: 'mpharm', field: 'pharmacy', name: 'M.Pharm', univ: 'Master of Pharmacy', place: 'India',
    duration: '2 years', eligibility: 'B.Pharm', total: 'On counselling', from: null, tag: 'Postgraduate',
    fees: [], points: ['Various specialisations', 'Careers in research, industry and academia'], src: 'DX54UR5MtYF' },

  // ---------- Paramedical & Nursing
  { id: 'bsc-nursing', field: 'paramedical', name: 'B.Sc Nursing', univ: 'Nursing college', place: 'Madhya Pradesh',
    duration: '4 years', eligibility: '12th PCB', total: '₹3 Lakh complete package', from: 75000, tag: 'Lowest in India',
    fees: [['Tuition', '₹75,000 / year'], ['Complete package', '₹3 Lakh'], ['Registration (with documents)', '₹5,000']], points: ['Limited seats'], src: 'DeSO_1DxWlc' },
  { id: 'bpt-gujarat', field: 'paramedical', name: 'BPT — Physiotherapy', univ: 'VNSGU', place: 'Gujarat',
    duration: '4 years', eligibility: '12th PCB', total: '₹4,05,000 tuition (4 yrs)', from: 101250, tag: 'Clinical exposure',
    fees: [['4-year tuition package', '₹4,05,000'], ['Hostel + mess', '₹70,000 / year']],
    points: ['Degree from VNSGU', 'Parent hospital for clinical training', '10+ hospital tie-ups', 'Clinical exposure in Navsari, Surat & Mumbai'], src: 'Dd_Ycy6zyXx' },
  { id: 'bsc-ot', field: 'paramedical', name: 'B.Sc O.T. Technology', univ: 'Paramedical college', place: 'India',
    duration: '3 years', eligibility: '12th Science', total: '₹1,50,450 total specified', from: 40000, tag: 'Healthcare',
    fees: [['Registration (with documents)', '₹5,000'], ['Tuition', '₹40,000 / year'], ['Total specified fees', '₹1,50,450']],
    points: ['Training & leaving certificate charges not included'], src: 'Dd9zrcYxURp' },
  { id: 'bsc-ota', field: 'paramedical', name: 'B.Sc OT & Anesthesia Technology', univ: 'Paramedical college', place: 'India',
    duration: '3 years · 6 semesters', eligibility: '12th Science (PCB)', total: '₹1,80,000 total', from: 60000, tag: 'Hands-on',
    fees: [['Total course fee', '₹1,80,000']], points: ['Hands-on clinical training', 'Careers in hospitals & operation theatres'], src: 'DdTIBDNCX0I' },
  { id: 'para-cert', field: 'paramedical', name: '1-year certificate courses', univ: 'After 10th', place: 'India',
    duration: '1 year', eligibility: '10th pass', total: '₹30,000', from: 30000, tag: 'After 10th',
    fees: [['Course fee', '₹30,000']], points: ['MRT · MLT · Dialysis · ECG', 'Radiology · OT Technology', 'Cardiac Care · Pharmacy Assistant', 'Practical, hands-on training'], src: 'DeDZVyczPWG' },
  { id: 'allied', field: 'paramedical', name: 'Allied health sciences', univ: 'Colleges across India', place: 'Pan-India',
    duration: '1 – 4 years (varies)', eligibility: '10th / 12th / Graduation', total: 'On counselling', from: null, tag: 'Current + distance',
    fees: [], points: ['GNM · ANM · DMLT · DMRT · X-Ray Technician', 'B.Sc MLT · Radiology & Imaging · Cardiac Care · Optometry', 'B.Sc Nutrition & Dietetics · Health Inspector · Community Health'], src: 'DdxatFsTFXH' },

  // ---------- Engineering
  { id: 'btech-mech', field: 'engineering', name: 'B.Tech Mechanical', univ: 'Engineering college', place: 'India',
    duration: '4 years', eligibility: '12th pass', total: '₹2,60,000 tuition', from: 65000, tag: 'Session 2026–27',
    fees: [['Tuition', '₹65,000 / year'], ['Registration (one-time, with documents)', '₹5,000']], points: ['Counselling & document assistance'], src: 'Dd-5nYECjbI' },
  { id: 'engineering', field: 'engineering', name: 'B.Tech · B.E · Diploma', univ: 'All branches', place: 'India',
    duration: '3 – 4 years', eligibility: '10th / 12th', total: 'On counselling', from: null, tag: 'All branches',
    fees: [], points: ['Technology, innovation and development careers'], src: 'DX55OlRMbh9' },

  // ---------- Management
  { id: 'mba-tourism', field: 'management', name: 'MBA Tourism & Hospitality', univ: 'Tourism & Travel specialisation', place: 'India',
    duration: '2 years', eligibility: "Bachelor's degree", total: '₹80,000 tuition', from: 40000, tag: 'Flexible',
    fees: [['Tuition', '₹40,000 / year'], ['One-time admission registration', '₹10,000 + documents']], points: ['Travel, tourism, hotels & hospitality careers'], src: 'DeOheS0iY1Z' },
  { id: 'emba-scm', field: 'management', name: 'Executive MBA — Supply Chain', univ: 'For working professionals', place: 'India',
    duration: '1 year', eligibility: 'Graduation + 5 years experience', total: '₹2,20,000 complete', from: 220000, tag: 'Executive',
    fees: [['Per semester', '₹1,10,000'], ['Complete course', '₹2,20,000']], points: ['Designed for working professionals'], src: 'DdVA90xTrxJ' },

  // ---------- Education
  { id: 'education-balaghat', field: 'education', name: 'D.El.Ed · B.Ed · M.Ed', univ: 'Teacher-education college', place: 'Balaghat, Madhya Pradesh',
    duration: '2 – 3 years', eligibility: '12th / Graduation with 50%', total: 'From ₹20,000 / year', from: 20000, tag: 'Balaghat',
    fees: [['D.El.Ed · 2 yrs · 12th 50%', '₹50,000 / year'], ['B.Ed · 2 yrs · Grad 50%', '₹55,000 / year'], ['B.Ed Part-time · 3 yrs', '₹50,000 / year'], ['M.Ed · 2 yrs · B.Ed 50%', '₹50,000 / year'], ['M.A. Education · 2 yrs', '₹20,000 / year'], ['Registration (OTP)', '₹5,000 + documents']],
    points: ['Documents: 10th, 12th & graduation marksheets, caste certificate (if any), ID proof, 2–4 photos'], src: 'DePF0KwzWmn' },

  // ---------- Design & Media
  { id: 'journalism', field: 'creative', name: 'Journalism & Mass Communication', univ: "Bachelor's & Master's", place: 'Balaghat, Madhya Pradesh',
    duration: "Bachelor's 3 yrs · Master's 2 yrs", eligibility: "12th / Bachelor's", total: 'From ₹20,000 / year', from: 20000, tag: 'Lowest in India',
    fees: [["Bachelor's", '₹20,000 / year × 3 years'], ["Master's", '₹25,000 / year × 2 years']], points: ["Don't just watch the news — be the news"], src: 'DeSfwrFTciE' },
  { id: 'animation', field: 'creative', name: 'B.Des & M.Des Animation', univ: 'Design school', place: 'India',
    duration: 'B.Des 4 yrs · M.Des 2 yrs', eligibility: "12th / Bachelor's", total: 'B.Des ₹1,80,000 · M.Des ₹1,10,000', from: 45000, tag: 'Creative',
    fees: [['B.Des (Animation)', '₹45,000 / year · ₹1,80,000'], ['M.Des (Animation)', '₹55,000 / year · ₹1,10,000']],
    points: ['2D / 3D · VFX · Motion graphics', 'Game design · Visual storytelling'], src: 'DdTAwQIKMZO' },

  // ---------- Law, Architecture & more
  { id: 'law', field: 'more', name: 'LLB · BA LLB · LLM', univ: 'Law colleges', place: 'India', duration: '3 – 5 years', eligibility: '12th / Graduation',
    total: 'On counselling', from: null, tag: 'Law', fees: [], points: ['Integrated LLB available'], src: 'DX56Glys0TX' },
  { id: 'architecture', field: 'more', name: 'B.Arch · M.Arch · Diploma', univ: 'Architecture colleges', place: 'India', duration: '3 – 5 years', eligibility: '10th / 12th',
    total: 'On counselling', from: null, tag: 'Architecture', fees: [], points: ['Design spaces that inspire'], src: 'DX563vHsc0x' },
  { id: 'agriculture', field: 'more', name: 'Agriculture courses', univ: 'Agribusiness, research & modern farming', place: 'India', duration: 'As per course', eligibility: '12th',
    total: 'On counselling', from: null, tag: 'Agriculture', fees: [], points: ['Agribusiness, research and modern farming'], src: 'DX590MmME1t' },
  { id: 'yoga', field: 'more', name: 'Yoga courses', univ: "Certificate to Master's", place: 'India', duration: 'As per course', eligibility: 'As per course',
    total: 'On counselling', from: null, tag: 'Wellness', fees: [], points: ["Certificate, Diploma, Bachelor's and Master's"], src: 'DX6TEBqN70j' },
  { id: 'spu-balaghat', field: 'more', name: 'Any course at Sardar Patel University', univ: 'Sardar Patel University', place: 'Balaghat, Madhya Pradesh', duration: 'UG · PG · Diploma',
    total: '₹5,000 off', from: null, tag: 'Golden offer', fees: [['Discount on any course', '₹5,000 off']], points: ['UG & PG courses', 'Diploma & professional courses', 'Limited-time offer'], src: 'DeXNETlqXsd' },

  // ---------- Working professionals & research
  { id: 'working-pro', field: 'pro', name: 'Degrees for working professionals', univ: 'UGC-recognised universities', place: 'India', duration: 'Flexible',
    eligibility: 'Working professionals', total: 'On counselling', from: null, tag: 'नौकरी के साथ पढ़ाई',
    fees: [], points: ['Flexible study options', 'Valid & recognised degree programmes', 'Admission & counselling support'], src: 'DdYtf7KK2FQ' },
  { id: 'research', field: 'pro', name: 'PhD & M.Tech', univ: 'Research programmes', place: 'India', duration: 'As per university', eligibility: "Master's / B.Tech",
    total: 'On counselling', from: null, tag: 'Research', fees: [], points: ['Your doctorate begins here'], src: 'DXQIwwok5J9' },
];

export const PROMISES = [
  ['Direct admission', 'Admission straight from reputed institutions.'],
  ['No donation*', '100% transparent process. No capitation fee.'],
  ['No middlemen', 'Direct support. No brokers, no extra charges.'],
  ['Pay the institution', 'Fees go directly to the college or university.'],
  ['Regulated fees*', 'Fair fees, as per government norms.'],
];

export const UPDATES = [
  { code: 'DeX3zvhz5M2', title: 'B.Pharm & D.Pharm, Gwalior — ₹40,000 / year', tag: 'Pharmacy' },
  { code: 'DeXNETlqXsd', title: '₹5,000 off any course at Sardar Patel University, Balaghat', tag: 'Offer' },
  { code: 'DeWKPopKnrv', title: 'BAMS 2026–27, Roorkee — complete tuition ₹8.7 Lakh', tag: 'AYUSH' },
  { code: 'DeRFAtPi5ze', title: 'BHMS, Bhopal — ₹9,650 a month, 4.5 years', tag: 'Homoeopathy' },
  { code: 'DeOheS0iY1Z', title: 'MBA Tourism & Hospitality — ₹40,000 / year', tag: 'Management' },
  { code: 'Ddbbk4YzqCv', title: 'Complete health checkup, 18 tests — just ₹300 (Bhopal)', tag: 'Health' },
];

// Popular career paths shown as cut-out portraits; `q` is typed into the fee finder search.
export const PATHS = [
  { img: 'nursing', label: 'Nursing', q: 'B.Sc Nursing', from: '₹75,000 / yr' },
  { img: 'physio', inside: true, label: 'Physiotherapy', q: 'BPT', from: '₹4.05 L total' },
  { img: 'ot-tech', inside: true, label: 'OT Technology', q: 'O.T', from: '₹40,000 / yr' },
  { img: 'paramedic', label: 'Paramedical after 10th', q: '1-year certificate', from: '₹30,000' },
  { img: 'yoga', label: 'Yoga & Naturopathy', q: 'Yoga', from: 'MD ₹3.9 L' },
  { img: 'agriculture', label: 'Agriculture', q: 'Agriculture', from: 'On counselling' },
];

// Cut-out portraits lifted from the Instagram posters, one per field tile.
export const FIELD_PEOPLE = {
  medical: 'doctor', pharmacy: 'pharmacist', paramedical: 'nurse', engineering: 'engineer', management: 'manager',
  education: 'student', creative: 'animator', more: 'lawyer', overseas: 'mbbs-georgia', pro: 'professional',
};
