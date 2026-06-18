import type { Metadata } from "next";
import Link from "next/link";
import TrustPageShell from "@/components/TrustPageShell";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/about-us";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE = "About Us — StylishNameGenerator.in";
const DESCRIPTION =
  "Why I built StylishNameGenerator.in — one place to type a name, compare every Unicode style side by side, and copy what fits for BGMI, Free Fire, and more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "Stylish Name Generator",
    locale: "en_IN",
  },
};

export default function AboutUsPage() {
  return (
    <TrustPageShell
      title={"Hi, I'm Manish — Welcome to StylishNameGenerator.in"}
      breadcrumbLabel="About Us"
    >
      <section aria-labelledby="origin-heading">
        <p>
          I built this site in 2025 after spending way too long trying to
          figure out how players in my Counter-Strike lobbies got those fancy,
          curved-letter names while mine sat there in plain text. I assumed
          there was a hidden settings menu. There wasn&apos;t. The answer was
          simpler and a little anticlimactic: you don&apos;t generate stylish
          names inside a game. You copy them from a tool and paste them in.
        </p>
        <p>
          Once I understood that, I went looking for the right tool — and kept
          running into the same problem. Every site offered a piece of what I
          wanted. One had cursive fonts buried in a sub-menu of fifty other
          text converters. Another had gaming borders but no Unicode variety.
          None of them felt built for someone who just wanted to type a name
          once, compare every style side by side, and copy the one that fit.
        </p>
        <p>So I built StylishNameGenerator.in to be that one place.</p>
      </section>

      <section aria-labelledby="what-we-do-heading">
        <h2 id="what-we-do-heading" className="article-heading">
          What This Site Actually Does
        </h2>
        <p>
          We convert plain text into Unicode-based &ldquo;fancy font&rdquo;
          styles — bold, cursive, fraktur, circled, small caps, and more —
          that you can copy and paste into games like BGMI and Free Fire, or
          into social platforms like Instagram and WhatsApp. No installs, no
          sign-ups, no hidden fees. Type your name, browse the styles, copy what
          fits, and go.
        </p>
      </section>

      <section aria-labelledby="different-heading">
        <h2 id="different-heading" className="article-heading">
          What Makes This Site Different
        </h2>
        <p>
          Most stylish name tools stop at generating text. We go a step further:
          we actually test how each font style behaves inside the platforms
          people use them on. Our BGMI and Free Fire pages include compatibility
          tables built from hands-on testing — which fonts render cleanly in the
          lobby, which break in the kill feed, which show up as boxes on certain
          devices. We mark a &ldquo;last tested&rdquo; version and date on these
          pages so you know the data reflects the current game build, not a
          one-time check from months ago.
        </p>
        <p>
          We also try to be upfront about what we haven&apos;t verified yet. If
          we haven&apos;t tested something, we say so, rather than guessing and
          letting you waste a rename card finding out the hard way.
        </p>
      </section>

      <section aria-labelledby="testing-heading">
        <h2 id="testing-heading" className="article-heading">
          Our Testing Process
        </h2>
        <p>
          When we publish compatibility data, it comes from actually renaming
          test accounts and checking results across multiple surfaces — profile
          name, kill feed, squad list, and device type (Android and iOS,
          including some custom Android skins where rendering can differ). We
          revisit these tests after major game updates, since Unicode rendering
          support can change between patches.
        </p>
      </section>

      <section aria-labelledby="whats-next-heading">
        <h2 id="whats-next-heading" className="article-heading">
          What&apos;s Next
        </h2>
        <p>
          We&apos;re actively expanding the site to cover more platforms —
          Instagram, WhatsApp, Facebook, and YouTube name styling are next on
          our list, each with their own platform-specific testing rather than a
          copy-paste of existing pages. If there&apos;s a platform or feature
          you&apos;d like to see covered, let us know — see the Contact Us page
          below.
        </p>
      </section>

      <section aria-labelledby="get-in-touch-heading">
        <h2 id="get-in-touch-heading" className="article-heading">
          Get in Touch
        </h2>
        <p>
          Questions, feedback, or found a font that doesn&apos;t render the way
          we said it would? We&apos;d genuinely like to hear about it — head
          over to our{" "}
          <Link href="/contact-us" className="article-link">
            Contact Us
          </Link>{" "}
          page.
        </p>
      </section>
    </TrustPageShell>
  );
}
