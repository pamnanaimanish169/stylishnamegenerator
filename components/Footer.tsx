export default function Footer() {
  return (
    <footer className="site-footer mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8 sm:px-6">
        <nav aria-label="Legal and information">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <a
                href="/about-us"
                suppressHydrationWarning
                className="footer-link"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                suppressHydrationWarning
                className="footer-link"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                suppressHydrationWarning
                className="footer-link"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/disclaimer"
                suppressHydrationWarning
                className="footer-link"
              >
                Disclaimer
              </a>
            </li>
          </ul>
        </nav>
        <p className="footer-link">© 2026 StylishNameGenerator.in</p>
      </div>
    </footer>
  );
}
