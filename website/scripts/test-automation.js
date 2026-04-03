
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });
}

const API_URL = 'http://localhost:3000/api/blogs';
const SECRET = env['N8N_WEBHOOK_SECRET'] || 'your_n8n_secret_here';

if (SECRET === 'your_n8n_secret_here') {
    console.warn("WARNING: Using default secret. Ensure .env.local has the correct N8N_WEBHOOK_SECRET if this fails.");
}

async function testBlogPost() {
    const blogPost = {
        title: `Test Blog Post - ${new Date().toISOString()}`,
        slug: `test-blog-${Date.now()}`,
        content: "<h1>This is a test blog post</h1><p>Created via automation script.</p>",
        image_url: "https://placehold.co/600x400/png",
        tags: ["Test", "Automation"],
        published: true,
        secret: SECRET
    };

    console.log("🚀 Sending test blog post to:", API_URL);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogPost)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Success! Blog post created:");
            console.log("ID:", data.data?.[0]?.id);
            console.log("Title:", data.data?.[0]?.title);
            console.log("Slug:", data.data?.[0]?.slug);
            console.log("\nCheck it at: http://localhost:3000/blogs/" + data.data?.[0]?.slug);
        } else {
            console.error("❌ Failed:", data);
        }

    } catch (error) {
        console.error("❌ Error sending request:", error.message);
        console.log("Ensure the local server is running at http://localhost:3000");
    }
}

testBlogPost();
