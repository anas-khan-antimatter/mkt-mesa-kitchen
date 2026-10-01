import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Salad, ArrowRight, Clock, Leaf, ChefHat, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-lime-100/20 to-amber-100/10" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, var(--color-primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--color-secondary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          {/* Left content — spans 3 cols */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-medium text-secondary">
              <Sparkles className="h-3.5 w-3.5" />
              New — Summer Harvest Menu just dropped
            </div>

            <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Real Food.
              <br />
              <span className="text-primary">Real Simple.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Chef-crafted meal kits with farm-fresh ingredients. Skip the
              grocery run and cook something amazing —{" "}
              <span className="font-hand text-primary">delivered weekly.</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/menu">
                  View This Week&apos;s Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/plan">Build Your Box</Link>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Leaf className="h-4 w-4 text-secondary" />
                Farm-fresh
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                Ready in 25 min
              </span>
              <span className="flex items-center gap-1.5">
                <ChefHat className="h-4 w-4 text-primary" />
                Chef-crafted
              </span>
            </div>
          </div>

          {/* Right card — cookbook photograpy layout, spans 2 cols */}
          <div className="hidden lg:col-span-2 lg:block">
            <div className="relative">
              {/* Cookbook-style layout */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 p-6 shadow-xl">
                {/* Cookbook heading */}
                <div className="mb-4 flex items-center justify-between border-b border-dashed border-primary/20 pb-3">
                  <span className="font-hand text-lg text-primary">This Week</span>
                  <span className="rounded-full bg-secondary/15 px-3 py-0.5 font-hand text-xs text-secondary">
                    7 recipes
                  </span>
                </div>

                {/* Recipe cards grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Harvest Bowl", time: "25m", color: "bg-gradient-to-br from-green-200 via-green-100 to-lime-200" },
                    { name: "Lemon Herb Chicken", time: "30m", color: "bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200" },
                    { name: "Thai Coconut Curry", time: "30m", color: "bg-gradient-to-br from-red-200 via-rose-100 to-pink-200" },
                    { name: "Mushroom Risotto", time: "35m", color: "bg-gradient-to-br from-stone-200 via-stone-100 to-amber-200" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="group cursor-pointer rounded-xl border border-primary/10 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                    >
                      <div className={`mb-2 h-14 w-full rounded-lg ${item.color}`} />
                      <p className="text-xs font-medium">{item.name}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom tagline */}
                <div className="mt-4 flex items-center justify-center gap-2 border-t border-dashed border-primary/20 pt-3">
                  <span className="font-hand text-sm text-muted-foreground">
                    Fresh ingredients, zero waste
                  </span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-2 -right-2 -z-10 h-40 w-40 rounded-full bg-secondary/10 blur-2xl" />
              <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}