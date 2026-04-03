'use client';

// global-error must include html and body tags
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-gray-50 text-gray-900 flex items-center justify-center min-h-screen">
                <div className="text-center p-8 max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
                    <p className="mb-6 text-gray-600">Something went wrong globally.</p>
                    <button
                        onClick={() => reset()}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
