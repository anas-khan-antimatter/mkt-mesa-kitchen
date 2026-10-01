"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Filter, Search } from "lucide-react";

interface Meal {
  id: string;
  name: string;
  slug: string;
  description: string;
  tag: string;
  category: string;
  diet: string[];
  prepTime: string;
  cookTime: string;
  price: number;
  color: string;
  serves: string;
}

const meals: Meal[] = [
  {
    id: "spring-harvest-bowl",
    name: "Spring Harvest Bowl",
    slug: "spring-harvest-bowl",
    description: "Roasted spring vegetables, quinoa, tahini dressing, and pickled onions — a celebration of the season's first produce.",
    tag: "25 min",
    category: "bowl",
    diet: ["vegan", "vegetarian", "gluten-free"],
    prepTime: "10 min",
    cookTime: "15 min",
    price: 11.99,
    color: "from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)]",
    serves: "2–4",
  },
  {
    id: "tomato-basil-risotto",
    name: "Tomato Basil Risotto",
    slug: "tomato-basil-risotto",
    description: "Creamy arborio rice with San Marzano tomatoes, fresh basil, Parmesan, and a drizzle of aged balsamic.",
    tag: "30 min",
    category: "pasta",
    diet: ["vegetarian", "gluten-free"],
    prepTime: "5 min",
    cookTime: "25 min",
    price: 13.49,
    color: "from-[oklch(0.58_0.2_35)] to-[oklch(0.52_0.18_35)]",
    serves: "2–4",
  },
  {
    id: "lemon-herb-chicken",
    name: "Lemon Herb Chicken",
    slug: "lemon-herb-chicken",
    description: "Pan-seared chicken thighs with lemon-herb pan sauce, roasted fingerling potatoes, and charred green beans.",
    tag: "20 min",
    category: "protein",
    diet: ["gluten-free"],
    prepTime: "5 min",
    cookTime: "15 min",
    price: 14.99,
    color: "from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)]",
    serves: "2",
  },
  {
    id: "spicy-thai-curry",
    name: "Spicy Thai Curry",
    slug: "spicy-thai-curry",
    description: "Coconut-based green curry with tofu, snap peas, bell peppers, and Thai basil over jasmine rice.",
    tag: "25 min",
    category: "curry",
    diet: ["vegan", "vegetarian", "dairy-free"],
    prepTime: "10 min",
    cookTime: "15 min",
    price: 12.99,
    color: "from-[oklch(0.68_0.16_40)] to-[oklch(0.58_0.18_35)]",
    serves: "2–4",
  },
  {
    id: "kale-quinoa-bowl",
    name: "Kale & Quinoa Bowl",
    slug: "kale-quinoa-bowl",
    description: "Massaged kale, tri-color quinoa, roasted sweet potato, toasted pepitas, and lemon-tahini dressing.",
    tag: "15 min",
    category: "bowl",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    prepTime: "5 min",
    cookTime: "10 min",
    price: 10.99,
    color: "from-[oklch(0.78_0.12_145)] to-[oklch(0.68_0.14_140)]",
    serves: "2",
  },
  {
    id: "honey-glazed-salmon",
    name: "Honey Glazed Salmon",
    slug: "honey-glazed-salmon",
    description: "Wild salmon with honey-soy glaze, sesame roasted asparagus, and coconut jasmine rice.",
    tag: "20 min",
    category: "seafood",
    diet: ["dairy-free", "gluten-free"],
    prepTime: "5 min",
    cookTime: "15 min",
    price: 16.99,
    color: "from-[oklch(0.65_0.16_55)] to-[oklch(0.55_0.18_45)]",
    serves: "2",
  },
  {
    id: "mushroom-truffle-pasta",
    name: "Mushroom Truffle Pasta",
    slug: "mushroom-truffle-pasta",
    description: "Wild mushrooms in a truffle cream sauce over pappardelle, finished with fresh parsley and pecorino.",
    tag: "25 min",
    category: "pasta",
    diet: ["vegetarian"],
    prepTime: "10 min",
    cookTime: "15 min",
    price: 14.49,
    color: "from-[oklch(0.55_0.12_30)] to-[oklch(0.48_0.1_28)]",
    serves: "2–4",
  },
  {
    id: "chipotle-black-bean-tacos",
    name: "Chipotle Black Bean Tacos",
    slug: "chipotle-black-bean-tacos",
    description: "Spiced black beans, pickled red onion, avocado crema, and cotija cheese on warm corn tortillas.",
    tag: "20 min",
    category: "mexican",
    diet: ["vegetarian", "gluten-free"],
    prepTime: "10 min",
    cookTime: "10 min",
    price: 11.49,
    color: "from-[oklch(0.62_0.18_55)] to-[oklch(0.55_0.16_50)]",
    serves: "2",
  },
];

const allDiets = Array.from(new Set(meals.flatMap((m) => m.diet))).sort();

export default function MenuPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = meals;
    if (activeFilter) {
      result = result.filter((m) => m.diet.includes(activeFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen">
      {/* ── Cookbook chapter header ── */}
      <section className="border-b border-border/30 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="handwritten text-xs text-primary/60">chapter one</span>
            <h1 className="font-heading text-4xl mt-2 sm:text-5xl">This Week&apos;s Menu</h1>
            <hr className="cookbook-rule mt-4 w-24 mx-auto" />
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              Six chef-crafted meals, built from the season&apos;s freshest ingredients.
              Filter by diet, search by craving — pick what moves you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-16 z-40 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <button
              onClick={() => setActiveFilter(null)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                !activeFilter
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All Meals
            </button>
            {allDiets.map((diet) => (
              <button
                key={diet}
                onClick={() => setActiveFilter(activeFilter === diet ? null : diet)}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                  activeFilter === diet
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {diet}
                {activeFilter === diet && (
                  <Check className="inline ml-1 h-3 w-3" />
                )}
              </button>
            ))}
            <div className="relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-48 rounded-full border border-input bg-transparent pl-8 pr-3 text-xs outline-none focus-visible:border-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Meal Grid ── */}
      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-xl text-muted-foreground">No meals match your filter.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveFilter(null);
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((meal) => (
              <Link
                key={meal.id}
                href={`/recipes/${meal.slug}`}
                className="photo-card group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${meal.color} relative`}
                >
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {meal.diet.slice(0, 2).map((d) => (
                      <Badge key={d} variant="secondary" className="text-[0.55rem] capitalize">
                        {d}
                      </Badge>
                    ))}
                    {meal.diet.length > 2 && (
                      <Badge variant="secondary" className="text-[0.55rem]">
                        +{meal.diet.length - 2}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="price-badge text-[0.6rem]">
                      ${meal.price.toFixed(2)}/serv
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-4">
                  <h3 className="font-heading font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {meal.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[0.6rem] text-muted-foreground uppercase tracking-wider">
                    <span>{meal.tag}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span>Serves {meal.serves}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}