const fs = require('fs');

function parseSimplePolygon(pathData) {
    const points = [];
    // Enhanced regex to capture commands and their arguments
    const commandRegex = /([a-df-z][^a-df-z]*)/ig;
    const commands = pathData.match(commandRegex);
    let currX = 0, currY = 0;

    if (!commands) return [];

    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const argsStr = cmdStr.slice(1).trim();
        // Handle commas by replacing them with spaces first, then splitting
        const args = (argsStr.replace(/,/g, ' ').match(/[-+]?\d*\.?\d+/g) || []).map(Number);

        switch (type) {
            case 'M':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i]; currY = args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'm':
                for (let i = 0; i < args.length; i += 2) {
                    currX += args[i]; currY += args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'L':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i]; currY = args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'l':
                for (let i = 0; i < args.length; i += 2) {
                    currX += args[i]; currY += args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'H':
                args.forEach(x => { currX = x; points.push([currX, currY]); });
                break;
            case 'h':
                args.forEach(dx => { currX += dx; points.push([currX, currY]); });
                break;
            case 'V':
                args.forEach(y => { currY = y; points.push([currX, currY]); });
                break;
            case 'v':
                args.forEach(dy => { currY += dy; points.push([currX, currY]); });
                break;
            case 'C':
                for (let i = 0; i < args.length; i += 6) {
                    currX = args[i + 4]; currY = args[i + 5];
                    points.push([currX, currY]);
                }
                break;
            case 'c':
                for (let i = 0; i < args.length; i += 6) {
                    currX += args[i + 4]; currY += args[i + 5];
                    points.push([currX, currY]);
                }
                break;
            case 'Z':
            case 'z':
                // ignore close path for points list
                break;
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

// Load Map Data
const mapDataFile = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const statesPols = {};
let sMatch;
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    statesPols[sMatch[1]] = parseSimplePolygon(sMatch[2]);
}

// Load Locations
const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",[^}]*stateId:\s*'([^']+)',\s*x:\s*([\d.-]+),\s*y:\s*([\d.-]+)/g;

let globalMinX = Infinity, globalMaxX = -Infinity, globalMinY = Infinity, globalMaxY = -Infinity;
Object.values(statesPols).forEach(poly => {
    poly.forEach(p => {
        globalMinX = Math.min(globalMinX, p[0]);
        globalMaxX = Math.max(globalMaxX, p[0]);
        globalMinY = Math.min(globalMinY, p[1]);
        globalMaxY = Math.max(globalMaxY, p[1]);
    });
});
console.log(`Global Map BBOX: x=[${globalMinX.toFixed(1)}, ${globalMaxX.toFixed(1)}], y=[${globalMinY.toFixed(1)}, ${globalMaxY.toFixed(1)}]`);

let results = [];
let match;
while ((match = locRegex.exec(locFile)) !== null) {
    const id = match[1];
    const name = match[2];
    const stateId = match[3];
    const x = parseFloat(match[4]);
    const y = parseFloat(match[5]);

    const poly = statesPols[stateId];
    if (!poly) {
        results.push(`❌ ${name} (#${id}): State ID '${stateId}' NOT FOUND in map data.`);
        continue;
    }

    if (poly.length === 0) {
        results.push(`⚠️ ${name} (#${id}): Poly for '${stateId}' is EMPTY (parser issue?).`);
        continue;
    }

    const inside = isPointInPolygon([x, y], poly);
    if (inside) {
        results.push(`✅ ${name} (#${id}): (${x}, ${y}) is INSIDE '${stateId}'`);
    } else {
        let minX = Math.min(...poly.map(p => p[0]));
        let maxX = Math.max(...poly.map(p => p[0]));
        let minY = Math.min(...poly.map(p => p[1]));
        let maxY = Math.max(...poly.map(p => p[1]));
        results.push(`❌ ${name} (#${id}): (${x}, ${y}) is OUTSIDE '${stateId}'!! BBOX: [${minX.toFixed(1)}-${maxX.toFixed(1)}, ${minY.toFixed(1)}-${maxY.toFixed(1)}]`);
    }
}

console.log(results.join('\n'));
