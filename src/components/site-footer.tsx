import Link from "next/link";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Weekly Menu", href: "/menu" },
      { label: "Recipes", href: "/recipes" },
      { label: "Box Builder", href: "/box-builder" },
      { label: "Pantry Swap", href: "/pantry-swap" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Delivery", href: "#" },
      { label: "Returns", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-2xl tracking-tight text-primary">
              Mesa
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Real food, real simple. Chef-crafted meal kits delivered fresh to your door.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Mesa. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}