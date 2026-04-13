
const fs = require('fs');
const content = fs.readFileSync('e:\\mantrapuja\\mantrapujaAll\\admin-panel\\app\\dashboard\\pujas\\page.tsx', 'utf8');

let divCount = 0;
let braceCount = 0;
let parenCount = 0;

const lines = content.split('\n');
lines.forEach((line, i) => {
    const openingDivs = (line.match(/<div/g) || []).length;
    const closingDivs = (line.match(/<\/div>/g) || []).length;
    divCount += openingDivs - closingDivs;

    const openingBraces = (line.match(/\{/g) || []).length;
    const closingBraces = (line.match(/\}/g) || []).length;
    braceCount += openingBraces - closingBraces;

    const openingParens = (line.match(/\(/g) || []).length;
    const closingParens = (line.match(/\)/g) || []).length;
    parenCount += openingParens - closingParens;

    if (divCount < 0 || braceCount < 0 || parenCount < 0) {
        console.log(`Mismatch at line ${i + 1}: div=${divCount}, brace=${braceCount}, paren=${parenCount}`);
    }
});

console.log(`Final counts: div=${divCount}, brace=${braceCount}, paren=${parenCount}`);
