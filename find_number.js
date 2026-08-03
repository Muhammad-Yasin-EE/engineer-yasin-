const fs = require('fs');
const path = require('path');

function searchNumber(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        searchNumber(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('8158572') || content.includes('03116826552')) {
        console.log('Found number in:', fullPath);
      }
    }
  }
}

searchNumber(path.join(__dirname, 'app'));
searchNumber(path.join(__dirname, 'components'));
console.log('Finished searching.');
