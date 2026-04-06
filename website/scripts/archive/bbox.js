const fs = require('fs');

function getBoundingBox(pathData) {
    const commands = pathData.split(/\s(?=[a-df-z])/i);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let currX = 0, currY = 0;

    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const args = cmdStr.slice(1).trim().split(/[\s,]+/).map(Number);

        if (type === 'm' || type === 'M') {
            for (let i = 0; i < args.length; i += 2) {
                if (type === 'm') {
                    currX += args[i];
                    currY += args[i + 1];
                } else {
                    currX = args[i];
                    currY = args[i + 1];
                }
                minX = Math.min(minX, currX);
                minY = Math.min(minY, currY);
                maxX = Math.max(maxX, currX);
                maxY = Math.max(maxY, currY);
            }
        } else if (type === 'l' || type === 'L') {
            for (let i = 0; i < args.length; i += 2) {
                if (type === 'l') {
                    currX += args[i];
                    currY += args[i + 1];
                } else {
                    currX = args[i];
                    currY = args[i + 1];
                }
                minX = Math.min(minX, currX);
                minY = Math.min(minY, currY);
                maxX = Math.max(maxX, currX);
                maxY = Math.max(maxY, currY);
            }
        } else if (type === 'h' || type === 'H') {
            for (let i = 0; i < args.length; i++) {
                if (type === 'h') currX += args[i];
                else currX = args[i];
                minX = Math.min(minX, currX);
                maxX = Math.max(maxX, currX);
            }
        } else if (type === 'v' || type === 'V') {
            for (let i = 0; i < args.length; i++) {
                if (type === 'v') currY += args[i];
                else currY = args[i];
                minY = Math.min(minY, currY);
                maxY = Math.max(maxY, currY);
            }
        } else if (type === 'z' || type === 'Z') {
            // ignore
        }
    });

    return { minX, minY, maxX, maxY };
}

// Read the india-map-data.ts file
const content = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
// Simple regex to extract id and path
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let match;
let bboxes = '';

while ((match = stateRegex.exec(content)) !== null) {
    const id = match[1];
    const path = match[2];
    const bbox = getBoundingBox(path);
    const centerX = (bbox.minX + bbox.maxX) / 2;
    const centerY = (bbox.minY + bbox.maxY) / 2;
    bboxes += `${id}: x=[${bbox.minX.toFixed(1)}, ${bbox.maxX.toFixed(1)}], y=[${bbox.minY.toFixed(1)}, ${bbox.maxY.toFixed(1)}] center: [${centerX.toFixed(1)}, ${centerY.toFixed(1)}]\n`;
}

fs.writeFileSync('bboxes.txt', bboxes);
console.log('Done');
