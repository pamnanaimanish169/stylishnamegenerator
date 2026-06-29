import {
  ADVANCED_RTL_INSIGHTS,
  ARABIC_MYTH_REALITY_ROWS,
  CALLIGRAPHY_COMPARISON_ROWS,
  CLIPBOARD_BIDI_SNIPPET,
  RENDERING_MATRIX_ROWS,
  SYMBOL_BIDI_ROWS,
} from "@/lib/arabicExpertContent";

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

export function ArabicRenderingSection() {
  return (
    <section
      aria-labelledby="arabic-rendering-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="arabic-rendering-heading" className="article-heading">
        Arabic &amp; Urdu Unicode Rendering: Why Your Styled Text Looks Perfect
        Here But Breaks There
      </h2>
      <p>
        Competitors stop at &ldquo;works on all devices.&rdquo; The honest
        answer is that the same Unicode string is drawn by whatever Arabic font
        each platform ships — and those font stacks disagree. Broken rendering is
        never random; it maps to a specific platform, border type, and reason.
      </p>

      <h3 className="article-subheading">The font-fallback chain problem</h3>
      <p>
        Android and iOS ship different Arabic stacks —{" "}
        <a
          href="https://fonts.google.com/noto/specimen/Noto+Naskh+Arabic"
          target="_blank"
          rel="noopener noreferrer"
          className="intro-link"
        >
          Noto Naskh Arabic
        </a>{" "}
        versus SF Arabic. A border symbol that lands in an emoji slot renders as
        a
        colour emoji on iOS but as a box, or nothing at all, on a stripped
        Android build. The usual culprits with Arabic text are{" "}
        <span dir="rtl">♛</span> and ✦.
      </p>

      <h3 className="article-subheading">
        WhatsApp&apos;s internal RTL bubble logic
      </h3>
      <p>
        WhatsApp checks whether a message is &ldquo;mostly RTL&rdquo; and flips
        the whole bubble&apos;s alignment. If your text contains even one Latin
        character or ASCII symbol that tips the ratio, the bubble flips to LTR
        and the mirrored borders read backwards. This is exactly why{" "}
        <span dir="rtl" lang="ur">
          ꧂ رحیم ꧁
        </span>{" "}
        is fine, but <span dir="ltr">꧂ Rahim ꧁</span> breaks — mixed scripts
        take a different rendering path.
      </p>

      <h3 className="article-subheading">
        Instagram bio vs caption rendering
      </h3>
      <p>
        Instagram bios have a tighter character-width cap than captions, so RTL
        Unicode wraps earlier. A 3-line Urdu status that looks perfect in a
        caption can collapse into 5–6 wrapped lines in the bio field.
      </p>

      <h3 className="article-subheading">
        The joining-behaviour issue with decorative borders
      </h3>
      <p>
        Arabic letters are cursive and join contextually. Inserting a non-Arabic
        Unicode character <em>inside</em> the word (not just at the borders) can
        break that joining, turning connected letters into isolated forms — so
        the word looks like disconnected letters to a native reader.
      </p>

      <h3 className="article-subheading">Samsung One UI vs stock Android</h3>
      <p>
        Samsung&apos;s keyboard and clipboard handler sometimes strips the
        zero-width non-joiner (ZWNJ) silently on paste. That breaks Urdu and
        Persian words that need explicit non-joining, such as{" "}
        <span dir="rtl">می‌خواہم</span>.
      </p>

      <ArticleTable caption="Platform × border type × rendering outcome, from cross-device testing.">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Border type</th>
            <th>Outcome</th>
            <th>What happens</th>
          </tr>
        </thead>
        <tbody>
          {RENDERING_MATRIX_ROWS.map((row) => (
            <tr key={`${row.platform}-${row.borderType}`}>
              <td>{row.platform}</td>
              <td>{row.borderType}</td>
              <td>{row.outcome}</td>
              <td>{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        The tool isn&apos;t broken — the platform has RTL rendering quirks. Pick
        symmetric borders (✦, 🌙) for destinations where you can&apos;t control
        the font, and save the asymmetric brackets for pure Arabic/Urdu text.
      </ExpertNote>
    </section>
  );
}

export function ArabicBidiSection() {
  return (
    <section
      aria-labelledby="arabic-bidi-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="arabic-bidi-heading" className="article-heading">
        Bidi Mixing in Urdu Status Lines: The Hidden Reason Your Styled Text
        Looks Jumbled
      </h2>
      <p>
        &ldquo;Why does my Arabic text look reversed?&rdquo; is one of the most
        frustrated searches in this niche — and it follows a rule, not chance.
        The Unicode Bidirectional Algorithm (Bidi) decides direction by scanning
        for the <strong>first strong directional character</strong>. If a
        neutral emoji or a Latin border symbol comes before your Arabic, the line
        can be read as LTR and rendered backwards. The exact rules are defined in
        the{" "}
        <a
          href="https://www.unicode.org/reports/tr9/"
          target="_blank"
          rel="noopener noreferrer"
          className="intro-link"
        >
          Unicode Bidirectional Algorithm (UAX #9)
        </a>
        .
      </p>

      <h3 className="article-subheading">
        Neutral character sandwiching
      </h3>
      <p>
        Spaces, hyphens, and many symbols (✦, ★, ꧁) have <em>neutral</em> or{" "}
        <em>weak</em> Bidi type. Sandwiched between RTL Arabic and an LTR symbol,
        their direction resolves from context — unpredictably. That is why the
        same status reads correctly in WhatsApp but reversed in Telegram.
      </p>

      <h3 className="article-subheading">Emoji Bidi is not uniform</h3>
      <p>
        Both 🌙 and ☪ appear in Urdu status lines, but they behave differently:
        🌙 is Bidi-neutral, while ☪ can be treated differently depending on the
        OS&apos;s Unicode version — on pre-Android 9 it can trigger a direction
        reset inside an Arabic string.
      </p>

      <ArticleTable caption="Bidi type of common decorative symbols and how each behaves in mixed text.">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Bidi type</th>
            <th>Behaviour in mixed text</th>
          </tr>
        </thead>
        <tbody>
          {SYMBOL_BIDI_ROWS.map((row) => (
            <tr key={row.symbol}>
              <td dir="rtl">{row.symbol}</td>
              <td>{row.bidiType}</td>
              <td>{row.behaviour}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <h3 className="article-subheading">Is your text reversing? — decision tree</h3>
      <ol className="decision-tree">
        <li>
          <strong>Text looks reversed?</strong> Check whether anything sits{" "}
          <em>before</em> the Arabic on that line.
        </li>
        <li>
          <strong>Is there a Latin character or ASCII symbol first?</strong> If
          yes, the Bidi algorithm read the line as LTR — remove it or move it
          after the Arabic.
        </li>
        <li>
          <strong>Is the border asymmetric (꧁/꧂, ༺/༻)?</strong> Swap to a
          symmetric pair (✦ متن ✦, 🌙 متن 🌙) so any flip is invisible.
        </li>
        <li>
          <strong>Must you mix scripts?</strong> Insert a Right-to-Left Mark
          (U+200F) before the Arabic content to anchor the direction regardless
          of surrounding symbols.
        </li>
        <li>
          <strong>Still wrong in one app only?</strong> That app has weak Bidi
          support — the text is correct; paste into an updated app.
        </li>
      </ol>

      <ExpertNote>
        The reversal isn&apos;t random — it follows the Bidi algorithm. When you
        mix Arabic with Latin or emoji, prefer symmetric symbols and anchor the
        line with an RLM if you need to be certain.
      </ExpertNote>
    </section>
  );
}

export function ArabicCalligraphySection() {
  return (
    <section
      aria-labelledby="arabic-calligraphy-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="arabic-calligraphy-heading" className="article-heading">
        Arabic Calligraphy Fonts vs Unicode Stylish Text: Which One You&apos;re
        Actually Getting (And When Each Is Right)
      </h2>
      <p>
        Two very different searches get blurred together. &ldquo;Arabic
        calligraphy font generator&rdquo; and &ldquo;Arabic stylish text copy
        paste&rdquo; have different intents — and knowing which one this tool
        serves saves you a frustrating detour.
      </p>

      <h3 className="article-subheading">What Unicode stylish text actually is</h3>
      <p>
        The fancy styles here aren&apos;t typeface changes — they&apos;re
        different Unicode <em>characters</em> that happen to look bold or
        circled. For Arabic specifically, almost no alternate character blocks
        exist (unlike Latin&apos;s Mathematical Alphanumeric Symbols), so Arabic
        &ldquo;stylish text&rdquo; relies almost entirely on decorative{" "}
        <strong>borders</strong>, not alternate letterforms.
      </p>

      <h3 className="article-subheading">What real Arabic calligraphy is</h3>
      <p>
        Naskh (standard print),{" "}
        <a
          href="https://en.wikipedia.org/wiki/Nastaliq"
          target="_blank"
          rel="noopener noreferrer"
          className="intro-link"
        >
          Nastaliq
        </a>{" "}
        (Urdu&apos;s flowing diagonal script), Thuluth (monumental, used in
        mosque architecture), and Ruqah (informal cursive) are typeface choices
        made in design software. They require font files and cannot be
        copy-pasted.
      </p>

      <h3 className="article-subheading">
        The Nastaliq gap — why Urdu deserves a mention
      </h3>
      <p>
        Urdu is traditionally written in Nastaliq, not Naskh, but most digital
        systems default to Naskh because Nastaliq is computationally expensive —
        it needs contextual glyph stacking on a diagonal baseline. When someone
        wants &ldquo;Urdu stylish fonts,&rdquo; they often mean Nastaliq, and
        copy-paste tools honestly cannot deliver that.
      </p>

      <ArticleTable caption="Arabic calligraphy fonts vs Unicode stylish text — what each is and when to use it.">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Arabic calligraphy fonts</th>
            <th>Unicode stylish text</th>
          </tr>
        </thead>
        <tbody>
          {CALLIGRAPHY_COMPARISON_ROWS.map((row) => (
            <tr key={row.aspect}>
              <td>{row.aspect}</td>
              <td>{row.calligraphy}</td>
              <td>{row.unicode}</td>
            </tr>
          ))}
        </tbody>
      </ArticleTable>

      <ExpertNote>
        For WhatsApp status, Instagram bios, and display names — where you
        can&apos;t choose a font — Unicode borders are the only way to stand out,
        and that&apos;s a legitimate use. For a wedding card, logo, or poster,
        use a proper Nastaliq or Thuluth font (Jameel Noori Nastaleeq, Adobe
        Arabic) in a design tool instead.
      </ExpertNote>
    </section>
  );
}

export function ArabicMythsSection() {
  return (
    <section
      aria-labelledby="arabic-myths-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="arabic-myths-heading" className="article-heading">
        Arabic &amp; Urdu Font Myths: What Everyone Gets Wrong
      </h2>
      <p>
        These assumptions circulate widely — and several of them cause real
        problems with how people share text. Here is what hands-on testing
        actually shows, with the practical implication for each.
      </p>

      <ArticleTable caption="Myth vs reality — and what it means for how you share Arabic and Urdu text.">
        <thead>
          <tr>
            <th>Myth</th>
            <th>Reality</th>
            <th>Practical implication</th>
          </tr>
        </thead>
        <tbody>
          {ARABIC_MYTH_REALITY_ROWS.map((row) => (
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

export function ArabicAdvancedSection() {
  return (
    <section
      aria-labelledby="arabic-advanced-heading"
      className="article-content reveal reveal-delay-4 mb-14"
    >
      <h2 id="arabic-advanced-heading" className="article-heading">
        Advanced: How Arabic &amp; Urdu Font Generators Handle RTL Correctly —
        And Where Most Tools Fail
      </h2>
      <p className="text-[var(--cream-faint)]">
        For developers, tool builders, and technically curious users.
      </p>
      <p>
        Searches like &ldquo;how to build an Arabic font generator,&rdquo;
        &ldquo;RTL Unicode text tool,&rdquo; and &ldquo;urdu stylish text
        generator javascript&rdquo; all land on the same four decisions that
        separate a correct tool from a broken one.
      </p>

      <div className="mt-2 flex flex-col gap-4">
        {ADVANCED_RTL_INSIGHTS.map((insight) => (
          <div key={insight.title} className="article-note" role="note">
            <p className="mb-1">
              <strong className="text-[var(--cream)]">{insight.title}.</strong>{" "}
              {insight.body}
            </p>
            <p className="text-sm text-[var(--cream-faint)]">
              <strong>What breaks without this:</strong> {insight.breaks}
            </p>
          </div>
        ))}
      </div>

      <h3 className="article-subheading">Clipboard Bidi-mark wrapping</h3>
      <p>
        The single most-skipped step: embed the directionality in the copied
        string itself, so it survives into any app regardless of that
        app&apos;s Bidi support.
      </p>
      <pre className="article-code">
        <code>{CLIPBOARD_BIDI_SNIPPET}</code>
      </pre>

      <ExpertNote>
        If you&apos;re building something similar, these four decisions — script
        detection, RTL input/output, string-level border mirroring, and
        clipboard Bidi marks — are what determine correctness. This page applies
        all four.
      </ExpertNote>
    </section>
  );
}
