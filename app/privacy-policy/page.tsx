import type { Metadata } from "next";
import Link from "next/link";
import TrustPageShell from "@/components/TrustPageShell";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/privacy-policy";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE = "Privacy Policy — StylishNameGenerator.in";
const DESCRIPTION =
  "How StylishNameGenerator.in handles your data. No sign-up required — learn what we collect via analytics, cookies, and third-party services.";

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

export default function PrivacyPolicyPage() {
  return (
    <TrustPageShell
      title="Privacy Policy"
      breadcrumbLabel="Privacy Policy"
      lead={<p>Effective Date: June 18, 2026</p>}
    >
      <section aria-labelledby="privacy-intro">
        <p id="privacy-intro">
          This Privacy Policy explains how StylishNameGenerator.in
          (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;this site&rdquo;)
          handles information when you visit our website. We&apos;ve kept this
          as simple and transparent as the tool itself.
        </p>
      </section>

      <section aria-labelledby="info-collect-heading">
        <h2 id="info-collect-heading" className="article-heading">
          Information We Collect
        </h2>
        <p>
          StylishNameGenerator.in does not require account creation, sign-up, or
          login to use any of our tools. You can generate, browse, and copy
          stylish names without submitting any personal information.
        </p>
        <p>
          However, like most websites, we automatically collect limited
          technical data when you visit, including:
        </p>
        <ul className="article-rules">
          <li>Your IP address and general location (country/region level)</li>
          <li>Browser type and device type</li>
          <li>Pages visited and time spent on the site</li>
          <li>Referring website (how you arrived at our site)</li>
        </ul>
        <p>
          This data is collected through Google Analytics and is used solely to
          understand how visitors use the site and to improve our content and
          tools.
        </p>
      </section>

      <section aria-labelledby="cookies-heading">
        <h2 id="cookies-heading" className="article-heading">
          Cookies
        </h2>
        <p>
          We use cookies and similar tracking technologies for two purposes:
          site analytics (via Google Analytics) and advertising (via Google
          AdSense, once active). Cookies are small data files stored on your
          device that help these services function.
        </p>
        <p>
          You can disable cookies at any time through your browser settings.
          Note that disabling cookies may affect how some parts of the site
          function.
        </p>
      </section>

      <section aria-labelledby="adsense-heading">
        <h2 id="adsense-heading" className="article-heading">
          Google AdSense and Advertising
        </h2>
        <p>
          This site uses or intends to use Google AdSense to display
          advertisements. Google and its partners may use cookies, including the
          DoubleClick DART cookie, to serve ads based on your visits to this
          site and other sites on the internet.
        </p>
        <p>
          You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="article-link"
          >
            Google&apos;s Ads Settings page
          </a>
          . For more information on how Google uses data when you use our site,
          see{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="article-link"
          >
            Google&apos;s Privacy &amp; Terms
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="analytics-heading">
        <h2 id="analytics-heading" className="article-heading">
          Google Analytics
        </h2>
        <p>
          We use Google Analytics to understand site traffic and visitor
          behavior. Google Analytics collects data such as pages visited,
          session duration, and device information. This data is aggregated and
          does not personally identify individual visitors. Read more in{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="article-link"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="children-heading">
        <h2 id="children-heading" className="article-heading">
          Children&apos;s Privacy
        </h2>
        <p>
          StylishNameGenerator.in does not knowingly collect personal
          information from children under the age of 13. Since our tools require
          no sign-up, login, or personal data submission, we do not collect any
          identifying information from any visitor, including minors. If we
          become aware that personal data has been inadvertently collected from
          a child under 13, we will take steps to delete it promptly.
        </p>
      </section>

      <section aria-labelledby="third-party-heading">
        <h2 id="third-party-heading" className="article-heading">
          Third-Party Links
        </h2>
        <p>
          Our site contains references and links to third-party platforms,
          including but not limited to BGMI, Free Fire, and Instagram. We are
          not responsible for the privacy practices or content of these external
          sites. We encourage you to review their respective privacy policies.
        </p>
      </section>

      <section aria-labelledby="security-heading">
        <h2 id="security-heading" className="article-heading">
          Data Security
        </h2>
        <p>
          While we do not collect personal data directly, we take reasonable
          measures to ensure the technical data collected through analytics
          tools is handled securely and in accordance with the practices of our
          third-party providers (Google).
        </p>
      </section>

      <section aria-labelledby="changes-heading">
        <h2 id="changes-heading" className="article-heading">
          Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices or for legal and regulatory reasons. Any
          changes will be posted on this page with a revised effective date.
          Continued use of the site after changes constitutes acceptance of the
          updated policy.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="article-heading">
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please reach out
          via our{" "}
          <Link href="/contact-us" className="article-link">
            Contact Us
          </Link>{" "}
          page or email us at{" "}
          <a
            href="mailto:stylishnamegeneratorr@gmail.com"
            className="article-link"
          >
            stylishnamegeneratorr@gmail.com
          </a>
          .
        </p>
      </section>
    </TrustPageShell>
  );
}
