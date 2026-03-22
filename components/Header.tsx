import Link from "next/link"
import SubscribeCTA from "./ui/SubscribeCTA"
import { getSubscriptionStatusFromCookie } from "@/lib/subscription"
import { Suspense } from "react";
import { SubscribeCTASkeleton } from "./skeletons/SubscribeCTASkeleton";

async function SubcribeButtonServer() {
  const isSubscribed = await getSubscriptionStatusFromCookie()
  return <SubscribeCTA subscribed={isSubscribed} />;
}

export async function Header() {

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="border-b border-gray-200">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <svg
                viewBox="0 0 76 65"
                fill="currentColor"
                className="h-5 w-5 text-black"
              >
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
              <span className="text-base font-semibold text-black">
                Vercel Daily
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Home
              </Link>
              <Link
                href="/search"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Search
              </Link>
            </nav>
          </div>
          <Suspense fallback={<SubscribeCTASkeleton />}>
            <SubcribeButtonServer />
          </Suspense>
        </div>
      </div>
    </header>
  )
}