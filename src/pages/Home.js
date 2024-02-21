import React, { useEffect, useState } from "react";
import { ShimmerPostList } from "react-shimmer-effects";

import SearchForm from "../components/forms/SearchForm";
import LogoutMessage from "../components/misc/logoutMessage/LogoutMessage";
import FeaturedProperties from "../components/featuredProperties/FeaturedProperties.js";
import AdsForSale from "../components/adsForSale/AdsForSale.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [featuredPropertyLoading, setFeaturedPropertyLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (featuredPropertyLoading) {
      setShowShimmer(true);
    } else {
      setShowShimmer(false);
    }
  }, [loading, featuredPropertyLoading]);

  return (
    <div>
      <LogoutMessage>
        <div>
          <SearchForm />
        </div>
        {showShimmer && (
          <div style={{ padding: "40px 0" }}>
            <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={3} gap={30} />
          </div>
        )}

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
    </div>
  );
}
