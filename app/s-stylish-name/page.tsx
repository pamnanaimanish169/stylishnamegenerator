import type { Metadata } from "next";
import LetterStylishPage from "@/components/LetterStylishPage";
import {
  S_CONFIG,
  buildLetterJsonLd,
  buildLetterMetadata,
} from "@/lib/letterStylishPageData";

export const metadata: Metadata = buildLetterMetadata(S_CONFIG);

const { webApp, breadcrumb, faq, itemList } = buildLetterJsonLd(S_CONFIG);

export default function SStylishNamePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <LetterStylishPage config={S_CONFIG} />
    </>
  );
}
