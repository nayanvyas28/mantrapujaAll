
const fs = require('fs');

const dataFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(dataFile, 'utf8');

const match = content.match(/export const INDIA_MAP_PATHS: MapState\[\] = (\[[\s\S]*?\]);/);
const statesRaw = match[1];

const dhams = [
    { id: 'ut', name: 'Badrinath', x: 240, y: 155 },
    { id: 'gj', name: 'Dwarka', x: 25, y: 360 },
    { id: 'or', name: 'Puri', x: 375, y: 408 },
    { id: 'tn', name: 'Rameswaram', x: 210, y: 630 }
];

function parsePath(pathData) {
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);
    let points = [];
    let curX = 0, curY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const argsStr = cmd.slice(1).trim().replace(/-/g, ' -').replace(/,/g, ' ');
        const args = argsStr.split(/\s+/).filter(x => x).map(Number);

        // Loop through args in case of multiple points for one command
        let i = 0;
        while (i < args.length || args.length === 0) {
            if (type === 'M') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'm') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'L') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'l') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'H') { curX = args[i++]; }
            else if (type === 'h') { curX += args[i++]; }
            else if (type === 'V') { curY = args[i++]; }
            else if (type === 'v') { curY += args[i++]; }
            else if (type === 'C') { i += 4; curX = args[i++]; curY = args[i++]; }
            else if (type === 'c') { i += 4; curX += args[i++]; curY += args[i++]; }
            else if (type === 'S') { i += 1; curX = args[i++]; curY = args[i++]; } // simplified
            else if (type === 's') { i += 1; curX += args[i++]; curY += args[i++]; } // simplified
            else if (type === 'Z' || type === 'z') { break; }
            else { break; }

            if (!isNaN(curX) && !isNaN(curY)) {
                points.push({ x: curX, y: curY });
            }
            if (args.length === 0) break;
        }
    });
    return points;
}

const audit = {};

dhams.forEach(dham => {
    const stateMatch = new RegExp(`"id": "${dham.id}",\\s+"path": "(.*?)"`, 's').exec(statesRaw);
    if (!stateMatch) return;

    const points = parsePath(stateMatch[1]);
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));

    const isInside = (dham.x >= minX && dham.x <= maxX && dham.y >= minY && dham.y <= maxY);

    audit[dham.id] = {
        name: dham.name,
        current: { x: dham.x, y: dham.y },
        bbox: { minX, maxX, minY, maxY },
        isInsideBBox: isInside,
        suggested: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 }
    };
});

fs.writeFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/containment_audit.json', JSON.stringify(audit, null, 2));
console.log('Audit saved to containment_audit.json');
