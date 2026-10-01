import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* ── Cookbook cover / hero spread ─────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/8 via-[oklch(0.97_0.015_80)] to-[oklch(0.96_0.018_78)]">
        {/* decorative cookbook-rule top */}
        <div className="cookbook-rule absolute top-0 inset-x-0 h-0.5" />

        <div className="container mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left spread — title page */}
            <div className="flex flex-col gap-6 max-w-xl">
              {/* chapter label */}
              <div className="handwritten inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-5 py-2 text-xs text-primary">
                <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
                Spring Collection · Week&nbsp;2
              </div>

              <h1 className="font-heading text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-terracotta">Mesa</span>
                <br />
                <span className="text-[oklch(0.18_0.025_30)]">
                  Real Food.
                  <br />
                  Real Simple.
                </span>
              </h1>

              <p className="font-serif text-lg italic leading-relaxed text-muted-foreground sm:text-xl">
                Chef-crafted meal kits with farm-fresh ingredients.
                Skip the grocery line and cook something beautiful
                in under 30 minutes.
              </p>

              {/* recipe card meta — like a cookbook headnote */}
              <div className="photo-card flex flex-wrap gap-x-8 gap-y-2 bg-cream/50 p-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-secondary" />
                  Prep&nbsp;15&nbsp;min
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-primary" />
                  Cook&nbsp;25&nbsp;min
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full text-[oklch(0.65_0.16_55)]" />
                  Serves&nbsp;2–4
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/menu">Explore the Menu</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/recipes/spring-harvest-bowl">
                    Recipe of the Week
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right spread — hero photograph area (cookbook full-bleed photo) */}
            <div className="relative">
              <div className="photo-card aspect-[4/5] overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 shadow-xl">
                <div className="flex h-full items-end p-6">
                  <div className="w-full">
                    {/* produce photo mock — colorful grid */}
                    <div className="grid grid-cols-3 gap-4 -mt-12">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)] shadow-sm" />
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.65_0.18_40)] to-[oklch(0.55_0.18_35)] shadow-sm" />
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)] shadow-sm" />
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.75_0.1_90)] to-[oklch(0.65_0.12_80)] shadow-sm" />
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.68_0.16_145)] to-[oklch(0.55_0.14_140)] shadow-sm" />
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-[oklch(0.58_0.2_35)] to-[oklch(0.48_0.18_30)] shadow-sm" />
                    </div>
                    <p className="mt-4 text-xs text-center text-muted-foreground italic handwritten">
                      Farm-fresh, just-picked ingredients
                    </p>
                  </div>
                </div>
              </div>
              {/* page number flourish */}
              <span className="handwritten absolute -bottom-3 right-4 text-[0.5rem] text-primary/50">
                — 2 —
              </span>
            </div>
          </div>
        </div>

        {/* decorative rule bottom */}
        <div className="cookbook-rule absolute bottom-0 inset-x-0 h-0.5" />
      </section>

      {/* ── Table of Contents ────────────────────────────── */}
      <section className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="handwritten text-xs text-primary/60">contents</span>
          <h2 className="font-heading text-3xl mt-2 sm:text-4xl">
            What’s Inside This Week
          </h2>
          <hr className="cookbook-rule mt-4 w-24 mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Weekly Menu",
              desc: "Six chef-designed meals. Pick what you love, skip what you don’t.",
              href: "/menu",
              icon: "🥗",
            },
            {
              title: "Recipe Collection",
              desc: "Step-by-step cooking guides with photography and built-in timers.",
              href: "/recipes/spring-harvest-bowl",
              icon: "📖",
            },
            {
              title: "Build Your Box",
              desc: "Choose meals, pick servings, and see the price update live.",
              href: "/plan",
              icon: "📦",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="photo-card group flex flex-col gap-4 p-6 transition-shadow hover:shadow-lg"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
              <span className="handwritten text-xs text-primary mt-2">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── This Week’s Menu Preview (cookbook spread) ──── */}
      <section className="bg-cream/50 border-t border-border/30">
        <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="handwritten text-xs text-primary/60">
                chapter one
              </span>
              <h2 className="font-heading text-3xl mt-1 sm:text-4xl">
                This Week’s Menu
              </h2>
            </div>
            <Link href="/menu" className="text-sm font-medium text-primary hover:underline handwritten">
              View full menu →
            </Link>
          </div>

          <hr className="cookbook-rule mb-8" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Spring Harvest Bowl",
                tag: "Veggie • 25 min",
                color: "from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)]",
              },
              {
                name: "Tomato Basil Risotto",
                tag: "Vegetarian • 30 min",
                color: "from-[oklch(0.58_0.2_35)] to-[oklch(0.52_0.18_35)]",
              },
              {
                name: "Lemon Herb Chicken",
                tag: "Protein • 20 min",
                color: "from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)]",
              },
              {
                name: "Spicy Thai Curry",
                tag: "Plant-based • 25 min",
                color: "from-[oklch(0.68_0.16_40)] to-[oklch(0.58_0.18_35)]",
              },
              {
                name: "Kale & Quinoa Bowl",
                tag: "Vegan • 15 min",
                color: "from-[oklch(0.78_0.12_145)] to-[oklch(0.68_0.14_140)]",
              },
              {
                name: "Honey Glazed Salmon",
                tag: "Seafood • 20 min",
                color: "from-[oklch(0.65_0.16_55)] to-[oklch(0.55_0.18_45)]",
              },
            ].map((meal) => (
              <Link
                key={meal.name}
                href={`/recipes/${meal.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="photo-card group flex flex-col overflow-hidden rounded-[var(--radius-xl)]"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${meal.color}`}>
                  <div className="flex h-full items-end p-4">
                    <span className="price-badge text-[0.65rem]">
                      $11.99/serv
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold">{meal.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {meal.tag}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works — recipe card steps ─────────────── */}
      <section className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="handwritten text-xs text-primary/60">method</span>
          <h2 className="font-heading text-3xl mt-1 sm:text-4xl">
            How It Works
          </h2>
          <hr className="cookbook-rule mt-4 w-24 mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick Your Meals",
              desc: "Browse our weekly menu and choose the dishes that inspire you. Dietary filters help you find the perfect match.",
            },
            {
              step: "02",
              title: "We Deliver Fresh",
              desc: "Farm-fresh ingredients arrive at your door in a chilled box. Every item is pre-portioned — zero waste.",
            },
            {
              step: "03",
              title: "Cook & Enjoy",
              desc: "Follow along with our step-by-step recipe cards. Most meals are ready in 30 minutes or less.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="recipe-step flex flex-col gap-3 p-6"
            >
              <span className="handwritten text-2xl text-primary/40">
                {item.step}
              </span>
              <h3 className="font-heading text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Farm-fresh ingredients spread ────────────────── */}
      <section className="bg-primary/5 border-t border-border/30">
        <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="photo-card aspect-square max-w-sm mx-auto bg-gradient-to-br from-secondary/20 via-[oklch(0.85_0.02_80)] to-primary/10">
              <div className="flex h-full items-end p-6">
                <div className="grid grid-cols-2 gap-3 w-full -mt-16">
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-[oklch(0.72_0.15_145)] to-[oklch(0.65_0.14_140)]" />
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-[oklch(0.6_0.18_35)] to-[oklch(0.55_0.16_40)]" />
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-[oklch(0.7_0.14_60)] to-[oklch(0.62_0.12_55)]" />
                  <div className="aspect-square rounded-xl bg-gradient-to-tr from-[oklch(0.75_0.1_90)] to-[oklch(0.68_0.12_85)]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="handwritten text-xs text-primary/60">
                from the farm
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl">
                Ingredients You Can Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We source directly from family farms within 200 miles. Every
                ingredient is traceable, seasonal, and handled with care from
                field to box.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {[
                  "Organic produce",
                  "Pasture-raised poultry",
                  "Sustainable seafood",
                  "Small-batch spices",
                  "Artisan pasta",
                  "Cold-pressed oils",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing / plans ──────────────────────────────── */}
      <section className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="handwritten text-xs text-primary/60">
            pricing
          </span>
          <h2 className="font-heading text-3xl mt-1 sm:text-4xl">
            Simple Plans, Fresh Meals
          </h2>
          <hr className="cookbook-rule mt-4 w-24 mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "$49",
              meals: "2 meals / week",
              servings: "2 servings each",
              tag: "Best for couples",
            },
            {
              name: "Family",
              price: "$89",
              meals: "4 meals / week",
              servings: "4 servings each",
              tag: "Most popular",
              popular: true,
            },
            {
              name: "Feast",
              price: "$129",
              meals: "6 meals / week",
              servings: "4 servings each",
              tag: "Best value",
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`photo-card flex flex-col gap-4 p-6 relative ${
                plan.popular ? "ring-2 ring-primary/30" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 handwritten text-[0.6rem] text-primary bg-cream px-3 py-1 rounded-full">
                  ★ popular
                </span>
              )}
              <h3 className="font-heading text-xl font-semibold">
                {plan.name}
              </h3>
              <p className="text-3xl font-semibold font-heading text-primary">
                {plan.price}
                <span className="text-sm text-muted-foreground font-sans">
                  /wk
                </span>
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
                  {plan.meals}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                  {plan.servings}
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  Free delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  Skip or cancel anytime
                </li>
              </ul>
              <p className="handwritten text-xs text-muted-foreground mt-2">
                {plan.tag}
              </p>
              <Button asChild className="w-full">
                <Link href="/plan">Choose {plan.name}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pantry swap teaser ───────────────────────────── */}
      <section className="bg-secondary/5 border-t border-border/30">
        <div className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="handwritten text-xs text-primary/60">
              substitutions
            </span>
            <h2 className="font-heading text-3xl mt-1 sm:text-4xl">
              Pantry Swap
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4 max-w-xl mx-auto">
              Don’t have an ingredient? Not in the mood for kale? Swap any
              item for a fresh alternative — our system finds the perfect
              replacement.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/plan">Try the Swap Tool</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscribe / newsletter — cookbook mailing list ﬂourish ── */}
      <section className="container mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="photo-card max-w-lg mx-auto p-8 text-center">
          <span className="handwritten text-xs text-primary/60">
            stay in touch
          </span>
          <h2 className="font-heading text-3xl mt-1 sm:text-4xl">
            Get Fresh Recipes Every Week
          </h2>
          <p className="text-sm text-muted-foreground mt-3">
            Subscribe for weekly menu previews, cooking tips, and
            seasonal inspiration.
          </p>
          <form
            className="mt-6 flex gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-[var(--radius-md)] border border-border bg-input px-4 py-2.5 text-sm placeholder-muted-foreground"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            No spam — just good food. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}