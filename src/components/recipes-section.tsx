import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BarChart, Star } from "lucide-react";

const recipes = [
  {
    name: "One-Pan Lemon Herb Salmon",
    difficulty: "Easy",
    time: "25 min",
    rating: 4.9,
    color: "from-rose-200 to-pink-300",
    tags: ["Pescatarian", "High Protein"],
  },
  {
    name: "Shakshuka with Feta & Herbs",
    difficulty: "Easy",
    time: "20 min",
    rating: 4.8,
    color: "from-red-200 to-orange-300",
    tags: ["Vegetarian", "Gluten-Free"],
  },
  {
    name: "Thai Basil Beef Lettuce Wraps",
    difficulty: "Medium",
    time: "30 min",
    rating: 4.7,
    color: "from-green-200 to-emerald-300",
    tags: ["High Protein", "Low Calorie"],
  },
  {
    name: "Wild Mushroom Stroganoff",
    difficulty: "Medium",
    time: "35 min",
    rating: 4.6,
    color: "from-stone-200 to-stone-400",
    tags: ["Vegetarian"],
  },
];

export function RecipesSection() {
  return (
    <section
      id="recipes"
      className="bg-muted/30 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            Sample Recipes
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            A taste of what&apos;s coming to your kitchen. Every recipe is
            tested and approved by our chefs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <Card
              key={recipe.name}
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
                <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {recipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart className="h-3 w-3" />
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
                <Button variant="link" size="sm" className="h-auto px-0 text-primary">
                  View Recipe →
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}