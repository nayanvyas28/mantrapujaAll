
const fs = require('fs');

function parseSVGPath(pathData) {
    const points = [];
    const commandRegex = /([a-df-z][^a-df-z]*)/ig;
    const commands = pathData.match(commandRegex);
    let currX = 0, currY = 0;
    let startX = 0, startY = 0;
    if (!commands) return [];
    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const argsStr = cmdStr.slice(1).trim();
        const args = (argsStr.replace(/,/g, ' ').match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || []).map(Number);
        switch (type) {
            case 'M': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); if (i === 0) { startX = currX; startY = currY; } } break;
            case 'm': for (let i = 0; i < args.length; i += 2) { if (i === 0 && points.length === 0) { currX = args[i]; currY = args[i + 1]; } else { currX += args[i]; currY += args[i + 1]; } points.push([currX, currY]); if (i === 0) { startX = currX; startY = currY; } } break;
            case 'L': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'l': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'H': args.forEach(x => { currX = x; points.push([currX, currY]); }); break;
            case 'h': args.forEach(dx => { currX += dx; points.push([currX, currY]); }); break;
            case 'V': args.forEach(y => { currY = y; points.push([currX, currY]); }); break;
            case 'v': args.forEach(dy => { currY += dy; points.push([currX, currY]); }); break;
            case 'C': for (let i = 0; i < args.length; i += 6) { currX = args[i + 4]; currY = args[i + 5]; points.push([currX, currY]); } break;
            case 'c': for (let i = 0; i < args.length; i += 6) { currX += args[i + 4]; currY += args[i + 5]; points.push([currX, currY]); } break;
            case 'Z': case 'z': currX = startX; currY = startY; points.push([currX, currY]); break;
        }
    });
    return points;
}

function getBBox(points) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => { if (p[0] < minX) minX = p[0]; if (p[0] > maxX) maxX = p[0]; if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1]; });
    return { minX, maxX, minY, maxY };
}

const mapDataFile = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const res = [];
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    const id = sMatch[1];
    if (['gj', 'tn', 'ut', 'or'].includes(id)) {
        const bbox = getBBox(parseSVGPath(sMatch[2]));
        res.push(`${id}: x[${bbox.minX.toFixed(1)}-${bbox.maxX.toFixed(1)}], y[${bbox.minY.toFixed(1)}-${bbox.maxY.toFixed(1)}]`);
    }
}
fs.writeFileSync('bbox_results.txt', res.join('\n'));
console.log('Results written to bbox_results.txt');
