'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="bg-bhagwa hover:bg-bhagwa-dark text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-full transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
