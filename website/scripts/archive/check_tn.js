
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

function isPointInPolygon(point, polygon) {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i][0], yi = polygon[i][1];
        let xj = polygon[j][0], yj = polygon[j][1];
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

const mapDataFile = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"tn",\s*"path":\s*"([^"]+)"/;
const sMatch = stateRegex.exec(mapDataFile);
const poly = parseSVGPath(sMatch[1]);
console.log('Center (211, 609) in TN:', isPointInPolygon([211, 609], poly));
console.log('Rameswaram (229, 657) in TN:', isPointInPolygon([229, 657], poly));
