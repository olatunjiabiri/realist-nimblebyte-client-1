import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const ImageGallery = ({
  photos,
  showThumbs = true,
  showStatus = true,
  showIndicators = true,
}) => {
  return (
    <>
      <div className="box">
        <Carousel
          showThumbs={showThumbs}
          showStatus={showStatus}
          infiniteLoop={true}
          autoPlay={true}
          showIndicators={showIndicators}
        >
          {photos.map((x, index) => (
            <div key={index} className="slide">
              {/* key={index} */}
              <img src={x.src} alt="Loading" width="30" height="300" />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
export const generatePhotosArray = (photos) => {
  if (photos?.length > 0) {
    const x = photos?.length === 1 ? 2 : 4;
    let arr = [];

    photos.map((p) =>
      arr.push({
        src: p.Location,
        width: x,
        height: x,
      })
    );
    return arr;
  } else {
    return [
      {
        src: "Image",
        width: 2,
        height: 1,
      },
    ];
  }
};
