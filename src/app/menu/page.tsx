"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { weeklyMeals } from "@/lib/meals";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Salad,
  Beef,
  Fish,
  Wheat,
  Flame,
  Heart,
  Clock,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const dietaryFilters = [
  { id: "all", label: "All Meals", icon: Sparkles },
  { id: "vegetarian", label: "Vegetarian", icon: Salad },
  { id: "vegan", label: "Vegan", icon: Heart },
  { id: "protein", label: "High Protein", icon: Beef },
  { id: "pescatarian", label: "Pescatarian", icon: Fish },
  { id: "gluten-free", label: "Gluten-Free", icon: Wheat },
  { id: "low-cal", label: "Low Calorie", icon: Flame },
];

const priceRanges = [
  { id: "all", label: "Any Price" },
  { id: "under12", label: "Under $12" },
  { id: "12to14", label: "$12 – $14" },
  { id: "over14", label: "Over $14" },
] as const;

export default function MenuPage() {
  const [activeDiet, setActiveDiet] = useState("all");
  const [activePrice, setActivePrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return weeklyMeals.filter((meal) => {
      const dietMatch = activeDiet === "all" || meal.tags.includes(activeDiet);
      let priceMatch = true;
      if (activePrice === "under12") priceMatch = meal.price < 12;
      else if (activePrice === "12to14") priceMatch = meal.price >= 12 && meal.price <= 14;
      else if (activePrice === "over14") priceMatch = meal.price > 14;
      return dietMatch && priceMatch;
    });
  }, [activeDiet, activePrice]);

  return (
    <div className="min-h-screen">
      {/* Hero banner */}
      <section className="border-b border-primary/10 bg-gradient-to-br from-primary/5 via-lime-50/30 to-amber-50/20">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-medium text-secondary">
              <Sparkles className="h-3.5 w-3.5" />
              Updated weekly — always seasonal
            </div>
            <h1 className="font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              This Week&apos;s Menu
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Farm-fresh ingredients, chef-crafted recipes. Pick your favorites
              and we&apos;ll deliver everything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-primary/5 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <div className={`mt-4 space-y-4 md:mt-0 ${showFilters ? "block" : "hidden md:block"}`}>
            {/* Dietary filters */}
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveDiet(filter.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all ${
                      activeDiet === filter.id
                        ? "border-secondary bg-secondary text-secondary-foreground shadow-sm"
                        : "border-border bg-card text-muted-foreground hover:border-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Price range */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center text-xs font-medium text-muted-foreground">
                Price:
              </span>
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setActivePrice(range.id)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium transition-all ${
                    activePrice === range.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meal grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "meal" : "meals"} available
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((meal) => (
              <Link key={meal.id} href={`/recipes/${meal.slug}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                  <div
                    className={`h-40 w-full bg-gradient-to-br ${meal.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur-sm shadow-sm">
                        <span className="font-bold text-primary">${meal.price.toFixed(2)}</span>
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      {meal.prepTime}
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                      {meal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                      {meal.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {meal.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] font-normal capitalize"
                        >
                          {tag.replace("-", " ")}
                        </Badge>
                      ))}
                      {meal.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-normal"
                        >
                          +{meal.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20">
              <Salad className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium text-muted-foreground">
                No meals match these filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveDiet("all");
                  setActivePrice("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="font-heading text-xl">Ready to build your box?</h3>
            <p className="text-sm text-muted-foreground">
              Pick 3–6 meals for the week. Free delivery on your first order.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/plan">
                Build Your Box
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}