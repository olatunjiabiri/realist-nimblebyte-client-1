import { useParams } from "react-router-dom";
import { useState, useCallback } from "react";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageGallery({ photos }) {
  // state
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // hooks
  const params = useParams();

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrent(index);
    setIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrent(0);
    setIsOpen(false);
  };

  console.log('photos',  photos)

  return (
    <>
    <div className="box"> 
      <Carousel useKeyboardArrows={true}>
        {photos.map((x, index) => (
          <div className="slide">
           
            <img alt="sample_file" src={x.src} key={index} />
          </div>
        ))}
      </Carousel>
      
      </div>
    </>
  );
}
