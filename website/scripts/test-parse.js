const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(process.cwd(), 'docs', 'mant_main (1).sql'), 'utf8');

const regex = /INSERT INTO `tbl_product` \([^)]+\) VALUES\s*([\s\S]*?);/g;
let match = regex.exec(content);

if (match) {
    const rawMatch = match[1];
    const startIndex = rawMatch.indexOf('(') + 1;
    let balance = 1;
    let endIndex = startIndex;
    let inString = false;
    let escape = false;

    for (let i = startIndex; i < rawMatch.length; i++) {
        const char = rawMatch[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === "'") {
            inString = !inString;
            continue;
        }
        if (!inString) {
            if (char === '(') balance++;
            else if (char === ')') {
                balance--;
                if (balance === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
    }

    const firstRowStr = rawMatch.substring(startIndex, endIndex);

    const columnsRegex = /'([^'\\]*(?:\\.[^'\\]*)*)'|([^,]+)/g;
    const columnsArray = [];
    let colMatch;
    
    while ((colMatch = columnsRegex.exec(firstRowStr)) !== null) {
        if (colMatch[0].trim() === ',' || colMatch[0].trim() === '') continue;
        if (colMatch[1] !== undefined) columnsArray.push(colMatch[1]);
        else columnsArray.push(colMatch[2].trim());
    }
    
    const rawTitle = columnsArray[2];
    const rawSlug = columnsArray[3] || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const rawDesc = columnsArray[7] || '';
    const rawPrice = parseFloat(columnsArray[15]) || 0;
    const rawImg = columnsArray[19];
    const images = rawImg && rawImg !== 'NULL' ? [rawImg] : ['/logo.png'];
    const metaTitle = columnsArray[33] || rawTitle;
    const metaDesc = columnsArray[34] || '';

    console.log(JSON.stringify({
        name: rawTitle,
        slug: rawSlug,
        description: rawDesc,
        price: rawPrice,
        content: { html: rawDesc },
        images: images,
        seo_title: metaTitle,
        seo_description: metaDesc,
        is_featured: false,
        is_hero: false,
        havan_samagri: []
    }, null, 2));

}
