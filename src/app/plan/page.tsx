"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { weeklyMeals, type Meal } from "@/lib/meals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ArrowRight,
  Trash2,
  Sparkles,
  Clock,
  Truck,
  ChefHat,
} from "lucide-react";

const MAX_SELECTIONS = 6;
const MIN_SELECTIONS = 2;
const PRICE_PER_MEAL = 11.49;
const DELIVERY_FEE = 0;
const FREE_DELIVERY_THRESHOLD = 3;

export default function PlanPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleMeal = useCallback((id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= MAX_SELECTIONS) return prev;
      return [...prev, id];
    });
  }, []);

  const removeMeal = useCallback((id: number) => {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const selectedMeals = useMemo(
    () => weeklyMeals.filter((m) => selectedIds.includes(m.id)),
    [selectedIds]
  );

  const total = useMemo(() => {
    const servings = selectedMeals.reduce((sum, m) => sum + m.price, 0);
    return servings;
  }, [selectedMeals]);

  const servings = selectedMeals.length;

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-lime-50/20 to-amber-50/10">
        <div className="container mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-secondary/20 bg-white p-10 text-center shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
              <Check className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="font-heading text-3xl">Box Confirmed! 🎉</h1>
            <p className="text-lg text-muted-foreground">
              Your meal kit box is on its way. Here&apos;s what you picked:
            </p>

            <div className="w-full space-y-3">
              {selectedMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center gap-4 rounded-xl border border-primary/10 bg-primary/5 p-4"
                >
                  <div
                    className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${meal.color}`}
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{meal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${meal.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full rounded-xl border border-dashed border-primary/20 bg-primary/[0.02] p-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({servings} meals)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="text-secondary font-medium">
                  {servings >= FREE_DELIVERY_THRESHOLD ? "FREE" : "$4.99"}
                </span>
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 font-heading text-xl">
                <span>Total</span>
                <span className="text-primary">
                  ${(servings >= FREE_DELIVERY_THRESHOLD ? total : total + 4.99).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/menu">Browse Menu</Link>
              </Button>
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="border-b border-primary/10 bg-gradient-to-br from-primary/5 via-lime-50/30 to-amber-50/20">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-medium text-secondary">
              <ChefHat className="h-3.5 w-3.5" />
              Build your perfect box
            </div>
            <h1 className="font-heading text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              Build Your Box
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Pick {MIN_SELECTIONS}–{MAX_SELECTIONS} meals for the week. Free
              delivery on {FREE_DELIVERY_THRESHOLD}+ meals.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Meal selection — 2/3 width */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl">Choose Your Meals</h2>
              <span className="text-sm text-muted-foreground">
                {selectedIds.length}/{MAX_SELECTIONS} selected
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-300"
                style={{
                  width: `${(selectedIds.length / MAX_SELECTIONS) * 100}%`,
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {weeklyMeals.map((meal) => {
                const isSelected = selectedIds.includes(meal.id);
                const isMaxed =
                  selectedIds.length >= MAX_SELECTIONS && !isSelected;
                return (
                  <button
                    key={meal.id}
                    onClick={() => toggleMeal(meal.id)}
                    disabled={isMaxed}
                    className={`group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all ${
                      isSelected
                        ? "border-secondary bg-secondary/5 shadow-md"
                        : isMaxed
                          ? "cursor-not-allowed border-border/30 opacity-50"
                          : "border-border/50 hover:border-primary/30 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`h-24 w-full bg-gradient-to-br ${meal.color}`}
                    >
                      {isSelected && (
                        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary shadow-sm">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm shadow-sm">
                        <Clock className="h-3 w-3" />
                        {meal.prepTime}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">
                          {meal.name}
                        </p>
                        <span className="shrink-0 text-xs font-bold text-primary">
                          ${meal.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {meal.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {meal.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[9px] font-normal capitalize"
                          >
                            {tag.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-secondary">
                            <Check className="h-3 w-3" /> Selected
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Plus className="h-3 w-3" /> Add to box
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cart sidebar — 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-primary/10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 font-heading text-lg">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      Your Box
                    </CardTitle>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                      {servings} {servings === 1 ? "meal" : "meals"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {servings === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">
                        Your box is empty.
                        <br /> Select meals from the left.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedMeals.map((meal) => (
                        <div
                          key={meal.id}
                          className="flex items-center gap-3 rounded-lg border border-border/50 p-2.5 transition-all hover:border-primary/20"
                        >
                          <div
                            className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${meal.color}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {meal.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${meal.price.toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMeal(meal.id);
                            }}
                            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            aria-label={`Remove ${meal.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price breakdown */}
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Meals ({servings})
                      </span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      {servings >= FREE_DELIVERY_THRESHOLD ? (
                        <span className="font-medium text-secondary">FREE</span>
                      ) : (
                        <span>
                          $4.99
                          <span className="ml-1 text-[10px] text-muted-foreground">
                            ({FREE_DELIVERY_THRESHOLD - servings} more for free)
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 font-heading text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        $
                        {(
                          servings >= FREE_DELIVERY_THRESHOLD
                            ? total
                            : total + 4.99
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="mt-4 w-full gap-2"
                    size="lg"
                    disabled={servings < MIN_SELECTIONS}
                    onClick={handleSubmit}
                  >
                    {servings < MIN_SELECTIONS
                      ? `Pick ${MIN_SELECTIONS - servings} more meals`
                      : "Confirm Box"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  {servings >= 1 && servings < MIN_SELECTIONS && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      Select at least {MIN_SELECTIONS} meals to continue
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/5 p-3 text-xs text-muted-foreground">
                    <Truck className="h-4 w-4 text-secondary" />
                    <span>
                      Free delivery on {FREE_DELIVERY_THRESHOLD}+ meals. Skip or
                      cancel anytime.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}