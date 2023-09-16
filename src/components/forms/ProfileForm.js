import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import ProfileUpload from "../../components/forms/ProfileUpload";
import config from "../../NewConfig";

export default function ProfileForm() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [reg_number, setReg_number] = useState("");
  const [userType, setUserType] = useState("Buyer");

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setFirstName(auth.user?.firstName);
      setLastName(auth.user?.lastName);
      setEmail(auth.user?.email);
      setCompany(auth.user?.company);
      setAddress(auth.user?.address);
      setPhone(auth.user?.address);
      setAbout(auth.user?.about);
      setPhoto(auth.user?.photo);
      setReg_number(auth.user?.reg_number);
    }
  }, []);

  const sellerRole = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(`${config.AUTH_API}/user/AddRole`, {
        userId: auth.user.userId,
        role: "Seller",
      });
      // console.log('role response data >>>>', data)
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        setAuth({ ...auth, user: { role: "Seller" } });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = { role: "Seller" };
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Role Added");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Something went wrong. Role cannot be assigned now. Try again."
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${config.AUTH_API}/user/updateProfile`,
        {
          firstName,
          lastName,
          email,
          company,
          address,
          phone,
          about,
          reg_number,
          photo: photo.Location,
        }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        console.log("auth.user==>", auth.user);
        console.log("responsePayload==>", data.responsePayload);

        console.log("data=>", data);
        const data1 = { ...auth.user, role: "Buyer", userId: auth.user.userId };
        setAuth({ ...auth, user: data.responsePayload });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data1;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);

        if (!auth.user?.role?.includes("Seller") || userType === "Seller") {
          sellerRole();
        }

        toast.success("Profile updated");
        // reload page on redirect
        // window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const onOptionChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <>
      <div className="container-fluid">
        {/* <Sidebar /> */}
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              {/* <div> */}
              <h4>Select User Type</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  value="Seller"
                  id="seller"
                  checked={userType === "Seller"}
                  onChange={onOptionChange}
                  style={{ marginRight: 0 }}
                />

                <label className="form-check-label" htmlFor="Seller">
                  Seller
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  value="Buyer"
                  id="buyer"
                  checked={userType === "Buyer"}
                  onChange={onOptionChange}
                />

                <label className="form-check-label" htmlFor="buyer">
                  Buyer
                </label>
              </div>
              {/* </div> */}
              {userType === "Seller" && (
                <ProfileUpload
                  photo={photo}
                  setPhoto={setPhoto}
                  uploading={uploading}
                  setUploading={setUploading}
                />
              )}

              <form onSubmit={handleSubmit}>
                {userType === "Seller" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="form-control mb-3"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Registration number"
                      className="form-control mb-3"
                      value={reg_number}
                      onChange={(e) => setReg_number(e.target.value)}
                    />
                  </>
                ) : (
                  ""
                )}

                <input
                  type="text"
                  placeholder="Firstname"
                  className="form-control mb-3"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Lastname"
                  className="form-control mb-3"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  value={email}
                  disabled={true}
                />

                <input
                  type="text"
                  placeholder="Address"
                  className="form-control mb-3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="form-control mb-3"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                  placeholder="Write something interesting about yourself.."
                  className="form-control mb-3"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={200}
                />
                <button
                  className="btn btn-primary col-12 mb-5"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Update profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
