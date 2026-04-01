import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeBinDir = path.dirname(process.execPath);
const childEnv = {
  ...process.env,
  PATH: `${nodeBinDir}:${process.env.PATH || ''}`,
};
const LIVE_PUBLIC_DIRS = [
  '/var/www/vhosts/urban-rohr.com/httpdocs/dist/public',
  '/var/www/vhosts/urban-rohr.com/upbeat-chandrasekhar.84-46-246-41.plesk.page/httpdocs/dist/public',
];

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

function mirrorLiveBuildOutput(sourceDir) {
  for (const targetDir of LIVE_PUBLIC_DIRS) {
    if (path.resolve(targetDir) === path.resolve(sourceDir)) {
      continue;
    }

    if (fs.existsSync(targetDir)) {
      console.log(`Mirroring build output to ${targetDir}...`);
      copyDir(sourceDir, targetDir);
      console.log(`Mirrored build output to ${targetDir}.`);
    }
  }
}

try {
  console.log('Building project...');
  
  // Run vite build using npm to ensure proper platform-specific dependencies
  console.log('Building client with Vite...');
  execSync('npm run vite:build', { stdio: 'inherit', env: childEnv });

  // Run esbuild for server using npm
  console.log('Building server with esbuild...');
  execSync('npm run esbuild:server', { stdio: 'inherit', env: childEnv });
  
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
  
  // Copy uploads to dist/public
  const srcUploads = path.join(__dirname, 'uploads');
  const destUploads = path.join(__dirname, 'dist', 'public', 'uploads');
  
  if (fs.existsSync(srcUploads)) {
    console.log('Copying uploads to dist/public...');
    copyDir(srcUploads, destUploads);
    console.log('Uploads copied successfully!');
  } else {
    console.log('uploads directory not found, skipping...');
  }

  mirrorLiveBuildOutput(path.join(__dirname, 'dist', 'public'));
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
