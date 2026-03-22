"use client"

import { subscribe } from "@/lib/actions/subscription";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useActionState } from "react";

export function SubcribeOnlyButton() {
    const [, subscribeAction, subscribePending] = useActionState(subscribe, undefined);
    return <form action={subscribeAction}>
        <button
            type="submit"
            disabled={subscribePending}
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {subscribePending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
            )}
            {subscribePending ? "Subscribing..." : "Subscribe — it\u2019s free"}
            {!subscribePending && (
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
        </button>
    </form>
}