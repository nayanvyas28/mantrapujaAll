
const fs = require('fs');

const dataFile = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(dataFile, 'utf8');

const match = content.match(/"id": "mp",\s+"path": "(.*?)"/, 's');
const pathData = match[1];

function parsePath(pathData) {
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);
    let points = [];
    let curX = 0, curY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const argsStr = cmd.slice(1).trim().replace(/-/g, ' -').replace(/,/g, ' ');
        const args = argsStr.split(/\s+/).filter(x => x).map(Number);

        let i = 0;
        while (i < args.length || args.length === 0) {
            if (type === 'M') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'm') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'L') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'l') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'C') { i += 4; curX = args[i++]; curY = args[i++]; }
            else if (type === 'c') { i += 4; curX += args[i++]; curY += args[i++]; }
            if (!isNaN(curX) && !isNaN(curY)) {
                points.push({ x: curX, y: curY });
            }
            if (args.length === 0) break;
        }
    });
    return points;
}

const points = parsePath(pathData);
console.log('MP BBox:', {
    minX: Math.min(...points.map(p => p.x)),
    maxX: Math.max(...points.map(p => p.x)),
    minY: Math.min(...points.map(p => p.y)),
    maxY: Math.max(...points.map(p => p.y))
});
