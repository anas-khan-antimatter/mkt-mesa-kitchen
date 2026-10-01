"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Check, ShoppingCart, Trash2 } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  slug: string;
  tag: string;
  diet: string[];
  price: number;
  color: string;
  servings: number;
}

const meals: Meal[] = [
  { id: "spring-harvest-bowl", name: "Spring Harvest Bowl", slug: "spring-harvest-bowl", tag: "Veggie", diet: ["vegan", "vegetarian"], price: 11.99, color: "from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)]", servings: 2 },
  { id: "tomato-basil-risotto", name: "Tomato Basil Risotto", slug: "tomato-basil-risotto", tag: "Vegetarian", diet: ["vegetarian"], price: 13.49, color: "from-[oklch(0.58_0.2_35)] to-[oklch(0.52_0.18_35)]", servings: 2 },
  { id: "lemon-herb-chicken", name: "Lemon Herb Chicken", slug: "lemon-herb-chicken", tag: "Protein", diet: [], price: 14.99, color: "from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)]", servings: 2 },
  { id: "spicy-thai-curry", name: "Spicy Thai Curry", slug: "spicy-thai-curry", tag: "Plant-based", diet: ["vegan", "vegetarian"], price: 12.99, color: "from-[oklch(0.68_0.16_40)] to-[oklch(0.58_0.18_35)]", servings: 2 },
  { id: "kale-quinoa-bowl", name: "Kale & Quinoa Bowl", slug: "kale-quinoa-bowl", tag: "Vegan", diet: ["vegan", "vegetarian"], price: 10.99, color: "from-[oklch(0.78_0.12_145)] to-[oklch(0.68_0.14_140)]", servings: 2 },
  { id: "honey-glazed-salmon", name: "Honey Glazed Salmon", slug: "honey-glazed-salmon", tag: "Seafood", diet: [], price: 16.99, color: "from-[oklch(0.65_0.16_55)] to-[oklch(0.55_0.18_45)]", servings: 2 },
  { id: "mushroom-truffle-pasta", name: "Mushroom Truffle Pasta", slug: "mushroom-truffle-pasta", tag: "Pasta", diet: ["vegetarian"], price: 14.49, color: "from-[oklch(0.55_0.12_30)] to-[oklch(0.48_0.1_28)]", servings: 2 },
  { id: "chipotle-black-bean-tacos", name: "Chipotle Black Bean Tacos", slug: "chipotle-black-bean-tacos", tag: "Mexican", diet: ["vegetarian"], price: 11.49, color: "from-[oklch(0.62_0.18_55)] to-[oklch(0.55_0.16_50)]", servings: 2 },
];

const MIN_MEALS = 3;
const MAX_MEALS = 8;
const SERVING_OPTIONS = [2, 4, 6];
const SHIPPING = 5.99;

export default function PlanPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["spring-harvest-bowl", "tomato-basil-risotto", "lemon-herb-chicken"]);
  const [servings, setServings] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleMeal = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const totalMeals = selectedIds.length;
  const withinRange = totalMeals >= MIN_MEALS && totalMeals <= MAX_MEALS;

  const selectedMeals = useMemo(
    () => meals.filter((m) => selectedIds.includes(m.id)),
    [selectedIds]
  );

  const subtotal = useMemo(
    () => selectedMeals.reduce((sum, m) => sum + m.price, 0) * servings,
    [selectedMeals, servings]
  );
  const total = subtotal + (subtotal > 0 ? SHIPPING : 0);

  const handleSubmit = async () => {
    if (!withinRange) return;
    setSubmitting(true);
    setServerMessage(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meals: selectedIds, servings }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setServerMessage(data.message);
      } else {
        setServerMessage(data.error || "Something went wrong.");
      }
    } catch {
      setServerMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md photo-card p-10">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="font-heading text-3xl mb-2">Order Confirmed!</h1>
          <hr className="cookbook-rule w-16 mx-auto mb-4" />
          <p className="text-muted-foreground font-serif italic mb-2">{serverMessage}</p>
          <p className="text-xs text-muted-foreground mb-6">
            We&apos;ll send a confirmation email with delivery details.
          </p>
          <Button asChild>
            <Link href="/menu">Back to Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border/30 bg-gradient-to-b from-secondary/5 via-background to-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="handwritten text-xs text-secondary/60">build your box</span>
            <h1 className="font-heading text-4xl mt-2 sm:text-5xl">Your Weekly Plan</h1>
            <hr className="cookbook-rule mt-4 w-24 mx-auto border-secondary" />
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              Pick {MIN_MEALS}–{MAX_MEALS} meals, choose your servings, and see the price update live.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Meal Selection */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl">
                Select Meals
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({totalMeals}/{MAX_MEALS} selected)
                </span>
              </h2>
              <Badge variant={withinRange ? "default" : "destructive"}>
                {withinRange ? "Ready to go" : `Need ${MIN_MEALS - totalMeals} more`}
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {meals.map((meal) => {
                const selected = selectedIds.includes(meal.id);
                return (
                  <button
                    key={meal.id}
                    onClick={() => toggleMeal(meal.id)}
                    className={`relative flex items-center gap-4 rounded-xl border-2 p-3 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${meal.color} flex items-center justify-center`}
                    >
                      {selected && <Check className="h-5 w-5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-semibold">{meal.name}</h3>
                      <p className="text-[0.6rem] text-muted-foreground uppercase tracking-wider mt-0.5">
                        ${meal.price.toFixed(2)}/serv · {meal.tag}
                      </p>
                    </div>
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selected ? "bg-primary border-primary" : "border-muted-foreground/30"
                      }`}
                    >
                      {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="photo-card p-6">
              <h2 className="font-heading text-lg mb-4 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-primary" />
                Your Box
              </h2>

              {/* Servings selector */}
              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
                  Servings per meal
                </label>
                <div className="flex gap-2">
                  {SERVING_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setServings(s)}
                      className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all ${
                        servings === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {s}
                      <span className="block text-[0.55rem] opacity-70">servings</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected meals list */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {selectedMeals.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    Select at least {MIN_MEALS} meals
                  </p>
                ) : (
                  selectedMeals.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${m.color} shrink-0`} />
                        <span className="truncate">{m.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          ${(m.price * servings).toFixed(2)}
                        </span>
                        <button
                          onClick={() => toggleMeal(m.id)}
                          className="text-muted-foreground/50 hover:text-destructive transition-colors"
                          aria-label={`Remove ${m.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price breakdown */}
              <div className="border-t border-border pt-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Meals ({selectedMeals.length} × {servings} servings)
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{subtotal > 0 ? `$${SHIPPING.toFixed(2)}` : "$0.00"}</span>
                </div>
                <hr className="cookbook-rule my-2" />
                <div className="flex justify-between font-heading text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {serverMessage && (
                <p className="mt-3 text-xs text-destructive text-center">{serverMessage}</p>
              )}

              <Button
                className="w-full mt-6"
                size="lg"
                disabled={!withinRange || submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Validating..." : withinRange ? "Place Order" : `Select ${MIN_MEALS - totalMeals} More`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}