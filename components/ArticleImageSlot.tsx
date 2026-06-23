import Image from "next/image";
import type { PageImageSlot } from "@/lib/freestylePageImages";

export default function ArticleImageSlot({ slot }: { slot: PageImageSlot }) {
  if (slot.active) {
    return (
      <figure className="article-figure">
        <Image
          src={slot.src}
          alt={slot.alt}
          width={slot.width}
          height={slot.height}
          sizes="(max-width: 768px) 100vw, 42rem"
          className="article-figure__img"
        />
        {slot.caption ? (
          <figcaption className="article-figure__caption">{slot.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure
      className="article-figure image-slot"
      aria-label={`Image placeholder: ${slot.title}`}
    >
      <div
        className="image-slot__frame"
        style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
      >
        <div className="image-slot__inner">
          <p className="image-slot__badge">Image placeholder</p>
          <p className="image-slot__title">{slot.title}</p>
          <p className="image-slot__meta">
            <span className="image-slot__file">{slot.src}</span>
            <span className="image-slot__dims">
              {slot.width} × {slot.height}px
            </span>
          </p>
          <p className="image-slot__brief">{slot.brief}</p>
          <ul className="image-slot__specs">
            {slot.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
          <p className="image-slot__activate">
            To activate: add the file to{" "}
            <code className="article-inline-code">/public{slot.src}</code>, then
            set{" "}
            <code className="article-inline-code">
              active: true
            </code>{" "}
            for <code className="article-inline-code">{slot.id}</code> in{" "}
            <code className="article-inline-code">lib/freestylePageImages.ts</code>
            . Any image works — swap the filename in config if you use a
            different asset.
          </p>
        </div>
      </div>
      {slot.caption ? (
        <figcaption className="image-slot__caption-preview">
          Planned caption: {slot.caption}
        </figcaption>
      ) : null}
      <p className="image-slot__alt-preview">
        Planned alt: {slot.alt}
      </p>
    </figure>
  );
}
