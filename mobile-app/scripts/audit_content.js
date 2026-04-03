const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const SUPABASE_URL = 'https://s1.mantrapuja.com';
const SUPABASE_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- RED FLAG KEYWORDS ---
const RED_FLAGS = [
    '100%', 'Guaranteed', 'Guarantee', 'Sure', 'Confirm', 'Fixed', 
    'Miracle', 'Instantly', 'Immediate', 'Magic',
    'Cure', 'Heal', 'Disease', 'Illness', 'Medicine',
    'Jackpot', 'Wealth', 'Rich', 'Lotto', 'Gambling',
    'पक्का', 'निश्चित', 'चमत्कार', 'तुरंत', 'इलाज', 'बीमारी', 'अमीर', 'धन'
];

const PLACEHOLDERS = [
    'Lorem Ipsum', 'TBD', 'Coming Soon', 'Test', 'Dummy', 'Placeholder'
];

// --- AUDIT LOGIC ---
const auditResults = {
    tables: {},
    hardcoded: [],
    summary: { totalFlags: 0, highRiskItems: 0 }
};

function checkContent(text, source) {
    if (!text || typeof text !== 'string') return [];
    const flags = [];
    const lowerText = text.toLowerCase();
    
    RED_FLAGS.forEach(flag => {
        if (lowerText.includes(flag.toLowerCase())) {
            flags.push({ type: 'Red Flag', keyword: flag, severity: 'High' });
        }
    });

    PLACEHOLDERS.forEach(placeholder => {
        if (lowerText.includes(placeholder.toLowerCase())) {
            flags.push({ type: 'Placeholder', keyword: placeholder, severity: 'Medium' });
        }
    });

    return flags;
}

async function auditTable(tableName, columns) {
    console.log(`Auditing table: ${tableName}...`);
    const { data, error } = await supabase.from(tableName).select('*');
    
    if (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
        return;
    }

    const tableIssues = [];
    data.forEach(row => {
        let rowIssues = [];
        columns.forEach(col => {
            const content = row[col];
            const flags = checkContent(content, `${tableName}.${col}`);
            if (flags.length > 0) {
                rowIssues.push({ column: col, content: content.substring(0, 50) + '...', flags });
            }
        });

        if (rowIssues.length > 0) {
            tableIssues.push({ id: row.id, name: row.name || row.title || 'Unknown', issues: rowIssues });
        }
    });

    auditResults.tables[tableName] = tableIssues;
    auditResults.summary.totalFlags += tableIssues.length;
}

async function auditHardcoded() {
    console.log('Auditing hardcoded banners in app/(tabs)/index.tsx...');
    try {
        const indexPath = path.join(__dirname, '../app/(tabs)/index.tsx');
        const content = fs.readFileSync(indexPath, 'utf8');
        
        // Very basic regex to find titles and subtitles in BANNERS
        const bannerRegex = /title:\s*"(.*?)",\s*subtitle:\s*"(.*?)"/g;
        let match;
        while ((match = bannerRegex.exec(content)) !== null) {
            const [_, title, subtitle] = match;
            const titleFlags = checkContent(title, 'Hardcoded Banner Title');
            const subFlags = checkContent(subtitle, 'Hardcoded Banner Subtitle');
            
            if (titleFlags.length > 0 || subFlags.length > 0) {
                auditResults.hardcoded.push({
                    item: title,
                    issues: [...titleFlags, ...subFlags]
                });
                auditResults.summary.totalFlags++;
            }
        }
    } catch (err) {
        console.error('Error reading index.tsx:', err.message);
    }
}

