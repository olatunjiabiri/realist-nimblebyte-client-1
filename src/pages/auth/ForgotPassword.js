import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../../NewConfig";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

export default function Login() {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, password);
      setLoading(true);

      const { data } = await axios.get(
        `${
          config.AUTH_API
        }/user/SendResetPasswordCode?email=${email}&appId=${""}`
      );

      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Please check your email for password reset link");
        setLoading(false);
        navigate("/reset-password");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Enter your email"
              className="form-control mb-4"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading} className="btn btn-primary col-12 mb-4">
              {loading ? "Waiting..." : "Submit"}
            </button>
          </form>

          <Link className="text-danger" to="/login">
            Back to login
          </Link>
        </div>
      </div>
    </ContentWrapper>
  );
}
