import { Metadata } from "next";
import { getCategories } from "@/lib/data";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { Suspense } from "react";
import { SearchResultsSkeleton } from "@/components/skeletons";
import { SearchFormSkeleton } from "@/components/skeletons/SearchFormSkeleton";

export const metadata: Metadata = {
  title: "Next News Search Results",
  description: "Find what you are looking for...",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

async function SearchFormServerSide({ searchParams } : { category?: string, searchParams: Promise<{q?: string, category?: string}> }) {
  const { category = "" } = await searchParams;
  const dataCategories = await getCategories();
  const categories = dataCategories.data;
  return <SearchForm categories={categories} category={category}/>
}

export default async function Page({ searchParams }: SearchPageProps) {

  return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Search Articles
        </h1>
        <p className="mt-2 text-neutral-600">
          Find the stories that matter to you.
        </p>
      </div>
      <Suspense fallback={<SearchFormSkeleton />}>
        <SearchFormServerSide searchParams={searchParams}/>
      </Suspense>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams}/>
      </Suspense>
    </div>
}
