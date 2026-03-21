import { Skeleton } from "../ui/Skeleton";


export function ArticleDataSkeleton() {
  return (
    <>
      <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="mb-4">
          <Skeleton className="h-5 w-24" />
        </div>

        <Skeleton className="h-10 sm:h-12 lg:h-14 w-full mb-3" />
        <Skeleton className="h-10 sm:h-12 lg:h-14 w-3/4 mb-6" />

        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-8" />

        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div>
              <Skeleton className="h-4 w-28 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-10">
        <Skeleton className="aspect-2/1 w-full rounded-2xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border-t border-border pt-8">
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    </>
  );
}