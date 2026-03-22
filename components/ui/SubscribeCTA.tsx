"use client";

import { subscribe, unsubscribe } from "@/lib/actions/subscription";
import { ArrowRight, Check, Loader2, Rss, Sparkles, X } from "lucide-react";
import { useActionState, useState } from "react";

type SubscribeCTAProps = {
  variant?: "inline" | "hero";
  subscribed?: boolean;
};

export default function SubscribeCTA({
  variant = "inline",
  subscribed = false,
}: SubscribeCTAProps) {
  const [hovering, setHovering] = useState(false);
  const [, subscribeAction, subscribePending] = useActionState(subscribe, undefined);
  const [, unsubscribeAction, unsubscribePending] = useActionState(unsubscribe, undefined);

  if (variant === "hero") {
    return (
      <form action={subscribeAction}>
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
    );
  }

  if (!subscribed) {
    return (
      <form action={subscribeAction}>
        <button
          type="submit"
          disabled={subscribePending}
          className="group inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 transition-all duration-200 hover:bg-amber-500/20 hover:border-amber-500/50 hover:shadow-sm active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {subscribePending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Rss className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
          )}
          {subscribePending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    );
  }

  return (
    <form action={unsubscribeAction}>
      <button
        type="submit"
        disabled={unsubscribePending}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          unsubscribePending
            ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            : hovering
              ? "border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
              : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {unsubscribePending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Unsubscribing...
          </>
        ) : hovering ? (
          <>
            <X className="h-3.5 w-3.5" />
            Unsubscribe
          </>
        ) : (
          <>
            <Check className="h-3.5 w-3.5" />
            Subscribed
          </>
        )}
      </button>
    </form>
  );
}