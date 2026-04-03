
const fs = require('fs');

const dataFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(dataFile, 'utf8');

const match = content.match(/export const INDIA_MAP_PATHS: MapState\[\] = (\[[\s\S]*?\]);/);
const statesRaw = match[1];

const dhams = ['ut', 'gj', 'or', 'tn'];
const results = {};

function parsePath(pathData) {
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);
    let points = [];
    let curX = 0, curY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const argsStr = cmd.slice(1).trim().replace(/-/g, ' -').replace(/,/g, ' ');
        const args = argsStr.split(/\s+/).filter(x => x).map(Number);

        if (type === 'M') { curX = args[0]; curY = args[1]; }
        else if (type === 'm') { curX += args[0]; curY += args[1]; }
        else if (type === 'L') { curX = args[0]; curY = args[1]; }
        else if (type === 'l') { curX += args[0]; curY += args[1]; }
        else if (type === 'H') { curX = args[0]; }
        else if (type === 'h') { curX += args[0]; }
        else if (type === 'V') { curY = args[0]; }
        else if (type === 'v') { curY += args[0]; }
        else if (type === 'C' || type === 'c') {
            // Handle curves by taking the end point
            const offset = type === 'c' ? 0 : 0; // wait logic
            const lastIdx = args.length - 1;
            if (type === 'C') { curX = args[lastIdx - 1]; curY = args[lastIdx]; }
            else { curX += args[lastIdx - 1]; curY += args[lastIdx]; }
        }

        if (!isNaN(curX) && !isNaN(curY)) {
            points.push({ x: curX, y: curY });
        }
    });
    return points;
}

dhams.forEach(id => {
    const stateMatch = new RegExp(`"id": "${id}",\\s+"path": "(.*?)"`, 's').exec(statesRaw);
    if (!stateMatch) return;

    const points = parsePath(stateMatch[1]);
    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));

    results[id] = { minX, maxX, minY, maxY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2 };
});

fs.writeFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/dham_audit_results.json', JSON.stringify(results, null, 2));
console.log('Results written to dham_audit_results.json');
