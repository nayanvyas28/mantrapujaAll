import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { url, body, method = 'POST' } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'Target URL is required' }, { status: 400 });
        }

        // Use environment variable with fallback to the known dev key
        const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro';
        
        console.log(`[PROXY] Forwarding ${method} to ${url}`);
        
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Only add Supabase headers if it looks like a Supabase domain or if we are explicitly using it
        // However, Kong often protects the entire domain (s1.mantrapuja.com)
        headers['apikey'] = SERVICE_ROLE_KEY;
        headers['Authorization'] = `Bearer ${SERVICE_ROLE_KEY}`;

        console.log(`[PROXY DIAG] Headers:`, Object.keys(headers).join(', '));

        let response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        // 401 Troubleshooting: Try WITHOUT Supabase headers if the server rejects them
        // Some custom backends get confused by 'apikey' and 'Authorization' if they aren't standard Supabase Kong
        if (response.status === 401) {
            console.warn(`[PROXY DIAG] Initial request failed with 401. Retrying WITHOUT Supabase headers...`);
            response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error(`[PROXY ERROR] Final status ${response.status}:`, data);
            
            // Log response headers for origin identification
            const originServer = response.headers.get('server') || 'unknown';
            const wwwAuthenticate = response.headers.get('www-authenticate') || 'none';
            console.log(`[PROXY DIAG] Target Server: ${originServer}, Auth-Challenge: ${wwwAuthenticate}`);

            return NextResponse.json({
                ...data,
                _diag: {
                    server: originServer,
                    challenge: wwwAuthenticate,
                    status: response.status
                }
            }, { status: response.status });
        }

        console.log(`[PROXY SUCCESS] 200 OK from ${url}`);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[PROXY CRITICAL ERROR]:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
