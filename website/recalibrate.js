
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

function getBBoxCenter(points) {
    if (points.length === 0) return { x: 0, y: 0 };
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    points.forEach(p => { if (p[0] < minX) minX = p[0]; if (p[0] > maxX) maxX = p[0]; if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1]; });
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

const mapDataFile = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
const centers = {};
let sMatch;
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    centers[sMatch[1]] = getBBoxCenter(parseSVGPath(sMatch[2]));
}

const knownLatLng = {
    'ut': { lat: 30.0668, lng: 79.0193 },
    'gj': { lat: 22.2587, lng: 71.1924 },
    'or': { lat: 20.9517, lng: 85.0985 },
    'tn': { lat: 11.1271, lng: 78.6569 }
};

const charDham = [
    { name: "Badrinath", lat: 30.7433, lng: 79.4938, state: 'ut' },
    { name: "Dwarka", lat: 22.2331, lng: 68.9686, state: 'gj' },
    { name: "Puri", lat: 19.8135, lng: 85.8312, state: 'or' },
    { name: "Rameswaram", lat: 9.2876, lng: 79.3129, state: 'tn' }
];

// Linear regression LatLng -> SVG
function calibrate(locations, latLngMap, centersMap) {
    const data = locations.map(l => {
        const centerLatLng = latLngMap[l.state];
        const centerSVG = centersMap[l.state];
        return { lat: centerLatLng.lat, lng: centerLatLng.lng, x: centerSVG.x, y: centerSVG.y };
    });

    const latSum = data.reduce((s, d) => s + d.lat, 0);
    const lngSum = data.reduce((s, d) => s + d.lng, 0);
    const xSum = data.reduce((s, d) => s + d.x, 0);
    const ySum = data.reduce((s, d) => s + d.y, 0);
    const n = data.length;

    // x = a*lng + b
    const ssLng = data.reduce((s, d) => s + (d.lng - lngSum / n) ** 2, 0);
    const spLngX = data.reduce((s, d) => s + (d.lng - lngSum / n) * (d.x - xSum / n), 0);
    const aX = spLngX / ssLng;
    const bX = (xSum / n) - aX * (lngSum / n);

    // y = c*lat + d
    const ssLat = data.reduce((s, d) => s + (d.lat - latSum / n) ** 2, 0);
    const spLatY = data.reduce((s, d) => s + (d.lat - latSum / latSum) * 0, 0); // Wait this is wrong, I need it for each
    const spLatYv2 = data.reduce((s, d) => s + (d.lat - latSum / n) * (d.y - ySum / n), 0);
    const aY = spLatYv2 / ssLat;
    const bY = (ySum / n) - aY * (latSum / n);

    return { aX, bX, aY, bY };
}

const params = calibrate(charDham, knownLatLng, centers);

charDham.forEach(d => {
    const x = params.aX * d.lng + params.bX;
    const y = params.aY * d.lat + params.bY;
    console.log(`${d.name}: x=${Math.round(x)}, y=${Math.round(y)}`);
});
