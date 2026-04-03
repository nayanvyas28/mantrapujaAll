const fs = require('fs');

const bboxesStr = fs.readFileSync('bboxes.txt', 'utf8');
const centers = {};
bboxesStr.split('\n').filter(line => line.trim()).forEach(line => {
    const id = line.split(':')[0];
    const centerMatch = line.match(/center: \[([\d.-]+), ([\d.-]+)\]/);
    centers[id] = { x: Math.round(parseFloat(centerMatch[1])), y: Math.round(parseFloat(centerMatch[2])) };
});

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const lines = locFile.split('\n');
const newLines = lines.map(line => {
    const match = line.match(/stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)/);
    if (match) {
        const stateId = match[1];
        const center = centers[stateId];
        if (center) {
            return line.replace(/x: ([\d.-]+), y: ([\d.-]+)/, `x: ${center.x}, y: ${center.y}`);
        }
    }
    return line;
});

fs.writeFileSync('src/data/spiritual-locations.ts', newLines.join('\n'));
console.log('Reset all spiritual locations to state centers.');
