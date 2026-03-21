import { Skeleton } from "../ui/Skeleton";

export function SearchFormSkeleton() {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row">
      <Skeleton className="h-10.5 flex-1 rounded-lg" />
      <Skeleton className="h-10.5 w-full rounded-lg sm:w-40" />
      <Skeleton className="h-10.5 w-full rounded-lg sm:w-24" />
    </div>
  )
}