export default function Footer() {
  return (
    <footer className="site-footer mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <a
                href="/bgmi-name-generator"
                suppressHydrationWarning
                className="footer-link"
              >
                BGMI name style
              </a>
            </li>
            <li>
              <a
                href="/free-fire-name-generator"
                suppressHydrationWarning
                className="footer-link"
              >
                Free Fire name style
              </a>
            </li>
          </ul>
        </nav>
        <p className="footer-link">© 2025 StylishNameGenerator.in</p>
      </div>
    </footer>
  );
}
