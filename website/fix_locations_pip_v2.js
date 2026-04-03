const fs = require('fs');

function parseSVGPath(pathData) {
    const points = [];
    const commands = pathData.match(/[a-df-z][^a-df-z]*/ig);
    let currX = 0, currY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const args = (cmd.slice(1).trim().match(/[-+]?\d*\.?\d+/g) || []).map(Number);

        if (type === 'M') {
            currX = args[0]; currY = args[1];
            points.push([currX, currY]);
        } else if (type === 'm') {
            currX += args[0]; currY += args[1];
            points.push([currX, currY]);
        } else if (type === 'L') {
            for (let i = 0; i < args.length; i += 2) {
                currX = args[i]; currY = args[i + 1];
                points.push([currX, currY]);
            }
        } else if (type === 'l') {
            for (let i = 0; i < args.length; i += 2) {
                currX += args[i]; currY += args[i + 1];
                points.push([currX, currY]);
            }
        } else if (type === 'H') {
            args.forEach(x => { currX = x; points.push([currX, currY]); });
        } else if (type === 'h') {
            args.forEach(x => { currX += x; points.push([currX, currY]); });
        } else if (type === 'V') {
            args.forEach(y => { currY = y; points.push([currX, currY]); });
        } else if (type === 'v') {
            args.forEach(y => { currY += y; points.push([currX, currY]); });
        } else if (type === 'C') {
            for (let i = 0; i < args.length; i += 6) {
                let [x1, y1, x2, y2, x, y] = args.slice(i, i + 6);
                // Sample cubic bezier
                for (let t = 0.2; t <= 1; t += 0.2) {
                    let tx = Math.pow(1 - t, 3) * currX + 3 * Math.pow(1 - t, 2) * t * x1 + 3 * (1 - t) * Math.pow(t, 2) * x2 + Math.pow(t, 3) * x;
                    let ty = Math.pow(1 - t, 3) * currY + 3 * Math.pow(1 - t, 2) * t * y1 + 3 * (1 - t) * Math.pow(t, 2) * y2 + Math.pow(t, 3) * y;
                    points.push([tx, ty]);
                }
                currX = x; currY = y;
                points.push([currX, currY]);
            }
        } else if (type === 'c') {
            for (let i = 0; i < args.length; i += 6) {
                let [x1, y1, x2, y2, x, y] = args.slice(i, i + 6);
                let absX1 = currX + x1, absY1 = currY + y1;
                let absX2 = currX + x2, absY2 = currY + y2;
                let absX = currX + x, absY = currY + y;
                // Sample cubic bezier
                for (let t = 0.2; t <= 1; t += 0.2) {
                    let tx = Math.pow(1 - t, 3) * currX + 3 * Math.pow(1 - t, 2) * t * absX1 + 3 * (1 - t) * Math.pow(t, 2) * absX2 + Math.pow(t, 3) * absX;
                    let ty = Math.pow(1 - t, 3) * currY + 3 * Math.pow(1 - t, 2) * t * absY1 + 3 * (1 - t) * Math.pow(t, 2) * absY2 + Math.pow(t, 3) * absY;
                    points.push([tx, ty]);
                }
                currX = absX; currY = absY;
                points.push([currX, currY]);
            }
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

// Load data
const mapData = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const statesPols = {};
let sMatch;
while ((sMatch = stateRegex.exec(mapData)) !== null) {
    statesPols[sMatch[1]] = parseSVGPath(sMatch[2]);
}

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;

let updatedFile = locFile;
const logs = [];

// Helper to find deep interior point
function findDeepPoint(stateId, poly) {
    let minX = Math.min(...poly.map(p => p[0]));
    let maxX = Math.max(...poly.map(p => p[0]));
    let minY = Math.min(...poly.map(p => p[1]));
    let maxY = Math.max(...poly.map(p => p[1]));

    for (let x = minX + (maxX - minX) / 4; x <= maxX - (maxX - minX) / 4; x += (maxX - minX) / 20) {
        for (let y = minY + (maxY - minY) / 4; y <= maxY - (maxY - minY) / 4; y += (maxY - minY) / 20) {
            if (isPointInPolygon([x, y], poly)) {
                return [x, y];
            }
        }
    }
    // Fallback to simpler grid if quarter-inset fails
    for (let x = minX; x <= maxX; x += (maxX - minX) / 20) {
        for (let y = minY; y <= maxY; y += (maxY - minY) / 20) {
            if (isPointInPolygon([x, y], poly)) {
                return [x, y];
            }
        }
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
}

const locMatches = [];
let m;
while ((m = locRegex.exec(locFile)) !== null) {
    locMatches.push({ id: m[1], name: m[2], stateId: m[3], x: parseFloat(m[4]), y: parseFloat(m[5]) });
}

locMatches.forEach(loc => {
    const poly = statesPols[loc.stateId];
    if (!poly) return;

    if (!isPointInPolygon([loc.x, loc.y], poly)) {
        const [nx, ny] = findDeepPoint(loc.stateId, poly);
        const regex = new RegExp(`({ id: ${loc.id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
        updatedFile = updatedFile.replace(regex, `$1${Math.round(nx)}$2${Math.round(ny)}`);
        loc.x = Math.round(nx); loc.y = Math.round(ny);
    }
});

fs.writeFileSync('src/data/spiritual-locations.ts', updatedFile);
console.log('Fixed pointers.');
