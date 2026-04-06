import fs from 'fs';

const sqlContent = fs.readFileSync('docs/mant_main (1).sql', 'utf8');
const allInsertBlocks: string[] = [];
let currentIndex = 0;
while (true) {
  const startIndex = sqlContent.indexOf('INSERT INTO `tbl_product`', currentIndex);
  if (startIndex === -1) break;

  let endIndex = startIndex;
  let inQuotes = false;
  let found = false;
  while (endIndex < sqlContent.length) {
    let char = sqlContent[endIndex];
    if (char === "'") {
      if (endIndex === 0 || sqlContent[endIndex - 1] !== '\\') {
        inQuotes = !inQuotes;
      }
    } else if (char === ';' && !inQuotes) {
      found = true;
      break;
    }
    endIndex++;
  }

  if (!found) break;

  allInsertBlocks.push(sqlContent.substring(startIndex, endIndex));
  currentIndex = endIndex + 1;
}

let numericSlugs = 0;
for (const insertBlock of allInsertBlocks) {
  const valuesIndex = insertBlock.indexOf('VALUES');
  const valuesBlock = insertBlock.substring(valuesIndex + 6).trim();

  const rows = valuesBlock.split(/\),\s*\(/);

  for (let i = 0; i < rows.length; i++) {
    let rowStr = rows[i] || '';
    if (i === 0) rowStr = rowStr.replace(/^\s*\(/, '');
    if (i === rows.length - 1) rowStr = rowStr.replace(/\)\s*$/, '');

    const columnsArray: string[] = [];
    let currentVal = '';
    let insideQuotes = false;

    for (let j = 0; j < rowStr.length; j++) {
      const char = rowStr[j];
      if (char === "'") {
        if (j > 0 && rowStr[j - 1] === '\\') {
          currentVal += char;
        } else if (j + 1 < rowStr.length && rowStr[j + 1] === "'") {
          currentVal += char;
          j++;
          currentVal += "'";
        } else {
          insideQuotes = !insideQuotes;
          currentVal += char;
        }
      } else if (char === ',' && !insideQuotes) {
        columnsArray.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    columnsArray.push(currentVal.trim());

    if (columnsArray.length < 35) continue;

    const pStatus = columnsArray[35];
    if (pStatus !== "'1'" && pStatus !== '1') continue;

    const rawTitle = columnsArray[2] ? columnsArray[2].replace(/^'|'$/g, '').trim() : '';
    const rawSlug = columnsArray[3] ? columnsArray[3].replace(/^'|'$/g, '').trim() : '';
    if (/^\d+$/.test(rawSlug)) {
       console.log(`Title: ${rawTitle}, Slug: ${rawSlug}`);
       numericSlugs++;
    }
  }
}
console.log(`Found ${numericSlugs} poojas with numeric slugs.`);
