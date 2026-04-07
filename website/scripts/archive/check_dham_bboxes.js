
const fs = require('fs');
const path = require('path');

const dataFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(dataFile, 'utf8');

// Extract the INDIA_MAP_PATHS array
const match = content.match(/export const INDIA_MAP_PATHS: MapState\[\] = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find INDIA_MAP_PATHS');
    process.exit(1);
}

// Clean up for JSON parsing (it's not perfect but we can regex out the IDs and paths)
const statesRaw = match[1];

const dhams = ['ut', 'gj', 'or', 'tn'];
const results = {};

dhams.forEach(id => {
    const stateMatch = new RegExp(`"id": "${id}",\\s+"path": "(.*?)"`, 's').exec(statesRaw);
    if (!stateMatch) {
        console.error(`Could not find state ${id}`);
        return;
    }

    const pathData = stateMatch[1];
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let curX = 0, curY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

        if (type.toLowerCase() === 'm') {
            if (type === 'm') { curX += args[0]; curY += args[1]; }
            else { curX = args[0]; curY = args[1]; }
        } else if (type.toLowerCase() === 'l') {
            if (type === 'l') { curX += args[0]; curY += args[1]; }
            else { curX = args[0]; curY = args[1]; }
        }
        // Simplified for estimation - just tracking movement
        if (!isNaN(curX)) {
            minX = Math.min(minX, curX);
            maxX = Math.max(maxX, curX);
            minY = Math.min(minY, curY);
            maxY = Math.max(maxY, curY);
        }
    });

    results[id] = { minX, maxX, minY, maxY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2 };
});

console.log(JSON.stringify(results, null, 2));
