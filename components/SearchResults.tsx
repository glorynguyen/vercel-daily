import { searchArticles } from "@/lib/data";
import { formatCategory, formatDate } from "@/lib/utils";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Article {
    id: string;
    slug: string;
    category: string;
    publishedAt: string;
    title: string;
    excerpt: string;
    image: string;
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <article className="group flex flex-col">
            <Link href={`/articles/${article.slug}`} className="relative mb-4 block">
                <div className="aspect-16/10 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-medium uppercase tracking-wide">
                    {formatCategory(article.category)}
                </span>
                <span className="text-neutral-300">&middot;</span>
                <time dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                </time>
            </div>

            <h3 className="mb-2 text-lg font-semibold leading-snug text-neutral-900">
                <Link
                    href={`/articles/${article.slug}`}
                    className="underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-900"
                >
                    {article.title}
                </Link>
            </h3>

            <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
                {article.excerpt}
            </p>
        </article>
    );
}
export async function SearchResults({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
    const { q, category = "" } = await searchParams;
    const data = await searchArticles({ category, query: q, limit: 5 });
    const articles: Article[] = data.data;
    return articles.length > 0 ?
        <div>
            <p className="mb-6 text-sm text-neutral-500">
                {articles.length} result{articles.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div> : <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="mb-4 h-12 w-12 text-neutral-300" />
            <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                No results found
            </h3>
            <p className="max-w-md text-sm text-neutral-500">
                We couldn&apos;t find any articles matching your search. Try
                adjusting your query or changing the category filter.
            </p>
        </div>
}