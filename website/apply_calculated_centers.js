const fs = require('fs');

function parseSimplePolygon(pathData) {
    const points = [];
    const commandRegex = /([a-df-z][^a-df-z]*)/ig;
    const commands = pathData.match(commandRegex);
    let currX = 0, currY = 0;

    if (!commands) return [];

    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const argsStr = cmdStr.slice(1).trim();
        // Robust splitting for SVG coordinates
        const args = (argsStr.replace(/,/g, ' ').match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || []).map(Number);

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

function getSafeCenter(poly) {
    if (poly.length === 0) return [0, 0];
    let minX = Math.min(...poly.map(p => p[0]));
    let maxX = Math.max(...poly.map(p => p[0]));
    let minY = Math.min(...poly.map(p => p[1]));
    let maxY = Math.max(...poly.map(p => p[1]));

    let validPoints = [];
    let stepX = (maxX - minX) / 20;
    let stepY = (maxY - minY) / 20;
    for (let x = minX; x <= maxX; x += stepX) {
        for (let y = minY; y <= maxY; y += stepY) {
            if (isPointInPolygon([x, y], poly)) validPoints.push([x, y]);
        }
    }
    if (validPoints.length === 0) return [(minX + maxX) / 2, (minY + maxY) / 2];

    let avgX = validPoints.reduce((s, p) => s + p[0], 0) / validPoints.length;
    let avgY = validPoints.reduce((s, p) => s + p[1], 0) / validPoints.length;

    let best = validPoints[0];
    let minDist = Infinity;
    validPoints.forEach(p => {
        let d = Math.pow(p[0] - avgX, 2) + Math.pow(p[1] - avgY, 2);
        if (d < minDist) { minDist = d; best = p; }
    });
    return best;
}

const mapDataFile = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const statesPols = {};
let sMatch;
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    statesPols[sMatch[1]] = parseSimplePolygon(sMatch[2]);
}

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
let updatedFile = locFile;

const locRegex = /{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",[^}]*stateId:\s*'([^']+)'/g;
let match;
const locs = [];
while ((match = locRegex.exec(locFile)) !== null) {
    locs.push({ id: match[1], name: match[2], stateId: match[3] });
}

const stateCounts = {};
locs.forEach(loc => {
    const poly = statesPols[loc.stateId];
    if (!poly || poly.length === 0) return;

    stateCounts[loc.stateId] = (stateCounts[loc.stateId] || 0) + 1;
    let [nx, ny] = getSafeCenter(poly);

    // Clustering offset
    let count = stateCounts[loc.stateId];
    if (count > 1) {
        let angle = (count * 137.5) % 360;
        let dist = 10 * Math.sqrt(count);
        nx += dist * Math.cos(angle * Math.PI / 180);
        ny += dist * Math.sin(angle * Math.PI / 180);
        if (!isPointInPolygon([nx, ny], poly)) {
            nx -= dist * 0.5 * Math.cos(angle * Math.PI / 180);
            ny -= dist * 0.5 * Math.sin(angle * Math.PI / 180);
        }
    }

    const replaceRegex = new RegExp(`({ id: ${loc.id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedFile = updatedFile.replace(replaceRegex, `$1${Math.round(nx)}$2${Math.round(ny)}`);
});

fs.writeFileSync('src/data/spiritual-locations.ts', updatedFile);
console.log('Successfully updated spiritual-locations.ts with calculated centers.');
