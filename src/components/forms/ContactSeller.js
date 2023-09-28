import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

export default function ContactSeller({ ad }) {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState("");
  // hooks
  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "";

  useEffect(() => {
    if (loggedIn) {
      // If the user is logged in, set their details as initial values in the form fields
      // Reset message when the ad prop changes
      setFirstName(auth.user?.firstName || "");
      setEmail(auth.user?.email || "");
      setPhone(auth.user?.phone || "");
      setMessage(
        `Hi Property Owner, I am interested in the property located at ${
          ad?.address || ""
        }. Kindly reach out to me. Thanks`
      );
    }
  }, [auth.user, ad]);

  // useEffect(() => {
  //   if(ad?.postedBy?.name){
  //     setMessage("Hello ${ad?.postedBy?.name}. ${message}");
  //   }
  // }, [ad])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/contact-seller", {
        firstName,
        email,
        message,
        phone,
        adId: ad._id,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Your enquiry has been emailed to the seller");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="contact-owner" className="row">
        <div className="col-lg-8 offset-lg-2">
          <h3>
            Contact this Property{" "}
            {ad?.postedBy?.name ? ad?.postedBy?.name : ad?.postedBy?.username}
          </h3>

          <form onSubmit={handleSubmit}>
            <textarea
              name="message"
              className="form-control mb-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus={true}
              // disabled={!loggedIn}
            ></textarea>

            <input
              type="text"
              className="form-control mb-3"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              // disabled={!loggedIn}
            />

            <input
              type="text"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // disabled={!loggedIn}
            />

            <input
              type="text"
              className="form-control mb-3"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              // disabled={!loggedIn}
            />

            <button
              className="btn btn-primary mt-4 mb-5"
              disabled={!firstName || !email || loading}
            >
              {loading ? "Please wait" : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
