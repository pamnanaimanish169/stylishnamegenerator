import Logo from "@/components/Logo";

const navLinks = [
  { href: "/bgmi-name-generator", label: "BGMI Generator" },
  { href: "/free-fire-name-generator", label: "Free Fire Generator" },
  { href: "/instagram-stylish-fonts", label: "Instagram Fonts" },
];

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a href="/" suppressHydrationWarning className="logo-brand-link">
          <Logo />
        </a>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  suppressHydrationWarning
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
