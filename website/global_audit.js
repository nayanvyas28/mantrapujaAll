
const fs = require('fs');

const dataFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const locFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/spiritual-locations.ts';

const content = fs.readFileSync(dataFile, 'utf8');
const locContent = fs.readFileSync(locFile, 'utf8');

const pathMatch = content.match(/export const INDIA_MAP_PATHS: MapState\[\] = (\[[\s\S]*?\]);/);
const statesRaw = pathMatch[1];

function parsePath(pathData) {
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);
    let points = [];
    let curX = 0, curY = 0;
    commands.forEach(cmd => {
        const type = cmd[0];
        const args = cmd.slice(1).trim().replace(/-/g, ' -').replace(/,/g, ' ').split(/\s+/).filter(x => x).map(Number);
        let i = 0;
        while (i < args.length || args.length === 0) {
            if (type === 'M') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'm') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'L') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'l') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'C') { i += 4; curX = args[i++]; curY = args[i++]; }
            else if (type === 'c') { i += 4; curX += args[i++]; curY += args[i++]; }
            if (!isNaN(curX) && !isNaN(curY)) { points.push({ x: curX, y: curY }); }
            if (args.length === 0) break;
        }
    });
    return points;
}

// Simple regex to get locations
const locations = [];
const locMatches = locContent.matchAll(/\{ id: \d+, name: "(.*?)".*?stateId: '(.*?)', x: (.*?), y: (.*?)[, ]/g);
for (const m of locMatches) {
    locations.push({ name: m[1], stateId: m[2], x: parseFloat(m[3]), y: parseFloat(m[4]) });
}

const stateBBoxes = {};
const stateMatches = statesRaw.matchAll(/\{[\s\S]*?"name": "(.*?)",[\s\S]*?"id": "(.*?)",[\s\S]*?"path": "(.*?)"/g);
for (const m of stateMatches) {
    const points = parsePath(m[3]);
    stateBBoxes[m[2]] = {
        name: m[1],
        minX: Math.min(...points.map(p => p.x)),
        maxX: Math.max(...points.map(p => p.x)),
        minY: Math.min(...points.map(p => p.y)),
        maxY: Math.max(...points.map(p => p.y))
    };
}

const report = [];
locations.forEach(loc => {
    const s = stateBBoxes[loc.stateId];
    if (!s) {
        report.push(`${loc.name}: Missing state data for ${loc.stateId}`);
        return;
    }
    const inside = (loc.x >= s.minX && loc.x <= s.maxX && loc.y >= s.minY && loc.y <= s.maxY);
    if (!inside) {
        report.push(`[OUTSIDE] ${loc.name} (${loc.stateId}) at ${loc.x}, ${loc.y}. BBox: ${s.minX.toFixed(1)}-${s.maxX.toFixed(1)}, ${s.minY.toFixed(1)}-${s.maxY.toFixed(1)}`);
    }
});

fs.writeFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/global_audit_report.txt', report.join('\n'));
console.log('Report saved to global_audit_report.txt');
