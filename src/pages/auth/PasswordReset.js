import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { passwordResetSchema } from "../../validations";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import config from "../../config.js";
import { useAuth } from "../../context/auth.js";

import "./PasswordReset.css";

export default function PasswordReset() {
  // state

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // hooks
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    // e.preventDefault();
    const { otp, email, password } = values;

    try {
      setLoading(true);
      const response = await axios.post(
        `${config.AUTH_API}/user/ResetPassword`,
        {
          otp,
          email,
          password,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        setLoading(false);
      } else {
        toast.success("Your password has been reset, Login");
        setLoading(false);
        actions.resetForm();
        setAuth({ user: null, token: "" });

        localStorage.removeItem("auth");
        localStorage.removeItem("cLocation");
        localStorage.removeItem("adData");
        localStorage.removeItem("profileFormData");
        localStorage.removeItem("profile");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: {
      otp: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordResetSchema,
    onSubmit,
  });

  const toggle = () => {
    setVisible(!visible);
  };
  return (
    <ContentWrapper>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Enter the otp"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-control mb-1"
              // required
              autoFocus
            />
            {errors.otp && touched.otp && (
              <div className="mt-0 text-danger">
                <small>
                  {" "}
                  <p> otp must be a number</p>
                </small>
              </div>
            )}

            <input
              type="text"
              id="validationCustom03"
              name="email"
              placeholder="Enter your email"
              className="form-control mb-1"
              // required
              // autoFocus
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.email && touched.email && (
              <div className="mt-0 text-danger">
                <small>
                  {" "}
                  <p> {errors.email}</p>
                </small>
              </div>
            )}

            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="form-control mb-1"
                // required
                // autoFocus
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="password-toggle" onClick={toggle}>
                {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>

            {errors.password && touched.password && (
              <div className="mt-0 text-danger">
                <small>
                  {" "}
                  <p> {errors.password}</p>
                </small>
              </div>
            )}

            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter the password again"
                className="form-control mb-1"
                // required
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="password-toggle" onClick={toggle}>
                {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>

            {errors.confirmPassword && touched.confirmPassword && (
              <div className="mt-0 text-danger">
                <small>
                  {" "}
                  <p> {errors.confirmPassword}</p>
                </small>
              </div>
            )}

            <button
              disabled={loading}
              // disabled={isSubmitting}
              className="btn btn-primary col-12 mb-4"
            >
              {loading ? "Waiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </ContentWrapper>
  );
}
