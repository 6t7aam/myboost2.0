import { SITE_NAME, SITE_SOCIAL_LINKS, SITE_URL, toAbsoluteUrl } from "@/lib/siteConfig";

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: toAbsoluteUrl("/favicon.ico"),
  sameAs: SITE_SOCIAL_LINKS,
});

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

export const buildFaqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

interface ServiceSchemaArgs {
  name: string;
  description: string;
  path: string;
  image?: string;
  price?: number | string;
  priceCurrency?: string;
}

export const buildServiceSchema = ({
  name,
  description,
  path,
  image,
  price,
  priceCurrency = "USD",
}: ServiceSchemaArgs) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: toAbsoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };

  if (image) {
    schema.image = [toAbsoluteUrl(image)];
  }

  if (price !== undefined) {
    schema.offers = {
      "@type": "Offer",
      url: toAbsoluteUrl(path),
      priceCurrency,
      price: typeof price === "number" ? price.toFixed(2) : price,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
};
