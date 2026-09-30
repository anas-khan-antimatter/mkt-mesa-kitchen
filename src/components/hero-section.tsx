import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative produce elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-primary/30" />
        <div className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-accent/30" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-28 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Now delivering in your area
            </div>
            <h1 className="font-heading text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Real Food.
              <br />
              <span className="text-primary">Real Simple.</span>
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg leading-relaxed">
              Chef-crafted meal kits with farm-fresh ingredients. Skip the
              grocery run and cook something amazing in under 30 minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md" asChild>
                <Link href="/box-builder">Build Your Box</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary/20 text-foreground hover:bg-primary/5" asChild>
                <Link href="/menu">View Weekly Menu</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Free delivery
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Skip anytime
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Produce hero visual — cookbook-style photo grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-red-200 to-rose-300 aspect-[4/3] shadow-lg">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlYTVhNDgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNjYzJjMjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIgLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iI2ZmNjU0MyIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMTUwIiByPSIzMCIgZmlsbD0iI2ZmNGE0YSIgb3BhY2l0eT0iMC4yIi8+PGVsbGlwc2UgY3g9IjMwMCIgY3k9IjUwIiByeD0iNTAiIHJ5PSIzMCIgZmlsbD0iI2ZmNzg0MyIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-cover bg-center" />
                </div>
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-green-200 to-emerald-300 aspect-square shadow-lg">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0YWI4NjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyZTdleDQwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZykiIC8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI2MCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] bg-cover bg-center" />
                </div>
              </div>
              <div className="space-y-3 pt-8">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-amber-200 to-orange-300 aspect-square shadow-lg">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmI3NDMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjljMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIgLz48cG9seWdvbiBwb2ludHM9IjE1MCw2MCAyMDAsMjUwIDEwMCwyNTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=')] bg-cover bg-center" />
                </div>
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-rose-200 to-red-300 aspect-[4/3] shadow-lg">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNlYTVhNDgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNjYzJjMjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIgLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iI2ZmNjU0MyIgb3BhY2l0eT0iMC4zIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMTUwIiByPSIzMCIgZmlsbD0iI2ZmNGE0YSIgb3BhY2l0eT0iMC4yIi8+PGVsbGlwc2UgY3g9IjMwMCIgY3k9IjUwIiByeD0iNTAiIHJ5PSIzMCIgZmlsbD0iI2ZmNzg0MyIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] bg-cover bg-center" />
                </div>
              </div>
            </div>
            {/* Cookbook-style label */}
            <div className="absolute -bottom-3 -right-3 rounded-lg bg-white px-4 py-2 shadow-lg ring-1 ring-border/40">
              <p className="font-heading text-sm text-primary">Ready in 25 min</p>
              <p className="text-[10px] text-muted-foreground">Farm-to-table freshness</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}