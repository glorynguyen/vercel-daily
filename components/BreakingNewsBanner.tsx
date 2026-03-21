import { getBreakingNews } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface BreakingNewsData {
  id: string
  headline: string
  summary: string
  articleId: string
  category: string
  publishedAt: string
  urgent: boolean
}

export async function BreakingNewsBanner() {
  const data = await getBreakingNews();
  const breakingNews: BreakingNewsData = data.data;
  const formattedDate = formatDate(breakingNews.publishedAt)

  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <Link
          href={`/articles/${breakingNews.articleId}`}
          className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4 sm:items-center">
            {breakingNews.urgent && (
              <span className="relative flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                Breaking
              </span>
            )}
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-semibold text-neutral-900 group-hover:underline sm:text-lg">
                {breakingNews.headline}
              </h2>
              <p className="line-clamp-1 text-sm text-neutral-600">
                {breakingNews.summary}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 pl-16 sm:pl-0">
            <time
              dateTime={breakingNews.publishedAt}
              className="text-sm text-neutral-500"
            >
              {formattedDate}
            </time>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 group-hover:gap-2 transition-all">
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}