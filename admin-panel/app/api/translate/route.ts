import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text, target = 'hi', source = 'auto' } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // Handle both single string and multiple fields in an object
        if (typeof text === 'object') {
            const results: Record<string, string> = {};
            
            // Sequential translation of fields to avoid hitting web rate limits too hard
            for (const [key, value] of Object.entries(text)) {
                if (value && typeof value === 'string') {
                    results[key] = await translateText(value, target, source);
                }
            }
            
            return NextResponse.json(results);
        }

        const translated = await translateText(text, target, source);
        return NextResponse.json({ translated });
    } catch (error: any) {
        console.error('Translation route error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

async function translateText(query: string, target: string, source: string = 'auto') {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from Google Translate');
    
    const data = await response.json();
    
    // Google Translate returns a nested array of parts
    // [ [ [ "Translated Text", "Original Text", null, null, 1 ] ], ... ]
    let translatedText = '';
    if (data && data[0]) {
        data[0].forEach((part: any) => {
            if (part[0]) translatedText += part[0];
        });
    }
    
    return translatedText || query;
}
