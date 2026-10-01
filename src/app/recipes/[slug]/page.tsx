"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, ChefHat, ArrowLeft, Timer } from "lucide-react";

interface RecipeStep {
  id: string;
  number: number;
  instruction: string;
  duration?: string;
  tip?: string;
}

interface Recipe {
  id: string;
  name: string;
  slug: string;
  description: string;
  tag: string;
  diet: string[];
  prepTime: string;
  cookTime: string;
  totalTime: string;
  price: number;
  color: string;
  serves: string;
  difficulty: string;
  ingredients: string[];
  steps: RecipeStep[];
  imageColor: string;
}

const recipes: Record<string, Recipe> = {
  "spring-harvest-bowl": {
    id: "spring-harvest-bowl",
    name: "Spring Harvest Bowl",
    slug: "spring-harvest-bowl",
    description: "Roasted spring vegetables, quinoa, tahini dressing, and pickled onions — a celebration of the season's first produce.",
    tag: "Veggie · 25 min",
    diet: ["vegan", "vegetarian", "gluten-free"],
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    price: 11.99,
    color: "from-[oklch(0.72_0.15_145)] to-[oklch(0.62_0.14_145)]",
    serves: "2–4",
    difficulty: "Easy",
    imageColor: "from-emerald-300 via-green-400 to-teal-500",
    ingredients: [
      "1 cup tri-color quinoa",
      "2 cups vegetable broth",
      "1 bunch asparagus, trimmed",
      "2 cups cherry tomatoes",
      "1 zucchini, sliced",
      "3 tbsp olive oil",
      "Salt and pepper to taste",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "1 clove garlic, minced",
      "1/2 cup pickled red onions",
      "2 tbsp toasted pumpkin seeds",
      "Fresh herbs for garnish",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Preheat oven to 400°F. Line a baking sheet with parchment paper.", duration: "5 min" },
      { id: "s2", number: 2, instruction: "Rinse quinoa and combine with broth in a saucepan. Bring to a boil, reduce heat, cover, and simmer 15 minutes until fluffy.", duration: "15 min", tip: "Don't lift the lid while simmering — the steam is essential for fluffy quinoa." },
      { id: "s3", number: 3, instruction: "Toss asparagus, tomatoes, and zucchini with olive oil, salt, and pepper. Spread on baking sheet.", duration: "3 min" },
      { id: "s4", number: 4, instruction: "Roast vegetables for 12–15 minutes until tender and lightly charred.", duration: "15 min", tip: "Keep an eye on the tomatoes — they release juice and can make other veggies soggy if they burst." },
      { id: "s5", number: 5, instruction: "While vegetables roast, whisk tahini, lemon juice, garlic, and 2–3 tbsp warm water until smooth. Season with salt.", duration: "3 min" },
      { id: "s6", number: 6, instruction: "Divide quinoa among bowls. Top with roasted vegetables, pickled onions, and pumpkin seeds. Drizzle with tahini dressing and garnish with herbs.", duration: "2 min" },
    ],
  },
  "tomato-basil-risotto": {
    id: "tomato-basil-risotto",
    name: "Tomato Basil Risotto",
    slug: "tomato-basil-risotto",
    description: "Creamy arborio rice with San Marzano tomatoes, fresh basil, Parmesan, and a drizzle of aged balsamic.",
    tag: "Vegetarian · 30 min",
    diet: ["vegetarian", "gluten-free"],
    prepTime: "5 min",
    cookTime: "25 min",
    totalTime: "30 min",
    price: 13.49,
    color: "from-[oklch(0.58_0.2_35)] to-[oklch(0.52_0.18_35)]",
    serves: "2–4",
    difficulty: "Medium",
    imageColor: "from-red-400 via-rose-500 to-orange-600",
    ingredients: [
      "1 cup arborio rice",
      "3 cups warm vegetable broth",
      "1 can (14 oz) San Marzano tomatoes, crushed",
      "1 small onion, finely diced",
      "2 cloves garlic, minced",
      "1/2 cup dry white wine",
      "1/2 cup grated Parmesan",
      "2 tbsp butter",
      "1/4 cup fresh basil, chiffonade",
      "2 tbsp balsamic glaze",
      "Salt and pepper to taste",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Warm broth in a saucepan over low heat. Keep it steaming but not boiling.", duration: "3 min" },
      { id: "s2", number: 2, instruction: "In a large pan, sauté onion in 1 tbsp butter until translucent, about 4 minutes. Add garlic and cook 30 seconds.", duration: "5 min" },
      { id: "s3", number: 3, instruction: "Add rice and stir 1 minute until edges are translucent. Pour in wine and stir until absorbed.", duration: "2 min", tip: "Toasting the rice in fat (butter + wine) builds flavor and prevents mushiness." },
      { id: "s4", number: 4, instruction: "Add crushed tomatoes and 1/2 cup warm broth. Stir continuously until mostly absorbed. Continue adding broth 1/2 cup at a time, stirring, for 18–20 minutes.", duration: "20 min", tip: "The risotto is done when the rice is tender but still has a slight bite (al dente)." },
      { id: "s5", number: 5, instruction: "Remove from heat. Stir in remaining butter and Parmesan until creamy. Season with salt and pepper.", duration: "2 min" },
      { id: "s6", number: 6, instruction: "Serve immediately, topped with fresh basil and a drizzle of balsamic glaze.", duration: "1 min" },
    ],
  },
  "lemon-herb-chicken": {
    id: "lemon-herb-chicken",
    name: "Lemon Herb Chicken",
    slug: "lemon-herb-chicken",
    description: "Pan-seared chicken thighs with lemon-herb pan sauce, roasted fingerling potatoes, and charred green beans.",
    tag: "Protein · 20 min",
    diet: ["gluten-free"],
    prepTime: "5 min",
    cookTime: "15 min",
    totalTime: "20 min",
    price: 14.99,
    color: "from-[oklch(0.7_0.14_60)] to-[oklch(0.6_0.14_50)]",
    serves: "2",
    difficulty: "Easy",
    imageColor: "from-amber-300 via-yellow-400 to-orange-500",
    ingredients: [
      "4 boneless skinless chicken thighs",
      "1 lb fingerling potatoes, halved",
      "2 cups green beans, trimmed",
      "3 tbsp olive oil",
      "2 cloves garlic, smashed",
      "1 lemon, juiced and zested",
      "2 tbsp fresh thyme leaves",
      "1 tbsp fresh rosemary, chopped",
      "2 tbsp butter",
      "Salt and pepper to taste",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Preheat oven to 425°F. Toss potatoes with 1 tbsp olive oil, salt, and pepper. Roast 20 minutes, flipping halfway.", duration: "20 min" },
      { id: "s2", number: 2, instruction: "Season chicken thighs with salt, pepper, lemon zest, thyme, and rosemary.", duration: "3 min" },
      { id: "s3", number: 3, instruction: "Heat 1 tbsp oil in an oven-safe skillet over medium-high. Sear chicken 4–5 minutes per side until golden.", duration: "10 min", tip: "Don't overcrowd the pan — leave space between thighs for proper browning." },
      { id: "s4", number: 4, instruction: "Add butter, garlic, and green beans to the skillet. Transfer to oven and roast 8 minutes until chicken reaches 165°F.", duration: "8 min" },
      { id: "s5", number: 5, instruction: "Remove skillet. Squeeze lemon juice over chicken and let rest 3 minutes.", duration: "3 min" },
      { id: "s6", number: 6, instruction: "Serve chicken with potatoes and green beans, spooning pan juices on top.", duration: "1 min" },
    ],
  },
  "spicy-thai-curry": {
    id: "spicy-thai-curry",
    name: "Spicy Thai Curry",
    slug: "spicy-thai-curry",
    description: "Coconut-based green curry with tofu, snap peas, bell peppers, and Thai basil over jasmine rice.",
    tag: "Plant-based · 25 min",
    diet: ["vegan", "vegetarian", "dairy-free"],
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    price: 12.99,
    color: "from-[oklch(0.68_0.16_40)] to-[oklch(0.58_0.18_35)]",
    serves: "2–4",
    difficulty: "Medium",
    imageColor: "from-lime-400 via-green-500 to-emerald-600",
    ingredients: [
      "1 block extra-firm tofu, cubed",
      "1 can (14 oz) coconut milk",
      "3 tbsp green curry paste",
      "1 cup snap peas",
      "1 red bell pepper, sliced",
      "1 cup jasmine rice",
      "1 1/4 cups water",
      "1 tbsp coconut oil",
      "2 tbsp soy sauce (or tamari)",
      "1 tbsp brown sugar",
      "1/4 cup Thai basil leaves",
      "Lime wedges for serving",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Cook jasmine rice: rinse, add to pot with water, bring to boil, cover, simmer 12 minutes, remove from heat and let sit 5 minutes.", duration: "17 min", tip: "Rinsing rice removes excess starch for fluffy, separate grains." },
      { id: "s2", number: 2, instruction: "Press tofu between paper towels for 2 minutes. Cube into 1/2-inch pieces.", duration: "3 min" },
      { id: "s3", number: 3, instruction: "Heat coconut oil in a wok or large skillet over high heat. Sear tofu 4 minutes until golden on all sides. Remove.", duration: "5 min" },
      { id: "s4", number: 4, instruction: "Reduce heat to medium. Add curry paste and stir 30 seconds until fragrant. Pour in coconut milk, soy sauce, and brown sugar. Simmer 3 minutes.", duration: "4 min", tip: "Fry the curry paste in oil before adding liquid — this blooms the spices." },
      { id: "s5", number: 5, instruction: "Add snap peas and bell pepper. Simmer 3 minutes until tender-crisp. Return tofu to pan.", duration: "3 min" },
      { id: "s6", number: 6, instruction: "Serve over jasmine rice, garnished with Thai basil and a squeeze of lime.", duration: "1 min" },
    ],
  },
  "kale-quinoa-bowl": {
    id: "kale-quinoa-bowl",
    name: "Kale & Quinoa Bowl",
    slug: "kale-quinoa-bowl",
    description: "Massaged kale, tri-color quinoa, roasted sweet potato, toasted pepitas, and lemon-tahini dressing.",
    tag: "Vegan · 15 min",
    diet: ["vegan", "vegetarian", "gluten-free", "dairy-free"],
    prepTime: "5 min",
    cookTime: "10 min",
    totalTime: "15 min",
    price: 10.99,
    color: "from-[oklch(0.78_0.12_145)] to-[oklch(0.68_0.14_140)]",
    serves: "2",
    difficulty: "Easy",
    imageColor: "from-green-300 via-emerald-400 to-teal-500",
    ingredients: [
      "1 cup tri-color quinoa",
      "2 cups water or vegetable broth",
      "1 large sweet potato, cubed",
      "2 tbsp olive oil",
      "3 cups curly kale, stems removed",
      "1/4 cup tahini",
      "2 tbsp lemon juice",
      "1 tbsp maple syrup",
      "1 clove garlic, minced",
      "1/4 cup toasted pepitas",
      "Salt and pepper to taste",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Cook quinoa: rinse, add to pot with water/broth, boil, cover, simmer 12 minutes, remove from heat and let stand 5 minutes.", duration: "17 min" },
      { id: "s2", number: 2, instruction: "Preheat air fryer to 400°F (or oven). Toss sweet potato cubes with 1 tbsp oil, salt, pepper. Cook 12 minutes, shaking halfway.", duration: "12 min", tip: "For extra caramelization, add a sprinkle of cinnamon or smoked paprika to the sweet potatoes." },
      { id: "s3", number: 3, instruction: "While those cook, make dressing: whisk tahini, lemon juice, maple syrup, garlic, and 3–4 tbsp warm water. Season with salt.", duration: "3 min" },
      { id: "s4", number: 4, instruction: "Place kale in a large bowl with remaining 1 tbsp oil and a pinch of salt. Massage with your hands for 2 minutes until dark and tender.", duration: "2 min", tip: "Massaging kale breaks down the tough fibers — don't skip this step or the kale will be chewy." },
      { id: "s5", number: 5, instruction: "Divide kale and quinoa between bowls. Top with sweet potatoes, pepitas, and a generous drizzle of tahini dressing.", duration: "2 min" },
    ],
  },
  "honey-glazed-salmon": {
    id: "honey-glazed-salmon",
    name: "Honey Glazed Salmon",
    slug: "honey-glazed-salmon",
    description: "Wild salmon with honey-soy glaze, sesame roasted asparagus, and coconut jasmine rice.",
    tag: "Seafood · 20 min",
    diet: ["dairy-free", "gluten-free"],
    prepTime: "5 min",
    cookTime: "15 min",
    totalTime: "20 min",
    price: 16.99,
    color: "from-[oklch(0.65_0.16_55)] to-[oklch(0.55_0.18_45)]",
    serves: "2",
    difficulty: "Medium",
    imageColor: "from-rose-300 via-pink-400 to-orange-500",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "3 tbsp honey",
      "2 tbsp soy sauce (or tamari)",
      "1 tbsp rice vinegar",
      "1 tsp grated ginger",
      "1 bunch asparagus, trimmed",
      "1 tbsp sesame oil",
      "1 tbsp sesame seeds",
      "1 cup jasmine rice",
      "1 1/4 cups coconut milk (or water)",
      "Green onions for garnish",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Cook rice: rinse jasmine rice, add to pot with coconut milk and a pinch of salt. Bring to boil, cover, simmer 12 minutes, rest 5 minutes.", duration: "17 min", tip: "Coconut milk makes the rice rich and fragrant — stir gently to avoid breaking the grains." },
      { id: "s2", number: 2, instruction: "Whisk honey, soy sauce, rice vinegar, and ginger in a small bowl. Place salmon in a dish and pour half the glaze over. Marinate 5 minutes.", duration: "5 min" },
      { id: "s3", number: 3, instruction: "Preheat oven to 400°F. Toss asparagus with sesame oil, salt, and pepper. Arrange on one side of a baking sheet.", duration: "3 min" },
      { id: "s4", number: 4, instruction: "Place salmon fillets skin-side down on the same sheet. Brush with remaining glaze and sprinkle sesame seeds. Roast 10–12 minutes until salmon flakes easily.", duration: "12 min", tip: "Salmon is done at 125°F internal for medium or 135°F for well done — it will continue cooking as it rests." },
      { id: "s5", number: 5, instruction: "Serve salmon and asparagus over coconut rice. Garnish with sliced green onions.", duration: "1 min" },
    ],
  },
  "mushroom-truffle-pasta": {
    id: "mushroom-truffle-pasta",
    name: "Mushroom Truffle Pasta",
    slug: "mushroom-truffle-pasta",
    description: "Wild mushrooms in a truffle cream sauce over pappardelle, finished with fresh parsley and pecorino.",
    tag: "Pasta · 25 min",
    diet: ["vegetarian"],
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    price: 14.49,
    color: "from-[oklch(0.55_0.12_30)] to-[oklch(0.48_0.1_28)]",
    serves: "2–4",
    difficulty: "Medium",
    imageColor: "from-stone-400 via-amber-600 to-brown-700",
    ingredients: [
      "8 oz pappardelle pasta",
      "12 oz mixed wild mushrooms, sliced",
      "2 tbsp butter",
      "2 cloves garlic, minced",
      "1 cup heavy cream",
      "1/2 cup grated pecorino Romano",
      "1 tbsp truffle oil",
      "1/4 cup fresh parsley, chopped",
      "Salt and pepper to taste",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Cook pappardelle in salted boiling water until al dente. Reserve 1 cup pasta water before draining.", duration: "8 min", tip: "Pappardelle is delicate — stir gently to prevent tearing." },
      { id: "s2", number: 2, instruction: "While pasta cooks, melt butter in a large skillet over medium-high heat. Add mushrooms in a single layer and cook without stirring for 3 minutes until deeply golden.", duration: "5 min", tip: "Don't stir the mushrooms for the first 3 minutes — they need direct contact with the pan to brown properly." },
      { id: "s3", number: 3, instruction: "Add garlic and cook 30 seconds. Pour in cream and bring to a gentle simmer. Cook 2 minutes until slightly thickened.", duration: "3 min" },
      { id: "s4", number: 4, instruction: "Add pecorino and stir until melted. Season with salt and pepper. Add truffle oil and stir.", duration: "2 min" },
      { id: "s5", number: 5, instruction: "Add drained pasta to the sauce. Toss to coat, adding pasta water a splash at a time if too thick.", duration: "2 min" },
      { id: "s6", number: 6, instruction: "Serve immediately with extra pecorino and fresh parsley on top.", duration: "1 min" },
    ],
  },
  "chipotle-black-bean-tacos": {
    id: "chipotle-black-bean-tacos",
    name: "Chipotle Black Bean Tacos",
    slug: "chipotle-black-bean-tacos",
    description: "Spiced black beans, pickled red onion, avocado crema, and cotija cheese on warm corn tortillas.",
    tag: "Mexican · 20 min",
    diet: ["vegetarian", "gluten-free"],
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    price: 11.49,
    color: "from-[oklch(0.62_0.18_55)] to-[oklch(0.55_0.16_50)]",
    serves: "2",
    difficulty: "Easy",
    imageColor: "from-orange-300 via-red-400 to-yellow-500",
    ingredients: [
      "1 can (15 oz) black beans, drained and rinsed",
      "1 tbsp olive oil",
      "1/2 onion, diced",
      "2 cloves garlic, minced",
      "1 chipotle pepper in adobo, minced",
      "1 tsp cumin",
      "1/2 tsp smoked paprika",
      "8 small corn tortillas",
      "1 avocado",
      "1/4 cup sour cream",
      "1 lime, juiced",
      "1/2 cup crumbled cotija cheese",
      "1/4 cup pickled red onions",
      "Fresh cilantro",
    ],
    steps: [
      { id: "s1", number: 1, instruction: "Heat oil in a skillet over medium. Sauté onion 3 minutes until soft. Add garlic, chipotle, cumin, and paprika. Cook 1 minute.", duration: "4 min" },
      { id: "s2", number: 2, instruction: "Add black beans and 1/4 cup water. Mash lightly with a fork. Cook 5 minutes until thickened. Season with salt.", duration: "5 min", tip: "Mashing some beans creates a creamier texture while keeping others whole for bite." },
      { id: "s3", number: 3, instruction: "Make avocado crema: blend avocado, sour cream, lime juice, and salt until smooth.", duration: "2 min" },
      { id: "s4", number: 4, instruction: "Warm tortillas in a dry skillet or over a gas flame for 30 seconds per side until lightly charred and pliable.", duration: "3 min" },
      { id: "s5", number: 5, instruction: "Assemble tacos: spread avocado crema on tortillas, top with black bean mixture, cotija, pickled onions, and cilantro. Serve with lime wedges.", duration: "3 min" },
    ],
  },
};

