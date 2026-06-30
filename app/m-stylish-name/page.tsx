import type { Metadata } from "next";
import LetterStylishPage from "@/components/LetterStylishPage";
import {
  M_CONFIG,
  buildLetterJsonLd,
  buildLetterMetadata,
} from "@/lib/letterStylishPageData";

export const metadata: Metadata = buildLetterMetadata(M_CONFIG);

const { webApp, breadcrumb, faq, itemList } = buildLetterJsonLd(M_CONFIG);

export default function MStylishNamePage() {
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
      <LetterStylishPage config={M_CONFIG} />
    </>
  );
}
