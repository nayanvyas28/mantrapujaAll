const fs = require('fs');

function parseSimplePolygon(pathData) {
    const points = [];
    const commands = pathData.match(/[a-df-z][^a-df-z]*/ig);
    let currX = 0, currY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const args = (cmd.slice(1).trim().match(/[-+]?\d*\.?\d+/g) || []).map(Number);
        if (args.length < 2 && (type.toUpperCase() !== 'Z' && type.toUpperCase() !== 'H' && type.toUpperCase() !== 'V')) return;

        if (type === 'M') { currX = args[0]; currY = args[1]; points.push([currX, currY]); }
        else if (type === 'm') { currX += args[0]; currY += args[1]; points.push([currX, currY]); }
        else if (type === 'L') { for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } }
        else if (type === 'l') { for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } }
        else if (type === 'C' || type === 'c') {
            // Just take the end point of the bezier for speed/simplicity in rough poly
            let x = args[args.length - 2], y = args[args.length - 1];
            if (type === 'c') { currX += x; currY += y; } else { currX = x; currY = y; }
            points.push([currX, currY]);
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

const mapData = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const statesPols = {};
let sMatch;
while ((sMatch = stateRegex.exec(mapData)) !== null) { statesPols[sMatch[1]] = parseSimplePolygon(sMatch[2]); }

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;

function getSafeCenter(poly) {
    let minX = Math.min(...poly.map(p => p[0]));
    let maxX = Math.max(...poly.map(p => p[0]));
    let minY = Math.min(...poly.map(p => p[1]));
    let maxY = Math.max(...poly.map(p => p[1]));

    let validPoints = [];
    for (let x = minX; x <= maxX; x += (maxX - minX) / 15) {
        for (let y = minY; y <= maxY; y += (maxY - minY) / 15) {
            if (isPointInPolygon([x, y], poly)) validPoints.push([x, y]);
        }
    }
    if (validPoints.length === 0) return [(minX + maxX) / 2, (minY + maxY) / 2];

    // Pick the point closest to the average of all valid points (visual center)
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

let updatedFile = locFile;
let m;
const locs = [];
while ((m = locRegex.exec(locFile)) !== null) {
    locs.push({ id: m[1], name: m[2], stateId: m[3], x: parseFloat(m[4]), y: parseFloat(m[5]) });
}

const stateCounts = {};
locs.forEach(loc => {
    const poly = statesPols[loc.stateId];
    if (!poly) return;
    stateCounts[loc.stateId] = (stateCounts[loc.stateId] || 0) + 1;
    let [nx, ny] = getSafeCenter(poly);

    // Apply offset for clusters
    let count = stateCounts[loc.stateId];
    if (count > 1) {
        let angle = (count * 137.5) % 360; // Golden angle for even-ish distribution
        let dist = 12 * Math.sqrt(count);
        nx += dist * Math.cos(angle * Math.PI / 180);
        ny += dist * Math.sin(angle * Math.PI / 180);

        // Re-validate offset point
        if (!isPointInPolygon([nx, ny], poly)) {
            // If offset pushed it out, try smaller dist or just stay at center
            nx -= dist * 0.5 * Math.cos(angle * Math.PI / 180);
            ny -= dist * 0.5 * Math.sin(angle * Math.PI / 180);
        }
    }

    const regex = new RegExp(`({ id: ${loc.id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedFile = updatedFile.replace(regex, `$1${Math.round(nx)}$2${Math.round(ny)}`);
});

fs.writeFileSync('src/data/spiritual-locations.ts', updatedFile);
console.log('Final Polish Done.');
