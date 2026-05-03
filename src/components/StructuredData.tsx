import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'Service' | 'WebPage';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    if (type === 'Organization') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MyBoost',
        url: 'https://www.myboost.top',
        logo: 'https://www.myboost.top/favicon.ico',
        description: 'Professional game boosting services for Arena Breakout Infinite, CS2, Dota 2, and Rust',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '5000',
          bestRating: '5',
          worstRating: '1'
        },
        ...data
      };
    }

    if (type === 'Service') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        provider: {
          '@type': 'Organization',
          name: 'MyBoost',
          url: 'https://www.myboost.top'
        },
        ...data
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
