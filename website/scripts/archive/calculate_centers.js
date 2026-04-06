
const fs = require('fs');
const path = require('path');

const filePath = 'e:/mantra/mantrapujalatest1/mantrapujalatest1/src/data/india-map-data.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Simple regex to match state objects in the array
const stateRegex = /\{\s*"name":\s*"([^"]+)",\s*"id":\s*"([^"]+)",\s*"path":\s*"([^"]+)"\s*\}/g;

const statesOfInterest = ['ut', 'gj', 'or', 'tn'];
const results = {};

let match;
while ((match = stateRegex.exec(content)) !== null) {
    const name = match[1];
    const id = match[2];
    const svgPath = match[3];

    if (statesOfInterest.includes(id)) {
        // Parse SVG path for bounding box
        // This is a naive parser for the format 'm x,y dx1,dy1 dx2,dy2 ...'
        // or 'm x,y dx1 dy1 ...'
        const points = svgPath.split(/[\s,]+/);
        let currentX = 0;
        let currentY = 0;
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        let isFirst = true;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (p.toLowerCase() === 'm' || p.toLowerCase() === 'l' || p.toLowerCase() === 'z') continue;

            const val = parseFloat(p);
            if (isNaN(val)) continue;

            // This parser assumes pairs of coordinates
            // Every second number is Y
            if (i % 2 === 0) {
                // Potential X or DX
                if (isFirst) {
                    currentX = val;
                } else {
                    currentX += val;
                }
            } else {
                // Potential Y or DY
                if (isFirst) {
                    currentY = val;
                    isFirst = false;
                } else {
                    currentY += val;
                }

                // Update bounds after getting both X and Y
                minX = Math.min(minX, currentX);
                maxX = Math.max(maxX, currentX);
                minY = Math.min(minY, currentY);
                maxY = Math.max(maxY, currentY);
            }
        }

        results[id] = {
            name,
            minX, maxX, minY, maxY,
            centerX: (minX + maxX) / 2,
            centerY: (minY + maxY) / 2
        };
    }
}

console.log(JSON.stringify(results, null, 2));
