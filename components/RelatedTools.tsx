import Link from "next/link";

const DEFAULT_TOOLS = [
  {
    href: "/",
    title: "Stylish Name Generator",
    description: "Every Unicode font style in one place — all platforms.",
  },
];

type ToolLink = {
  href: string;
  title: string;
  description: string;
};

export default function RelatedTools({
  tools = DEFAULT_TOOLS,
}: {
  tools?: ToolLink[];
}) {
  return (
    <section aria-labelledby="related-tools-heading" className="related-tools">
      <h2 id="related-tools-heading" className="article-heading">
        More tools you might like
      </h2>
      <div className="related-tools__grid">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="related-tools__card"
          >
            <h3 className="related-tools__title">{tool.title}</h3>
            <p className="related-tools__desc">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
