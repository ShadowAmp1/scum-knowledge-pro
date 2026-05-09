const fs = require('fs');
const path = require('path');

// Copy static files to standalone for production
function copyStaticToStandalone() {
  const sourceDir = path.join(process.cwd(), '.next', 'static');
  const targetDir = path.join(process.cwd(), '.next', 'standalone', '.next', 'static');

  console.log('Copying static files from:', sourceDir);
  console.log('To:', targetDir);

  // Ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy all files recursively
  function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  if (fs.existsSync(sourceDir)) {
    copyRecursive(sourceDir, targetDir);
    console.log('✅ Static files copied successfully');
  } else {
    console.log('❌ Source static directory not found');
  }
}

copyStaticToStandalone();
