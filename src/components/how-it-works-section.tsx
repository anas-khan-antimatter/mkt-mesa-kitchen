import { ClipboardList, ShoppingBag, ChefHat, Truck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Pick Your Meals",
    description:
      "Browse our weekly menu of 8+ chef-crafted recipes and choose what looks good. Filter by dietary preference or craving.",
  },
  {
    icon: ShoppingBag,
    title: "We Prep the Ingredients",
    description:
      "Our team sources the freshest farm ingredients, precisely portioned for zero waste. Everything arrives in a chilled box.",
  },
  {
    icon: ChefHat,
    title: "Cook in 25–35 Minutes",
    description:
      "Follow our step-by-step recipe cards with pro tips. No complicated techniques — just great food anyone can make.",
  },
  {
    icon: Truck,
    title: "Enjoy & Repeat",
    description:
      "Skip weeks when life gets busy, swap meals, or cancel anytime. Dinner is finally something to look forward to.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-background to-primary/5 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Fresh, fuss-free cooking — from our kitchen to yours.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-0.5 w-[calc(100%-4rem)] -translate-y-1/2 bg-gradient-to-r from-primary/30 to-primary/10 lg:block" />
                )}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}