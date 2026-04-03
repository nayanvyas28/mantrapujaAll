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
    return { x: best[0], y: best[1], minX, maxX, minY, maxY };
}

const mapDataFile = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
console.log('ID\tCenter X\tCenter Y\tMin X\tMax X\tMin Y\tMax Y');
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    const poly = parseSimplePolygon(sMatch[2]);
    const info = getSafeCenter(poly);
    console.log(`${sMatch[1]}\t${info.x.toFixed(1)}\t${info.y.toFixed(1)}\t${info.minX.toFixed(1)}\t${info.maxX.toFixed(1)}\t${info.minY.toFixed(1)}\t${info.maxY.toFixed(1)}`);
}
