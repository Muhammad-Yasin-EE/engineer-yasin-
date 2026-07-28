const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/images');

// Source image pool from existing public/images to copy as initial safe placeholders
const sources = [
  'card-aeronautical.jpg', 'card-afns.jpg', 'card-air-defence.jpg', 'card-army-amc.jpg',
  'card-civilian.jpg', 'card-dssc.jpg', 'card-gd-pilot.jpg', 'card-lcc.jpg',
  'card-marines.jpg', 'card-navy-pnec.jpg', 'card-paf-accounts.jpg', 'card-paf-admin.jpg',
  'card-paf-airmen.jpg', 'card-paf-education.jpg', 'card-paf-it.jpg', 'card-paf-logistics.jpg',
  'card-pn-cadet.jpg', 'card-sailor.jpg', 'card-soldier.jpg', 'card-ssc-navy.jpg',
  'card-tcc.jpg', 'exam-army-bg.jpg', 'exam-navy-bg.jpg', 'exam-paf-bg.jpg'
];

const targets = [
  // 3 Main Portal Category Cards
  'scholarship-portal-international.jpg',
  'scholarship-portal-national.jpg',
  'scholarship-portal-intermediate.jpg',

  // 15 Global Fully Funded Scholarships
  'scholarship-chevening-uk.jpg',
  'scholarship-fulbright-usa.jpg',
  'scholarship-erasmus-europe.jpg',
  'scholarship-daad-germany.jpg',
  'scholarship-hungary-stipendium.jpg',
  'scholarship-turkiye-burslari.jpg',
  'scholarship-mext-japan.jpg',
  'scholarship-gks-korea.jpg',
  'scholarship-csc-china.jpg',
  'scholarship-swedish-institute.jpg',
  'scholarship-australia-awards.jpg',
  'scholarship-commonwealth-uk.jpg',
  'scholarship-great-uk.jpg',
  'scholarship-russian-gov.jpg',
  'scholarship-azerbaijan-heydar.jpg',

  // HEC Schemes
  'hec-commonwealth-scheme.jpg',
  'hec-hungary-scheme.jpg',
  'hec-china-scheme.jpg',
  'hec-azerbaijan-scheme.jpg',

  // Women Fellowships
  'women-aauw-fellowship.jpg',
  'women-stem-uk.jpg',
  'women-owsd-fellowship.jpg',
  'women-amelia-earhart.jpg',
  'women-peo-peace.jpg',

  // Pakistani Premier Universities (25 Universities)
  'uni-lums-lahore.jpg',
  'uni-iba-karachi.jpg',
  'uni-nust-islamabad.jpg',
  'uni-fast-nuces.jpg',
  'uni-umt-lahore.jpg',
  'uni-ucp-lahore.jpg',
  'uni-superior-lahore.jpg',
  'uni-szabist.jpg',
  'uni-comsats.jpg',
  'uni-iobm-karachi.jpg',
  'uni-bahria.jpg',
  'uni-uol-lahore.jpg',
  'uni-riphah.jpg',
  'uni-air-university.jpg',
  'uni-bnu-lahore.jpg',
  'uni-foundation.jpg',
  'uni-dha-suffa.jpg',
  'uni-habib-karachi.jpg',
  'uni-maju-karachi.jpg',
  'uni-indus-karachi.jpg',
  'uni-hamdard.jpg',
  'uni-gift-gujranwala.jpg',
  'uni-minhaj-lahore.jpg',
  'uni-ntu-faisalabad.jpg',
  'uni-cust-islamabad.jpg',

  // Religious Minority Schemes
  'minority-punjab-hrma.jpg',
  'minority-peef-hrma.jpg',
  'minority-mora-welfare.jpg',
  'minority-kp-scheme.jpg',
  'minority-pu-lahore.jpg',

  // Intermediate & FSc Schemes
  'inter-peef-talent.jpg',
  'inter-fauji-foundation.jpg',
  'inter-wwb-grant.jpg',
  'inter-benevolent-fund.jpg',
  'inter-cadet-colleges.jpg',
  'inter-diya-pakistan.jpg'
];

let srcIndex = 0;

targets.forEach((target) => {
  const targetPath = path.join(imgDir, target);
  const sourceFile = sources[srcIndex % sources.length];
  const sourcePath = path.join(imgDir, sourceFile);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${sourceFile} -> ${target}`);
  } else {
    console.error(`Source missing: ${sourcePath}`);
  }
  srcIndex++;
});

console.log('Successfully created all dedicated scholarship images without touching original Forces/Jobs images!');
