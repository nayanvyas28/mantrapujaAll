const fs = require('fs');

// Simple Ray-Casting Algorithm for Point in Polygon
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

// Very basic SVG path to polygon converter (Handles M, L, H, V, Z)
// Note: This ignores curves (C, S, Q, T) for simplicity, which is often fine for a rough check 
// but the India map uses curves. I'll handle C (Cubic Bezier) by sampling.
function pathDataToPolygon(pathData) {
    const commands = pathData.split(/(?=[a-df-z])/i);
    let points = [];
    let currX = 0, currY = 0;

    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const args = cmdStr.slice(1).trim().split(/[\s,]+/).map(Number);

        switch (type.toUpperCase()) {
            case 'M':
                currX = args[0]; currY = args[1];
                points.push([currX, currY]);
                break;
            case 'L':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i]; currY = args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'H':
                args.forEach(x => { currX = x; points.push([currX, currY]); });
                break;
            case 'V':
                args.forEach(y => { currY = y; points.push([currX, currY]); });
                break;
            case 'C':
                // Sample cubic bezier
                for (let i = 0; i < args.length; i += 6) {
                    let [x1, y1, x2, y2, x, y] = args.slice(i, i + 6);
                    for (let t = 0.1; t <= 1; t += 0.2) {
                        let tx = Math.pow(1 - t, 3) * currX + 3 * Math.pow(1 - t, 2) * t * x1 + 3 * (1 - t) * Math.pow(t, 2) * x2 + Math.pow(t, 3) * x;
                        let ty = Math.pow(1 - t, 3) * currY + 3 * Math.pow(1 - t, 2) * t * y1 + 3 * (1 - t) * Math.pow(t, 2) * y2 + Math.pow(t, 3) * y;
                        points.push([tx, ty]);
                    }
                    currX = x; currY = y;
                }
                break;
            case 'Z':
                // Close path usually handled by isPointInPolygon loop
                break;
        }
    });
    return points;
}

// Load data
const mapData = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const states = {};

let match;
while ((match = stateRegex.exec(mapData)) !== null) {
    states[match[1]] = pathDataToPolygon(match[2]);
}

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;
let locMatch;
let total = 0;
let invalid = 0;

// To store new coordinates
const newCoords = {};

while ((locMatch = locRegex.exec(locFile)) !== null) {
    const [_, id, name, stateId, x, y] = locMatch;
    total++;
    const point = [parseFloat(x), parseFloat(y)];
    const poly = states[stateId];

    if (!poly || !isPointInPolygon(point, poly)) {
        invalid++;
        // Find center of poly for now as a fix
        let minX = Math.min(...poly.map(p => p[0]));
        let maxX = Math.max(...poly.map(p => p[0]));
        let minY = Math.min(...poly.map(p => p[1]));
        let maxY = Math.max(...poly.map(p => p[1]));

        // Grid search for a valid point near the center
        let found = false;
        let cx = (minX + maxX) / 2;
        let cy = (minY + maxY) / 2;

        // Search in a spiral or expanding grid
        for (let r = 0; r < 50; r += 5) {
            for (let angle = 0; angle < 360; angle += 45) {
                let checkX = cx + r * Math.cos(angle * Math.PI / 180);
                let checkY = cy + r * Math.sin(angle * Math.PI / 180);
                if (isPointInPolygon([checkX, checkY], poly)) {
                    newCoords[id] = { x: Math.round(checkX), y: Math.round(checkY) };
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (!found) {
            console.log(`Error: Could not find valid point for ${name} (${stateId})`);
        }
    }
}

console.log(`Total: ${total}, Invalid: ${invalid}`);

// Update file
let updatedLocFile = locFile;
Object.keys(newCoords).forEach(id => {
    const { x, y } = newCoords[id];
    // Find the line for this ID and update X/Y
    const regex = new RegExp(`({ id: ${id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedLocFile = updatedLocFile.replace(regex, `$1${x}$2${y}`);
});

fs.writeFileSync('src/data/spiritual-locations.ts', updatedLocFile);
console.log('Fixed invalid points.');

// De-cluttering: If multiple points share exactly the same X/Y, shift them slightly
// This is important because reset_centers might have stacked them
const finalLocFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const finalLocs = [];
let fMatch;
const finalLocRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;
while ((fMatch = finalLocRegex.exec(finalLocFile)) !== null) {
    finalLocs.push({ id: fMatch[1], stateId: fMatch[3], x: parseFloat(fMatch[4]), y: parseFloat(fMatch[5]) });
}

let movedCount = 0;
let finalUpdated = finalLocFile;

finalLocs.forEach((loc, i) => {
    let duplicate = finalLocs.find((other, j) => i !== j && other.x === loc.x && other.y === loc.y);
    if (duplicate) {
        // Try to shift in 8 directions until valid
        const poly = states[loc.stateId];
        let shifted = false;
        for (let r = 10; r <= 30; r += 10) {
            for (let angle = 45 * i; angle < 360 + 45 * i; angle += 45) {
                let sx = loc.x + r * Math.cos(angle * Math.PI / 180);
                let sy = loc.y + r * Math.sin(angle * Math.PI / 180);
                if (isPointInPolygon([sx, sy], poly)) {
                    const reg = new RegExp(`({ id: ${loc.id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
                    finalUpdated = finalUpdated.replace(reg, `$1${Math.round(sx)}$2${Math.round(sy)}`);
                    loc.x = Math.round(sx); loc.y = Math.round(sy); // Update local copy to prevent cascading duplicates
                    shifted = true;
                    movedCount++;
                    break;
                }
            }
            if (shifted) break;
        }
    }
});

fs.writeFileSync('src/data/spiritual-locations.ts', finalUpdated);
console.log(`De-cluttered ${movedCount} overlapping points.`);
