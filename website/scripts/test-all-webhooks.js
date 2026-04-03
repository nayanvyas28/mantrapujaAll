#!/usr/bin/env node

/**
 * Comprehensive Webhook Testing Script
 * Tests all webhook endpoints: blogs, festivals, locations, poojas, categories
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
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

const BASE_URL = env['NEXT_PUBLIC_SITE_URL'] || 'http://localhost:3000';
const SECRET = env['N8N_WEBHOOK_SECRET'] || 'your_n8n_secret_here';

if (!env['N8N_WEBHOOK_SECRET']) {
    console.warn("⚠️  WARNING: Using default secret. Ensure .env.local has N8N_WEBHOOK_SECRET");
}

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(endpoint, data) {
    return new Promise((resolve, reject) => {
        const url = new URL(endpoint, BASE_URL);
        const isHttps = url.protocol === 'https:';
        const lib = isHttps ? https : http;

        const postData = JSON.stringify(data);

        const options = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = lib.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

async function testBlogWebhook() {
    log('\n📝 Testing Blog Webhook...', 'cyan');

    const blogData = {
        title: "Test Blog: The Power of Mantras",
        content: "This is a test blog post created via webhook automation.",
        slug: "test-blog-power-of-mantras",
        image_url: "https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600",
        tags: ["mantras", "spirituality", "test"],
        meta_title: "The Power of Mantras - Test",
        meta_description: "Test blog post about mantras",
        published: true,
        secret: SECRET
    };

    try {
        const result = await makeRequest('/api/blogs', blogData);
        if (result.status === 200 && result.data.success) {
            log('✅ Blog webhook successful!', 'green');
            log(`   Created: ${result.data.data[0].title}`, 'green');
        } else {
            log(`❌ Blog webhook failed: ${JSON.stringify(result.data)}`, 'red');
        }
    } catch (error) {
        log(`❌ Blog webhook error: ${error.message}`, 'red');
    }
}

async function testFestivalWebhook() {
    log('\n🎉 Testing Festival Webhook...', 'cyan');

    const festivalData = {
        name: "Test Festival: Diwali",
        slug: "test-diwali",
        description: "Festival of lights - test entry",
        date: "2026-10-24",
        month: "October",
        year: 2026,
        images: ["https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600"],
        content: {
            significance: "Test significance",
            rituals: ["Light diyas", "Puja", "Fireworks"]
        },
        seo_title: "Diwali 2026 - Test",
        seo_description: "Test festival entry for Diwali",
        is_active: true,
        secret: SECRET
    };

    try {
        const result = await makeRequest('/api/festivals', festivalData);
        if (result.status === 200 && result.data.success) {
            log('✅ Festival webhook successful!', 'green');
            log(`   Created: ${result.data.data[0].name}`, 'green');
        } else {
            log(`❌ Festival webhook failed: ${JSON.stringify(result.data)}`, 'red');
        }
    } catch (error) {
        log(`❌ Festival webhook error: ${error.message}`, 'red');
    }
}

async function testLocationWebhook() {
    log('\n📍 Testing Location Webhook...', 'cyan');

    const locationData = {
        name: "Test Location: Kedarnath",
        slug: "test-kedarnath",
        type: "Char Dham",
        state_id: "UK",
        description: "Sacred temple in Uttarakhand - test entry",
        x: 30.7346,
        y: 79.0669,
        size: 15,
        images: ["https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600"],
        content: {
            history: "Test history",
            howToReach: "Test directions"
        },
        seo_title: "Kedarnath Temple - Test",
        seo_description: "Test location entry for Kedarnath",
        is_active: true,
        secret: SECRET
    };

    try {
        const result = await makeRequest('/api/locations', locationData);
        if (result.status === 200 && result.data.success) {
            log('✅ Location webhook successful!', 'green');
            log(`   Created: ${result.data.data[0].name}`, 'green');
        } else {
            log(`❌ Location webhook failed: ${JSON.stringify(result.data)}`, 'red');
        }
    } catch (error) {
        log(`❌ Location webhook error: ${error.message}`, 'red');
    }
}

async function testPoojaWebhook() {
    log('\n🕉️  Testing Pooja Webhook...', 'cyan');

    const poojaData = {
        name: "Test Pooja: Ganesh Puja",
        slug: "test-ganesh-puja",
        description: "Remove obstacles with Lord Ganesha's blessings - test entry",
        price: 2100,
        benefits: ["Removes obstacles", "Brings success", "Grants wisdom"],
        duration: "2-3 hours",
        requirements: ["Flowers", "Incense", "Fruits", "Modak"],
        process: {
            steps: [
                "Invocation",
                "Offerings",
                "Mantra chanting",
                "Aarti"
            ]
        },
        faqs: [
            {
                question: "When to perform?",
                answer: "Wednesdays are auspicious"
            }
        ],
        images: ["https://images.unsplash.com/photo-1605218453416-59e3c9c94494?q=80&w=600"],
        content: {
            significance: "Test significance"
        },
        seo_title: "Ganesh Puja - Test",
        seo_description: "Test pooja entry for Ganesh Puja",
        is_active: true,
        secret: SECRET
    };

    try {
        const result = await makeRequest('/api/poojas', poojaData);
        if (result.status === 200 && result.data.success) {
            log('✅ Pooja webhook successful!', 'green');
            log(`   Created: ${result.data.data[0].name}`, 'green');
        } else {
            log(`❌ Pooja webhook failed: ${JSON.stringify(result.data)}`, 'red');
        }
    } catch (error) {
        log(`❌ Pooja webhook error: ${error.message}`, 'red');
    }
}

async function testCategoryWebhook() {
    log('\n📂 Testing Category Webhook...', 'cyan');

    const categoryData = {
        name: "Test Category: Vedic Rituals",
        slug: "test-vedic-rituals",
        description: "Traditional Vedic ceremonies - test entry",
        content_structure_url: "/rituals",
        order: 1,
        secret: SECRET
    };

    try {
        const result = await makeRequest('/api/categories', categoryData);
        if (result.status === 200 && result.data.success) {
            log('✅ Category webhook successful!', 'green');
            log(`   Created: ${result.data.data[0].name}`, 'green');
        } else {
            log(`❌ Category webhook failed: ${JSON.stringify(result.data)}`, 'red');
        }
    } catch (error) {
        log(`❌ Category webhook error: ${error.message}`, 'red');
    }
}

async function runAllTests() {
    log('═══════════════════════════════════════════', 'blue');
    log('  WEBHOOK TESTING SUITE', 'blue');
    log('═══════════════════════════════════════════', 'blue');
    log(`  Base URL: ${BASE_URL}`, 'yellow');
    log(`  Secret: ${SECRET.substring(0, 10)}...`, 'yellow');
    log('═══════════════════════════════════════════', 'blue');

    await testBlogWebhook();
    await testFestivalWebhook();
    await testLocationWebhook();
    await testPoojaWebhook();
    await testCategoryWebhook();

    log('\n═══════════════════════════════════════════', 'blue');
    log('  TESTING COMPLETE', 'blue');
    log('═══════════════════════════════════════════', 'blue');
}

// Run tests
runAllTests().catch(console.error);
