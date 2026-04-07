
const fs = require('fs');

const filePath = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Use a more robust regex to find paths
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;

const statesOfInterest = ['ut', 'gj', 'or', 'tn'];
const results = {};

let match;
while ((match = stateRegex.exec(content)) !== null) {
    const id = match[1];
    const path = match[2];

    if (statesOfInterest.includes(id)) {
        // SVG path segmenting
        const segments = path.split(/(?=[mlzMLZ])/);
        let curX = 0, curY = 0;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        for (let seg of segments) {
            seg = seg.trim();
            if (!seg) continue;
            const cmd = seg[0];
            const coords = seg.slice(1).trim().split(/[\s,]+/).map(parseFloat);

            if (cmd === 'm' || cmd === 'M') {
                for (let i = 0; i < coords.length; i += 2) {
                    if (isNaN(coords[i])) break;
                    if (cmd === 'M' || (cmd === 'm' && i === 0)) {
                        curX = coords[i];
                        curY = coords[i + 1];
                    } else {
                        curX += coords[i];
                        curY += coords[i + 1];
                    }
                    minX = Math.min(minX, curX);
                    maxX = Math.max(maxX, curX);
                    minY = Math.min(minY, curY);
                    maxY = Math.max(maxY, curY);
                }
            } else if (cmd === 'l' || cmd === 'L') {
                for (let i = 0; i < coords.length; i += 2) {
                    if (isNaN(coords[i])) break;
                    if (cmd === 'L') {
                        curX = coords[i];
                        curY = coords[i + 1];
                    } else {
                        curX += coords[i];
                        curY += coords[i + 1];
                    }
                    minX = Math.min(minX, curX);
                    maxX = Math.max(maxX, curX);
                    minY = Math.min(minY, curY);
                    maxY = Math.max(maxY, curY);
                }
            }
            // Z doesn't move curX, curY
        }

        results[id] = {
            id,
            minX, maxX, minY, maxY,
            centerX: (minX + maxX) / 2,
            centerY: (minY + maxY) / 2
        };
    }
}

console.log(JSON.stringify(results, null, 2));
