import { Skeleton } from "../ui/Skeleton";


export function ArticleCardSkeleton() {
  return (
    <article className="group flex flex-col">
      <div className="relative mb-4 block">
        <Skeleton className="aspect-video rounded-lg border border-neutral-200" />
      </div>
      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
        <span className="text-neutral-300">·</span>
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="mb-2 space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </article>
  );
}