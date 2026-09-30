import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    meals: "2 meals / week",
    servings: "2 servings each",
    description: "Perfect for couples or light meal preppers.",
    popular: false,
    features: [
      "Choose from 8 weekly recipes",
      "Farm-fresh ingredients",
      "Step-by-step recipe cards",
      "Free delivery (orders $49+)",
      "Skip or cancel anytime",
    ],
  },
  {
    name: "Family",
    price: "79",
    meals: "4 meals / week",
    servings: "4 servings each",
    description: "Our most popular plan for hungry households.",
    popular: true,
    features: [
      "Everything in Starter",
      "4 recipes with 4 servings each",
      "Priority seasonal produce",
      "Free delivery on all orders",
      "Swap meals up to 48h before",
    ],
  },
  {
    name: "Feast",
    price: "119",
    meals: "6 meals / week",
    servings: "4 servings each",
    description: "For the family that loves leftovers and variety.",
    popular: false,
    features: [
      "Everything in Family",
      "6 recipes, 4 servings each",
      "Premium ingredient upgrades",
      "Exclusive chef's table recipes",
      "Dedicated support line",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-gradient-to-b from-background to-primary/5 py-20 sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl tracking-tight sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            No hidden fees. No commitments. Just great food.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col border-border/50 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary ring-1 ring-primary shadow-lg scale-[1.02]"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="p-6 pb-0 text-center">
                <CardTitle className="font-heading text-xl">{plan.name}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/week</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.meals} • {plan.servings}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-6 pt-4">
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a href="#subscribe">
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            All plans include free delivery on first order. Add-ons available at
            checkout.
          </p>
        </div>
      </div>
    </section>
  );
}