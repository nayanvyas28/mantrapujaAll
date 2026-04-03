
const fs = require('fs');

function parseSVGPath(pathData) {
    const points = [];
    const commandRegex = /([a-df-z][^a-df-z]*)/ig;
    const commands = pathData.match(commandRegex);
    let currX = 0, currY = 0;
    let startX = 0, startY = 0; // For closepath z/Z

    if (!commands) return [];

    commands.forEach(cmdStr => {
        const type = cmdStr[0];
        const argsStr = cmdStr.slice(1).trim();
        const args = (argsStr.replace(/,/g, ' ').match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || []).map(Number);

        switch (type) {
            case 'M':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i];
                    currY = args[i + 1];
                    points.push([currX, currY]);
                    if (i === 0) { startX = currX; startY = currY; }
                }
                break;
            case 'm':
                for (let i = 0; i < args.length; i += 2) {
                    if (i === 0 && points.length === 0) {
                        // First m is absolute
                        currX = args[i];
                        currY = args[i + 1];
                    } else {
                        currX += args[i];
                        currY += args[i + 1];
                    }
                    points.push([currX, currY]);
                    if (i === 0) { startX = currX; startY = currY; }
                }
                break;
            case 'L':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i];
                    currY = args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'l':
                for (let i = 0; i < args.length; i += 2) {
                    currX += args[i];
                    currY += args[i + 1];
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
                    // Just take the end point for bbox purposes
                    currX = args[i + 4];
                    currY = args[i + 5];
                    points.push([currX, currY]);
                }
                break;
            case 'c':
                for (let i = 0; i < args.length; i += 6) {
                    currX += args[i + 4];
                    currY += args[i + 5];
                    points.push([currX, currY]);
                }
                break;
            case 'S':
                for (let i = 0; i < args.length; i += 4) {
                    currX = args[i + 2];
                    currY = args[i + 3];
                    points.push([currX, currY]);
                }
                break;
            case 's':
                for (let i = 0; i < args.length; i += 4) {
                    currX += args[i + 2];
                    currY += args[i + 3];
                    points.push([currX, currY]);
                }
                break;
            case 'Q':
                for (let i = 0; i < args.length; i += 4) {
                    currX = args[i + 2];
                    currY = args[i + 3];
                    points.push([currX, currY]);
                }
                break;
            case 'q':
                for (let i = 0; i < args.length; i += 4) {
                    currX += args[i + 2];
                    currY += args[i + 3];
                    points.push([currX, currY]);
                }
                break;
            case 'T':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i];
                    currY = args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 't':
                for (let i = 0; i < args.length; i += 2) {
                    currX += args[i];
                    currY += args[i + 1];
                    points.push([currX, currY]);
                }
                break;
            case 'Z':
            case 'z':
                currX = startX;
                currY = startY;
                points.push([currX, currY]);
                break;
        }
    });
    return points;
}

function getBBoxCenter(points) {
    if (points.length === 0) return { x: 0, y: 0 };
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
        if (p[0] < minX) minX = p[0];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[1] > maxY) maxY = p[1];
    });
    return {
        x: (minX + maxX) / 2,
        y: (minY + maxY) / 2,
        minX, maxX, minY, maxY
    };
}

const mapDataFile = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const statesData = [];

while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    const points = parseSVGPath(sMatch[2]);
    const center = getBBoxCenter(points);
    statesData.push({ id: sMatch[1], center });
}

statesData.forEach(s => {
    console.log(`State: ${s.id}, CenterX: ${s.center.x.toFixed(2)}, CenterY: ${s.center.y.toFixed(2)}`);
});
