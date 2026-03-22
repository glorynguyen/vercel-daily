import ArticleContent from "@/components/ArticleContent";
import Paywall from "@/components/Paywall";
import { ArticleDataSkeleton } from "@/components/skeletons";
import SubscribeButton from "@/components/ui/SubscribeCTA";
import TrendingArticles from "@/components/TrendingArticles";
import { getArticle } from "@/lib/data";
import { getSubscriptionStatusFromCookie } from "@/lib/subscription";
import { formatDate, formatCategory } from "@/lib/utils";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ param: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { param } = await params;
  const data = await getArticle(param);
  const article = data.data;

  return {
    title: `${article.title} | Vercel Daily | Vincent`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

async function ArticleData({ params }: { params: Promise<{ param: string }> }) {
  const { param } = await params;
  const data = await getArticle(param);
  const isSubscribed = await getSubscriptionStatusFromCookie();
  const article = data.data;
  return <><header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
    <div className="mb-4">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
        {formatCategory(article.category)}
      </span>
    </div>

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance mb-6">
      {article.title}
    </h1>

    <p className="text-lg sm:text-xl text-neutral-500 leading-relaxed mb-8">
      {article.excerpt}
    </p>

    <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-neutral-200">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-900">
            {article.author.name}
          </p>
          <p className="text-xs text-neutral-500">Author</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <Calendar className="h-4 w-4" />
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </div>

      {article.tags.length > 0 && (
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-neutral-400" />
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </header>

    {article.image && (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative aspect-2/1 w-full overflow-hidden rounded-2xl border border-neutral-200">
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

    {isSubscribed ? <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
      <ArticleContent blocks={article.content} />
    </div> :
      <div className="relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-0">
          <ArticleContent blocks={article.content.slice(0, 1)} />
        </div>
        <Paywall />
      </div>}

    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="flex items-center justify-between border-t border-neutral-200 pt-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
        <SubscribeButton subscribed={isSubscribed} />
      </div>
    </div>
  </>
}

export default async function Page({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </div>
      <Suspense fallback={<ArticleDataSkeleton />}>
        <ArticleData params={params} />
      </Suspense>
      <Suspense>
        <TrendingArticles />
      </Suspense>
    </main>
  );
}