import { HeroSection } from "@/components/hero-section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  Salad,
  Beef,
  Sparkles,
  Clock,
  Star,
  BookOpen,
  ShoppingCart,
} from "lucide-react";

const featuredMeals = [
  {
    name: "Harvest Kale & Quinoa Bowl",
    tags: ["Vegetarian", "Gluten-Free"],
    time: "25 min",
    rating: 4.9,
    color: "from-green-200 via-green-100 to-lime-200",
    slug: "harvest-kale-quinoa-bowl",
  },
  {
    name: "Lemon Herb Grilled Chicken",
    tags: ["High Protein"],
    time: "30 min",
    rating: 4.8,
    color: "from-amber-200 via-yellow-100 to-orange-200",
    slug: "lemon-herb-grilled-chicken",
  },
  {
    name: "Spicy Thai Coconut Curry",
    tags: ["Pescatarian"],
    time: "30 min",
    rating: 4.7,
    color: "from-red-200 via-rose-100 to-pink-200",
    slug: "spicy-thai-coconut-curry",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Pick your meals",
    desc: "Choose from 8+ chef-crafted recipes weekly. Filter by diet, time, or craving.",
  },
  {
    step: "02",
    title: "We deliver fresh",
    desc: "Farm-sourced, pre-portioned ingredients arrive chilled in an insulated box.",
  },
  {
    step: "03",
    title: "Cook & enjoy",
    desc: "Follow our step-by-step guides. Most meals take 25 minutes or less.",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Cookbook feature: How It Works — with cookbook numbers */}
      <section className="border-y border-dashed border-primary/10 bg-gradient-to-b from-primary/[0.02] to-lime-50/10 py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-hand text-lg text-primary">Simple steps</span>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              From our kitchen to yours — in three easy steps.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border-2 border-dashed border-primary/10 bg-white p-6 text-center shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
              >
                <span className="font-hand text-4xl text-primary/30">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured menu / cookbook spread */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="font-hand text-lg text-secondary">
              This week&apos;s harvest
            </span>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Featured Recipes
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Chef-crafted, seasonal, and always delicious.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMeals.map((meal) => (
              <Link
                key={meal.slug}
                href={`/recipes/${meal.slug}`}
                className="group relative overflow-hidden rounded-2xl border-2 border-primary/5 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <div
                  className={`h-44 w-full bg-gradient-to-br ${meal.color}`}
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {meal.rating}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg leading-snug group-hover:text-primary transition-colors">
                    {meal.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {meal.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] font-normal capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View Recipe <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/menu">
                View Full Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Meal planner CTA */}
      <section className="border-y border-dashed border-secondary/10 bg-gradient-to-r from-secondary/5 via-lime-50/20 to-primary/5 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-hand text-lg text-secondary">
              Your way, every week
            </span>
            <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
              Build Your Perfect Box
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Choose your meals, pick your servings, and we&apos;ll handle the
              rest. Free delivery on 3+ meals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/plan">
                  Build Your Box
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/recipes">Browse All Recipes</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-secondary" />
                Skip anytime
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-secondary" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-secondary" />
                Free delivery on 3+
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / cookbook quote */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-dashed border-primary/10 bg-gradient-to-br from-white to-primary/[0.02] p-8 text-center sm:p-12">
            <span className="font-hand text-6xl leading-none text-primary/20">
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-heading text-xl leading-relaxed sm:text-2xl">
              Mesa changed how we eat. The ingredients are so fresh, the recipes
              are foolproof, and we actually look forward to cooking together.
            </blockquote>
            <div className="mt-6">
              <p className="font-medium">— Sarah &amp; Mike</p>
              <p className="text-sm text-muted-foreground">
                Mesa members since 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}