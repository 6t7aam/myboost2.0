import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/siteConfig';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  /** Page social-share image (used for both og:image and twitter:image). */
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  /** Optional override for og:title — defaults to `title`. */
  ogTitle?: string;
  /** Optional override for og:description — defaults to `description`. */
  ogDescription?: string;
  /** Optional override for twitter:title — defaults to `ogTitle` or `title`. */
  twitterTitle?: string;
  /** Optional override for twitter:description — defaults to `ogDescription` or `description`. */
  twitterDescription?: string;
  /** Optional twitter card type — defaults to summary_large_image. */
  twitterCard?: string;
  robots?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  canonicalUrl,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  twitterCard = "summary_large_image",
  robots = "index,follow,max-image-preview:large",
}: SEOProps) => {
  const siteName = SITE_NAME;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const resolvedOgTitle = ogTitle ?? fullTitle;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
