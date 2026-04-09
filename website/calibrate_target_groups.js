
const fs = require('fs');

// 1. ANCHORS (State Geo Centers)
const stateGeoCenters = {
    ap: [15.9, 79.7], ar: [28.2, 94.7], as: [26.2, 92.9], br: [25.1, 85.3],
    ct: [21.3, 82.0], ga: [15.3, 74.1], gj: [22.3, 71.2], hr: [29.1, 76.1],
    hp: [31.1, 77.2], jk: [33.8, 74.8], jh: [23.6, 85.3], ka: [15.3, 75.7],
    kl: [10.2, 76.5], mp: [23.2, 77.5], mh: [19.3, 75.3], mn: [24.7, 93.9],
    ml: [25.5, 91.3], mz: [23.2, 92.9], nl: [26.1, 94.6], or: [20.3, 84.8],
    pb: [30.8, 75.4], rj: [27.0, 73.8], sk: [27.5, 88.5], tn: [11.1, 78.7],
    tg: [17.1, 79.1], tr: [23.8, 91.3], up: [27.1, 80.8], ut: [30.1, 79.0],
    wb: [24.5, 87.7]
};

// 2. TARGET LOCATION Lat/Lng Coordinates
const latLngMap = {
    "Badrinath": [30.74, 79.49],
    "Dwarka": [22.24, 68.96],
    "Puri": [19.81, 85.83],
    "Rameswaram": [9.28, 79.31],
    "Somnath": [20.88, 70.40],
    "Kedarnath": [30.73, 79.06],
    "Omkareshwar": [22.24, 76.15],
    "Mahakaleshwar (Ujjain)": [23.18, 75.76],
    "Kashi Vishwanath (Varanasi)": [25.31, 83.01],
    "Baidyanath (Deoghar)": [24.49, 86.70],
    "Trimbakeshwar (Nashik)": [19.94, 73.53],
    "Grishneshwar (Aurangabad)": [20.02, 75.17],
    "Bhimashankar": [19.07, 73.53],
    "Nageshwar (Dwarka)": [22.33, 69.05],
    "Rameswaram Jyotirlinga": [9.28, 79.31],
    "Mallikarjuna (Srisailam)": [16.08, 78.86],
    "Prayagraj": [25.43, 81.84],
    "Haridwar": [29.94, 78.16],
    "Nashik": [19.94, 73.53],
    "Ujjain": [23.18, 75.76]
};

// 3. Robust SVG Parsing
function parsePath(pathData) {
    const commands = pathData.split(/(?=[mzlhvcsqta])/i);
    let points = [];
    let curX = 0, curY = 0;

    commands.forEach(cmd => {
        const type = cmd[0];
        const argsStr = cmd.slice(1).trim().replace(/-/g, ' -').replace(/,/g, ' ');
        const args = argsStr.split(/\s+/).filter(x => x).map(Number);

        let i = 0;
        while (i < args.length || args.length === 0) {
            if (type === 'M') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'm') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'L') { curX = args[i++]; curY = args[i++]; }
            else if (type === 'l') { curX += args[i++]; curY += args[i++]; }
            else if (type === 'H') { curX = args[i++]; }
            else if (type === 'h') { curX += args[i++]; }
            else if (type === 'V') { curY = args[i++]; }
            else if (type === 'v') { curY += args[i++]; }
            else if (type === 'C') { i += 4; curX = args[i++]; curY = args[i++]; }
            else if (type === 'c') { i += 4; curX += args[i++]; curY += args[i++]; }
            else if (type === 'S') { i += 2; curX = args[i++]; curY = args[i++]; }
            else if (type === 's') { i += 2; curX += args[i++]; curY += args[i++]; }
            else if (type === 'Q') { i += 2; curX = args[i++]; curY = args[i++]; }
            else if (type === 'q') { i += 2; curX += args[i++]; curY += args[i++]; }
            else if (type === 'Z' || type === 'z') { break; }
            else { break; }

            if (!isNaN(curX) && !isNaN(curY)) points.push([curX, curY]);
            if (args.length === 0) break;
        }
    });
    return points;
}

// 4. MAIN LOGIC
const mapData = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts', 'utf8');
const locData = fs.readFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/spiritual-locations.ts', 'utf8');

const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const alignmentPairs = [];
const stateGeoms = {};

while ((sMatch = stateRegex.exec(mapData)) !== null) {
    const id = sMatch[1];
    const pts = parsePath(sMatch[2]);
    if (pts.length === 0) continue;

    const minX = Math.min(...pts.map(p => p[0])), maxX = Math.max(...pts.map(p => p[0]));
    const minY = Math.min(...pts.map(p => p[1])), maxY = Math.max(...pts.map(p => p[1]));
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;

    stateGeoms[id] = { points: pts, minX, maxX, minY, maxY, cx, cy };

    const geo = stateGeoCenters[id];
    if (geo) {
        alignmentPairs.push({ lat: geo[0], lng: geo[1], x: cx, y: cy });
    }
}

// Calibrate
const n = alignmentPairs.length;
let sumLng = 0, sumX = 0, sumLngX = 0, sumLng2 = 0;
let sumLat = 0, sumY = 0, sumLatY = 0, sumLat2 = 0;
alignmentPairs.forEach(d => {
    sumLng += d.lng; sumX += d.x; sumLngX += d.lng * d.x; sumLng2 += d.lng * d.lng;
    sumLat += d.lat; sumY += d.y; sumLatY += d.lat * d.y; sumLat2 += d.lat * d.lat;
});

const slopeX = (n * sumLngX - sumLng * sumX) / (n * sumLng2 - sumLng * sumLng);
const interceptX = (sumX - slopeX * sumLng) / n;
const slopeY = (n * sumLatY - sumLat * sumY) / (n * sumLat2 - sumLat * sumLat);
const interceptY = (sumY - slopeY * sumLat) / n;

// Process target sites
let updatedLocData = locData;
const targetCategories = ['Char Dham', 'Jyotirlinga', 'Kumbh Mela'];
const locRegex = /{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*slug:\s*"[^"]+",\s*type:\s*"([^"]+)",[^}]*stateId:\s*'([^']+)'/g;

while ((match = locRegex.exec(locData)) !== null) {
    const [_, id, name, type, stateId] = match;
    if (!targetCategories.includes(type)) continue;

    const coords = latLngMap[name] || null;
    if (!coords) continue;

    let nx = slopeX * coords[1] + interceptX;
    let ny = slopeY * coords[0] + interceptY;

    // Strict BBox Containment
    const g = stateGeoms[stateId];
    if (g) {
        const pad = 2; // small padding
        if (nx < g.minX + pad || nx > g.maxX - pad || ny < g.minY + pad || ny > g.maxY - pad) {
            // Nudge towards center until inside BBox
            let lerp = 0.1;
            const startX = nx, startY = ny;
            while ((nx < g.minX + pad || nx > g.maxX - pad || ny < g.minY + pad || ny > g.maxY - pad) && lerp <= 1.0) {
                nx = startX * (1 - lerp) + g.cx * lerp;
                ny = startY * (1 - lerp) + g.cy * lerp;
                lerp += 0.05;
            }
        }
    }

    const replaceRegex = new RegExp(`({ id: ${id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedLocData = updatedLocData.replace(replaceRegex, `$1${nx.toFixed(1)}$2${ny.toFixed(1)}`);
}

fs.writeFileSync('e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/spiritual-locations.ts', updatedLocData);
console.log('Successfully calibrated targeted spiritual locations with improved containment.');
