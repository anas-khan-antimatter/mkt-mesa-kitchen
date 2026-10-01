"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Salad, Beef, Fish, Wheat, Flame, Heart, Search, ArrowRight } from "lucide-react";

const dietaryTags = [
  { id: "all", label: "All", icon: Salad },
  { id: "vegetarian", label: "Vegetarian", icon: Salad },
  { id: "vegan", label: "Vegan", icon: Heart },
  { id: "protein", label: "High Protein", icon: Beef },
  { id: "pescatarian", label: "Pescatarian", icon: Fish },
  { id: "gluten-free", label: "Gluten-Free", icon: Wheat },
  { id: "low-cal", label: "Low Calorie", icon: Flame },
];

const weeklyMeals = [
  {
    id: 1,
    name: "Harvest Kale & Quinoa Bowl",
    description: "Roasted sweet potato, avocado, chickpeas, tahini dressing",
    tags: ["vegetarian", "vegan", "gluten-free", "low-cal"],
    prepTime: "25 min",
    calories: 420,
    color: "from-green-200 to-green-400",
  },
  {
    id: 2,
    name: "Lemon Herb Grilled Chicken",
    description: "Marinated chicken breast, roasted asparagus, wild rice",
    tags: ["protein", "gluten-free"],
    prepTime: "30 min",
    calories: 510,
    color: "from-amber-200 to-yellow-400",
  },
  {
    id: 3,
    name: "Spicy Thai Coconut Curry",
    description: "Shrimp, bell peppers, bamboo shoots, jasmine rice",
    tags: ["pescatarian", "gluten-free"],
    prepTime: "30 min",
    calories: 480,
    color: "from-red-200 to-orange-400",
  },
  {
    id: 4,
    name: "Mushroom & Truffle Risotto",
    description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
    tags: ["vegetarian", "gluten-free"],
    prepTime: "35 min",
    calories: 560,
    color: "from-stone-200 to-stone-400",
  },
  {
    id: 5,
    name: "Southwest Black Bean Tacos",
    description: "Corn tortillas, black beans, pico de gallo, lime crema",
    tags: ["vegetarian", "vegan", "gluten-free"],
    prepTime: "20 min",
    calories: 390,
    color: "from-orange-200 to-red-400",
  },
  {
    id: 6,
    name: "Miso Glazed Salmon",
    description: "Atlantic salmon, sesame asparagus, coconut rice",
    tags: ["pescatarian", "protein", "gluten-free"],
    prepTime: "25 min",
    calories: 460,
    color: "from-rose-200 to-pink-400",
  },
  {
    id: 7,
    name: "Herb-Crusted Pork Tenderloin",
    description: "Pork tenderloin, apple fennel slaw, roasted potatoes",
    tags: ["protein", "gluten-free"],
    prepTime: "35 min",
    calories: 540,
    color: "from-brown-200 to-amber-400",
  },
  {
    id: 8,
    name: "Zucchini Noodle Bolognese",
    description: "Grass-fed beef, san marzano tomatoes, basil, zoodles",
    tags: ["protein", "low-cal"],
    prepTime: "25 min",
    calories: 380,
    color: "from-red-200 to-rose-400",
  },
  {
    id: 9,
    name: "Harissa Honey-Glazed Carrots",
    description: "Heirloom carrots, harissa yogurt, za'atar, pistachio",
    tags: ["vegetarian", "vegan", "gluten-free", "low-cal"],
    prepTime: "15 min",
    calories: 210,
    color: "from-orange-200 to-amber-400",
  },
  {
    id: 10,
    name: "Cajun Blackened Catfish",
    description: "Catfish fillet, Cajun spices, dirty rice, collard greens",
    tags: ["pescatarian", "protein", "gluten-free"],
    prepTime: "30 min",
    calories: 490,
    color: "from-stone-200 to-brown-400",
  },
  {
    id: 11,
    name: "Pumpkin Sage Brown Butter Pasta",
    description: "Rigatoni, roasted pumpkin, brown butter, sage, pecorino",
    tags: ["vegetarian"],
    prepTime: "25 min",
    calories: 610,
    color: "from-amber-200 to-orange-400",
  },
  {
    id: 12,
    name: "Citrus Chipotle Chicken Tacos",
    description: "Chicken tinga, chipotle crema, pickled red onion, cilantro",
    tags: ["protein", "gluten-free"],
    prepTime: "20 min",
    calories: 440,
    color: "from-yellow-200 to-red-400",
  },
];

export default function MenuPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = weeklyMeals.filter((m) => {
    const matchesTag =
      activeTag === "all" || m.tags.includes(activeTag);
    const matchesSearch =
      !searchQuery ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="bg-background">
      {/* Hero banner */}
      <section className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
            This Week&apos;s Menu
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Twelve chef-crafted meals, built for real weeknights. Filter by
            diet, search by craving — your kitchen, your rhythm.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search meals…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-10 py-3 text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Dietary filter pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {dietaryTags.map((tag) => {
              const Icon = tag.icon;
              return (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    activeTag === tag.id
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meal grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {weeklyMeals.length} meals
            </p>
            <Link
              href="/plan"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Plan your week
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((meal) => (
              <Card
                key={meal.id}
                className="group overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`h-40 w-full bg-gradient-to-br ${meal.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {meal.prepTime}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-base leading-snug">
                    {meal.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <p className="mb-3 text-sm text-muted-foreground">
                    {meal.description}
                  </p>
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary/30" />
                      {meal.calories} cal
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {meal.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] font-normal capitalize"
                      >
                        {tag.replace("-", " ")}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No meals match this filter. Try another!
              </p>
            </div>
          )}

          <div className="mt-10 text-center border-t border-border/40 py-8">
            <p className="text-sm text-muted-foreground">
              Prices start at $11.99 per serving. Free delivery on your first box.
            </p>
            <div className="mt-4">
              <Button size="lg" asChild>
                <Link href="/plan">Build Your Box</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}