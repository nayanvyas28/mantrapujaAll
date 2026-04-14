const fs = require('fs');
const path = require('path');

const filePath = 'e:/mantrapuja/mantrapujaAll/admin-panel/app/dashboard/banners/page.tsx';
const content = fs.readFileSync(filePath, 'utf8').split('\n');

// Lines to remove (1-indexed): 538 and 585
// 0-indexed: 537 and 584
const newContent = content.filter((_, index) => index !== 537 && index !== 584);

fs.writeFileSync(filePath, newContent.join('\n'), 'utf8');
console.log('Successfully removed lines 538 and 585.');
