const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inputFile = path.join(__dirname, '../docs/blog_import/mant_mantra_blog.sql');

const posts = [];
const postMeta = {};
const terms = {};
const termTaxonomy = {};
const termRelationships = [];

const readFile = () => {
    try {
        const content = fs.readFileSync(inputFile, 'utf8');
        return content;
    } catch (err) {
        console.error('Error reading file:', err);
        process.exit(1);
    }
};

const parseInsert = (content, tableName) => {
    const regex = new RegExp(`INSERT INTO \`${tableName}\` \\((.*?)\\) VALUES\\s*([\\s\\S]*?);`, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        const columns = match[1].replace(/`/g, '').split(',').map(s => s.trim());
        const valuesString = match[2];

        let currentTuple = [];
        let inQuote = false;
        let currentVal = '';
        let tuples = [];

        for (let i = 0; i < valuesString.length; i++) {
            const char = valuesString[i];

            if (char === '(' && !inQuote) {
                currentTuple = [];
                currentVal = '';
                continue;
            }

            if (char === ')' && !inQuote) {
                if (currentVal.trim()) currentTuple.push(parseValue(currentVal));
                tuples.push(currentTuple);
                continue;
            }

            if (char === "'" && valuesString[i - 1] !== '\\') {
                inQuote = !inQuote;
                currentVal += char;
                continue;
            }

            if (char === ',' && !inQuote) {
                currentTuple.push(parseValue(currentVal));
                currentVal = '';
                continue;
            }

            currentVal += char;
        }

        matches.push({ columns, tuples });
    }
    return matches;
};

const parseValue = (val) => {
    val = val.trim();
    if (val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    } else if (val.toLowerCase() === 'null') {
        return null;
    } else if (!isNaN(val)) {
        return Number(val);
    }
    return val;
};


const process = () => {
    console.log('Reading file...');
    const content = readFile();

    console.log('Parsing wp_mt_posts...');
    const postsInserts = parseInsert(content, 'wp_mt_posts');
    postsInserts.forEach(({ columns, tuples }) => {
        const colMap = columns.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
        tuples.forEach(tuple => {
            const post = {};
            columns.forEach((col, idx) => post[col] = tuple[idx]);
            posts.push(post);
        });
    });

    console.log('Parsing wp_mt_postmeta...');
    const metaInserts = parseInsert(content, 'wp_mt_postmeta');
    metaInserts.forEach(({ columns, tuples }) => {
        const colMap = columns.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
        tuples.forEach(tuple => {
            const postId = tuple[colMap['post_id']];
            const key = tuple[colMap['meta_key']];
            const value = tuple[colMap['meta_value']];
            if (!postMeta[postId]) postMeta[postId] = {};
            postMeta[postId][key] = value;
        });
    });

    console.log('Parsing wp_mt_terms...');
    const termsInserts = parseInsert(content, 'wp_mt_terms');
    termsInserts.forEach(({ columns, tuples }) => {
        const colMap = columns.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
        tuples.forEach(tuple => {
            terms[tuple[colMap['term_id']]] = {
                name: tuple[colMap['name']],
                slug: tuple[colMap['slug']]
            };
        });
    });

    console.log('Parsing wp_mt_term_taxonomy...');
    const taxInserts = parseInsert(content, 'wp_mt_term_taxonomy');
    taxInserts.forEach(({ columns, tuples }) => {
        const colMap = columns.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
        tuples.forEach(tuple => {
            termTaxonomy[tuple[colMap['term_taxonomy_id']]] = {
                term_id: tuple[colMap['term_id']],
                taxonomy: tuple[colMap['taxonomy']]
            };
        });
    });

    console.log('Parsing wp_mt_term_relationships...');
    const relInserts = parseInsert(content, 'wp_mt_term_relationships');
    relInserts.forEach(({ columns, tuples }) => {
        const colMap = columns.reduce((acc, col, idx) => ({ ...acc, [col]: idx }), {});
        tuples.forEach(tuple => {
            termRelationships.push({
                object_id: tuple[colMap['object_id']],
                term_taxonomy_id: tuple[colMap['term_taxonomy_id']]
            });
        });
    });


    console.log('Generating batched migration SQL with Smart Parsing and SEO Enhancement...');

    const blogPosts = posts.filter(p => p.post_type === 'post' && p.post_status === 'publish');

    console.log(`Found ${blogPosts.length} published blog posts.`);

    const BATCH_SIZE = 50;
    let batchIndex = 1;
    let currentBatchSql = `-- Migration Batch ${batchIndex}\n\n`;
    let countInBatch = 0;

    // Helper to sanitize HTML content (remove styles, classes, empty tags)
    const sanitizeHtml = (html) => {
        if (!html) return "";
        return html
            .replace(/style="[^"]*"/gi, '') // Remove styles
            .replace(/class="[^"]*"/gi, '') // Remove classes
            .replace(/<span[^>]*>/gi, '')   // Unwrap spans
            .replace(/<\/span>/gi, '')
            .replace(/<div[^>]*>/gi, '')    // Unwrap divs (careful, but usually okay for WP content)
            .replace(/<\/div>/gi, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')           // Collapse whitespace
            .trim();
    };

    // Helper to deeply clean text for JSON
    const cleanupText = (text) => {
        if (!text) return "";
        return text
            .replace(/<[^>]*>/g, ' ')       // Remove ALL tags
            .replace(/\*\*/g, '')           // Remove markdown bold
            .replace(/\\r/g, ' ')           // Remove literal \r
            .replace(/\\n/g, ' ')           // Remove literal \n
            .replace(/\r/g, ' ')            // Remove carriage returns
            .replace(/\n/g, ' ')            // Remove newlines
            .replace(/&nbsp;/g, ' ')        // Remove non-breaking spaces
            .replace(/\s+/g, ' ')           // Collapse multiple spaces
            .trim();
    };

    // Smart Parser for Blog Content
    const parseBlogContent = (htmlContent) => {
        // Basic cleanup first
        let cleanContent = sanitizeHtml(htmlContent);

        // Structure we want
        const structure = {
            introduction: "",
            sections: [],
            faq: [],
            conclusion: ""
        };

        // 1. Split by Headings (h2, h3, h4)
        const headingRegex = /<(h[2-6])[^>]*>(.*?)<\/\1>/gi;
        const headings = [];
        let match;
        while ((match = headingRegex.exec(cleanContent)) !== null) {
            headings.push({
                tag: match[1],
                text: cleanupText(match[2]), // Plain text heading, cleaned
                index: match.index,
                length: match[0].length
            });
        }

        if (headings.length === 0) {
            // No headings, everything is introduction
            structure.introduction = cleanupText(cleanContent);
            return structure;
        }

        // Introduction is everything before the first heading
        structure.introduction = cleanupText(cleanContent.substring(0, headings[0].index));

        // Process sections
        for (let i = 0; i < headings.length; i++) {
            const current = headings[i];
            const next = headings[i + 1];

            const start = current.index + current.length;
            const end = next ? next.index : cleanContent.length;
            let sectionContent = cleanContent.substring(start, end).trim();

            const headingTextLower = current.text.toLowerCase();

            // Detect Conclusion
            if (headingTextLower.includes('conclusion') || headingTextLower.includes('summary') || headingTextLower.includes('निष्कर्ष')) {
                structure.conclusion = cleanupText(sectionContent);
                continue;
            }

            // Detect FAQ
            if (headingTextLower.includes('faq') || headingTextLower.includes('frequently asked') || headingTextLower.includes('questions')) {
                // Treat as section for now, specific FAQ parsing is hard without robust parser
            }

            // Key Points (ul/ol)
            const keyPoints = [];
            const listRegex = /<ul[^>]*>(.*?)<\/ul>/is;
            const listMatch = listRegex.exec(sectionContent);

            if (listMatch) {
                const listContent = listMatch[1];
                const itemRegex = /<li[^>]*>(.*?)<\/li>/gi;
                let itemMatch;
                while ((itemMatch = itemRegex.exec(listContent)) !== null) {
                    keyPoints.push(cleanupText(itemMatch[1]));
                }

                sectionContent = sectionContent.replace(listMatch[0], '');
            }

            structure.sections.push({
                heading: current.text,
                content: cleanupText(sectionContent),
                key_points: keyPoints
            });
        }

        return structure;
    };

    // SEO Helpers
    const SPIRITUAL_KEYWORDS = [
        "Mantra", "Puja", "Aarti", "Chalisa", "Stotram", "Vrat", "Katha", "Upay", "Totke",
        "Astrology", "Rashifal", "Graha", "Shani", "Rahukalam", "Muhurat", "Vastu",
        "Yoga", "Meditation", "Spirituality", "Hinduism", "God", "Goddess",
        "Shiva", "Vishnu", "Durga", "Lakshmi", "Ganesh", "Hanuman", "Ram", "Krishna",
        "Temple", "Teerth", "Yatra", "Festival", "Diwali", "Holi", "Navratri",
        "Sanatan Dharma", "Vedic", "Rituals", "Bhakti", "Devotion", "Prayers"
    ];

    const generateTags = (title, content, existingTags) => {
        const text = (title + " " + content).toLowerCase();
        const newTags = new Set(existingTags);

        SPIRITUAL_KEYWORDS.forEach(keyword => {
            if (text.includes(keyword.toLowerCase())) {
                newTags.add(keyword);
            }
        });

        // Ensure we have at least some tags
        if (newTags.size === 0) {
            newTags.add("Mantra Puja");
            newTags.add("Hinduism");
        }

        return Array.from(newTags);
    };

    const generateDescription = (intro, excerpt) => {
        // Prefer excerpt if it's substantial
        let desc = excerpt;

        // If excerpt is empty or too short, use intro
        if (!desc || desc.length < 50) {
            desc = intro.replace(/<[^>]*>/g, '').trim();
        }

        // Clean up
        desc = desc.replace(/\s+/g, ' ').trim();

        // Limit to ~160 chars for SEO, but try to keep whole words
        if (desc.length > 160) {
            desc = desc.substring(0, 157).trim();
            const lastSpace = desc.lastIndexOf(' ');
            if (lastSpace > 0) desc = desc.substring(0, lastSpace);
            desc += '...';
        }

        return desc.replace(/'/g, "''");
    };

    for (let i = 0; i < blogPosts.length; i++) {
        const post = blogPosts[i];
        const uuid = crypto.randomUUID();
        const title = post.post_title.replace(/'/g, "''").trim();
        // Decode and normalize the slug for consisteny
        const slug = decodeURIComponent(post.post_name).normalize('NFC');

        // Parse Content
        const rawContent = post.post_content;
        const parsedContent = parseBlogContent(rawContent);

        const contentJson = JSON.stringify(parsedContent).replace(/'/g, "''");

        // Get raw excerpt from WP or generate from intro
        const introText = parsedContent.introduction ? parsedContent.introduction.replace(/<[^>]*>/g, '') : "";
        const rawExcerpt = post.post_excerpt || introText;

        // Generate better SEO Description
        const metaDesc = generateDescription(introText, rawExcerpt);
        const excerpt = metaDesc; // Use the optimized description as the excerpt too for consistency in UI

        // Image
        let imageUrl = '/logo.png'; // Default
        const thumbnailId = postMeta[post.ID] ? postMeta[post.ID]['_thumbnail_id'] : null;
        if (thumbnailId) {
            const attachment = posts.find(p => p.ID == thumbnailId);
            if (attachment && attachment.guid) {
                imageUrl = attachment.guid;
            }
        }

        // Tags
        let postTags = [];
        const rels = termRelationships.filter(r => r.object_id == post.ID);
        rels.forEach(r => {
            const tax = termTaxonomy[r.term_taxonomy_id];
            if (tax && (tax.taxonomy === 'post_tag' || tax.taxonomy === 'category')) {
                const term = terms[tax.term_id];
                if (term) postTags.push(term.name);
            }
        });

        // Enhance Tags
        postTags = generateTags(post.post_title, introText, postTags);

        const tagsArray = postTags.length > 0 ? `ARRAY[${postTags.map(t => `'${t.replace(/'/g, "''")}'`).join(',')}]` : "ARRAY['Mantra Puja', 'Hinduism']";

        const published = 'true';
        const createdAt = post.post_date_gmt ? `'${post.post_date_gmt}'` : 'NOW()';
        const updatedAt = post.post_modified_gmt ? `'${post.post_modified_gmt}'` : 'NOW()';

        const metaTitle = title;
        // metaDesc is already calculated above
        const metaTags = tagsArray;

        currentBatchSql += `INSERT INTO "public"."blogs" ("id", "title", "slug", "excerpt", "content", "image_url", "tags", "author", "published", "created_at", "updated_at", "meta_title", "meta_description", "meta_tags", "is_featured", "author_name", "author_role", "author_avatar") VALUES ('${uuid}', '${title}', '${slug}', '${excerpt}', '${contentJson}', '${imageUrl}', ${tagsArray}, 'Adminmcsdcbhasx', ${published}, ${createdAt}, ${updatedAt}, '${metaTitle}', '${metaDesc}', ${metaTags}, false, 'Mantra Puja Team', 'Editor', '/logo.png')
        ON CONFLICT ("slug") DO UPDATE SET
            "title" = EXCLUDED."title",
            "content" = EXCLUDED."content",
            "excerpt" = EXCLUDED."excerpt",
            "image_url" = EXCLUDED."image_url",
            "tags" = EXCLUDED."tags",
            "meta_title" = EXCLUDED."meta_title",
            "meta_description" = EXCLUDED."meta_description",
            "meta_tags" = EXCLUDED."meta_tags",
            "updated_at" = NOW();\n`;

        countInBatch++;

        // Write batch when it reaches size or it's the last item
        if (countInBatch >= BATCH_SIZE || i === blogPosts.length - 1) {
            const batchFileName = `20240220100000_migrate_blogs_batch_${batchIndex}.sql`;
            const batchOutputPath = path.join(__dirname, `../supabase/migrations/${batchFileName}`);
            fs.writeFileSync(batchOutputPath, currentBatchSql);
            console.log(`Written batch ${batchIndex} to ${batchFileName}`);

            batchIndex++;
            countInBatch = 0;
            currentBatchSql = `-- Migration Batch ${batchIndex}\n\n`;
        }
    }
};

const run = () => {
    try {
        process();
    } catch (e) {
        console.error(e);
    }
}

run();
