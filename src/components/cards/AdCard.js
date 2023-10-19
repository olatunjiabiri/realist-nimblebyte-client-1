import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import millify from "millify";
import { HashLink } from "react-router-hash-link";
import AdFeatures from "../../components/cards/AdFeatures";
// import { formatNumber } from "../../helpers/ad";

import ContactOwnerButton from "../contactOwnerButton/ContactOwnerButton";
import LikeUnlike from "../../components/misc/LikeUnlike";
import {
  ImageGallery,
  generatePhotosArray,
} from "../../components/misc/ImageGallery";
import Modall from "../modal/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./index.css";
import ContactSellerModal from "./../contactSellerModal/ContactSellerModal";

export default function AdCard({ ad }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -200;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [pathname]);

  function BasicExample() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  // export default BasicExample;

  return (
    <div className="d-flex col-lg-4 p-4 gx-4 gy-4 col-md-6 col-sm-6">
      {/* <Link className="link" to={`/ad/${ad.slug}`}> */}
      <Badge.Ribbon
        text={`${ad?.type} for ${
          ad?.action === "Sell" ? "Sale" : "Rent"
        }   |   ${ad?.sold ? "Not Available" : "Available"}`}
        color={`${ad?.action === "Sell" ? "blue" : "blue"}`}
      >
        <div className="card hoverable p-2 shadow-lg">
          {/* <Link className="link" to={`/ad/${ad.slug}`}> */}
          {/* <img
              src={ad?.photos?.[0].Location}
              alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
              style={{
                height: "250px",
                maxWidth: "350px",
                alignSelf: "center",
                objectFit: "cover",
              }}
            />{" "} */}
          <ImageGallery
            photos={generatePhotosArray(ad?.photos)}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          />
          {/* </Link> */}
          <div className="card-body ad-card-body">
            <div className="d-flex justify-content-between">
              <h3 className="pt-1">
                {" "}
                <span>&#8358;</span>
                {/* {formatNumber(ad?.price)} */}
                {millify(ad?.price)}
              </h3>
              <section className="like-unlike-button">
                <LikeUnlike ad={ad} />
              </section>
            </div>

            <p className="card-text">{ad?.address}</p>

            <AdFeatures ad={ad} />
            <div className="d-flex justify-content-between">
              <p className="pt-3 card-text">
                Posted {dayjs(ad?.createdAt).fromNow()}
              </p>
              <p className="justify-content-end">
                <Link className="bg-white" smooth>
                  <button
                    className="contact-owner-button"
                    onClick={() => setIsOpen(true)}
                  >
                    Contact Owner
                  </button>
                </Link>

                <Modall handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                  <BasicExample />
                  {/* <ContactSellerModal /> */}
                </Modall>
              </p>
            </div>
          </div>
        </div>
      </Badge.Ribbon>
      {/* </Link> */}
    </div>
  );
}
