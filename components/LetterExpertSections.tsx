import Link from "next/link";
import {
  LETTER_STYLE_COMPARISON,
  STYLE_RELIABILITY,
  TOOL_COMPARISON,
  USE_CASE_GUIDE,
  type LetterConfig,
} from "@/lib/letterStylishPageData";

export default function LetterExpertSections({
  config,
}: {
  config: LetterConfig;
}) {
  const { letter, placeholder } = config;

  return (
    <article className="article-content reveal reveal-delay-4 mt-14">
      {/* Section 1 — rendering reliability */}
      <section aria-labelledby="broken-heading" className="mb-14">
        <h2 id="broken-heading" className="article-heading">
          Why Your Stylish Name Looks Broken on Some Apps (and How to Fix It)
        </h2>
        <p>
          A styled {letter} name is not really &ldquo;bold text&rdquo; — each
          character is a separate Unicode codepoint from the mathematical
          alphanumeric blocks. That is why the exact same name can look perfect
          in your Instagram bio and turn into empty squares (□□□) inside a game.
          The character is fine; the app you pasted into simply has no glyph for
          it. Here is when that happens and how to avoid it.
        </p>
        <ul className="space-y-2">
          <li>
            <strong>BGMI &amp; Free Fire boxing out characters:</strong> older
            Android/iOS builds fall back to a font that lacks the styled
            codepoint, and some games run a restricted character whitelist that
            rejects anything outside it.
          </li>
          <li>
            <strong>Double Struck and Fraktur are the first to fail:</strong>{" "}
            they live in higher Unicode ranges that older devices never shipped,
            so they tofu-box most often. Sans Bold and Small Caps sit in
            well-supported ranges and almost always survive.
          </li>
          <li>
            <strong>WhatsApp Web vs mobile:</strong> copying styled text from
            WhatsApp Web can strip the styling because desktop and mobile handle
            the clipboard differently — copy from this page directly to keep the
            exact characters.
          </li>
          <li>
            <strong>Instagram silently reverting bios:</strong> certain
            Instagram API paths sanitize text, so a styled bio can quietly snap
            back to plain letters after a day or two. Re-paste from here if that
            happens.
          </li>
        </ul>

        <div className="article-table-wrap overflow-x-auto">
          <table className="article-table">
            <thead>
              <tr>
                <th scope="col">Style</th>
                <th scope="col">In games (BGMI/FF)</th>
                <th scope="col">On social (IG/WA)</th>
                <th scope="col">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {STYLE_RELIABILITY.map((row) => (
                <tr key={row.style}>
                  <td>{row.style}</td>
                  <td>{row.games}</td>
                  <td>{row.social}</td>
                  <td>{row.tier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="article-table-footnote">
          <strong className="text-[var(--cream)]">Rule of thumb:</strong>{" "}
          Monospace, Sans Bold, and Small Caps are the safest anywhere; Fraktur
          and Circled are the riskiest inside games. When in doubt, paste your{" "}
          {letter} name into the target app and check it on a second phone
          before committing.
        </p>
        <aside className="expert-note" role="note">
          <p className="expert-note__label">For {letter} names specifically</p>
          <p>{config.renderingNote}</p>
        </aside>
      </section>

      {/* Section 2 — letter-specific (S / M / J) */}
      <section aria-labelledby="letter-friendly-heading" className="mb-14">
        <h2 id="letter-friendly-heading" className="article-heading">
          S, M, and J Names Aren&apos;t Equally &ldquo;Stylish-Friendly&rdquo; —
          Here&apos;s Why
        </h2>
        <p>{config.letterProfileLead}</p>
        <aside className="expert-note" role="note">
          <p className="expert-note__label">For your {letter} name</p>
          <p>
            Instead of scrolling all ten styles, start with the
            recommended-for-{letter} styles in the table below. And watch length:
            a longer name like <strong>{config.longNameExample}</strong> grows
            even more in wide styles, so double-letter and longer names should be
            length-checked against a game&apos;s name-character limit before you
            lock them in.
          </p>
        </aside>
        <div className="article-table-wrap overflow-x-auto">
          <table className="article-table">
            <thead>
              <tr>
                <th scope="col">Letter</th>
                <th scope="col">Best styles</th>
                <th scope="col">Styles to avoid</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {LETTER_STYLE_COMPARISON.map((row) => (
                <tr
                  key={row.letter}
                  className={row.letter === letter ? "is-current-letter" : ""}
                >
                  <td>
                    <strong>{row.letter}</strong>
                    {row.letter === letter ? " (this page)" : ""}
                  </td>
                  <td>{row.best}</td>
                  <td>{row.avoid}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="article-table-footnote">
          This is exactly why separate S, M, and J pages exist — each letter has
          its own quirks, so generic &ldquo;any letter, any font&rdquo; advice
          misses what actually matters for your name.
        </p>
      </section>

      {/* Section 3 — it depends where you use it */}
      <section aria-labelledby="depends-heading" className="mb-14">
        <h2 id="depends-heading" className="article-heading">
          Choosing a Stylish Name: It Depends on Where You&apos;ll Use It
        </h2>
        <p>
          There is no single &ldquo;best&rdquo; stylish {letter} name — the
          right choice changes with the platform, your audience, and your goal.
          A name built for a BGMI lobby is a poor fit for a LinkedIn profile.
          Match the intensity of your styling to where it will actually live.
        </p>
        <div className="article-table-wrap overflow-x-auto">
          <table className="article-table">
            <thead>
              <tr>
                <th scope="col">Where you&apos;ll use it</th>
                <th scope="col">Style to pick</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {USE_CASE_GUIDE.map((row) => (
                <tr key={row.context}>
                  <td>{row.context}</td>
                  <td>{row.pick}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="decision-matrix" role="list">
          <div className="decision-matrix__cell" role="listitem">
            <p className="decision-matrix__title">If your goal is presence</p>
            <h3 className="decision-matrix__heading">🎮 Gaming</h3>
            <p>
              Then go short and high-contrast (Sans Bold or a star border) so
              the name reads instantly under the HUD.
            </p>
          </div>
          <div className="decision-matrix__cell" role="listitem">
            <p className="decision-matrix__title">
              If your goal is being found
            </p>
            <h3 className="decision-matrix__heading">🔎 Discoverability</h3>
            <p>
              Then keep the username plain and save heavy styling for your bio,
              which is not part of search.
            </p>
          </div>
          <div className="decision-matrix__cell" role="listitem">
            <p className="decision-matrix__title">If your goal is aesthetics</p>
            <h3 className="decision-matrix__heading">🌸 Social bio</h3>
            <p>
              Then style freely — Bold Cursive and Fraktur shine in Instagram
              and WhatsApp bio text.
            </p>
          </div>
          <div className="decision-matrix__cell" role="listitem">
            <p className="decision-matrix__title">If your goal is trust</p>
            <h3 className="decision-matrix__heading">💼 Professional</h3>
            <p>
              Then use plain text — styled Unicode breaks screen readers and
              recruiter search, so skip it on LinkedIn and email.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — comparison vs LingoJam */}
      <section aria-labelledby="vs-lingojam-heading" className="mb-14">
        <h2 id="vs-lingojam-heading" className="article-heading">
          Our Tool vs LingoJam — Stylish Name Generator Comparison for Quick
          Copy-Paste Names
        </h2>
        <p>
          LingoJam is the best-known fancy-text site, so here is an honest
          side-by-side — including where it beats us. Both are free, both need
          no account, and both rely on the same underlying Unicode characters,
          so a styled {letter} name copied from either works the same once
          pasted.
        </p>
        <div className="article-table-wrap overflow-x-auto">
          <table className="article-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">This tool</th>
                <th scope="col">LingoJam</th>
              </tr>
            </thead>
            <tbody>
              {TOOL_COMPARISON.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.ours}</td>
                  <td>{row.lingojam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="decision-matrix" role="list">
          <div className="decision-matrix__cell" role="listitem">
            <h3 className="decision-matrix__heading">LingoJam — best for</h3>
            <p>
              Users who want the maximum number of font variations and
              don&apos;t mind scrolling a long list to find one.
            </p>
          </div>
          <div className="decision-matrix__cell" role="listitem">
            <h3 className="decision-matrix__heading">This tool — best for</h3>
            <p>
              {letter} names for Instagram and BGMI: fast copy-paste, curated{" "}
              {letter} name ideas, and platform reliability guidance in one
              place.
            </p>
          </div>
        </div>
        <p className="article-table-footnote">
          Want every style in one screen with no character limit? Try our{" "}
          <Link href="/freestyle-nickname-generator" className="article-link">
            freestyle nickname generator
          </Link>{" "}
          or the full{" "}
          <Link href="/" className="article-link">
            stylish name generator
          </Link>
          .
        </p>
      </section>

      {/* Section 5 — batch workflow for teams */}
      <section aria-labelledby="batch-heading" className="mb-4">
        <h2 id="batch-heading" className="article-heading">
          Batch-Generating Stylish Names — A Workflow for Community Managers and
          Esports Teams
        </h2>
        <p>
          Styling one {letter} name is easy. Standardising names across a whole
          clan, Discord server, or esports roster is a different job — and one
          almost no fancy-font guide covers. If you run a team, here is a
          repeatable workflow that keeps your squad&apos;s branding consistent.
        </p>
        <ol className="how-steps">
          <li className="how-step">
            <strong>Keep a roster sheet.</strong> List every member&apos;s plain
            name in a shared Google Sheet, then batch-apply one agreed style
            (for example, every member in Sans Bold like{" "}
            <strong>{placeholder}</strong>) so squad lists look like one brand.
          </li>
          <li className="how-step">
            <strong>Audit by bytes, not characters.</strong> Styled Unicode
            characters eat more bytes than plain ASCII, so a name that looks
            short can silently truncate. Pre-check each styled name against the
            game&apos;s real byte limit before tournament day.
          </li>
          <li className="how-step">
            <strong>Allow per-platform intensity.</strong> The same player often
            needs a lighter style for their searchable Instagram handle, a bold
            one for the BGMI tag, and something in between on Discord — same
            name, different intensity (see the section above).
          </li>
          <li className="how-step">
            <strong>Standardise on 1–2 safe styles.</strong> Pick from the
            Safest tier in the reliability table so the whole team renders
            cleanly in screenshots and clips — avoid everyone choosing random
            fonts that fragment the look.
          </li>
          <li className="how-step">
            <strong>Test on 2–3 devices, then lock it in.</strong>{" "}
            Copy-generate → paste into the shared roster doc → confirm rendering
            on a couple of phones, especially before scrims where names sit
            under HUD constraints.
          </li>
        </ol>
        <aside className="expert-note" role="note">
          <p className="expert-note__label">Mini example</p>
          <p>
            A five-player squad locks &ldquo;Sans Bold&rdquo; as their team
            style and runs each member&apos;s name — {placeholder} and four
            teammates — through the tool above. Every tag now matches in the
            lobby, fits the byte limit, and stays readable in post-match
            screenshots. One decision, made once, applied to the whole roster.
          </p>
        </aside>
      </section>
    </article>
  );
}
