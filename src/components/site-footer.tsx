import Link from "next/link";

const footerLinks = [
  { href: "/menu", label: "Weekly Menu" },
  { href: "/plan", label: "Meal Planner" },
  { href: "/recipes", label: "Recipes" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-muted">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              <span className="text-primary">Mesa</span>
              <span className="font-hand text-base text-muted-foreground"> Kitchen</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Real food, real simple. Farm-fresh ingredients, chef-crafted
              recipes, delivered to your door.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary/10 pt-6 text-center font-hand text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mesa Kitchen. All rights reserved. Made with love, from our kitchen to yours.</p>
        </div>
      </div>
    </footer>
  );
}