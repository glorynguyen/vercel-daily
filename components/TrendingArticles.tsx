import { getArticles } from "@/lib/data";
import { formatCategory } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TrendingArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  publishedAt: string;
}

export default async function TrendingArticles() {
  const data = await getArticles({trending: true});
  const articles: TrendingArticle[] = data.data;

  if (articles.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">
          Trending Articles
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
          >
            {article.image && (
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <span className="mb-2 inline-block text-xs font-medium text-primary">
              {formatCategory(article.category)}
            </span>

            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {article.title}
            </h3>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}