import { Skeleton } from "../ui/Skeleton";

export function BreakingNewsBannerSkeleton() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 sm:items-center">
            <Skeleton className="h-6 w-20 shrink-0 rounded-full" />

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-64 sm:h-6 sm:w-80" />
              <Skeleton className="h-4 w-48 sm:w-96" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 pl-16 sm:pl-0">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </section>
  )
}