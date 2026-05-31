import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type?: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const structuredData = Array.isArray(data)
    ? data.map((item) =>
        item['@context']
          ? item
          : {
              '@context': 'https://schema.org',
              ...(type ? { '@type': type } : {}),
              ...item,
            }
      )
    : data['@context']
      ? data
      : {
          '@context': 'https://schema.org',
          ...(type ? { '@type': type } : {}),
          ...data,
        };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
