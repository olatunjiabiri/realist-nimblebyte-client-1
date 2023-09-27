import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageGallery({ photos }) {
  return (
    <>
      <div className="box">
        <Carousel useKeyboardArrows={true} autoPlay={true}>
          {photos.map((x, index) => (
            <div key={index} className="slide">
              {/* key={index} */}
              <img src={x.src} alt="Loading" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
