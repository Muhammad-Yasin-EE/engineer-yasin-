const fs = require('fs');
const path = require('path');

function replaceNumbers(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        replaceNumbers(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/923098158572/g, '923116826552');
      content = content.replace(/03098158572/g, '03116826552');
      content = content.replace(/0309 8158572/g, '0311 6826552');
      content = content.replace(/0309-8158572/g, '0311-6826552');
      content = content.replace(/\+92 309 8158572/g, '+92 311 6826552');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Replaced number in:', fullPath);
      }
    }
  }
}

replaceNumbers(path.join(__dirname, 'app'));
replaceNumbers(path.join(__dirname, 'components'));
console.log('Finished updating WhatsApp numbers.');
