import { HeroSection } from "@/components/hero-section";
import { MenuSection } from "@/components/menu-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { RecipesSection } from "@/components/recipes-section";
import { PricingSection } from "@/components/pricing-section";
import { SubscribeSection } from "@/components/subscribe-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MenuSection />
      <HowItWorksSection />
      <RecipesSection />
      <PricingSection />
      <SubscribeSection />
    </>
  );
}