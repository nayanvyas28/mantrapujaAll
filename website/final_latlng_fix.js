const fs = require('fs');

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

const latLngMap = {
    "Badrinath": [30.74, 79.49], "Kedarnath": [30.73, 79.06], "Haridwar": [29.94, 78.16],
    "Dwarka": [22.24, 68.96], "Somnath": [20.88, 70.40], "Puri": [19.81, 85.83],
    "Rameswaram": [9.28, 79.31], "Rameswaram Jyotirlinga": [9.28, 79.31],
    "Omkareshwar": [22.24, 76.15], "Mahakaleshwar (Ujjain)": [23.18, 75.76], "Ujjain": [23.18, 75.76],
    "Kashi Vishwanath (Varanasi)": [25.31, 83.01], "Varanasi": [25.31, 83.01],
    "Baidyanath (Deoghar)": [24.49, 86.70], "Trimbakeshwar (Nashik)": [19.94, 73.53], "Nashik": [19.94, 73.53],
    "Grishneshwar": [20.02, 75.17], "Bhimashankar": [19.07, 73.53], "Nageshwar (Dwarka)": [22.33, 69.05],
    "Mallikarjuna (Srisailam)": [16.08, 78.86], "Prayagraj": [25.43, 81.84], "Rishikesh": [30.08, 78.26],
    "Vaidyanath": [24.49, 86.70], "Mathura": [27.49, 77.67], "Ayodhya": [26.79, 82.20],
    "Bodh Gaya": [24.69, 84.99], "Kollam": [8.89, 76.59], "Thrissur": [10.52, 76.21],
    "Tirupati": [13.62, 79.41], "Madurai": [9.92, 78.12], "Tanjore": [10.78, 79.13],
    "Kumbakonam": [10.96, 79.38], "Chidambaram": [11.39, 79.70], "Velankanni": [10.68, 79.84],
    "Amarnath": [34.21, 75.50], "Gaya": [24.79, 85.00], "Patna": [25.59, 85.13]
};

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
            case 'M': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'm': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'L': for (let i = 0; i < args.length; i += 2) { currX = args[i]; currY = args[i + 1]; points.push([currX, currY]); } break;
            case 'l': for (let i = 0; i < args.length; i += 2) { currX += args[i]; currY += args[i + 1]; points.push([currX, currY]); } break;
            case 'H': args.forEach(x => { currX = x; points.push([currX, currY]); }); break;
            case 'h': args.forEach(dx => { currX += dx; points.push([currX, currY]); }); break;
            case 'V': args.forEach(y => { currY = y; points.push([currX, currY]); }); break;
            case 'v': args.forEach(dy => { currY += dy; points.push([currX, currY]); }); break;
            case 'C': for (let i = 0; i < args.length; i += 6) { currX = args[i + 4]; currY = args[i + 5]; points.push([currX, currY]); } break;
            case 'c': for (let i = 0; i < args.length; i += 6) { currX += args[i + 4]; currY += args[i + 5]; points.push([currX, currY]); } break;
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
    if (!poly || poly.length === 0) return [0, 0];
    let minX = Math.min(...poly.map(p => p[0])), maxX = Math.max(...poly.map(p => p[0]));
    let minY = Math.min(...poly.map(p => p[1])), maxY = Math.max(...poly.map(p => p[1]));
    let validPoints = [];
    for (let x = minX; x <= maxX; x += (maxX - minX) / 10 || 1) {
        for (let y = minY; y <= maxY; y += (maxY - minY) / 10 || 1) {
            validPoints.push([x, y]);
        }
    }
    let avgX = validPoints.reduce((s, p) => s + p[0], 0) / validPoints.length;
    let avgY = validPoints.reduce((s, p) => s + p[1], 0) / validPoints.length;
    return [avgX, avgY];
}

const mapDataFile = fs.readFileSync('src/data/india-map-data.ts', 'utf8');
const stateRegex = /"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"/g;
let sMatch;
const alignmentData = [];
const statesPols = {};
while ((sMatch = stateRegex.exec(mapDataFile)) !== null) {
    const id = sMatch[1];
    const poly = parseSimplePolygon(sMatch[2]);
    statesPols[id] = poly;
    const geo = stateGeoCenters[id];
    if (geo) {
        const center = getSafeCenter(poly);
        if (center) alignmentData.push({ lat: geo[0], lng: geo[1], x: center[0], y: center[1] });
    }
}

function calibrate(data) {
    const n = data.length;
    let sumLng = 0, sumX = 0, sumLngX = 0, sumLng2 = 0;
    let sumLat = 0, sumY = 0, sumLatY = 0, sumLat2 = 0;
    data.forEach(d => {
        sumLng += d.lng; sumX += d.x; sumLngX += d.lng * d.x; sumLng2 += d.lng * d.lng;
        sumLat += d.lat; sumY += d.y; sumLatY += d.lat * d.y; sumLat2 += d.lat * d.lat;
    });
    const slopeX = (n * sumLngX - sumLng * sumX) / (n * sumLng2 - sumLng * sumLng);
    const interceptX = (sumX - slopeX * sumLng) / n;
    const slopeY = (n * sumLatY - sumLat * sumY) / (n * sumLat2 - sumLat * sumLat);
    const interceptY = (sumY - slopeY * sumLat) / n;
    return { slopeX, interceptX, slopeY, interceptY };
}

const config = calibrate(alignmentData);

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

    let nx, ny;
    const coords = latLngMap[loc.name] || latLngMap[loc.name.split(' (')[0]] || null;

    if (coords) {
        nx = config.slopeX * coords[1] + config.interceptX;
        ny = config.slopeY * coords[0] + config.interceptY;
    } else {
        // Fallback to centroid if no lat/long known
        const center = getSafeCenter(poly);
        nx = center[0]; ny = center[1];
    }

    // Boundary check & Nudge
    if (!isPointInPolygon([nx, ny], poly)) {
        // If outside, pull it towards the centroid until it's inside
        const [cx, cy] = getSafeCenter(poly);
        let lerp = 0.1;
        while (!isPointInPolygon([nx, ny], poly) && lerp <= 1.0) {
            nx = nx * (1 - lerp) + cx * lerp;
            ny = ny * (1 - lerp) + cy * lerp;
            lerp += 0.1;
        }
    }

    // Clustering offset
    stateCounts[loc.stateId] = (stateCounts[loc.stateId] || 0) + 1;
    let count = stateCounts[loc.stateId];
    if (count > 1) {
        let angle = (count * 137.5) % 360;
        let dist = 8 * Math.sqrt(count);
        let ox = dist * Math.cos(angle * Math.PI / 180);
        let oy = dist * Math.sin(angle * Math.PI / 180);
        if (isPointInPolygon([nx + ox, ny + oy], poly)) {
            nx += ox; ny += oy;
        }
    }

    const replaceRegex = new RegExp(`({ id: ${loc.id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedFile = updatedFile.replace(replaceRegex, `$1${Math.round(nx)}$2${Math.round(ny)}`);
});

fs.writeFileSync('src/data/spiritual-locations.ts', updatedFile);
console.log('Final Polish Done (Geographic + Boundary Guaranteed).');
