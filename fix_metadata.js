const fs = require('fs');
const path = require('path');

function replaceHeroIllustration(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceHeroIllustration(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export const metadata') && content.includes('/images/hero-illustration.jpg')) {
        content = content.replace(/\/images\/hero-illustration\.jpg/g, '/logo.jpg');
        fs.writeFileSync(fullPath, content);
        console.log('Updated metadata image in:', fullPath);
      }
    }
  }
}

replaceHeroIllustration(path.join(__dirname, 'app'));
console.log('Finished updating metadata images.');
