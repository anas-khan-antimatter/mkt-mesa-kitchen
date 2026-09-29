import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Now delivering in your area
            </div>
            <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Real Food.
              <br />
              <span className="text-primary">Real Simple.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
              Chef-crafted meal kits with farm-fresh ingredients. Skip the
              grocery run and cook something amazing in under 30 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#pricing">Pick Your Plan</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Free delivery
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Skip anytime
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Cancel anytime
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10">
              <div className="flex h-full items-center justify-center p-8 text-center">
                <div className="space-y-4">
                  <div className="mx-auto grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                      <div className="mb-1 h-16 w-full rounded-lg bg-gradient-to-br from-green-200 to-green-300" />
                      <p className="text-xs font-medium">Kale & Quinoa</p>
                    </div>
                    <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                      <div className="mb-1 h-16 w-full rounded-lg bg-gradient-to-br from-orange-200 to-red-300" />
                      <p className="text-xs font-medium">Harvest Bowl</p>
                    </div>
                    <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                      <div className="mb-1 h-16 w-full rounded-lg bg-gradient-to-br from-yellow-200 to-amber-300" />
                      <p className="text-xs font-medium">Lemon Herb Chicken</p>
                    </div>
                    <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                      <div className="mb-1 h-16 w-full rounded-lg bg-gradient-to-br from-red-200 to-rose-300" />
                      <p className="text-xs font-medium">Spicy Thai Curry</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Fresh ingredients • Ready in 25 min
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}