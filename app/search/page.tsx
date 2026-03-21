import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Next News Search Results',
  description: 'Find what you are looking for...',
}

export default async function Page() {
    return <div>This is the search page</div>
}