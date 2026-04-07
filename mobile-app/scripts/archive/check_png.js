const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'assets', 'images', 'astro_kundli_v1.png');

function identifyFile(file) {
    if (!fs.existsSync(file)) return;
    const buffer = fs.readFileSync(file);
    const hex = buffer.slice(0, 16).toString('hex');
    console.log('--- File Identity ---');
    console.log('First 16 bytes (hex):', hex);
    console.log('First 16 bytes (ascii):', buffer.slice(0, 16).toString('ascii'));

    if (hex.startsWith('ffd8ff')) console.log('Actual Type: JPEG');
    else if (hex.startsWith('89504e47')) console.log('Actual Type: PNG');
    else if (buffer.slice(0, 4).toString('ascii') === 'RIFF') console.log('Actual Type: WebP/RIFF');
    else console.log('Actual Type: Unknown');
}

identifyFile(filePath);
