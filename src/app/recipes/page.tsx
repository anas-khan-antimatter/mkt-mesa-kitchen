"use client";

import Link from "next/link";
import { weeklyMeals } from "@/lib/meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ChefHat,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RecipesPage() {
  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="border-b border-primary/10 bg-gradient-to-br from-primary/5 via-lime-50/30 to-amber-50/20">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-medium text-secondary">
              <BookOpen className="h-3.5 w-3.5" />
              All our recipes, one place
            </div>
            <h1 className="font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Recipes
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Step-by-step cooking guides for every meal. Each recipe is
              chef-tested and ready in 35 minutes or less.
            </p>
          </div>
        </div>
      </section>

      {/* Recipes grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {weeklyMeals.map((meal) => (
              <Link key={meal.id} href={`/recipes/${meal.slug}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                  <div
                    className={`h-40 w-full bg-gradient-to-br ${meal.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur-sm shadow-sm">
                        <span className="font-bold text-primary">
                          ${meal.price.toFixed(2)}
                        </span>
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm shadow-sm">
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
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">
                      View Recipe <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}