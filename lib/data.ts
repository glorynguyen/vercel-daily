import { cacheLife, cacheTag } from "next/cache"

const API_BASE_URL = process.env.API_BASE_URL;
const X_VERCEL_PROTECTION_BYPASS = process.env.X_VERCEL_PROTECTION_BYPASS ?? "";

type ArticleQueryParams = {
    featured?: boolean;
    trending?: boolean;
}

const requestInit: RequestInit = {
    headers: {
        "x-vercel-protection-bypass": X_VERCEL_PROTECTION_BYPASS,
    },
};

export async function getArticles({ featured, trending }: ArticleQueryParams = {}) {
    "use cache"
    cacheLife("days");
    cacheTag("articles-list")
    const params = new URLSearchParams();
    if (featured) {
        params.append("featured", "true");
    }
    if (trending) {
        params.append("trending", "true");
    }
    const res = await fetch(`${API_BASE_URL}/articles?${params}`, requestInit);
    if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
    }
    return await res.json();
}

export async function getArticle(id: string) {
    "use cache"
    cacheLife("hours");
    cacheTag(`article-${id}`)
    if (!id) {
        return null;
    }
    const res = await fetch(`${API_BASE_URL}/articles/${id}`, requestInit);
    if (!res.ok) {
        throw new Error(`Failed to fetch article with id: ${id}; Response status: ${res.status}`);
    }
    return await res.json();
}
