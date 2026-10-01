"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { weeklyMeals } from "@/lib/meals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import {
  Check,
  CheckCheck,
  Clock,
  ChefHat,
  ArrowLeft,
  Printer,
  Sparkles,
  Timer,
  Salad,
  Beef,
  Fish,
} from "lucide-react";

interface StepGroup {
  title: string;
  steps: { label: string; detail?: string }[];
}

const recipeSteps: Record<string, { servings: number; ingredients: string[]; groups: StepGroup[] }> = {
  "harvest-kale-quinoa-bowl": {
    servings: 2,
    ingredients: [
      "1 cup quinoa",
      "2 sweet potatoes",
      "1 avocado",
      "1 can chickpeas",
      "2 tbsp tahini",
      "1 lemon",
      "4 cups kale",
      "Salt & pepper",
    ],
    groups: [
      {
        title: "Prep",
        steps: [
          { label: "Preheat oven to 400°F" },
          { label: "Rinse quinoa in fine mesh strainer" },
          { label: "Peel and cube sweet potatoes into ½-inch pieces" },
        ],
      },
      {
        title: "Cook",
        steps: [
          { label: "Cook quinoa per package directions (about 15 min)" },
          { label: "Toss sweet potatoes with oil, roast 20 min" },
          { label: "Drain and rinse chickpeas" },
          { label: "Massage kale with olive oil and salt" },
        ],
      },
      {
        title: "Assemble",
        steps: [
          { label: "Whisk tahini with lemon juice and water for dressing" },
          { label: "Slice avocado" },
          { label: "Layer quinoa, kale, sweet potatoes, chickpeas, avocado" },
          { label: "Drizzle with tahini dressing and serve" },
        ],
      },
    ],
  },
  "lemon-herb-grilled-chicken": {
    servings: 2,
    ingredients: [
      "2 chicken breasts",
      "1 lemon",
      "2 garlic cloves",
      "1 tbsp olive oil",
      "1 tsp dried oregano",
      "1 tsp thyme",
      "1 bunch asparagus",
      "1 cup wild rice",
      "Salt & pepper",
    ],
    groups: [
      {
        title: "Marinate",
        steps: [
          { label: "Zest and juice the lemon" },
          { label: "Mince garlic cloves" },
          { label: "Mix lemon juice, garlic, oil, oregano, thyme" },
          { label: "Coat chicken, refrigerate 15 min" },
        ],
      },
      {
        title: "Cook",
        steps: [
          { label: "Cook wild rice per package directions" },
          { label: "Grill chicken 6 min per side, internal 165°F" },
          { label: "Toss asparagus with oil, grill 4 min" },
        ],
      },
      {
        title: "Serve",
        steps: [
          { label: "Slice chicken against the grain" },
          { label: "Plate rice, top with chicken and asparagus" },
          { label: "Garnish with lemon wedge" },
        ],
      },
    ],
  },
};

function generateRecipeSteps(slug: string) {
  if (recipeSteps[slug]) return recipeSteps[slug];

  // Generate dynamic steps for any meal
  const meal = weeklyMeals.find((m) => m.slug === slug);
  if (!meal) return null;

  return {
    servings: 2,
    ingredients: [
      "Farm-fresh produce (included in kit)",
      "Protein (included in kit)",
      "Aromatics & spices (included)",
      "Cooking oil & salt (pantry)",
    ],
    groups: [
      {
        title: "Prep",
        steps: [
          { label: `Read through the entire recipe for ${meal.name}` },
          { label: "Wash and prep produce from your kit" },
          { label: "Set out all ingredients and tools" },
        ],
      },
      {
        title: "Cook",
        steps: [
          { label: "Follow the included recipe card step by step" },
          { label: `Cook time: ${meal.prepTime}` },
          { label: "Taste and adjust seasoning" },
        ],
      },
      {
        title: "Serve",
        steps: [
          { label: "Plate and garnish" },
          { label: "Snap a photo and tag us @mesakitchen" },
          { label: "Enjoy!" },
        ],
      },
    ],
  };
}

