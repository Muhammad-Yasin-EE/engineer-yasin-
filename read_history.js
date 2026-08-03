const { execSync } = require('child_process');
try {
  const log = execSync('git --no-pager show c39d2bf -- components/Navbar.tsx', { encoding: 'utf8' });
  console.log(log);
} catch (e) {
  console.error(e.message);
}
