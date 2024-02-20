import React, { useEffect, useState } from "react";

import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";

import FeaturedProperties from "../components/featuredProperties/FeaturedProperties.js";
import AdsForSale from "../components/adsForSale/AdsForSale.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [featuredPropertyLoading, setFeaturedPropertyLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  return (
    <div>
      <LogoutMessage>
        <div>
          <SearchForm />
        </div>

        <div className="container mt-3 px-4">
          <FeaturedProperties
            featuredPropertyLoading={featuredPropertyLoading}
            setFeaturedPropertyLoading={setFeaturedPropertyLoading}
          />
        </div>

        <div className="container pt-3 px-4">
          {!featuredPropertyLoading && (
            <AdsForSale setLoading={setLoading} loading={loading} />
          )}
        </div>
      </LogoutMessage>
      {/* <pre>{JSON.stringify(cLocation, null, 4)} </pre> */}
    </div>
  );
}
