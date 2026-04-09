
const { locations } = require('./src/data/spiritual-locations');
const seen = new Set();
const duplicates = [];

locations.forEach(loc => {
    const key = `${loc.name}|${loc.type}`;
    if (seen.has(key)) {
        duplicates.push(loc);
    }
    seen.add(key);
});

if (duplicates.length > 0) {
    console.log('Duplicates found:');
    duplicates.forEach(d => console.log(`${d.id}: ${d.name} (${d.type})`));
} else {
    console.log('No same-name pointers found in same category.');
}
