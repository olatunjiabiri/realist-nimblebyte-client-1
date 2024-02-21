import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { ShimmerPostList } from "react-shimmer-effects";
import useMediaQuery from "@mui/material/useMediaQuery";

import FeaturedAdCard from "../../components/cards/FeaturedAdCard";
import "./FeaturedProperties.css";

const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        // background: "#007bff",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const FeaturedProperties = ({
  featuredPropertyLoading,
  setFeaturedPropertyLoading,
}) => {
  const isSmScreen = useMediaQuery("(max-width:768px)");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [featuredProperty, setFeaturedProperty] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const shouldAutoPlay = featuredProperty?.length > 3 || isSmScreen;
  const moreThanOne = featuredProperty?.length > 1;

  const slidesToShow =
    featuredProperty?.length > 3 ? 3 : featuredProperty?.length;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow,
    autoplay: shouldAutoPlay,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/ads/${page}/${perPage}`);

      setFeaturedProperty(
        data?.ads?.filter(
          (d) =>
            d.featuredPropertyStatus &&
            // d.postedBy === "349a53b8-2112-456f-a786-7861124625b6" &&
            d.publishedStatus === "Published" &&
            d.sold === "Available"
        )
      );
      setFeaturedPropertyLoading(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {featuredProperty?.length > 0 && (
        <div>
          {loading ? (
            <div style={{ padding: "40px 0" }}>
              <ShimmerPostList
                postStyle="STYLE_FOUR"
                col={3}
                row={1}
                gap={30}
              />
            </div>
          ) : (
            <>
              {(featuredProperty?.length < 4 && !isSmScreen) ||
              featuredProperty?.length === 1 ? (
                <>
                  <h3 className="mt-5 text-center">
                    {" "}
                    Featured {moreThanOne ? "Properties" : "Property"}
                  </h3>

                  <div className="featured-property-container">
                    {featuredProperty?.map((ad) => (
                      <FeaturedAdCard ad={ad} key={ad._id} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mt-5 text-center">
                    Featured {moreThanOne ? "Properties" : "Property"}
                  </h3>
                  <Slider {...settings}>
                    {featuredProperty?.map((ad) => (
                      <FeaturedAdCard ad={ad} key={ad._id} />
                    ))}
                  </Slider>
                </>
              )}
            </>
          )}
          {/* <pre>{JSON.stringify(featuredProperty.length, null, 4)} </pre> */}
        </div>
      )}
    </>
  );
};

export default FeaturedProperties;
