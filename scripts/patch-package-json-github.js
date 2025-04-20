// patch-package-json.js

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'dist', 'ng-text-highlight', 'package.json');
console.log('Patching package.json at:', rootDir, packageJsonPath);

// Load and parse package.json
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
} catch (err) {
  console.error('❌ Could not read package.json:', err.message);
  process.exit(1);
}

// Patch the fields
packageJson.name = '@supriyakundu99/ng-text-highlight';
packageJson.publishConfig.registry = 'https://npm.pkg.github.com/@supriyakundu99';

// Write it back
try {
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Patched projects/ng-text-highlight/package.json successfully.');
} catch (err) {
  console.error('❌ Failed to write package.json:', err.message);
  process.exit(1);
}
