// Verification script to check structured data output
// Run with: node verify-structured-data.js

const structuredDataComponent = {
  getStructuredData: (type, data) => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

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
                unitCode: 'h'
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'h'
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
  }
};

// Example product data (Koens Farming)
const exampleProductData = {
  name: 'Koens Farming',
  description: 'Buy Koens farming in Arena Breakout: Infinite. Get rich fast with safe and efficient currency farming service.',
  image: ['https://www.myboost.top/images/koens-farming.jpg'],
  sku: 'koens-farming',
  offers: {
    '@type': 'Offer',
    url: 'https://www.myboost.top/game/arena-breakout/koens-farming',
    priceCurrency: 'USD',
    price: '1.50',
    availability: 'https://schema.org/InStock',
    areaServed: 'Worldwide',
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'USD'
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: ['US','GB','CA','AU','DE','FR']
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 0,
          unitCode: 'h'
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 0,
          maxValue: 1,
          unitCode: 'h'
        }
      }
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: ['US','GB','CA','AU','DE','FR'],
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      returnMethod: 'https://schema.org/ReturnByMail'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 600,
    bestRating: 5,
    worstRating: 1
  }
};

// Generate structured data
const result = structuredDataComponent.getStructuredData('Product', exampleProductData);

console.log('='.repeat(80));
console.log('STRUCTURED DATA VERIFICATION');
console.log('='.repeat(80));
console.log('\nGenerated Product Schema:\n');
console.log(JSON.stringify(result, null, 2));
console.log('\n' + '='.repeat(80));
console.log('VALIDATION CHECKLIST');
console.log('='.repeat(80));

// Validation checks
const checks = [
  { name: '✅ Has @context', pass: result['@context'] === 'https://schema.org' },
  { name: '✅ Has @type: Product', pass: result['@type'] === 'Product' },
  { name: '✅ Has name', pass: !!result.name },
  { name: '✅ Has description', pass: !!result.description },
  { name: '✅ Has image (array)', pass: Array.isArray(result.image) && result.image.length > 0 },
  { name: '✅ Brand type is "Brand" (not Organization)', pass: result.brand?.['@type'] === 'Brand' },
  { name: '✅ Has brand name', pass: result.brand?.name === 'MyBoost' },
  { name: '✅ Has offers', pass: !!result.offers },
  { name: '✅ Offer has @type', pass: result.offers?.['@type'] === 'Offer' },
  { name: '✅ Has price', pass: !!result.offers?.price },
  { name: '✅ Has priceCurrency', pass: result.offers?.priceCurrency === 'USD' },
  { name: '✅ Has availability', pass: result.offers?.availability === 'https://schema.org/InStock' },
  { name: '✅ Has shippingDetails', pass: !!result.offers?.shippingDetails },
  { name: '✅ Has hasMerchantReturnPolicy', pass: !!result.offers?.hasMerchantReturnPolicy },
  { name: '✅ Return policy is "NotPermitted"', pass: result.offers?.hasMerchantReturnPolicy?.returnPolicyCategory === 'https://schema.org/MerchantReturnNotPermitted' },
  { name: '✅ Has aggregateRating', pass: !!result.aggregateRating }
];

checks.forEach(check => {
  console.log(check.pass ? check.name : `❌ ${check.name.replace('✅', 'FAILED:')}`);
});

const allPassed = checks.every(c => c.pass);
console.log('\n' + '='.repeat(80));
console.log(allPassed ? '✅ ALL CHECKS PASSED!' : '❌ SOME CHECKS FAILED');
console.log('='.repeat(80));
console.log('\nTest this output at:');
console.log('- https://search.google.com/test/rich-results');
console.log('- https://validator.schema.org/');
console.log('='.repeat(80));
