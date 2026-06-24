import {
  CHAR_BREAKDOWN_ROWS,
  CONSOLE_EXAMPLE,
  CREATOR_FRAMEWORK_LINES,
  FONT_COMPATIBILITY_ROWS,
  MYTH_REALITY_ROWS,
  OS_COMPATIBILITY_ROWS,
  UNICODE_STACK_EXAMPLES,
} from "@/lib/instagramExpertContent";

function ExpertNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="article-note" role="note">
      <strong className="text-[var(--cream)]">Expert note:</strong> {children}
    </p>
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

export function InstagramFontsBreakSection() {
  return (
    <section
      aria-labelledby="fonts-break-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="fonts-break-heading" className="article-heading">
        When Stylish Fonts Don&apos;t Work on Instagram — And How to Spot It
        Before You Post
      </h2>
      <p>
        Every tutorial shows you <em>how</em> to paste fancy fonts. Almost none
        explain <em>when they fail</em> — and that gap is why you see searches
        like &ldquo;stylish fonts not working Instagram&rdquo; or &ldquo;Unicode
        boxes in bio.&rdquo; We test across iOS, Android, and field types so you
        can predict problems before they go live.
      </p>

      <h3 className="article-subheading">The &ldquo;tofu&rdquo; problem</h3>
      <p>
        When a device lacks a glyph for a Unicode block, characters render as
        blank squares (□□□) — nicknamed &ldquo;tofu&rdquo; after the placeholder
        shape. The safest range for Instagram bios is the{" "}
        <strong>Mathematical Alphanumeric Symbols</strong> block (U+1D400–U+1D7FF)
        — that&apos;s where Cursive Script, Bold Cursive, Sans Italic, and Double
        Struck live. Higher-risk styles include{" "}
        <strong>Enclosed Alphanumerics</strong> (Circled) and some decorative
        symbols outside standard blocks.
      </p>

      <h3 className="article-subheading">
        Browser preview vs. Instagram&apos;s renderer
      </h3>
      <p>
        A font may look perfect in a web-based generator but render differently
        inside Instagram&apos;s native bio field. Instagram uses its own text
        engine on iOS vs. Android — Cursive Script Unicode often appears
        slightly rounder on iPhone and sharper on Samsung devices. Always paste
        into Instagram&apos;s <strong>Edit Profile</strong> preview before
        publishing, not just our tool output.
      </p>

      <h3 className="article-subheading">Name field vs. bio field</h3>
      <p>
        These are not the same field strategically or technically. The{" "}
        <strong>display name</strong> (30 characters) is indexed by
        Instagram&apos;s in-app search — heavy Unicode can make you invisible to
        plain-text name searches. The <strong>bio</strong> (150 characters) is
        more permissive visually and is where fancy fonts belong. Many users
        over-style the name field and wonder why nobody finds them.
      </p>

      <h3 className="article-subheading">
        Feed captions vs. Story text overlays
      </h3>
      <p>
        Unicode fonts paste cleanly into <strong>feed post captions</strong>.
        Instagram&apos;s <strong>Story text sticker</strong> is different — it
        re-renders pasted text with Instagram&apos;s own font library, so fancy
        Unicode pasted into Story overlays typically loses the style entirely.
        Use styled text in feed captions and bios; use Instagram&apos;s native
        Story fonts for Stories.
      </p>

      <h3 className="article-subheading">Quick decision tree</h3>
      <ol className="decision-tree">
        <li>
          <strong>Where are you pasting?</strong> Bio or feed caption → proceed.
          Story text sticker → use native Story fonts instead.
        </li>
        <li>
          <strong>Which style?</strong> Double Struck or Sans Italic → lowest
          risk. Circled → test on a friend&apos;s Android before going live.
        </li>
        <li>
          <strong>Display name?</strong> Keep at least part plain Latin for
          searchability (e.g. &ldquo;Riya | Skincare&rdquo;).
        </li>
        <li>
          <strong>See boxes on preview?</strong> Switch to a safer style from
          our generator — don&apos;t publish and hope.
        </li>
      </ol>

      <ArticleTable caption="Font style compatibility — tested against Instagram field types (2025).">
        <thead>
          <tr>
            <th>Font style</th>
            <th>Bio</th>
            <th>Name</th>
            <th>Feed caption</th>
            <th>Stories</th>
            <th>Tofu risk</th>
          </tr>
        </thead>
        <tbody>
          {FONT_COMPATIBILITY_ROWS.map((row) => (
            <tr key={row.style}>
              <td>{row.style}</td>
              <td>{row.bio}</td>
              <td>{row.name}</td>
              <td>{row.feedCaption}</td>
              <td>{row.stories}</td>
              <td>{row.tofuRisk}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ArticleTable caption="OS version breakpoints — when rendering quality drops.">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Rendering</th>
            <th>Tofu risk</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {OS_COMPATIBILITY_ROWS.map((row) => (
            <tr key={row.platform}>
              <td>{row.platform}</td>
              <td>{row.rendering}</td>
              <td>{row.tofuRisk}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        If a follower on an older Android phone reports boxes in your bio, the
        fix is almost always switching from Circled or Fullwidth to Double
        Struck — not reinstalling Instagram.
      </ExpertNote>
    </section>
  );
}

export function InstagramCharCountSection() {
  return (
    <section
      aria-labelledby="char-count-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="char-count-heading" className="article-heading">
        The Unicode Character Count Trap: Why Stylish Fonts Eat Your Instagram
        Bio Limit Faster Than Normal Text
      </h2>
      <p>
        Instagram&apos;s bio field allows 150 characters — but &ldquo;150&rdquo;
        does not mean 150 visible letters the way you&apos;d count in a notes
        app. Instagram counts <strong>Unicode scalar values</strong>, and some
        things you paste consume budget invisibly.
      </p>

      <h3 className="article-subheading">How Instagram counts characters</h3>
      <p>
        Fancy font letters from our generator (Cursive, Bold, Small Caps, etc.)
        are single code points — they count <strong>1-for-1</strong> against
        your limit, same as plain Latin. Emoji are different: a simple heart ❤️
        counts as one character, but a rainbow flag 🏳️‍🌈 is a{" "}
        <strong>ZWJ sequence</strong> of multiple code points and can count as
        3–5 characters depending on platform version.
      </p>

      <h3 className="article-subheading">The line break trap</h3>
      <p>
        Each line break in a multiline bio costs <strong>one character</strong>.
        A three-line bio loses two characters to invisible newlines before you
        type a single styled letter. Our bio templates account for this — but
        if you build your own, budget accordingly.
      </p>

      <h3 className="article-subheading">Practical budgeting rule</h3>
      <ul className="article-checklist">
        <li>
          <strong>Styled fancy text:</strong> count as written (1 char per
          visible letter).
        </li>
        <li>
          <strong>Simple emoji</strong> (✨ 🌙 🖤): budget 1 char each.
        </li>
        <li>
          <strong>Complex emoji</strong> (flags, family combos): budget 2–3
          chars each.
        </li>
        <li>
          <strong>Each line break:</strong> 1 char.
        </li>
        <li>
          <strong>Safe target:</strong> aim for 130–135 visible characters to
          leave headroom.
        </li>
      </ul>

      <ArticleTable caption="Character-by-character breakdown — why your bio count surprises you.">
        <thead>
          <tr>
            <th>Segment</th>
            <th>What you see</th>
            <th>Instagram counts</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          {CHAR_BREAKDOWN_ROWS.map((row) => (
            <tr key={row.segment}>
              <td>{row.segment}</td>
              <td>{row.visible}</td>
              <td>{row.counted}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <h3 className="article-subheading">How to pre-check length</h3>
      <p>
        Before committing a bio, paste your styled text into a{" "}
        <strong>Unicode-aware character counter</strong> — not Microsoft Word
        or Google Docs word count, which measure words not code points.
        Instagram&apos;s own bio field shows a live counter while editing; use
        that as the final authority.
      </p>

      <ExpertNote>
        If Instagram truncates your bio mid-word, you&apos;re almost certainly
        over the invisible limit from emoji sequences or line breaks — not from
        the fancy font letters themselves.
      </ExpertNote>
    </section>
  );
}

export function InstagramMythsSection() {
  return (
    <section
      aria-labelledby="myths-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="myths-heading" className="article-heading">
        Instagram Stylish Fonts: 6 Common Myths That Waste Your Time (And
        What&apos;s Actually True)
      </h2>
      <p>
        Most articles repeat the same advice without testing it. These are the
        myths we see most often — and what hands-on use actually shows.
      </p>

      <ArticleTable caption="Myth vs. reality — sourced from device testing and creator workflows.">
        <thead>
          <tr>
            <th>Myth</th>
            <th>Reality</th>
            <th>Why it matters</th>
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
              <td>{row.why}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>
    </section>
  );
}

export function InstagramCreatorWorkflowSection() {
  return (
    <section
      aria-labelledby="creator-workflow-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="creator-workflow-heading" className="article-heading">
        How Serious Instagram Creators Build Their Bio System — The Real
        Workflow (Not the Beginner Tutorial)
      </h2>
      <p>
        Copy-pasting a bio is step one. Creators who treat their profile as a
        conversion surface maintain systems — not one-off decorations.
      </p>

      <h3 className="article-subheading">Bio as above-the-fold copy</h3>
      <p>
        Experienced creators treat the Instagram bio like a landing page
        headline. They test versions during launches and campaigns. Stylish
        fonts are <strong>formatting</strong> — they draw the eye; the words
        do the converting.
      </p>

      <h3 className="article-subheading">The bio swipe file</h3>
      <p>
        Keep 3–4 pre-styled bio variations in Apple Notes, Notion, or Google
        Keep. Rotate them for seasonal moments, product launches, or collab
        announcements without rebuilding from scratch. Our bio templates section
        is a starter swipe file — duplicate and customize from there.
      </p>

      <h3 className="article-subheading">The 3-line hierarchy framework</h3>
      <div className="bio-framework" role="img" aria-label="Three-line bio hierarchy framework">
        {CREATOR_FRAMEWORK_LINES.map((line, index) => (
          <div key={line.line} className="bio-framework__row">
            <span className="bio-framework__step">{index + 1}</span>
            <div>
              <p className="bio-framework__label">{line.line}</p>
              <p className="converted-name bio-framework__example">{line.example}</p>
              <p className="bio-framework__meta">
                <strong>Font:</strong> {line.font} · <strong>Role:</strong>{" "}
                {line.purpose}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="article-subheading">Name field as a keyword slot</h3>
      <p>
        The display name is indexed by Instagram search — use it for readable
        niche keywords (e.g. &ldquo;Priya | Fitness Tips&rdquo;). Overdecorating
        with fancy Unicode sacrifices discoverability for aesthetics. Save bold
        styles for the bio; keep the name field strategically readable.
      </p>

      <h3 className="article-subheading">The consistency signal</h3>
      <p>
        Matching bio font style, Story highlight covers, and grid aesthetic
        creates subconscious trust for first-time visitors. Pick one generator
        style (e.g. Cursive Script or Small Caps) and use it consistently
        across bio lines — not a different font on every line.
      </p>

      <ExpertNote>
        The font is the least important decision. Where you put it, what it
        says, and how it fits your overall profile system is what actually
        converts visitors into followers.
      </ExpertNote>
    </section>
  );
}

export function InstagramUnicodeStackingSection() {
  return (
    <section
      aria-labelledby="unicode-stack-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="unicode-stack-heading" className="article-heading">
        Advanced: Stacking Unicode — How to Create Custom Instagram Font Styles
        That No Generator Can Copy
      </h2>
      <p>
        After you exhaust preset styles, there is a deeper layer:{" "}
        <strong>combining characters</strong> — Unicode marks that overlay on
        the preceding glyph without being a separate letter. Stack them on
        Mathematical Alphanumeric base characters to create effects no standard
        generator produces.
      </p>

      <h3 className="article-subheading">What combining characters are</h3>
      <p>
        Unicode&apos;s Combining Diacritical Marks range (U+0300–U+036F) attaches
        to the character before it — underlines, strikethroughs, dots, tildes.
        When stacked on a bold-cursive or double-struck base from our generator,
        you get custom visual effects inside Instagram bios.
      </p>

      <h3 className="article-subheading">Manual stacking workflow</h3>
      <p>
        Type your base character, then append combining marks immediately after
        it in any Unicode-capable editor (VS Code, Notes on Mac, or our
        generator output pasted into a text field). Examples:
      </p>
      <ul className="unicode-examples">
        {UNICODE_STACK_EXAMPLES.map((ex) => (
          <li key={ex.label}>
            <strong>{ex.label}:</strong>{" "}
            <span className="converted-name text-base">{ex.chars}</span>
            <span className="block text-sm text-[var(--cream-faint)] mt-1">
              {ex.description}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="article-subheading">Browser console method</h3>
      <p>
        Advanced users can construct strings programmatically in DevTools,
        copy the output, and paste into Instagram:
      </p>
      <pre className="article-code">
        <code>{CONSOLE_EXAMPLE}</code>
      </pre>
      <p className="text-sm text-[var(--cream-faint)]">
        Run in Chrome DevTools → Console. The result is a bold-cursive A with
        underline and overline combining marks. Copy the rendered output from
        the console return value.
      </p>

      <h3 className="article-subheading">The rendering ceiling</h3>
      <p>
        Practical limit: <strong>4–5 combining marks per character</strong>.
        Beyond that, iOS and Android rendering engines collapse or jumble the
        stack. Instagram&apos;s iOS text renderer clips extreme stacks
        differently than Samsung&apos;s Android build. Test on both before
        publishing a live bio.
      </p>

      <p className="article-warning" role="note">
        <strong className="text-[var(--neon-pink)]">Caution:</strong> Extreme
        combining stacks may look correct on your phone but break on followers
        with older OS versions. Treat stacked styles as experimental — not your
        permanent bio.
      </p>

      <h3 className="article-subheading">Why this creates truly unique bios</h3>
      <p>
        Combining mark stacks are invisible to most font generators. Any bio
        built this way cannot be reproduced by running your text through a
        standard stylish-font tool — it creates a signature look that is
        genuinely yours, which matters for creators who treat their bio as
        personal brand IP.
      </p>

      <ExpertNote>
        Start with a base character copied from our generator (e.g. a styled
        word in Bold Cursive), then add one combining mark at a time in a text
        editor and preview in Instagram&apos;s bio field before adding more.
      </ExpertNote>
    </section>
  );
}
