const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Cross-platform Expo Dev Script
 * Replaces dev.bat for development on Windows, macOS, and Linux.
 */

const CURRENT_DIR = process.cwd();
const EXPO_HOME = path.join(CURRENT_DIR, '.expo_home');

// Ensure writable .expo_home exists for redirection
if (!fs.existsSync(EXPO_HOME)) {
    fs.mkdirSync(EXPO_HOME, { recursive: true });
}

// Environment Overrides for stability and local development
const env = {
    ...process.env,
    // Redirect Expo/Home to our local writable directory (avoids profile pollution)
    USERPROFILE: EXPO_HOME,
    HOME: EXPO_HOME,
    // Fix for fetch failed errors in Node.js 18+ on some Windows environments
    NODE_OPTIONS: '--dns-result-order=ipv4first',
    // Injected Expo Public variables (Production defaults as failover)
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://s1.mantrapuja.com',
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80',
    EXPO_PUBLIC_BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:4000',
    EXPO_PUBLIC_ADMIN_URL: process.env.EXPO_PUBLIC_ADMIN_URL || 'http://localhost:3001',
    EXPO_PUBLIC_SESSION_SALT: process.env.EXPO_PUBLIC_SESSION_SALT || 'sg6XisTlL2QcXSuE',
    EXPO_PUBLIC_EXPO_ROUTER_APP_ROOT: 'app',
};

console.log(`🚀 Starting Expo Dev with HOME redirected to: ${EXPO_HOME}`);

const args = ['expo', 'start', ...process.argv.slice(2)];

const expoProcess = spawn('npx', args, {
    env,
    stdio: 'inherit',
    shell: true
});

expoProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`\n❌ Expo process exited with code ${code}`);
        process.exit(code);
    }
});
