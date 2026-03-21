import ArticleContent from "@/components/ArticleContent";
import { getArticle } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, BadgeCheck, BadgeInfo, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function formatCategory(category: string) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function ArticleData({ params }: { params: { param: string }} ) {
    const param = await params;
    const data = await getArticle(param.param);
    const article = data.data;
    return <><header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="mb-4">
          <BadgeInfo className="text-xs font-medium">
            {formatCategory(article.category)}
          </BadgeInfo>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance mb-6">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {article.author.name}
              </p>
              <p className="text-xs text-muted-foreground">Author</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>

          {article.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <BadgeCheck key={tag} className="text-xs">
                    {tag}
                  </BadgeCheck>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {article.image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <ArticleContent blocks={article.content} />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-t border-border pt-8">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
        </div>
      </div>
      </>
}

export default async function Page({ params }: { params: { param: string }} ) {
    return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>
      <Suspense>
        <ArticleData params={params}/>
      </Suspense>
    </main>
  );
}