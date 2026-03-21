import { getArticles } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ListFeaturedArticleSkeleton } from "./skeletons";
import { formatDate } from "@/lib/utils";

interface Article {
  id: string;
  slug: string;
  category: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

interface FeaturedArticlesProps {
  viewAllHref?: string;
}

async function ListFeaturedArticle() {
  const data = await getArticles({ featured: true });
  const articles = data.data;
  return <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {articles.map((article: Article) => (
      <ArticleCard key={article.id} article={article} />
    ))}
  </div>
}

export default async function FeaturedArticles({
  viewAllHref = "/search",
}: FeaturedArticlesProps) {
  
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-start justify-between sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Featured
            </h2>
            <p className="mt-1 text-neutral-600">
              Handpicked stories from the team.
            </p>
          </div>
          <Link
            href={viewAllHref}
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            View all
          </Link>
        </div>
        <Suspense fallback={<ListFeaturedArticleSkeleton />}>
          <ListFeaturedArticle/>
        </Suspense>
      </div>
    </section>
  );
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
          {article.category}
        </span>
        <span className="text-neutral-300">·</span>
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
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