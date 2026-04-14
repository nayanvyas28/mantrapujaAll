const fs = require('fs');
const filePath = 'e:/mantrapuja/mantrapujaAll/admin-panel/app/dashboard/banners/page.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const tags = ['div', 'section', 'form', 'motion', 'AnimatePresence', 'button', 'input', 'select', 'textarea', 'label', 'img', 'span', 'h2', 'h3', 'h4', 'p', 'style'];
const results = {};

tags.forEach(tag => {
    let openCount = 0;
    let closeCount = 0;
    
    const openRegex = tag === 'motion' ? /<motion\./g : new RegExp(`<${tag}(\\s|>)`, 'g');
    const closeRegex = tag === 'motion' ? /<\/motion\.[^>]*>/g : new RegExp(`</${tag}>`, 'g');
    const selfCloseRegex = tag === 'motion' ? /<motion\.[^>]*\/>/g : new RegExp(`<${tag}[^>]*/>`, 'g');
    
    openCount = (content.match(openRegex) || []).length;
    closeCount = (content.match(closeRegex) || []).length;
    const selfCloseCount = (content.match(selfCloseRegex) || []).length;
    
    // Adjust for self-closing
    openCount -= selfCloseCount;
    
    results[tag] = { open: openCount, close: closeCount, diff: openCount - closeCount };
});

// Braces balance
const openBraces = (content.match(/{/g) || []).length;
const closeBraces = (content.match(/}/g) || []).length;
results['braces'] = { open: openBraces, close: closeBraces, diff: openBraces - closeBraces };

// Parentheses balance
const openParens = (content.match(/\(/g) || []).length;
const closeParens = (content.match(/\)/g) || []).length;
results['parens'] = { open: openParens, close: closeParens, diff: openParens - closeParens };

console.log(JSON.stringify(results, null, 2));

// Special handling for self-closing tags in JSX
const naturallySelfClosing = ['input', 'img', 'br', 'hr', 'textarea'];
const unbalanced = Object.keys(results).filter(key => {
    if (naturallySelfClosing.includes(key)) return false; 
    return results[key].diff !== 0;
});

if (unbalanced.length === 0) {
    console.log('SUCCESS: All tags and braces are balanced!');
} else {
    console.log('FAILURE: Unbalanced items found:', unbalanced.join(', '));
    process.exit(1);
}
