
const fs = require('fs');
const filePath = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(filePath, 'utf8');

const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const statesOfInterest = ['ut', 'gj', 'or', 'tn'];

let match;
while ((match = stateRegex.exec(content)) !== null) {
    const id = match[1];
    const path = match[2];
    if (!statesOfInterest.includes(id)) continue;

    const segments = path.split(/(?=[mlzMLZ])/);
    let curX = 0, curY = 0;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let seg of segments) {
        seg = seg.trim();
        if (!seg) continue;
        const cmd = seg[0];
        const coords = seg.slice(1).trim().split(/[\s,]+/).map(parseFloat).filter(v => !isNaN(v));

        if (cmd.toLowerCase() === 'm' || cmd.toLowerCase() === 'l') {
            for (let i = 0; i < coords.length; i += 2) {
                if (cmd === 'm' || cmd === 'l') {
                    if (i === 0 && cmd.toLowerCase() === 'm') { curX = coords[i]; curY = coords[i + 1]; }
                    else { curX += coords[i]; curY += coords[i + 1]; }
                } else {
                    curX = coords[i]; curY = coords[i + 1];
                }
                minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
                minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
            }
        }
    }
    console.log(`State: ${id}`);
    console.log(`  CenterX: ${((minX + maxX) / 2).toFixed(2)}`);
    console.log(`  CenterY: ${((minY + maxY) / 2).toFixed(2)}`);
}
