"use client";

import { subscribe, unsubscribe } from "@/lib/actions/subscription";
import { Check, Loader2, Rss, X } from "lucide-react";
import { useActionState, useState } from "react";

export default function SubscribeButton({
  subscribed = false,
}: {
  subscribed?: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const [, subscribeAction, subscribePending] = useActionState(subscribe, undefined);
  const [, unsubscribeAction, unsubscribePending] = useActionState(unsubscribe, undefined);

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