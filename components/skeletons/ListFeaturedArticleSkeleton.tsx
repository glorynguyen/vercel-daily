import { ArticleCardSkeleton } from "./ArticleCardSkeleton";

export function ListFeaturedArticleSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}