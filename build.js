import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('Building project...');
  
  // Run vite build
  execSync('vite build', { stdio: 'inherit' });
  
  // Run esbuild for server
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Copy attached_assets to dist/public
  const srcAssets = path.join(__dirname, 'attached_assets');
  const destAssets = path.join(__dirname, 'dist', 'public', 'attached_assets');
  
  if (fs.existsSync(srcAssets)) {
    console.log('Copying attached_assets to dist/public...');
    copyDir(srcAssets, destAssets);
    console.log('Assets copied successfully!');
  } else {
    console.log('attached_assets directory not found, skipping...');
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
