import Link from "next/link"

export function Header() {
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

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-black"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}