export default function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [timerRunning, setTimerRunning] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const resolvedParams = { slug: "" };
  // We handle the async params via a pattern
  const [slug, setSlug] = useState<string>("");
  
  // Resolve the async params
  params.then((p) => setSlug(p.slug));

  const recipe = slug ? recipes[slug] : undefined;

  if (!recipe) {
    return notFound();
  }

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const progress = recipe.steps.length > 0
    ? Math.round((completedSteps.size / recipe.steps.length) * 100)
    : 0;

  const startTimer = (durationStr: string) => {
    if (timerRunning) return;
    const match = durationStr.match(/(\d+)/);
    if (!match) return;
    const minutes = parseInt(match[1]);
    setTimerRunning(durationStr);
    setTimerSeconds(minutes * 60);
    
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerRunning(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero spread — cookbook recipe header */}
      <section className={`bg-gradient-to-br ${recipe.color}`}>
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Menu
          </Link>
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.diet.map((d) => (
                  <Badge key={d} variant="secondary" className="text-[0.55rem] capitalize bg-white/20 text-white hover:bg-white/30">
                    {d}
                  </Badge>
                ))}
              </div>
              <h1 className="font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
                {recipe.name}
              </h1>
              <p className="mt-4 font-serif text-sm italic text-white/80 leading-relaxed max-w-lg">
                {recipe.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-[0.65rem] text-white/70 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ChefHat className="h-3.5 w-3.5" />
                  {recipe.difficulty}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {recipe.totalTime}
                </span>
                <span className="flex items-center gap-1.5">
                  Prep {recipe.prepTime} · Cook {recipe.cookTime}
                </span>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <span className="price-badge text-sm">
                ${recipe.price.toFixed(2)}/serving
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Left — Ingredients + Steps */}
          <div>
            {/* Progress bar */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {completedSteps.size}/{recipe.steps.length} steps
              </span>
            </div>

            {/* Ingredients — cookbook-style checklist */}
            <div className="photo-card p-6 mb-8">
              <h2 className="handwritten text-lg text-primary mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="block w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps — with checklist and timer */}
            <div>
              <h2 className="handwritten text-lg text-primary mb-4">Method</h2>
              <div className="space-y-6">
                {recipe.steps.map((step) => {
                  const done = completedSteps.has(step.id);
                  const isTiming = timerRunning === step.duration;
                  return (
                    <div
                      key={step.id}
                      className={`photo-card p-5 transition-all ${
                        done ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleStep(step.id)}
                          className={`shrink-0 mt-0.5 transition-colors ${
                            done ? "text-secondary" : "text-muted-foreground/40 hover:text-primary"
                          }`}
                          aria-label={done ? "Unmark step" : "Mark step done"}
                        >
                          {done ? (
                            <CheckCircle className="h-5 w-5 text-secondary" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="handwritten text-xs text-primary/60">Step {step.number}</span>
                            {step.duration && (
                              <span className="inline-flex items-center gap-1 text-[0.55rem] text-muted-foreground uppercase tracking-wider">
                                <Timer className="h-3 w-3" />
                                {isTiming ? (
                                  <button
                                    onClick={() => { setTimerRunning(null); setTimerSeconds(0); }}
                                    className="text-primary font-mono"
                                  >
                                    {formatTime(timerSeconds)}
                                  </button>
                                ) : (
                                  step.duration
                                )}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm leading-relaxed ${done ? "line-through" : ""}`}>
                            {step.instruction}
                          </p>
                          {step.tip && !done && (
                            <div className="mt-3 flex items-start gap-2 bg-secondary/10 rounded-lg p-3">
                              <span className="handwritten text-xs text-secondary shrink-0">Tip</span>
                              <p className="text-[0.65rem] text-muted-foreground leading-relaxed">
                                {step.tip}
                              </p>
                            </div>
                          )}
                          {step.duration && !done && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="mt-2"
                              onClick={() => startTimer(step.duration!)}
                              disabled={isTiming}
                            >
                              <Timer className="h-3 w-3 mr-1" />
                              {isTiming ? formatTime(timerSeconds) : `Start ${step.duration} timer`}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right sidebar — recipe info */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="photo-card p-6 space-y-4">
              <h3 className="handwritten text-sm text-primary">Recipe Details</h3>
              <hr className="cookbook-rule" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prep Time</span>
                  <span className="font-medium">{recipe.prepTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cook Time</span>
                  <span className="font-medium">{recipe.cookTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">{recipe.totalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serves</span>
                  <span className="font-medium">{recipe.serves}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium">{recipe.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium text-primary">${recipe.price.toFixed(2)}/serv</span>
                </div>
              </div>

              <hr className="cookbook-rule" />

              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Dietary</h4>
                <div className="flex flex-wrap gap-1.5">
                  {recipe.diet.map((d) => (
                    <Badge key={d} variant="outline" className="text-[0.55rem] capitalize">
                      {d}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/plan">Add to Box</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}