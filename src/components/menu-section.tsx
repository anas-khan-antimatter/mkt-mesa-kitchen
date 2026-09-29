"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Salad, Beef, Fish, Wheat, Flame, Heart } from "lucide-react";

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
  },
  {
    id: 2,
    name: "Lemon Herb Grilled Chicken",
    description: "Marinated chicken breast, roasted asparagus, wild rice",
    tags: ["protein", "gluten-free"],
    prepTime: "30 min",
    color: "from-amber-200 to-yellow-400",
  },
  {
    id: 3,
    name: "Spicy Thai Coconut Curry",
    description: "Shrimp, bell peppers, bamboo shoots, jasmine rice",
    tags: ["pescatarian", "gluten-free"],
    prepTime: "30 min",
    color: "from-red-200 to-orange-400",
  },
  {
    id: 4,
    name: "Mushroom & Truffle Risotto",
    description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
    tags: ["vegetarian", "gluten-free"],
    prepTime: "35 min",
    color: "from-stone-200 to-stone-400",
  },
  {
    id: 5,
    name: "Southwest Black Bean Tacos",
    description: "Corn tortillas, black beans, pico de gallo, lime crema",
    tags: ["vegetarian", "vegan", "gluten-free"],
    prepTime: "20 min",
    color: "from-orange-200 to-red-400",
  },
  {
    id: 6,
    name: "Miso Glazed Salmon",
    description: "Atlantic salmon, sesame asparagus, coconut rice",
    tags: ["pescatarian", "protein", "gluten-free"],
    prepTime: "25 min",
    color: "from-rose-200 to-pink-400",
  },
  {
    id: 7,
    name: "Herb-Crusted Pork Tenderloin",
    description: "Pork tenderloin, apple fennel slaw, roasted potatoes",
    tags: ["protein", "gluten-free"],
    prepTime: "35 min",
    color: "from-brown-200 to-amber-400",
  },
  {
    id: 8,
    name: "Zucchini Noodle Bolognese",
    description: "Grass-fed beef, san marzano tomatoes, basil, zoodles",
    tags: ["protein", "low-cal"],
    prepTime: "25 min",
    color: "from-red-200 to-rose-400",
  },
];

export function MenuSection() {
  const [activeTag, setActiveTag] = useState("all");

  const filtered =
    activeTag === "all"
      ? weeklyMeals
      : weeklyMeals.filter((m) => m.tags.includes(activeTag));

  return (
    <section
      id="menu"
      className="bg-muted/30 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            This Week&apos;s Menu
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Fresh, seasonal ingredients. Something for every craving.
          </p>
        </div>

        {/* Dietary filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
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

        {/* Meal grid */}
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

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <a href="#subscribe">View Full Menu</a>
          </Button>
        </div>
      </div>
    </section>
  );
}