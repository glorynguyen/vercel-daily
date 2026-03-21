import { Skeleton } from "../ui/Skeleton"

function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="relative mb-4">
        <Skeleton className="aspect-16/10 rounded-lg" />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-2 h-6 w-3/4" />

      <Skeleton className="h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-5/6" />
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-4 w-24" />

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}