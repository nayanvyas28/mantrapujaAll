const fs = require('fs');

const bboxesStr = fs.readFileSync('bboxes.txt', 'utf8');
const bboxes = {};
bboxesStr.split('\n').filter(line => line.trim()).forEach(line => {
    const [id, data] = line.split(': ');
    const xMatch = data.match(/x=\[([\d.-]+), ([\d.-]+)\]/);
    const yMatch = data.match(/y=\[([\d.-]+), ([\d.-]+)\]/);
    const centerMatch = data.match(/center: \[([\d.-]+), ([\d.-]+)\]/);
    bboxes[id] = {
        minX: parseFloat(xMatch[1]),
        maxX: parseFloat(xMatch[2]),
        minY: parseFloat(yMatch[1]),
        maxY: parseFloat(yMatch[2]),
        centerX: parseFloat(centerMatch[1]),
        centerY: parseFloat(centerMatch[2])
    };
});

const locationsFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;
let match;
let violations = [];

while ((match = locRegex.exec(locationsFile)) !== null) {
    const id = match[1];
    const name = match[2];
    const stateId = match[3];
    const x = parseFloat(match[4]);
    const y = parseFloat(match[5]);

    const bbox = bboxes[stateId];
    if (!bbox) {
        console.log(`Warning: No bbox for state ${stateId} (Location: ${name})`);
        continue;
    }

    let isOut = false;
    if (x < bbox.minX || x > bbox.maxX || y < bbox.minY || y > bbox.maxY) {
        isOut = true;
    }

    if (isOut) {
        violations.push({
            id, name, stateId, x, y,
            boundsX: [bbox.minX, bbox.maxX],
            boundsY: [bbox.minY, bbox.maxY],
            center: [bbox.centerX, bbox.centerY]
        });
    }
}

console.log(`Found ${violations.length} violations:`);
violations.forEach(v => {
    console.log(`${v.id}: ${v.name} (${v.stateId}) at [${v.x}, ${v.y}] is OUT. BoundsX: ${v.boundsX}, BoundsY: ${v.boundsY}. Center: ${v.center}`);
});
