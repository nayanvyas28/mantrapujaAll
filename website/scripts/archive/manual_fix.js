const fs = require('fs');

const SAFE_CENTERS = {
    'ut': { x: 235, y: 155 },
    'gj': { x: 35, y: 355 },
    'or': { x: 335, y: 405 },
    'tn': { x: 175, y: 610 },
    'up': { x: 285, y: 265 },
    'mp': { x: 205, y: 345 },
    'mh': { x: 145, y: 445 },
    'pb': { x: 185, y: 175 },
    'rj': { x: 135, y: 255 },
    'jk': { x: 185, y: 85 },
    'br': { x: 345, y: 265 },
    'wb': { x: 385, y: 315 },
    'jh': { x: 355, y: 325 },
    'hp': { x: 215, y: 125 },
    'ka': { x: 145, y: 525 },
    'kl': { x: 165, y: 615 },
    'ap': { x: 255, y: 485 },
    'tg': { x: 225, y: 445 },
    'ct': { x: 275, y: 385 },
    'ga': { x: 125, y: 505 },
    'py': { x: 185, y: 605 },
    'as': { x: 445, y: 265 },
    'ar': { x: 505, y: 225 },
    'mn': { x: 505, y: 305 },
    'ml': { x: 445, y: 295 },
    'mz': { x: 495, y: 335 },
    'nl': { x: 525, y: 265 },
    'tr': { x: 465, y: 325 },
    'sk': { x: 385, y: 245 },
    'an': { x: 535, y: 625 }
};

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const locRegex = /{ id: (\d+), name: "([^"]+)", [^}]+ stateId: '([^']+)', x: ([\d.-]+), y: ([\d.-]+)[^}]+ }/g;

let updatedFile = locFile;
let m;
const stateCounts = {};

while ((m = locRegex.exec(locFile)) !== null) {
    const [_, id, name, stateId, x, y] = m;
    const center = SAFE_CENTERS[stateId] || { x: parseFloat(x), y: parseFloat(y) };
    stateCounts[stateId] = (stateCounts[stateId] || 0) + 1;

    let nx = center.x;
    let ny = center.y;

    // Apply layout for multiple locations in one state
    const i = stateCounts[stateId] - 1;
    if (i > 0) {
        // Hexagonal or spiral layout
        const angle = (i * 137.5) % 360;
        const dist = 12 * Math.sqrt(i + 1);
        nx += dist * Math.cos(angle * Math.PI / 180);
        ny += dist * Math.sin(angle * Math.PI / 180);
    }

    // Coastal Snap: Ensure Dwarka/Puri/Rameswaram are extra inland
    if (name === "Dwarka") { nx = 35; ny = 355; }
    if (name === "Puri") { nx = 330; ny = 405; }
    if (name === "Rameswaram") { nx = 185; ny = 620; }
    if (name === "Kanyakumari") { nx = 175; ny = 650; }
    if (name === "Somnath") { nx = 60; ny = 380; }

    const reg = new RegExp(`({ id: ${id}, [^}]+ x: )[\\d.-]+(, y: )[\\d.-]+`);
    updatedFile = updatedFile.replace(reg, `$1${Math.round(nx)}$2${Math.round(ny)}`);
}

fs.writeFileSync('src/data/spiritual-locations.ts', updatedFile);
console.log('Final manual correction applied.');
