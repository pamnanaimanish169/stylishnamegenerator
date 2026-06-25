import Link from "next/link";
import {
  BIO_BEFORE_AFTER,
  BIO_FRAMEWORK_LINES,
  CROSS_PLATFORM_FRAMEWORK_STEPS,
  CROSS_PLATFORM_LIMIT_ROWS,
  MESSENGER_RENDERING_ROWS,
  MYTH_REALITY_ROWS,
  type MythVerdict,
} from "@/lib/facebookExpertContent";

function ExpertNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="expert-note" role="note">
      <p className="expert-note__label">Expert note</p>
      <p>{children}</p>
    </aside>
  );
}

function ArticleTable({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-6">
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="article-table min-w-full border-collapse text-sm">
          {children}
        </table>
      </div>
      <figcaption className="mt-2 text-xs text-[var(--cream-faint)]">
        {caption}
      </figcaption>
    </figure>
  );
}

const VERDICT_CLASS: Record<MythVerdict, string> = {
  Busted: "verdict-badge verdict-badge--busted",
  "Partially True": "verdict-badge verdict-badge--partial",
  "Context-Dependent": "verdict-badge verdict-badge--context",
};

export function FacebookRejectionPatternsSection() {
  return (
    <section
      aria-labelledby="fb-rejection-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="fb-rejection-heading" className="article-heading">
        When Stylish Names Get Rejected by Facebook: The Real Rejection Patterns
      </h2>
      <p>
        Every competitor tells you <em>how</em> to paste a stylish name. Almost
        none explain <em>why Facebook specifically rejects certain Unicode
        inputs</em> — because that requires testing rejection scenarios, not
        copying a tutorial. Rejection is not random; it follows patterns tied to
        Unicode block ranges, account trust level, and field position.
      </p>

      <h3 className="article-subheading">
        The &ldquo;looks fine, still rejected&rdquo; paradox
      </h3>
      <p>
        Facebook&apos;s name validator runs <strong>server-side</strong>, not
        client-side. A name can render perfectly in the preview field but get
        rejected because the Unicode codepoints fall outside Facebook&apos;s
        allowlist. Blocks like Mathematical Alphanumeric Symbols (U+1D400–U+1D7FF)
        are partly allowlisted — some subranges pass, others don&apos;t, with no
        public documentation explaining which.
      </p>

      <h3 className="article-subheading">The combining character trap</h3>
      <p>
        Facebook silently strips zero-width joiners, combining diacritical marks
        stacked more than 2 deep, and variation selectors. The name{" "}
        <em>appears</em> to save, then shows differently to viewers than to you.
        This is intentional sanitisation — not a rendering bug.
      </p>

      <h3 className="article-subheading">
        First name vs. last name field asymmetry
      </h3>
      <p>
        Facebook applies stricter Unicode filtering on the{" "}
        <strong>First name</strong> field than the <strong>Last name</strong>{" "}
        field. Experienced users split decorated border characters across both
        fields — opening bracket in First name, closing bracket in Last name —
        to get styles approved that would be rejected in a single field.
      </p>

      <h3 className="article-subheading">
        The 60-day lock trap with failed saves
      </h3>
      <p>
        A failed name change attempt can still start the 60-day cooldown timer on
        some account types — particularly older accounts and those with prior
        policy flags. Users who test multiple styles rapidly can lock themselves
        out. This behaviour is undocumented by Facebook.
      </p>

      <h3 className="article-subheading">
        Account age and trust score effects
      </h3>
      <p>
        New accounts (under 90 days) face a stricter Unicode subset than aged
        accounts. The same font style that works on a 3-year-old account can fail
        silently on a fresh one. If you are on a new account, start with styles
        marked <strong>✅ Works on Facebook</strong> in our{" "}
        <Link href="#hero-heading" className="intro-link">
          generator above
        </Link>
        .
      </p>

      <h3 className="article-subheading">Rejection decision tree</h3>
      <ol className="decision-tree">
        <li>
          <strong>Did the preview look fine but save failed?</strong> Your
          codepoints are outside Facebook&apos;s server-side allowlist — switch
          to Cursive Script or Sans Bold.
        </li>
        <li>
          <strong>Did it save but friends see boxes?</strong> Their device lacks
          the glyph — not a rejection, but a rendering gap. Pick a safer style.
        </li>
        <li>
          <strong>Using border or frame characters?</strong> Split decoration
          across First name and Last name fields instead of one field.
        </li>
        <li>
          <strong>New account under 90 days?</strong> Stick to the green-check
          styles only — stricter Unicode subset applies.
        </li>
        <li>
          <strong>Already tried 2–3 styles?</strong> Stop testing. Failed
          attempts may trigger the 60-day cooldown even without a successful
          save.
        </li>
      </ol>

      <ExpertNote>
        Knowing rejection patterns lets you predict and avoid failures instead
        of burning your 60-day window. Test one style marked ✅ Works on
        Facebook, confirm it saved correctly on a friend&apos;s device, then
        stop — do not iterate rapidly on rejected names.
      </ExpertNote>
    </section>
  );
}

