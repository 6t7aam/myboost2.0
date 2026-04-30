import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const CanonicalTag = () => {
  const location = useLocation();
  const canonicalUrl = `https://www.myboost.top${location.pathname}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalTag;
