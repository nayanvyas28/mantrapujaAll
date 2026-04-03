
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

const API_URL = 'http://localhost:3000/api/blogs';
const SECRET = env['N8N_WEBHOOK_SECRET'] || 'your_n8n_secret_here';

async function postBlog() {
    const payload = {
        title: "Test Blog: Verification at " + new Date().toLocaleTimeString(),
        content: "<h2>Success!</h2><p>This blog was posted via a robust verification script. If you can see this, the Blog Webhook API is working properly.</p>",
        slug: "verification-test-" + Date.now(),
        image_url: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=600",
        tags: ["Verification", "Test"],
        secret: SECRET,
        published: true
    };

    console.log("🚀 Testing Blog Webhook API...");
    console.log("📍 URL:", API_URL);
    console.log("🔑 Using Secret:", SECRET.substring(0, 5) + "...");

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (response.ok && result.success) {
            console.log("\n✅ BLOG POST SUCCESSFUL!");
            console.log("Slug:", result.data[0].slug);
            console.log("View at: http://localhost:3000/blogs/" + result.data[0].slug);
        } else {
            console.error("\n❌ BLOG POST FAILED!");
            console.error("Status:", response.status);
            console.error("Error:", result);
        }
    } catch (error) {
        console.error("\n❌ NETWORK ERROR:");
        console.error(error.message);
    }
}

postBlog();
