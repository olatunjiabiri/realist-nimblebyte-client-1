import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import FeaturedAdCard from "../../components/cards/FeaturedAdCard";
import "./FeaturedProperties.css";

const NextArrow = ({ className, style, onClick }) => {
  // const { className, style, onClick } = props;
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

const FeaturedProperties = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [featuredProperty, setFeaturedProperty] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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
        breakpoint: 600,
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
        data.ads.filter(
          (d) =>
            d.postedBy === "349a53b8-2112-456f-a786-7861124625b6" &&
            d.sold === "Available"
        )
      );

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 className="mt-5">Featured Properties</h3>

      <Slider {...settings}>
        {featuredProperty?.map((ad) => (
          <FeaturedAdCard ad={ad} key={ad._id} />
        ))}
      </Slider>
      {/* <pre>{JSON.stringify(ads, null, 4)} </pre> */}
    </div>
  );
};

export default FeaturedProperties;
