
const fs = require('fs');

const latLngMap = {
    "Dwarka": [24, 352],
    "Nageshwar (Dwarka)": [26, 360],
    "Rameswaram": [237, 651],
    "Rameswaram Jyotirlinga": [238, 645],
    "Rameswaram (Shakti)": [237, 651]
};

const statesToCheck = {
    "Dwarka": "gj",
    "Nageshwar (Dwarka)": "gj",
    "Rameswaram": "tn",
    "Rameswaram Jyotirlinga": "tn",
    "Rameswaram (Shakti)": "tn"
};

function parseSimplePolygon(pathData) {
    const points = [];
    const commandRegex = /([a-df-z][^a-df-z]*)/ig;
    const commands = pathData.match(commandRegex);
    let currX = 0, currY = 0;
    if (!commands) return [];
    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const argsStr = cmdStr.slice(1).trim();
        const args = (argsStr.replace(/,/g, ' ').match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || []).map(Number);
        switch (type) {
            case 'M': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'm': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'L': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'l': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'H': args.forEach(x => { currX = x; points.push([currX, currY]); }); break;
            case 'h': args.forEach(dx => { currX += dx; points.push([currX, currY]); }); break;
            case 'V': args.forEach(y => { currY = y; points.push([currX, currY]); }); break;
            case 'v': args.forEach(dy => { currY += dy; points.push([currX, currY]); }); break;
            case 'C': for (let i = 0; i < args.length; i += 6) { currX = args[i + 4]; currY = args[i + 5]; points.push([currX, currY]); } break;
            case 'c': for (let i = 0; i < args.length; i += 6) { currX += args[i + 4]; currY += args[i + 5]; points.push([currX, currY]); } break;
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
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const statesPols = {};
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    const id = sMatch[1];
    const poly = parseSimplePolygon(sMatch[2]);
    statesPols[id] = poly;
}

Object.keys(latLngMap).forEach(name => {
    const coords = latLngMap[name];
    const stateId = statesToCheck[name];
    const poly = statesPols[stateId];
    const inside = isPointInPolygon(coords, poly);
    console.log(`${name} (${coords[0]}, ${coords[1]}) in ${stateId}: ${inside ? 'YES' : 'NO'}`);
});
