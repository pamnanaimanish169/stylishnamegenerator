import type { Metadata } from "next";
import LetterStylishPage from "@/components/LetterStylishPage";
import {
  J_CONFIG,
  buildLetterJsonLd,
  buildLetterMetadata,
} from "@/lib/letterStylishPageData";

export const metadata: Metadata = buildLetterMetadata(J_CONFIG);

const { webApp, breadcrumb, faq, itemList } = buildLetterJsonLd(J_CONFIG);

export default function JStylishNamePage() {
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
      <LetterStylishPage config={J_CONFIG} />
    </>
  );
}
