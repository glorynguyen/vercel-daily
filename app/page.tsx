import Hero from "@/components/Hero";
import FeaturedArticles from "@/components/FeaturedArticles";
import { BreakingNewsBanner } from "@/components/BreakingNewsBanner";
import { Suspense } from "react";
import { BreakingNewsBannerSkeleton } from "@/components/skeletons/BreakingNewsBannerSkeleton";

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<BreakingNewsBannerSkeleton />}><BreakingNewsBanner /></Suspense>
      <FeaturedArticles />
    </>
  );
}
