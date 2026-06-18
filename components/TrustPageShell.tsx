import Breadcrumb from "@/components/Breadcrumb";

type TrustPageShellProps = {
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
};

export default function TrustPageShell({
  title,
  breadcrumbLabel,
  children,
  lead,
}: TrustPageShellProps) {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: breadcrumbLabel },
        ]}
      />
      <h1 className="article-h1 reveal mb-6 mt-6">{title}</h1>
      {lead ? <div className="article-lead reveal mb-10">{lead}</div> : null}
      <article className="article-content reveal">{children}</article>
    </main>
  );
}
