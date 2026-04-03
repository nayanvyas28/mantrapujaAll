const fs = require('fs');

const locFile = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');
const lines = locFile.split('\n');

const offsets = {
    // ID: [dx, dy]
    // Uttarakhand
    1: [5, -15],   // Badrinath
    6: [-5, -15],  // Kedarnath
    18: [-5, 20],  // Haridwar

    // Gujarat
    2: [-20, -5],  // Dwarka
    5: [15, 20],   // Somnath
    14: [-15, -15], // Nageshwar

    // Maharashtra
    49: [-30, -15], // Mumbai
    11: [-15, -30], // Trimbakeshwar
    19: [-15, -35], // Nashik
    48: [-15, -25], // Nashik Shakti
    12: [15, -10],  // Grishneshwar
    13: [-20, 10],  // Bhimashankar
    50: [-20, 30],  // Kolhapur
    51: [20, 25],   // Tuljapur
    52: [40, -15],  // Amravati

    // Uttar Pradesh
    9: [30, 30],    // Kashi
    37: [35, 35],   // Varanasi
    17: [15, 30],   // Prayagraj
    36: [20, 35],   // Prayagraj Shakti
    38: [30, 40],   // Vindhyachal

    // Madhya Pradesh
    7: [-20, 20],   // Omkareshwar
    8: [-25, 5],    // Mahakaleshwar
    20: [-30, 0],   // Ujjain
    42: [-30, 10],  // Ujjain Shakti
    43: [40, 0],    // Jabalpur

    // Odisha
    3: [35, 15],    // Puri
    53: [40, 20],   // Puri Shakti
    54: [25, -10],  // Cuttack
    55: [15, 25],   // Berhampur

    // Tamil Nadu
    4: [0, 40],     // Rameswaram
    15: [5, 45],    // Rameswaram Jyotirlinga
    67: [-5, 50],   // Rameswaram Shakti
    64: [30, -30],  // Chennai
    65: [20, -25],  // Kanchipuram
    66: [0, 10],    // Madurai
    68: [-20, 5],   // Coimbatore

    // Karnataka
    61: [5, -20],   // Hampi
    62: [-20, 40],  // Mangaluru
    63: [-25, 20],  // Udupi

    // Andhra Pradesh
    16: [-10, 10],  // Mallikarjuna
    58: [10, 15],   // Vijayawada
    59: [50, -30],  // Srikakulam
    60: [-10, 50],  // Tirupati

    // Bihar
    39: [0, 15],    // Gaya
    40: [0, -15],   // Patna
    41: [15, 10],   // Rajgir

    // Rajasthan
    44: [30, -20],  // Jaipur
    45: [-10, -5],  // Jodhpur
    46: [10, 35],   // Udaipur
    47: [25, 25],   // Chittorgarh

    // Kerala
    69: [5, 40],    // Thiruvananthapuram
    70: [-1, 20],   // Kollam
    71: [-1, -15],  // Thrissur

    // Telangana
    56: [-5, 5],    // Hyderabad
    57: [15, -15],  // Warangal

    // J&K
    30: [-30, 35],  // Vaishno Devi
    31: [-30, 0],   // Srinagar
    32: [37, 10],   // Leh
};

const newLines = lines.map(line => {
    const idMatch = line.match(/{ id: (\d+),/);
    if (idMatch) {
        const id = parseInt(idMatch[1]);
        const offset = offsets[id];
        if (offset) {
            return line.replace(/x: ([\d.-]+), y: ([\d.-]+)/, (match, x, y) => {
                const nx = Math.round(parseFloat(x) + offset[0]);
                const ny = Math.round(parseFloat(y) + offset[1]);
                return `x: ${nx}, y: ${ny}`;
            });
        }
    }
    return line;
});

fs.writeFileSync('src/data/spiritual-locations.ts', newLines.join('\n'));
console.log('Applied offsets to clusters.');