async function runAudit() {
    console.log('Starting Google Play Store Content Audit...\n');

    // await auditTable('blogs', ['title', 'excerpt', 'content', 'meta_description']); // Bloas are hidden now
    await auditTable('products_99', ['name', 'description']);
    await auditTable('poojas', ['name', 'description', 'benefits', 'tagline', 'about_description']);
    await auditTable('destinations', ['name', 'description', 'tagline']);
    await auditTable('festivals', ['name', 'significance', 'description']);
    await auditTable('daily_astro_notif', ['content']);
    // await auditHardcoded(); // Handled manually in sanitizer

    // Generate Detailed Tabular Report (Markdown)
    let reportMd = `# Detailed Content Audit Report - Play Store Compliance\n\n`;
    reportMd += `**Generated At**: ${new Date().toISOString()}\n`;
    reportMd += `**Total Issues Found**: ${auditResults.summary.totalFlags}\n\n`;

    // Generate CSV Report
    let reportCsv = `Table,Record Name,Column,Database Word,Fixed Display Word,Severity,Play Store Risk\n`;

    if (auditResults.summary.totalFlags === 0) {
        reportMd += `> [!SUCCESS]\n> No immediate policy violations found.\n`;
    } else {
        reportMd += `| Table | Record (ID/Name) | Column | Database Word | Fixed Display Word | Severity | Play Store Risk |\n`;
        reportMd += `| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n`;

        // Helper to add to both
        const addRow = (table, record, col, word, sev, risk) => {
            // Replicate the SAFE_REPLACEMENTS for the report
            const SAFE_REPLACEMENTS = [
                { regex: /100%/gi, replacement: 'traditionally' },
                { regex: /Guaranteed/gi, replacement: 'traditionally believed' },
                { regex: /Guarantee/gi, replacement: 'belief' },
                { regex: /Fixed/gi, replacement: 'Sacred' },
                { regex: /Sure!/gi, replacement: 'Auspiciously,' },
                { regex: /Sure/gi, replacement: 'Sacred' },
                { regex: /Cure/gi, replacement: 'Balance' },
                { regex: /Heal/gi, replacement: 'Peace' },
                { regex: /Medicine/gi, replacement: 'Spiritual Practice' },
                { regex: /Illness/gi, replacement: 'Imbalance' },
                { regex: /Disease/gi, replacement: 'Energy Blockage' },
                { regex: /Wealth/gi, replacement: 'Prosperity' },
                { regex: /Rich/gi, replacement: 'Abundance' },
                { regex: /Jackpot/gi, replacement: 'Success' },
                { regex: /Gambling/gi, replacement: 'Chance' },
                { regex: /Miracle/gi, replacement: 'Blessing' },
                { regex: /Magic/gi, replacement: 'Divine Energy' },
                { regex: /Instantly/gi, replacement: 'Sacredly' },
                { regex: /पक्का/gi, replacement: 'मान्यता है' },
                { regex: /निश्चित/gi, replacement: 'शुभ' },
                { regex: /चमत्कार/gi, replacement: 'आशीर्वाद' },
                { regex: /तुरंत/gi, replacement: 'पवित्र' },
                { regex: /इलाज/gi, replacement: 'शांति' },
                { regex: /बीमारी/gi, replacement: 'असंतुलन' },
                { regex: /अमीर/gi, replacement: 'सौभाग्यशाली' },
                { regex: /धन/gi, replacement: 'समृद्धि' }
            ];
            
            let fixedWord = word;
            SAFE_REPLACEMENTS.forEach(pair => { fixedWord = fixedWord.replace(pair.regex, pair.replacement); });

            const escapeMd = (txt) => (txt || '').toString().replace(/\|/g, '\\|').replace(/\n/g, ' ');
            const escapeCsv = (txt) => `"${(txt || '').toString().replace(/"/g, '""').replace(/\n/g, ' ')}"`;
            
            reportMd += `| ${escapeMd(table)} | ${escapeMd(record)} | ${escapeMd(col)} | ${escapeMd(word)} | **${escapeMd(fixedWord)}** | ${escapeMd(sev)} | ${escapeMd(risk)} |\n`;
            reportCsv += `${escapeCsv(table)},${escapeCsv(record)},${escapeCsv(col)},${escapeCsv(word)},${escapeCsv(fixedWord)},${escapeCsv(sev)},${escapeCsv(risk)}\n`;
        };

        // 1. Hardcoded
        auditResults.hardcoded.forEach(item => {
            item.issues.forEach(issue => {
                addRow('index.tsx', item.item, 'Banner', issue.keyword, issue.severity, 'Misleading Claims');
            });
        });

        // 2. Database Tables
        for (const [table, issues] of Object.entries(auditResults.tables)) {
            issues.forEach(record => {
                record.issues.forEach(issueCol => {
                    issueCol.flags.forEach(flag => {
                        const risk = flag.type === 'Placeholder' ? 'Minimum Functionality' : 'Misleading/Medical claim';
                        const recordName = record.name || record.title || record.id || 'Unknown';
                        addRow(table, recordName, issueCol.column, flag.keyword, flag.severity, risk);
                    });
                });
            });
        }
    }

    const mdPath = path.join(__dirname, '../scripts/Detailed_Audit_Report.md');
    const csvPath = path.join(__dirname, '../scripts/Detailed_Audit_Report.csv');
    
    fs.writeFileSync(mdPath, reportMd);
    fs.writeFileSync(csvPath, reportCsv);
    
    console.log(`\nTabular Audit complete!`);
    console.log(`Markdown Report: ${mdPath}`);
    console.log(`CSV Report: ${csvPath}`);
}

runAudit();