export default function RecipePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const meal = weeklyMeals.find((m) => m.slug === slug);
  if (!meal) {
    notFound();
    return;
  }

  const data = generateRecipeSteps(slug)!;

  // Build flat step list for checklist state
  const allSteps: { groupIdx: number; stepIdx: number; label: string }[] = [];
  data.groups.forEach((g, gi) => {
    g.steps.forEach((s, si) => {
      allSteps.push({ groupIdx: gi, stepIdx: si, label: s.label });
    });
  });

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [showIngredients, setShowIngredients] = useState(true);

  const toggleStep = useCallback((idx: number) => {
    const next = new Set(checked);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setChecked(next);
  }, [checked]);

  const progress = allSteps.length > 0 ? Math.round((checked.size / allSteps.length) * 100) : 0;

  const otherRecipes = weeklyMeals
    .filter((m) => m.slug !== slug && m.tags.some((t) => meal.tags.includes(t)))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb + header */}
      <div className="border-b border-primary/10 bg-gradient-to-r from-primary/5 via-lime-50/20 to-amber-50/10">
        <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/recipes"
            className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Recipes
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              {meal.name}
            </h1>
            <Badge className="bg-secondary text-secondary-foreground text-xs font-medium">
              {meal.prepTime}
            </Badge>
          </div>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">
            {meal.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {meal.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[11px] font-normal capitalize"
              >
                {tag.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Cookbook-style layout */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-10 lg:grid-cols-3">
          {/* Main content — recipe steps */}
          <div className="lg:col-span-2">
            {/* Cookbook heading decoration */}
            <div className="mb-8 flex items-center justify-between border-b border-dashed border-primary/20 pb-4">
              <span className="font-hand text-lg text-primary">
                Step by step
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {meal.prepTime}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Your progress
              </span>
              <span className="text-sm font-medium text-primary">
                {checked.size}/{allSteps.length} steps
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Steps by group */}
            <div className="mt-8 space-y-8">
              {data.groups.map((group, gi) => {
                const groupChecked = group.steps.filter((_s, si) => {
                  const idx = allSteps.findIndex(
                    (a) => a.groupIdx === gi && a.stepIdx === si
                  );
                  return checked.has(idx);
                }).length;
                const groupTotal = group.steps.length;
                return (
                  <div key={gi}>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-heading text-xl text-primary">
                        {group.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {groupChecked}/{groupTotal}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {group.steps.map((step, si) => {
                        const idx = allSteps.findIndex(
                          (a) => a.groupIdx === gi && a.stepIdx === si
                        );
                        const done = checked.has(idx);
                        return (
                          <button
                            key={`${gi}-${si}`}
                            onClick={() => toggleStep(idx)}
                            className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                              done
                                ? "border-secondary/30 bg-secondary/5 text-foreground/60"
                                : "border-border/60 bg-white hover:border-primary/20 hover:shadow-sm"
                            }`}
                          >
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                                done
                                  ? "border-secondary bg-secondary text-white"
                                  : "border-muted-foreground/30 bg-background"
                              }`}
                            >
                              {done && <CheckCheck className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <span
                                className={`text-base font-medium ${
                                  done ? "line-through" : ""
                                }`}
                              >
                                {step.label}
                              </span>
                              {step.detail && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {step.detail}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion state */}
            {progress === 100 && (
              <div className="mt-8 rounded-2xl border-2 border-secondary/30 bg-gradient-to-r from-secondary/5 to-lime-50/10 p-8 text-center">
                <span className="font-hand text-4xl text-secondary">
                  Bon appétit!
                </span>
                <p className="mt-2 text-lg text-muted-foreground">
                  You&apos;ve completed every step. Time to enjoy your
                  {meal.name}.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" onClick={() => setChecked(new Set())}>
                    Reset Steps
                  </Button>
                  <Button asChild>
                    <Link href="/plan">Build Another Box</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — cookbook-style ingredients & meta */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Ingredients card */}
              <div className="rounded-2xl border-2 border-dashed border-primary/10 bg-white p-5 shadow-sm">
                <button
                  onClick={() => setShowIngredients(!showIngredients)}
                  className="flex w-full items-center justify-between"
                >
                  <h3 className="font-hand text-lg text-primary">
                    Ingredients
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {showIngredients ? "Hide" : "Show"}
                  </span>
                </button>
                {showIngredients && (
                  <ul className="mt-4 space-y-2">
                    {data.ingredients.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recipe meta */}
              <div className="space-y-3 rounded-2xl border border-primary/10 bg-primary/[0.02] p-5">
                <div className="flex items-center gap-3">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Chef-crafted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Salad className="h-5 w-5 text-secondary" />
                  <span className="text-sm">{data.servings} servings</span>
                </div>
                <div className="flex items-center gap-3">
                  <Timer className="h-5 w-5 text-accent" />
                  <span className="text-sm">{meal.prepTime}</span>
                </div>
              </div>

              {/* Similar recipes */}
              {otherRecipes.length > 0 && (
                <div className="rounded-2xl border border-border/40 bg-white p-5">
                  <h3 className="font-hand text-base text-primary">
                    You might also like
                  </h3>
                  <div className="mt-3 space-y-3">
                    {otherRecipes.map((other) => (
                      <Link
                        key={other.id}
                        href={`/recipes/${other.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-border/30 p-2 transition-all hover:border-primary/20"
                      >
                        <div
                          className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${other.color}`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {other.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {other.prepTime}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}