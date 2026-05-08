import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'Product' | 'WebPage';
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

    if (type === 'Product') {
      const productData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        brand: {
          '@type': 'Brand',
          name: 'MyBoost'
        },
        ...data
      };

      // Ensure image is always present
      if (!productData.image || (Array.isArray(productData.image) && productData.image.length === 0)) {
        productData.image = ['https://www.myboost.top/favicon.ico'];
      }

      // Ensure offers has required fields
      if (productData.offers) {
        if (!productData.offers.price && !productData.offers.priceSpecification) {
          productData.offers.price = '0.00';
        }
        if (!productData.offers.priceCurrency) {
          productData.offers.priceCurrency = 'USD';
        }
        if (!productData.offers.availability) {
          productData.offers.availability = 'https://schema.org/InStock';
        }
        if (!productData.offers.shippingDetails) {
          productData.offers.shippingDetails = {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'USD'
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 0,
                unitCode: 'HUR'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'HUR'
              }
            }
          };
        }
        if (!productData.offers.hasMerchantReturnPolicy) {
          productData.offers.hasMerchantReturnPolicy = {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'US',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
            returnMethod: 'https://schema.org/ReturnByMail'
          };
        }
      }

      return productData;
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
