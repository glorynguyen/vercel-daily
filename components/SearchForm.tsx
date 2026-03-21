"use client"

import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

export function SearchForm({ categories, category }: { categories: { slug: string; name: string }[], category?: string, initialQuery?: string }) {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') ?? '');
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);
        const selectedCategory = e.target.value;
        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    }

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
        }, 300);
    const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length >= 3 || value.length === 0) {
            handleSearch(value);
        }
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchKeyword = formData.get('q') as string;
        const params = new URLSearchParams(searchParams);

        if (searchKeyword) {
            params.set('q', searchKeyword);
        } else {
            params.delete('q');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
                name="q"
                type="text"
                value={query}
                onChange={handleInputSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
        </div>

        <select
            value={category}
            onChange={(e) => handleCategoryChange(e)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
        >
            <option value="">All Categories</option>
            {categories.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                    {name}
                </option>
            ))}
        </select>

        <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
            Search
        </button>
    </form>
}