"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

const allMeals = [
  { id: 1, name: "Harvest Kale & Quinoa Bowl", price: 12.99, tags: ["vegetarian", "gluten-free"], prepTime: "25 min", color: "from-green-200 to-green-400" },
  { id: 2, name: "Lemon Herb Grilled Chicken", price: 14.99, tags: ["protein", "gluten-free"], prepTime: "30 min", color: "from-amber-200 to-yellow-400" },
  { id: 3, name: "Spicy Thai Coconut Curry", price: 15.99, tags: ["pescatarian", "gluten-free"], prepTime: "30 min", color: "from-red-200 to-orange-400" },
  { id: 4, name: "Mushroom & Truffle Risotto", price: 13.99, tags: ["vegetarian", "gluten-free"], prepTime: "35 min", color: "from-stone-200 to-stone-400" },
  { id: 5, name: "Southwest Black Bean Tacos", price: 11.99, tags: ["vegetarian", "vegan"], prepTime: "20 min", color: "from-orange-200 to-red-400" },
  { id: 6, name: "Miso Glazed Salmon", price: 16.99, tags: ["pescatarian", "protein"], prepTime: "25 min", color: "from-rose-200 to-pink-400" },
  { id: 7, name: "Herb-Crusted Pork Tenderloin", price: 15.49, tags: ["protein"], prepTime: "35 min", color: "from-brown-200 to-amber-400" },
  { id: 8, name: "Zucchini Noodle Bolognese", price: 13.49, tags: ["protein", "low-cal"], prepTime: "25 min", color: "from-red-200 to-rose-400" },
  { id: 9, name: "Harissa Honey-Glazed Carrots", price: 10.99, tags: ["vegan", "gluten-free", "low-cal"], prepTime: "15 min", color: "from-orange-200 to-amber-400" },
  { id: 10, name: "Cajun Blackened Catfish", price: 15.99, tags: ["pescatarian", "protein"], prepTime: "30 min", color: "from-stone-200 to-brown-400" },
  { id: 11, name: "Pumpkin Sage Brown Butter Pasta", price: 13.99, tags: ["vegetarian"], prepTime: "25 min", color: "from-amber-200 to-orange-400" },
  { id: 12, name: "Citrus Chipotle Chicken Tacos", price: 14.49, tags: ["protein"], prepTime: "20 min", color: "from-yellow-200 to-red-400" },
];

const MAX_SELECTIONS = 3;
const PRICE_PER_SERVING = 11.99;

export default function PlanPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [servings, setServings] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  function toggleMeal(id: number) {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else if (selected.length < MAX_SELECTIONS) {
      setSelected([...selected, id]);
    }
  }

  const cartMeals = allMeals.filter((m) => selected.includes(m.id));
  const subtotal = cartMeals.reduce((sum, m) => sum + m.price, 0);
  const total = subtotal * servings;

  async function handleSubmit() {
    setSubmitted(true);
    setApiMessage("");
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mealIds: selected,
          servings,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setApiMessage(data.message || "Plan saved! ✓");
      } else {
        setApiMessage(data.error || "Something went wrong.");
      }
    } catch {
      setApiMessage("Could not reach server. Please try again.");
    }
  }

  return (
    <div className="bg-background">
      {/* Banner */}
      <section className="border-b border-border/40 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl tracking-tight sm:text-5xl">
            Plan Your Week
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Pick up to 3 meals, choose your servings, and we&apos;ll deliver
            everything you need. No commitment, skip anytime.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
        {/* Meal selection */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-2xl tracking-tight">
              Choose your meals
            </h2>
            <span className="text-sm text-muted-foreground">
              {selected.length}/{MAX_SELECTIONS} selected
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {allMeals.map((meal) => {
              const isSelected = selected.includes(meal.id);
              return (
                <button
                  key={meal.id}
                  onClick={() => toggleMeal(meal.id)}
                  className={`group relative overflow-hidden rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-2 ring-primary/20"
                      : "border-border/50 bg-background hover:border-primary/30 hover:shadow-sm"
                  } ${
                    !isSelected && selected.length >= MAX_SELECTIONS
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }`}
                >
                  <div className={`h-24 w-full bg-gradient-to-br ${meal.color} relative`}>
                    {isSelected && (
                      <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium leading-snug">{meal.name}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{meal.prepTime}</span>
                      <span>•</span>
                      <span>${meal.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {meal.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[9px] font-normal capitalize">
                          {tag.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h3 className="font-heading text-lg">Your Box</h3>
            </div>

            {cartMeals.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Select up to 3 meals to get started.
              </p>
            ) : (
              <ul className="mb-4 space-y-2">
                {cartMeals.map((meal) => (
                  <li key={meal.id} className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 px-3 py-2">
                    <span className="text-xs font-medium">{meal.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">
                        ${(meal.price * servings).toFixed(2)}
                      </span>
                      <button
                        onClick={() => toggleMeal(meal.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Servings selector */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Servings per meal
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex h-7 w-10 items-center justify-center rounded-lg border border-border bg-background text-sm font-medium">
                  {servings}
                </span>
                <button
                  onClick={() => setServings(Math.min(6, servings + 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-1 border-t border-border/40 pt-3 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Meals</span>
                <span>{cartMeals.length} × {servings} servings</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Servings total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border/40 pt-2 text-sm font-medium text-foreground">
                <span>Estimated total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="mt-4 w-full"
              disabled={cartMeals.length === 0}
              onClick={handleSubmit}
            >
              {submitted && !apiMessage ? "Saving…" : "Save My Plan"}
            </Button>

            {apiMessage && (
              <div className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                apiMessage.includes("✓") || apiMessage.includes("saved")
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}>
                {apiMessage}
              </div>
            )}
          </div>

          {/* Delivery note */}
          <div className="mt-4 rounded-xl border border-border/30 bg-muted/50 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Free delivery on your first box</p>
            <p className="mt-1">
              Ships weekly on Sunday. Skip or cancel anytime before Thursday.
            </p>
          </div>
        </div>
      </div>

      {/* Success CTA */}
      {submitted && apiMessage.includes("✓") && (
        <section className="border-t border-border/40 bg-gradient-to-r from-primary/5 to-accent/5 py-12 text-center">
          <h2 className="font-heading text-2xl tracking-tight">You&apos;re all set!</h2>
          <p className="mt-2 text-muted-foreground">
            Your first box ships Sunday. We&apos;ll send a confirmation email.
          </p>
          <div className="mt-4">
            <Button variant="outline" asChild>
              <Link href="/menu">Browse Full Menu</Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}