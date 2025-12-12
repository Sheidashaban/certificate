// Quick diagnostic script to check setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking setup...\n');

// Check .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('your-email@gmail.com') || envContent.includes('your-linkedin-client-id')) {
    console.log('⚠️  WARNING: .env file contains placeholder values. Update with real values.');
  }
} else {
  console.log('❌ .env file NOT found');
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules NOT found. Run: npm install');
}

// Check key files
const keyFiles = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'pages/_app.tsx',
  'pages/index.tsx',
  'pages/admin.tsx'
];

keyFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} NOT found`);
  }
});

// Check port 3000
const netstat = require('child_process').execSync;
try {
  const result = netstat('netstat -ano | findstr :3000', { encoding: 'utf8' });
  if (result.trim()) {
    console.log('\n⚠️  Port 3000 is already in use!');
    console.log('   Kill the process or use a different port.');
  } else {
    console.log('\n✅ Port 3000 is available');
  }
} catch (e) {
  console.log('\n✅ Port 3000 is available');
}

console.log('\n📋 Next steps:');
console.log('1. Make sure .env file is configured');
console.log('2. Run: npm install (if node_modules missing)');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000');

