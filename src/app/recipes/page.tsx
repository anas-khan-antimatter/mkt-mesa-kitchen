import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, ChefHat, Star, ArrowRight } from "lucide-react";

const recipes = [
  {
    slug: "lemon-herb-salmon",
    name: "One-Pan Lemon Herb Salmon",
    difficulty: "Easy",
    time: "25 min",
    rating: 4.9,
    color: "from-rose-200 to-pink-300",
    tags: ["Pescatarian", "High Protein", "Gluten-Free"],
    description: "Bright citrus and fresh herbs elevate this weeknight salmon dish.",
  },
  {
    slug: "shakshuka-feta",
    name: "Shakshuka with Feta & Herbs",
    difficulty: "Easy",
    time: "20 min",
    rating: 4.8,
    color: "from-red-200 to-orange-300",
    tags: ["Vegetarian", "Gluten-Free"],
    description: "Eggs poached in spiced tomato-pepper sauce, topped with creamy feta.",
  },
  {
    slug: "thai-basil-beef-wraps",
    name: "Thai Basil Beef Lettuce Wraps",
    difficulty: "Medium",
    time: "30 min",
    rating: 4.7,
    color: "from-green-200 to-emerald-300",
    tags: ["High Protein", "Low Calorie"],
    description: "Quick, bright, and packed with herbaceous flavor.",
  },
  {
    slug: "mushroom-stroganoff",
    name: "Wild Mushroom Stroganoff",
    difficulty: "Medium",
    time: "35 min",
    rating: 4.6,
    color: "from-stone-200 to-stone-400",
    tags: ["Vegetarian"],
    description: "A vegetarian take on the Russian classic. Rich and creamy.",
  },
];

export default function RecipesListingPage() {
  return (
    <div className="bg-background">
      {/* Hero banner */}
      <section className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
            Recipes
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Every recipe is tested and approved by our chefs. Browse step-by-step
            instructions, ingredient lists, and pro tips for each dish.
          </p>
        </div>
      </section>

      {/* Recipe grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <Card
                key={recipe.slug}
                className="overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`h-36 w-full bg-gradient-to-br ${recipe.color} relative flex items-center justify-center`}
                >
                  <div className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {recipe.rating}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 font-heading text-base font-semibold leading-snug">
                    {recipe.name}
                  </h3>
                  <p className="mb-3 text-xs text-muted-foreground">
                    {recipe.description}
                  </p>
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3" />
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    View Recipe
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40 bg-muted/30 py-12 text-center">
        <h2 className="font-heading text-2xl tracking-tight">
          Want to cook along?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Get all ingredients delivered to your door. Pick your meals and we&apos;ll
          send everything you need.
        </p>
        <div className="mt-4">
          <Link
            href="/plan"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
          >
            Start Planning
          </Link>
        </div>
      </section>
    </div>
  );
}