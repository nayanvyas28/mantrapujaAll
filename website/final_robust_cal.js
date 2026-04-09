
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
            case 'M':
                for (let i = 0; i < args.length; i += 2) {
                    currX = args[i]; currY = args[i + 1];
                    points.push([currX, currY]);
                    if (i === 0) { startX = currX; startY = currY; }
                }
                break;
            case 'm':
                for (let i = 0; i < args.length; i += 2) {
                    if (i === 0 && points.length === 0) { currX = args[i]; currY = args[i + 1]; }
                    else { currX += args[i]; currY += args[i + 1]; }
                    points.push([currX, currY]);
                    if (i === 0) { startX = currX; startY = currY; }
                }
                break;
            case 'L': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'l': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'H': args.forEach(x => { currX = x; points.push([currX, currY]); }); break;
            case 'h': args.forEach(dx => { currX += dx; points.push([currX, currY]); }); break;
            case 'V': args.forEach(y => { currY = y; points.push([currX, currY]); }); break;
            case 'v': args.forEach(dy => { currY += dy; points.push([currX, currY]); }); break;
            case 'C': for (let i = 0; i < args.length; i += 6) { currX = args[i + 4]; currY = args[i + 5]; points.push([currX, currY]); } break;
            case 'c': for (let i = 0; i < args.length; i += 6) { currX += args[i + 4]; currY += args[i + 5]; points.push([currX, currY]); } break;
            case 'S': for (let i = 0; i < args.length; i += 4) { currX = args[i + 2]; currY = args[i + 3]; points.push([currX, currY]); } break;
            case 's': for (let i = 0; i < args.length; i += 4) { currX += args[i + 2]; currY += args[i + 3]; points.push([currX, currY]); } break;
            case 'Q': for (let i = 0; i < args.length; i += 4) { currX = args[i + 2]; currY = args[i + 3]; points.push([currX, currY]); } break;
            case 'q': for (let i = 0; i < args.length; i += 4) { currX += args[i + 2]; currY += args[i + 3]; points.push([currX, currY]); } break;
            case 'T': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 't': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'Z':
            case 'z': currX = startX; currY = startY; points.push([currX, currY]); break;
        }
    });
    return points;
}

function getBBoxCenter(points) {
    if (points.length === 0) return { x: 0, y: 0 };
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => {
        if (p[0] < minX) minX = p[0]; if (p[0] > maxX) maxX = p[0];
        if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1];
    });
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

const mapDataFile = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const targetStates = ['gj', 'tn', 'ut', 'or'];
const centers = {};

while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    if (targetStates.includes(sMatch[1])) {
        centers[sMatch[1]] = getBBoxCenter(parseSVGPath(sMatch[2]));
    }
}

const charDham = [
    { name: "Badrinath", lat: 30.7433, lng: 79.4938, state: 'ut' },
    { name: "Dwarka", lat: 22.2331, lng: 68.9686, state: 'gj' },
    { name: "Puri", lat: 19.8135, lng: 85.8312, state: 'or' },
    { name: "Rameswaram", lat: 9.2876, lng: 79.3129, state: 'tn' }
];

const stateLatLngCenters = {
    'ut': [30.0668, 79.0193],
    'gj': [22.2587, 71.1924],
    'or': [20.9517, 85.0985],
    'tn': [11.1271, 78.6569]
};

charDham.forEach(d => {
    const sCenter = centers[d.state];
    const sLatLng = stateLatLngCenters[d.state];

    // Simple scaling based on state center and char dham relative pos
    const dLat = d.lat - sLatLng[0];
    const dLng = d.lng - sLatLng[1];

    // We need a global scale. Let's use the known badrinath (241, 155) and puri (371, 408) as anchors if they look good.
    // Actually, let's just use the robust centers to see where they land.
    console.log(`${d.name} in ${d.state}: State Center (SVG) = ${sCenter.x.toFixed(2)}, ${sCenter.y.toFixed(2)}`);
});
