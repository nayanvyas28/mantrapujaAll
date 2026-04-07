const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Cross-platform Expo Prebuild Script
 * Ensures native projects (Android/iOS) are generated consistently across platforms.
 */

const CURRENT_DIR = process.cwd();
const EXPO_HOME = path.join(CURRENT_DIR, '.expo_home');

// Ensure writable .expo_home exists
if (!fs.existsSync(EXPO_HOME)) {
    fs.mkdirSync(EXPO_HOME, { recursive: true });
}

const env = {
    ...process.env,
    USERPROFILE: EXPO_HOME,
    HOME: EXPO_HOME,
    // Add any necessary pre-build environment variables here
};

console.log('🏗️  Generating native project (Prebuild) with HOME redirection...');

const args = ['expo', 'prebuild', ...process.argv.slice(2)];

const prebuildProcess = spawn('npx', args, {
    env,
    stdio: 'inherit',
    shell: true
});

prebuildProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`\n❌ Prebuild failed with code ${code}`);
        process.exit(code);
    }
    console.log('✅ Native project generation complete.');
});
