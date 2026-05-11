"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    limit: number;
}

export default function BlogPagination({ currentPage, totalCount, limit }: PaginationProps) {
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalCount / limit);
    if (totalPages <= 1) return null;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `/blog?${params.toString()}`;
    };

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return (
        <nav className="flex items-center justify-center gap-4 mt-20" aria-label="Blog pagination">
            {prevPage ? (
                <Link 
                    href={createPageURL(prevPage)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-saffron/50 transition-all text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Link>
            ) : (
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/5 opacity-30 text-sm font-bold cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </div>
            )}

            <div className="text-sm font-black text-saffron uppercase tracking-widest">
                Page {currentPage} of {totalPages}
            </div>

            {nextPage ? (
                <Link 
                    href={createPageURL(nextPage)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-saffron/50 transition-all text-sm font-bold"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Link>
            ) : (
                <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/5 opacity-30 text-sm font-bold cursor-not-allowed">
                    Next
                    <ChevronRight className="w-4 h-4" />
                </div>
            )}
        </nav>
    );
}
