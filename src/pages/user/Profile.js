import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import Sidebar from "../../components/nav/Sidebar";
import ProfileUpload from "../../components/forms/ProfileUpload";

export default function Profile() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
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
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        `https://payorigins-auth.azurewebsites.net/user/updateProfile`,
        {
          firstName,
          lastName,
          email,
          company,
          address,
          phone,
          about,
          photo: photo.Location,
        }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {

       const  data1 = {...data, role: "Buyer", userId: auth.user.userId}
        setAuth({ ...auth, user: data });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data1;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);
        toast.success("Profile updated");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* <h1 className="display-1 bg-primary text-light p-5">Profile</h1> */}
      <div className="container-fluid">
        <Sidebar />
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-2">
              <ProfileUpload
                photo={photo}
                setPhoto={setPhoto}
                uploading={uploading}
                setUploading={setUploading}
              />

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Update your firstname"
                  className="form-control mb-4"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(slugify(e.target.value.toLowerCase()))
                  }
                />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control mb-4"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-4"
                  value={email}
                  disabled={true}
                />
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="form-control mb-4"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="form-control mb-4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your phone"
                  className="form-control mb-4"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Write something interesting about yourself.."
                  className="form-control mb-4"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={200}
                />
                <button
                  className="btn btn-primary col-12 mb-4"
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
