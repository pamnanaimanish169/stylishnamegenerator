import type { Metadata } from "next";
import Link from "next/link";
import TrustPageShell from "@/components/TrustPageShell";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/disclaimer";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE = "Disclaimer — StylishNameGenerator.in";
const DESCRIPTION =
  "Important disclaimers about StylishNameGenerator.in — no official affiliation with game publishers, compatibility accuracy, and use at your own discretion.";

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

export default function DisclaimerPage() {
  return (
    <TrustPageShell
      title="Disclaimer"
      breadcrumbLabel="Disclaimer"
      lead={<p>Last Updated: June 18, 2026</p>}
    >
      <section aria-labelledby="disclaimer-intro">
        <p id="disclaimer-intro">
          Please read this disclaimer carefully before using
          StylishNameGenerator.in.
        </p>
      </section>

      <section aria-labelledby="affiliation-heading">
        <h2 id="affiliation-heading" className="article-heading">
          No Official Affiliation
        </h2>
        <p>
          StylishNameGenerator.in is an independent website and is not
          affiliated with, endorsed by, sponsored by, or officially connected to
          Krafton, Garena, BGMI (Battlegrounds Mobile India), Free Fire, Free
          Fire MAX, Instagram, Meta, or any other platform, game, or brand
          referenced on this site. All product names, logos, trademarks, and
          brand names mentioned are the property of their respective owners and
          are used here for identification and informational purposes only.
        </p>
      </section>

      <section aria-labelledby="accuracy-heading">
        <h2 id="accuracy-heading" className="article-heading">
          Accuracy of Compatibility Information
        </h2>
        <p>
          Our font and symbol compatibility tables (including those on our BGMI
          and Free Fire pages) are based on testing conducted at the time of
          publication, using specific game versions and devices noted on each
          page. Game updates can change how Unicode characters render without
          notice. While we periodically re-test and update this information, we
          cannot guarantee that compatibility data reflects the current state of
          every platform at every moment. Always test a styled name before
          committing to it, especially before spending in-game currency on a
          paid rename.
        </p>
      </section>

      <section aria-labelledby="acceptance-heading">
        <h2 id="acceptance-heading" className="article-heading">
          No Guarantee of In-Game Acceptance
        </h2>
        <p>
          Game and social media platforms may restrict, filter, or reject
          certain characters, symbols, or name styles at their own discretion,
          and these policies can change at any time. We do not control how any
          third-party platform processes or displays names generated using our
          tools, and we cannot guarantee a particular style will be accepted or
          display correctly.
        </p>
      </section>

      <section aria-labelledby="discretion-heading">
        <h2 id="discretion-heading" className="article-heading">
          Use at Your Own Discretion
        </h2>
        <p>
          The tools and name suggestions on this site are provided for
          customization and entertainment purposes. You are responsible for
          ensuring that any name you choose complies with the terms of service,
          community guidelines, and naming policies of the platform you intend
          to use it on. We do not encourage impersonation, trademark misuse, or
          any name that violates a platform&apos;s rules.
        </p>
      </section>

      <section aria-labelledby="external-links-heading">
        <h2 id="external-links-heading" className="article-heading">
          External Links
        </h2>
        <p>
          This site contains links to external platforms and resources,
          including game websites and social media platforms. We are not
          responsible for the content, accuracy, availability, or privacy
          practices of any external site linked from StylishNameGenerator.in.
        </p>
      </section>

      <section aria-labelledby="liability-heading">
        <h2 id="liability-heading" className="article-heading">
          Limitation of Liability
        </h2>
        <p>
          StylishNameGenerator.in and its operators are not liable for any loss,
          damage, account restriction, lost rename cards, in-game currency, or
          other consequence arising from the use of names, styles, or symbols
          generated through this site. Use of this site and its tools is
          entirely at your own risk.
        </p>
      </section>

      <section aria-labelledby="disclaimer-changes-heading">
        <h2 id="disclaimer-changes-heading" className="article-heading">
          Changes to This Disclaimer
        </h2>
        <p>
          We may update this Disclaimer periodically to reflect changes in our
          practices or in response to platform policy changes. The &ldquo;Last
          Updated&rdquo; date at the top of this page reflects the most recent
          revision.
        </p>
      </section>

      <section aria-labelledby="questions-heading">
        <h2 id="questions-heading" className="article-heading">
          Questions
        </h2>
        <p>
          If you have questions about this Disclaimer, please contact us via our{" "}
          <Link href="/contact-us" className="article-link">
            Contact Us
          </Link>{" "}
          page.
        </p>
      </section>
    </TrustPageShell>
  );
}
