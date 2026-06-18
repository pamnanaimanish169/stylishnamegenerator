import type { Metadata } from "next";
import Link from "next/link";
import TrustPageShell from "@/components/TrustPageShell";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/contact-us";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const TITLE = "Contact Us — StylishNameGenerator.in";
const DESCRIPTION =
  "Report a font rendering issue, suggest a new platform, or ask a question about StylishNameGenerator.in. We typically respond within 2–3 business days.";

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

export default function ContactUsPage() {
  return (
    <TrustPageShell title="Contact Us" breadcrumbLabel="Contact Us">
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="article-heading">
          Get in Touch
        </h2>
        <p>
          Whether you&apos;ve found a font that doesn&apos;t render the way we
          documented, want to suggest a platform we should add, or just have a
          question about how the tool works — we&apos;d like to hear from you.
        </p>
      </section>

      <section aria-labelledby="reach-heading">
        <h2 id="reach-heading" className="article-heading">
          How to Reach Us
        </h2>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:stylishnamegeneratorr@gmail.com"
            className="article-link"
          >
            stylishnamegeneratorr@gmail.com
          </a>
        </p>
        <p>We typically respond within 2–3 business days.</p>
      </section>

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="article-heading">
          What to Contact Us About
        </h2>

        <h3 className="article-subheading">Report a rendering issue</h3>
        <p>
          If you tested a font style on BGMI, Free Fire, or another platform and
          it didn&apos;t behave the way our compatibility tables describe, let
          us know which style, which platform, and which device you used. This
          directly helps us keep our testing data accurate.
        </p>

        <h3 className="article-subheading">Suggest a new platform or feature</h3>
        <p>
          Want stylish names for a platform we don&apos;t cover yet, or an idea
          for how the tool could work better? We&apos;re actively building out
          new pages and would rather prioritize what people actually want.
        </p>

        <h3 className="article-subheading">Business or advertising inquiries</h3>
        <p>
          For partnership, advertising, or media inquiries, please use the email
          above with &ldquo;Business Inquiry&rdquo; in the subject line.
        </p>

        <h3 className="article-subheading">Privacy or data questions</h3>
        <p>
          For questions related to our{" "}
          <Link href="/privacy-policy" className="article-link">
            Privacy Policy
          </Link>
          , please use the same email with &ldquo;Privacy&rdquo; in the subject
          line.
        </p>
      </section>

      <section aria-labelledby="before-heading">
        <h2 id="before-heading" className="article-heading">
          Before You Reach Out
        </h2>
        <p>
          If your question is about whether a specific font style works on a
          specific platform, check our compatibility tables on the{" "}
          <Link href="/bgmi-name-generator" className="article-link">
            BGMI Name Generator
          </Link>{" "}
          or{" "}
          <Link href="/free-fire-name-generator" className="article-link">
            Free Fire Name Generator
          </Link>{" "}
          pages first — your answer may already be there.
        </p>
      </section>
    </TrustPageShell>
  );
}
