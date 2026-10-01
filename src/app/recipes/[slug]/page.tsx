"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Circle, Clock, Users, ChefHat, ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";

// Recipe database
const recipesDb: Record<string, {
  name: string;
  description: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  image: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  tips: string[];
}> = {
  "lemon-herb-salmon": {
    name: "One-Pan Lemon Herb Salmon",
    description: "Bright citrus and fresh herbs elevate this weeknight salmon dish. All on one pan — minimal cleanup, maximum flavor.",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    image: "from-rose-200 to-pink-300",
    tags: ["Pescatarian", "High Protein", "Gluten-Free"],
    ingredients: [
      "2 (6 oz) salmon fillets, skin on",
      "2 tbsp olive oil",
      "1 lemon, sliced into rounds",
      "3 sprigs fresh thyme",
      "2 cloves garlic, smashed",
      "1 bunch asparagus, trimmed",
      "Salt and black pepper to taste",
      "Flaky sea salt for finishing",
    ],
    steps: [
      "Preheat oven to 400°F (200°C). Line a sheet pan with parchment paper.",
      "Place salmon fillets skin-side down on one half of the pan. Drizzle with 1 tbsp olive oil and season with salt and pepper.",
      "Arrange lemon slices and thyme sprigs around and on top of the salmon.",
      "On the other half of the pan, toss asparagus with remaining olive oil, smashed garlic cloves, salt, and pepper.",
      "Roast for 12–15 minutes, until salmon flakes easily with a fork and asparagus is tender.",
      "Remove from oven. Squeeze a roasted lemon slice over the salmon. Finish with flaky sea salt.",
      "Serve immediately, dividing salmon and asparagus between plates.",
    ],
    tips: [
      "Room-temperature salmon cooks more evenly — let it sit out for 10 minutes before cooking.",
      "For extra crisp skin, pat the salmon dry before seasoning.",
      "Any green vegetable works here: green beans, broccolini, or zucchini slices.",
    ],
  },
  "shakshuka-feta": {
    name: "Shakshuka with Feta & Herbs",
    description: "A North African classic meets Mediterranean flair. Eggs poached in spiced tomato-pepper sauce, topped with creamy feta.",
    difficulty: "Easy",
    prepTime: "10 min",
    cookTime: "20 min",
    servings: 2,
    image: "from-red-200 to-orange-300",
    tags: ["Vegetarian", "Gluten-Free"],
    ingredients: [
      "2 tbsp olive oil",
      "1 red bell pepper, diced",
      "3 cloves garlic, minced",
      "1 tsp smoked paprika",
      "1/2 tsp cumin",
      "1 (14 oz) can crushed tomatoes",
      "4 large eggs",
      "1/3 cup crumbled feta cheese",
      "2 tbsp fresh parsley, chopped",
      "Warm crusty bread or pita for serving",
    ],
    steps: [
      "Heat olive oil in a large skillet over medium heat. Add diced bell pepper and cook until softened, about 3 minutes.",
      "Add garlic, smoked paprika, and cumin. Stir for 30 seconds until fragrant.",
      "Pour in crushed tomatoes. Simmer until thickened, about 5 minutes. Season with salt.",
      "Make 4 small wells in the sauce. Crack one egg into each well.",
      "Cover the skillet and cook until whites are set and yolks are runny, 4–5 minutes.",
      "Remove from heat. Sprinkle feta over the top and cover for 1 minute to soften.",
      "Garnish with parsley. Serve straight from the skillet with warm bread.",
    ],
    tips: [
      "Use a cast-iron or oven-safe skillet if you prefer to finish under the broiler.",
      "Adjust spice level with cayenne or Aleppo pepper flakes.",
      "Feta can be replaced with halloumi or goat cheese for variety.",
    ],
  },
  "thai-basil-beef-wraps": {
    name: "Thai Basil Beef Lettuce Wraps",
    description: "Quick, bright, and packed with herbaceous flavor. These lettuce wraps are a low-carb weeknight win.",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "15 min",
    servings: 2,
    image: "from-green-200 to-emerald-300",
    tags: ["High Protein", "Low Calorie"],
    ingredients: [
      "1 lb flank steak or sirloin, thinly sliced",
      "2 tbsp vegetable oil",
      "3 cloves garlic, minced",
      "1 red chili, thinly sliced (optional)",
      "1/4 cup Thai basil leaves, packed",
      "2 tbsp fish sauce",
      "1 tbsp lime juice",
      "1 tsp brown sugar",
      "1 head butter lettuce, separated into cups",
      "Pickled carrots and daikon for serving",
    ],
    steps: [
      "Combine fish sauce, lime juice, and brown sugar in a small bowl. Set aside.",
      "Heat vegetable oil in a wok or large skillet over high heat until shimmering.",
      "Add beef in a single layer. Sear 1–2 minutes per side, working in batches if needed.",
      "Add garlic and chili. Stir-fry 30 seconds until fragrant.",
      "Remove from heat. Toss with Thai basil leaves until they just begin to wilt.",
      "Drizzle with fish-sauce mixture and toss to coat.",
      "Serve family-style with lettuce cups, pickled vegetables, and extra lime wedges.",
    ],
    tips: [
      "Freeze the steak for 20 minutes before slicing — it makes thin cuts much easier.",
      "Thai basil is more anise-like than sweet basil. Regular basil works in a pinch.",
      "Butter lettuce makes the best cups, but large romaine leaves also work.",
    ],
  },
  "mushroom-stroganoff": {
    name: "Wild Mushroom Stroganoff",
    description: "A vegetarian take on the Russian classic. Rich, creamy, and deeply savory with mixed wild mushrooms.",
    difficulty: "Medium",
    prepTime: "15 min",
    cookTime: "20 min",
    servings: 2,
    image: "from-stone-200 to-stone-400",
    tags: ["Vegetarian"],
    ingredients: [
      "8 oz mixed wild mushrooms (cremini, shiitake, oyster)",
      "2 tbsp unsalted butter",
      "1 small onion, finely diced",
      "2 cloves garlic, minced",
      "1 tbsp all-purpose flour",
      "1 cup vegetable or mushroom broth",
      "1/2 cup sour cream, room temperature",
      "1 tbsp Dijon mustard",
      "1 tbsp fresh dill, chopped",
      "6 oz wide egg noodles or pappardelle",
    ],
    steps: [
      "Bring a large pot of salted water to a boil for the noodles.",
      "Clean mushrooms with a brush (do not rinse). Tear or slice into bite-size pieces.",
      "Melt butter in a large skillet over medium-high heat. Add mushrooms in a single layer.",
      "Cook until golden and most moisture has evaporated, about 5 minutes.",
      "Add onion and garlic. Cook 2 minutes more. Sprinkle flour over and stir for 1 minute.",
      "Slowly whisk in broth. Simmer until thickened, about 3 minutes.",
      "Cook noodles al dente. Drain, reserving 1/4 cup pasta water.",
      "Remove skillet from heat. Stir in sour cream and Dijon mustard. Add pasta water if needed for consistency.",
      "Toss with noodles. Top with fresh dill and serve immediately.",
    ],
    tips: [
      "Room-temperature sour cream prevents curdling — take it out 20 minutes ahead.",
      "A mix of mushrooms gives the best texture. Avoid using only one variety.",
      "For a vegan version, use coconut cream instead of sour cream and plant-based butter.",
    ],
  },
};

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = recipesDb[params.slug];
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (!recipe) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-heading text-4xl">Recipe not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t find that recipe. Browse our full menu instead.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/menu">View Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  function toggleStep(index: number) {
    const next = new Set(completedSteps);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCompletedSteps(next);
  }

  const progressPct = recipe.steps.length > 0
    ? Math.round((completedSteps.size / recipe.steps.length) * 100)
    : 0;

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 bg-background py-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/menu" className="transition-colors hover:text-foreground">Menu</Link>
            <span>/</span>
            <span className="text-foreground">{recipe.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className={`bg-gradient-to-br ${recipe.image} py-12 sm:py-16`}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/80">
            <span className="flex items-center gap-1">
              <ChefHat className="h-3.5 w-3.5" />
              {recipe.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {recipe.prepTime} prep
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {recipe.servings} servings
            </span>
          </div>
          <h1 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl text-white drop-shadow-sm">
            {recipe.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {recipe.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-10">
        {/* Left column: Steps + Ingredients */}
        <div>
          {/* Progress bar */}
          {completedSteps.size > 0 && (
            <div className="mb-6 rounded-xl bg-primary/5 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-primary">Cooking progress</span>
                <span className="text-primary">{completedSteps.size}/{recipe.steps.length} steps</span>
              </div>
              <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {/* Ingredients card */}
          <Card className="mb-8 border-border/50">
            <CardContent className="p-5">
              <h2 className="mb-4 font-heading text-xl tracking-tight">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary/30" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Step checklist */}
          <Card className="border-border/50">
            <CardContent className="p-5">
              <h2 className="mb-4 font-heading text-xl tracking-tight">Steps</h2>
              <ol className="space-y-3">
                {recipe.steps.map((step, index) => {
                  const done = completedSteps.has(index);
                  return (
                    <li
                      key={index}
                      onClick={() => toggleStep(index)}
                      className={`group flex items-start gap-3 rounded-lg border border-border/30 p-3 cursor-pointer transition-all ${
                        done ? "bg-primary/5 border-primary/20" : "hover:bg-muted/50"
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-all ${
                        done
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {done ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </span>
                      <span className={`flex-1 text-sm leading-snug ${
                        done ? "line-through text-muted-foreground/60" : "text-foreground"
                      }`}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Tips + metadata */}
        <div className="lg:sticky lg:top-24">
          {/* At a glance */}
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm mb-6">
            <h3 className="mb-3 font-heading text-lg">At a Glance</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Prep</dt>
                <dd>{recipe.prepTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Cook</dt>
                <dd>{recipe.cookTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total</dt>
                <dd>{recipe.prepTime && recipe.cookTime
                  ? `${(recipe.prepTime.split(" ")[0] ? parseInt(recipe.prepTime) : 10) + (recipe.cookTime.split(" ")[0] ? parseInt(recipe.cookTime) : 15)} min`
                  : "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Difficulty</dt>
                <dd>{recipe.difficulty}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Servings</dt>
                <dd>{recipe.servings}</dd>
              </div>
            </dl>
          </div>

          {/* Chef&apos;s tips */}
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm mb-6">
            <h3 className="mb-3 font-heading text-lg">Chef&apos;s Tips</h3>
            <ul className="space-y-2 text-sm">
              {recipe.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <ChefHat className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <button onClick={() => window.print()} className="flex w-full items-center justify-center gap-1.5">
                <Printer className="h-4 w-4" />
                Print Recipe
              </button>
            </Button>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/menu" className="flex w-full items-center justify-center gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back to Menu
              </Link>
            </Button>
          </div>

          {/* Callout */}
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
            <p className="font-medium text-primary">Love this recipe?</p>
            <p className="mt-1 text-primary/80">
              Get all ingredients delivered fresh. Pick this meal in your plan.
            </p>
            <div className="mt-2">
              <Button size="sm" asChild>
                <Link href="/plan">Add to Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}