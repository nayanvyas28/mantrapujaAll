const { ImagePool } = require('@squoosh/lib');
const { cpus } = require('os');
const fs = require('fs');

async function test() {
    console.log("Starting Squoosh Test...");
    const pool = new ImagePool(cpus().length);
    try {
        const image = pool.ingestImage(fs.readFileSync('test-input.png'));
        await image.encode({
            webp: { quality: 75 }
        });
        const result = await image.encodedWith.webp;
        fs.writeFileSync('test-output.webp', result.binary);
        console.log("Success! Image optimized.");
    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await pool.close();
    }
}

// Create a dummy image for testing if it doesn't exist
// Or just let it fail if file doesn't exist, I'll provide one.
test();