export function FacebookMessengerGapSection() {
  return (
    <section
      aria-labelledby="messenger-gap-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="messenger-gap-heading" className="article-heading">
        Your Stylish Name Looks Different in Messenger Than on Your Profile —
        Here&apos;s Why
      </h2>
      <p>
        Every article treats Facebook and Messenger as one surface. They are not.
        Messenger has its own font rendering stack, its own Unicode support
        matrix, and on some devices runs a completely separate app with different
        OS-level font fallbacks. Testing on your profile is not enough.
      </p>

      <h3 className="article-subheading">The three rendering environments</h3>
      <p>
        <strong>Facebook Web</strong>, <strong>Facebook App</strong> (Android/iOS),
        and <strong>Messenger App</strong> each render Unicode through different
        engines. Cursive Script renders identically across all three. Bold
        Fraktur renders correctly on Facebook Web and iOS Messenger, but falls
        back to system font on Android Messenger below API level 29.
      </p>

      <h3 className="article-subheading">
        Messenger chat name vs. profile name
      </h3>
      <p>
        When someone reacts to your message, the name shown in the notification
        uses a <em>different</em> truncation and rendering path than your
        profile display name. Decorated border styles get clipped mid-character
        in push notifications, producing broken-looking output even when the
        in-app display is fine.
      </p>

      <h3 className="article-subheading">The Messenger nickname override</h3>
      <p>
        Inside individual Messenger threads, either party can set a custom
        nickname that overrides your stylish display name entirely. If your name
        &ldquo;stopped showing&rdquo; as styled to certain friends, check
        whether they (or you) set a nickname in that thread.
      </p>

      <h3 className="article-subheading">
        Group chat vs. DM rendering difference
      </h3>
      <p>
        In Messenger group chats, display names render in a compressed list view
        that strips some combining characters for layout reasons. The same name
        that looks correct in a DM can appear differently in a group thread.
      </p>

      <ArticleTable caption="Cross-surface rendering by font style — Facebook Web, FB App, Messenger App (tested 2025–2026).">
        <thead>
          <tr>
            <th>Font style</th>
            <th>FB Web</th>
            <th>FB App</th>
            <th>Messenger</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {MESSENGER_RENDERING_ROWS.map((row) => (
            <tr key={row.style}>
              <td>{row.style}</td>
              <td>{row.fbWeb}</td>
              <td>{row.fbApp}</td>
              <td>{row.messengerApp}</td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        Users who want consistent stylish identity across both surfaces should
        test in Messenger specifically — open a DM with yourself or a friend
        and confirm the name renders correctly there, not just on your profile.
        The reliable cross-surface list is shorter than most generators
        acknowledge: Cursive Script, Sans Bold, and Double Struck are the safest
        bets.
      </ExpertNote>
    </section>
  );
}

export function FacebookMythsSection() {
  return (
    <section
      aria-labelledby="fb-myths-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="fb-myths-heading" className="article-heading">
        Facebook Stylish Name Myths vs What Actually Happens
      </h2>
      <p>
        Most articles repeat advice without testing whether it still holds after
        Facebook&apos;s 2021–2023 app UI rebuilds changed name field behaviour.
        These myths circulate unchecked — here is what hands-on testing actually
        shows.
      </p>

      <ArticleTable caption="Myth vs. reality with confidence rating — verified against Facebook web and app behaviour.">
        <thead>
          <tr>
            <th>Myth</th>
            <th>Reality</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          {MYTH_REALITY_ROWS.map((row) => (
            <tr key={row.myth}>
              <td>
                <span className="myth-label">Myth</span> {row.myth}
              </td>
              <td>
                <span className="reality-label">Reality</span> {row.reality}
              </td>
              <td>
                <span className={VERDICT_CLASS[row.verdict]}>{row.verdict}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        Most failure and confusion around Facebook stylish names comes from bad
        information that has circulated unchecked. The actual rules are more
        permissive than users think, and the actual failure modes are more
        specific than they are told.
      </ExpertNote>
    </section>
  );
}

export function FacebookCrossPlatformSection() {
  return (
    <section
      aria-labelledby="cross-platform-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="cross-platform-heading" className="article-heading">
        Advanced: Building a Cross-Platform Stylish Identity That Holds Up
        Everywhere
      </h2>
      <p>
        This section is for users who have already used the generator and
        understand basic Unicode compatibility — and need consistency across
        Facebook, Messenger, Instagram, and other platforms. A stylish name is
        not a one-time paste; it is an identity asset that requires deliberate
        management.
      </p>

      <h3 className="article-subheading">The cross-platform framework</h3>
      <ol className="decision-tree">
        {CROSS_PLATFORM_FRAMEWORK_STEPS.map((item) => (
          <li key={item.step}>
            <strong>{item.step}.</strong> {item.detail}
          </li>
        ))}
      </ol>

      <ArticleTable caption="Cross-platform character limits — design against the tightest constraint first.">
        <thead>
          <tr>
            <th>Platform / field</th>
            <th>Character limit</th>
            <th>Counting method</th>
            <th>Planning priority</th>
          </tr>
        </thead>
        <tbody>
          {CROSS_PLATFORM_LIMIT_ROWS.map((row) => (
            <tr key={row.platform}>
              <td>{row.platform}</td>
              <td>{row.charLimit}</td>
              <td>{row.byteNote}</td>
              <td>{row.tightest}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        Treat your stylish name like a brand asset: one anchor style, one
        codepoint record, one test across Messenger and Instagram before you
        commit. The reset-and-redo cycle most users fall into is almost always
        preventable with upfront planning.
      </ExpertNote>
    </section>
  );
}

export function FacebookBioTypographySection() {
  return (
    <section
      aria-labelledby="bio-typography-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="bio-typography-heading" className="article-heading">
        Facebook Bio Design That Actually Gets Noticed: Typography Hierarchy
        Over Font Gimmicks
      </h2>
      <p>
        Every competitor stops at &ldquo;here are fonts, copy them.&rdquo; None
        address <em>why some stylish bios command attention and others look like
        noise</em> — which is a design and information hierarchy question, not a
        font question. The font is 20% of the result. The structure is 80%.
      </p>

      <h3 className="article-subheading">The three-line rule for Facebook bios</h3>
      <p>
        Facebook&apos;s About section shows approximately 3 lines before
        &ldquo;See more&rdquo; truncation in the mobile profile view. Most users
        waste line 1 on a decorated name they already have in their display name
        field. Effective bios use line 1 for identity signal, line 2 for
        differentiation, line 3 for a call to action — with the stylish font
        used <em>selectively</em> on line 1 only.
      </p>

      <h3 className="article-subheading">
        Contrast stacking — the technique that makes stylish text pop
      </h3>
      <p>
        Alternating a Unicode fancy font line with a plain-text line creates
        visual rhythm. Using fancy fonts on every line eliminates contrast and
        makes the bio harder to scan. The ratio that works:{" "}
        <strong>1 styled line for every 2 plain lines</strong>.
      </p>

      <h3 className="article-subheading">
        Emoji placement as typographic anchors
      </h3>
      <p>
        Emojis in Facebook bios serve a structural role beyond decoration.
        Placed at line starts, they create a left-margin alignment that makes
        the bio scannable in a way Unicode fonts alone cannot achieve — because
        Unicode letterforms vary in width unpredictably across devices. Emojis
        render at consistent size; Unicode fonts do not.
      </p>

      <h3 className="article-subheading">
        When stylish fonts actively hurt credibility
      </h3>
      <p>
        For professional profiles, business pages, and creator accounts building
        perceived authority, heavily decorated names (border styles, star frames)
        signal &ldquo;casual user&rdquo; rather than &ldquo;credible
        creator.&rdquo; The same Cursive Script that looks elegant on a personal
        profile looks out of place on a business consultant&apos;s profile.
      </p>

      <h3 className="article-subheading">Before vs. after — bio comparison</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bio-framework__row flex-col">
          <p className="bio-framework__label">{BIO_BEFORE_AFTER.before.label}</p>
          <p className="converted-name bio-framework__example whitespace-pre-wrap">
            {BIO_BEFORE_AFTER.before.text}
          </p>
          <p className="bio-framework__meta">{BIO_BEFORE_AFTER.before.problems}</p>
        </div>
        <div className="bio-framework__row flex-col">
          <p className="bio-framework__label">{BIO_BEFORE_AFTER.after.label}</p>
          <p className="converted-name bio-framework__example whitespace-pre-wrap">
            {BIO_BEFORE_AFTER.after.text}
          </p>
          <p className="bio-framework__meta">{BIO_BEFORE_AFTER.after.problems}</p>
        </div>
      </div>

      <h3 className="article-subheading">
        Should you use a stylish font here? — decision tree
      </h3>
      <ol className="decision-tree">
        <li>
          <strong>Display name field?</strong> Yes — but only Cursive Script or
          Sans Bold, and keep it readable. No border frames.
        </li>
        <li>
          <strong>Bio line 1 (identity)?</strong> Yes — one styled line for
          contrast above the fold.
        </li>
        <li>
          <strong>Bio lines 2–3 (value / CTA)?</strong> Plain text or emoji
          anchors only — no fancy fonts.
        </li>
        <li>
          <strong>Business or professional profile?</strong> Plain text
          preferred — or Cursive Script on line 1 only, no borders.
        </li>
        <li>
          <strong>Status update or comment?</strong> One styled phrase maximum —
          rest plain text for readability.
        </li>
      </ol>

      <h3 className="article-subheading">The scannable bio framework</h3>
      <div
        className="bio-framework"
        role="img"
        aria-label="Four-line Facebook bio hierarchy framework"
      >
        {BIO_FRAMEWORK_LINES.map((line, index) => (
          <div key={line.line} className="bio-framework__row">
            <span className="bio-framework__step">{index + 1}</span>
            <div>
              <p className="bio-framework__label">{line.line}</p>
              <p className="converted-name bio-framework__example whitespace-pre-wrap">
                {line.example}
              </p>
              <p className="bio-framework__meta">
                <strong>Font:</strong> {line.font} · <strong>Role:</strong>{" "}
                {line.purpose}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ExpertNote>
        A reader who understands bio hierarchy will produce a better profile
        than someone with access to 100 font options but no framework. Copy one
        of our bio templates above as a starting point, then apply this
        structure — styled line 1, plain lines 2–3, emoji anchor on line 3.
      </ExpertNote>
    </section>
  );
}
