const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Cross-platform Expo Run Script
 * Replaces run.bat for platform-specific execution and linting.
 */

const CURRENT_DIR = process.cwd();
const EXPO_HOME = path.join(CURRENT_DIR, '.expo_home');

if (!fs.existsSync(EXPO_HOME)) {
    fs.mkdirSync(EXPO_HOME, { recursive: true });
}

const env = {
    ...process.env,
    USERPROFILE: EXPO_HOME,
    HOME: EXPO_HOME,
    // Add any necessary environment variables here
};

const args = process.argv.slice(2);

console.log(`🏃 Running Expo command: npx expo ${args.join(' ')}`);

const runProcess = spawn('npx', ['expo', ...args], {
    env,
    stdio: 'inherit',
    shell: true
});

runProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`\n❌ Command failed with code ${code}`);
        process.exit(code);
    }
});
