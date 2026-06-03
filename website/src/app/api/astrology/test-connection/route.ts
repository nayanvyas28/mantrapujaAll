import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const urls = [
        'http://pw4wwo08gowkc0o0gowwkc8g:4000/health',
        'http://pw4wwo08gowkc0o0gowwkc8g:3000/health',
        'http://pw4wwo08gowkc0o0gowwkc8g/health',
        'http://172.17.0.1:4000/health',
        'http://172.17.0.1:3000/health'
    ];

    const results: any = {
        runtime_backend_url: process.env.BACKEND_URL || 'NOT_SET',
        tests: {}
    };

    if (process.env.BACKEND_URL) {
        urls.push(`${process.env.BACKEND_URL}/health`);
        urls.push(`${process.env.BACKEND_URL}/api/health`);
    }

    for (const url of urls) {
        try {
            console.log(`[Diagnostic] Testing fetch to: ${url}`);
            const res = await fetch(url, { 
                method: 'GET',
                signal: AbortSignal.timeout(5000) 
            });
            const text = await res.text();
            results.tests[url] = {
                status: res.status,
                ok: res.ok,
                body: text.substring(0, 200)
            };
        } catch (err: any) {
            results.tests[url] = {
                error: err.message || 'Unknown Error',
                stack: err.stack
            };
        }
    }

    return NextResponse.json(results);
}
