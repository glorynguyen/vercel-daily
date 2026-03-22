import { Lock, BookOpen, Zap, Globe } from "lucide-react";
import SubscribeCTA from "./ui/SubscribeCTA";

export default function Paywall() {
    return (
        <section className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-gradient-to-t from-background to-transparent z-10"
            />

            <div className="relative z-20 rounded-2xl border border-border bg-background shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.45)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

                <div className="px-6 pt-10 pb-10 sm:px-10 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 ring-1 ring-amber-500/20">
                        <Lock className="h-6 w-6 text-amber-500" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
                        Keep reading with a free subscription
                    </h2>

                    <p className="mx-auto max-w-md text-base text-muted-foreground leading-relaxed mb-8">
                        Subscribe to get unlimited access to every article, delivered
                        straight to your feed — no account required.
                    </p>

                    <SubscribeCTA subscribed={false} variant="hero"/>

                    <p className="mt-4 text-xs text-muted-foreground/70">
                        No sign-up · No spam · Cancel anytime
                    </p>
                </div>

                <div className="border-t border-border bg-muted/30 px-6 py-6 sm:px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                        <FeatureItem
                            icon={<BookOpen className="h-4 w-4" />}
                            title="Full articles"
                            desc="Read every piece from start to finish"
                        />
                        <FeatureItem
                            icon={<Zap className="h-4 w-4" />}
                            title="Instant access"
                            desc="No waiting, no verification"
                        />
                        <FeatureItem
                            icon={<Globe className="h-4 w-4" />}
                            title="Works everywhere"
                            desc="Persists across page refreshes"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureItem({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
        </div>
    );
}