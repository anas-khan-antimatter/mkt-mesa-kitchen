"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat } from "lucide-react";

interface RecipeSummary {
  id: string;
  name: string;
  slug: string;
  tag: string;
  diet: string[];
  totalTime: string;
  difficulty: string;
  color: string;
  serves: string;
}

const recipes: RecipeSummary[] = [
  {
    id: "spring-harvest-bowl", name: "Spring Harvest Bowl", slug: "spring-harvest-bowl",
    tag: "Veggie", diet: ["vegan", "vegetarian", "gluten-free"],
    totalTime: "25 min", difficulty: "Easy", serves: "2–4",
    color: "from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)]",
  },
  {
    id: "tomato-basil-risotto", name: "Tomato Basil Risotto", slug: "tomato-basil-risotto",
    tag: "Vegetarian", diet: ["vegetarian", "gluten-free"],
    totalTime: "30 min", difficulty: "Medium", serves: "2–4",
    color: "from-[oklch(0.58_0.2_35)] to-[oklch(0.52_0.18_35)]",
  },
  {
    id: "lemon-herb-chicken", name: "Lemon Herb Chicken", slug: "lemon-herb-chicken",
    tag: "Protein", diet: ["gluten-free"],
    totalTime: "20 min", difficulty: "Easy", serves: "2",
    color: "from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)]",
  },
  {
    id: "spicy-thai-curry", name: "Spicy Thai Curry", slug: "spicy-thai-curry",
    tag: "Plant-based", diet: ["vegan", "vegetarian", "dairy-free"],
    totalTime: "25 min", difficulty: "Medium", serves: "2–4",
    color: "from-[oklch(0.68_0.16_40)] to-[oklch(0.58_0.18_35)]",
  },
  {
    id: "kale-quinoa-bowl", name: "Kale & Quinoa Bowl", slug: "kale-quinoa-bowl",
    tag: "Vegan", diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    totalTime: "15 min", difficulty: "Easy", serves: "2",
    color: "from-[oklch(0.78_0.12_145)] to-[oklch(0.68_0.14_140)]",
  },
  {
    id: "honey-glazed-salmon", name: "Honey Glazed Salmon", slug: "honey-glazed-salmon",
    tag: "Seafood", diet: ["dairy-free", "gluten-free"],
    totalTime: "20 min", difficulty: "Medium", serves: "2",
    color: "from-[oklch(0.65_0.16_55)] to-[oklch(0.55_0.18_45)]",
  },
  {
    id: "mushroom-truffle-pasta", name: "Mushroom Truffle Pasta", slug: "mushroom-truffle-pasta",
    tag: "Pasta", diet: ["vegetarian"],
    totalTime: "25 min", difficulty: "Medium", serves: "2–4",
    color: "from-[oklch(0.55_0.12_30)] to-[oklch(0.48_0.1_28)]",
  },
  {
    id: "chipotle-black-bean-tacos", name: "Chipotle Black Bean Tacos", slug: "chipotle-black-bean-tacos",
    tag: "Mexican", diet: ["vegetarian", "gluten-free"],
    totalTime: "20 min", difficulty: "Easy", serves: "2",
    color: "from-[oklch(0.62_0.18_55)] to-[oklch(0.55_0.16_50)]",
  },
];

export default function RecipesIndexPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/30 bg-gradient-to-b from-accent/5 via-background to-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="handwritten text-xs text-accent/60">recipe collection</span>
            <h1 className="font-heading text-4xl mt-2 sm:text-5xl">All Recipes</h1>
            <hr className="cookbook-rule mt-4 w-24 mx-auto" />
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              Step-by-step cooking guides with photography, built-in timers, and cookbook-style instructions.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.slug}`}
              className="photo-card group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${recipe.color} relative`}>
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {recipe.diet.slice(0, 2).map((d) => (
                    <Badge key={d} variant="secondary" className="text-[0.5rem] capitalize bg-white/30">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 p-4">
                <h3 className="font-heading text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-[0.55rem] text-muted-foreground uppercase tracking-wider">{recipe.tag}</p>
                <div className="mt-1 flex items-center gap-3 text-[0.5rem] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" /> {recipe.totalTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-2.5 w-2.5" /> {recipe.difficulty}
                  </span>
                  <span>Serves {recipe.serves}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}