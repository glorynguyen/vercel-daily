import { Skeleton } from "../ui/Skeleton";

type SubscribeCTASkeletonProps = {
  variant?: "inline" | "hero";
};

export function SubscribeCTASkeleton({ variant = "inline" }: SubscribeCTASkeletonProps) {
  if (variant === "hero") {
    return (
      <Skeleton className="h-11.5 w-55 rounded-full" />
    );
  }

  return (
    <Skeleton className="h-8.5 w-27.5 rounded-full" />
  );
}
