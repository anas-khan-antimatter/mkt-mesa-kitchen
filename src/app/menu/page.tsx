"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Salad, Beef, Fish, Wheat, Flame, Heart, ArrowLeft, Clock } from "lucide-react";

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
    color: "from-green-200 to-green-400",
    slug: "harvest-kale-quinoa-bowl",
  },
  {
    id: 2,
    name: "Lemon Herb Grilled Chicken",
    description: "Marinated chicken breast, roasted asparagus, wild rice",
    tags: ["protein", "gluten-free"],
    prepTime: "30 min",
    color: "from-amber-200 to-yellow-400",
    slug: "lemon-herb-grilled-chicken",
  },
  {
    id: 3,
    name: "Spicy Thai Coconut Curry",
    description: "Shrimp, bell peppers, bamboo shoots, jasmine rice",
    tags: ["pescatarian", "gluten-free"],
    prepTime: "30 min",
    color: "from-red-200 to-orange-400",
    slug: "spicy-thai-coconut-curry",
  },
  {
    id: 4,
    name: "Mushroom & Truffle Risotto",
    description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
    tags: ["vegetarian", "gluten-free"],
    prepTime: "35 min",
    color: "from-stone-200 to-stone-400",
    slug: "mushroom-truffle-risotto",
  },
  {
    id: 5,
    name: "Southwest Black Bean Tacos",
    description: "Corn tortillas, black beans, pico de gallo, lime crema",
    tags: ["vegetarian", "vegan", "gluten-free"],
    prepTime: "20 min",
    color: "from-orange-200 to-red-400",
    slug: "southwest-black-bean-tacos",
  },
  {
    id: 6,
    name: "Miso Glazed Salmon",
    description: "Atlantic salmon, sesame asparagus, coconut rice",
    tags: ["pescatarian", "protein", "gluten-free"],
    prepTime: "25 min",
    color: "from-rose-200 to-pink-400",
    slug: "miso-glazed-salmon",
  },
  {
    id: 7,
    name: "Herb-Crusted Pork Tenderloin",
    description: "Pork tenderloin, apple fennel slaw, roasted potatoes",
    tags: ["protein", "gluten-free"],
    prepTime: "35 min",
    color: "from-amber-200 to-amber-400",
    slug: "herb-crusted-pork-tenderloin",
  },
  {
    id: 8,
    name: "Zucchini Noodle Bolognese",
    description: "Grass-fed beef, san marzano tomatoes, basil, zoodles",
    tags: ["protein", "low-cal"],
    prepTime: "25 min",
    color: "from-red-200 to-rose-400",
    slug: "zucchini-noodle-bolognese",
  },
  {
    id: 9,
    name: "Crispy Cauliflower Buffalo Wings",
    description: "Roasted cauliflower, house buffalo sauce, ranch dip",
    tags: ["vegetarian", "vegan", "gluten-free"],
    prepTime: "25 min",
    color: "from-orange-200 to-orange-400",
    slug: "cauliflower-buffalo-wings",
  },
  {
    id: 10,
    name: "Sesame Ginger Beef Stir-Fry",
    description: "Flank steak, snap peas, bell peppers, jasmine rice",
    tags: ["protein", "gluten-free"],
    prepTime: "20 min",
    color: "from-red-200 to-red-400",
    slug: "sesame-ginger-beef-stir-fry",
  },
  {
    id: 11,
    name: "Mediterranean Baked Cod",
    description: "Cod fillet, cherry tomatoes, olives, capers, orzo",
    tags: ["pescatarian", "protein"],
    prepTime: "30 min",
    color: "from-blue-200 to-blue-400",
    slug: "mediterranean-baked-cod",
  },
  {
    id: 12,
    name: "Sweet Potato & Black Bean Enchiladas",
    description: "Corn tortillas, smoky chipotle sauce, cashew crema",
    tags: ["vegetarian", "vegan", "gluten-free"],
    prepTime: "35 min",
    color: "from-purple-200 to-purple-400",
    slug: "sweet-potato-enchiladas",
  },
];

export default function MenuPage() {
  const [activeTag, setActiveTag] = useState("all");

  const filtered =
    activeTag === "all"
      ? weeklyMeals
      : weeklyMeals.filter((m) => m.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl tracking-tight">Weekly Menu</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Fresh, seasonal ingredients. Something for every craving.
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 shrink-0">
              <Link href="/box-builder">Build Your Box</Link>
            </Button>
          </div>
        </div>

        {/* Dietary filters */}
        <div className="mb-8 flex flex-wrap gap-2">
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

        {/* Meal count */}
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "meal" : "meals"} available
        </p>

        {/* Meal grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((meal) => (
            <Link key={meal.id} href={`/recipes/${meal.slug}`}>
              <Card className="group cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg h-full">
                <div
                  className={`h-40 w-full bg-gradient-to-br ${meal.color} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.prepTime}
                    </span>
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
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">
              No meals match this filter. Try another!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}