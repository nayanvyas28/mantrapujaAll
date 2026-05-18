import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    const proto = request.headers.get('x-forwarded-proto') || 'https';

    // 1. Skip proxy for localhost or local network testing IPs
    if (
        host.includes('localhost') || 
        host.includes('127.0.0.1') || 
        host.startsWith('10.') || 
        host.startsWith('192.168.')
    ) {
        return NextResponse.next();
    }

    const targetHost = 'mantrapuja.com';

    // 2. Determine if redirection is required
    const needsHostRedirect = host !== targetHost;
    const needsProtoRedirect = proto === 'http';

    if (needsHostRedirect || needsProtoRedirect) {
        // Construct the clean normalized URL preserving pathname and search queries
        const destination = `https://${targetHost}${url.pathname}${url.search}`;
        
        return NextResponse.redirect(destination, 301);
    }

    return NextResponse.next();
}

// Optimized matcher to run only on user-facing page requests, avoiding static files or internal assets
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api (API routes)
         * - file extensions (png, xml, txt, ico, webp, svg, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:png|jpg|jpeg|gif|svg|webp|xml|txt|ico|webmanifest)).*)',
    ],
};
