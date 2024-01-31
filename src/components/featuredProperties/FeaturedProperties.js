import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import FeaturedAdCard from "../../components/cards/FeaturedAdCard";

const FeaturedProperties = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  useEffect(() => {
    fetchAds();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
      setAds(data.ads);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div>
      {/* <h2> Responsive </h2> */}
      <Slider {...settings}>
        {ads?.map((ad) => (
          <FeaturedAdCard ad={ad} key={ad._id} />
        ))}
      </Slider>
      {/* <pre>{JSON.stringify(ads, null, 4)} </pre> */}
    </div>
  );
};

export default FeaturedProperties;
