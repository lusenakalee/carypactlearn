const SITE_URL = "https://carypactlearn.vercel.app";

export default function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CaryPact Learning Hub",
    alternateName: ["CaryPact Learn", "CaryPact Learning"],
    url: `${SITE_URL}/`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}