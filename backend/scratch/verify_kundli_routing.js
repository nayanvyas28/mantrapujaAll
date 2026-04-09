/**
 * Verification script for Kundli routing logic.
 * Simulates the getAstroBackendUrl logic from the mobile app.
 */

function getAstroBackendUrl(rawUrl, devMode) {
    if (devMode) {
        if (!rawUrl || rawUrl.includes('mantrapuja.com') || rawUrl.includes('localhost')) {
            return "http://10.228.144.64:4000/api/astrology/proxy";
        }
    }
    return (rawUrl || "http://10.228.144.64:4000/api/auth").replace('/auth', '/astrology/proxy');
}

const testCases = [
    { name: "No URL (Dev)", raw: undefined, dev: true, expect: "http://10.228.144.64:4000/api/astrology/proxy" },
    { name: "Production URL (Dev)", raw: "https://api.mantrapuja.com/api/auth", dev: true, expect: "http://10.228.144.64:4000/api/astrology/proxy" },
    { name: "Localhost (Dev)", raw: "http://localhost:4000/api/auth", dev: true, expect: "http://10.228.144.64:4000/api/astrology/proxy" },
    { name: "Specific IP (Dev)", raw: "http://192.168.1.5:4000/api/auth", dev: true, expect: "http://192.168.1.5:4000/api/astrology/proxy" },
    { name: "Production (Prod)", raw: "https://api.mantrapuja.com/api/auth", dev: false, expect: "https://api.mantrapuja.com/api/astrology/proxy" }
];

console.log("--- KUNDLI ROUTING VERIFICATION ---\n");
testCases.forEach(tc => {
    const result = getAstroBackendUrl(tc.raw, tc.dev);
    const pass = result === tc.expect;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${tc.name}`);
    if (!pass) console.log(`      Found: ${result}\n      Expect: ${tc.expect}`);
});
console.log("\n-----------------------------------");
