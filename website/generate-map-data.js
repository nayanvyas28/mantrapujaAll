const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'node_modules/@svg-maps/india/index.js');
const outputPath = path.join(__dirname, 'src/data/india-map-data.ts');

try {
    const content = fs.readFileSync(inputPath, 'utf8');
    // Extract the JSON object from 'export default { ... };'
    const jsonStr = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);

    const fileContent = `export const INDIA_MAP_VIEWBOX = "${data.viewBox}";

export interface MapState {
    name: string;
    id: string;
    path: string;
}

export const INDIA_MAP_PATHS: MapState[] = ${JSON.stringify(data.locations, null, 2)};
`;

    fs.writeFileSync(outputPath, fileContent);
    console.log('Successfully generated src/data/india-map-data.ts');
} catch (error) {
    console.error('Error generating map data:', error);
    process.exit(1);
}
