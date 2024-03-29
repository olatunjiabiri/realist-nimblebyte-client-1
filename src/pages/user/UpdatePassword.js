import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { useAuth } from "../../context/auth";
import config from "../../config.js";
import { updatePasswordSchema } from "../../../src/validations";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import LogoutMessage from "../../components/misc/logoutMessage/LogoutMessage";
import "./UpdatePassword.css";

export default function UpdatePassword() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // hooks
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    // e.preventDefault();
    const { currentPassword, newPassword } = values;

    try {
      setLoading(true);
      // console.log("values>>>>", values);
      const { data } = await axios.post(
        `${config.AUTH_API}/user/ChangePassword`,
        {
          UserId: auth.user?.userId,
          OldPassword: currentPassword,
          NewPassword: newPassword,
        }
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        localStorage.removeItem("cLocation");
        localStorage.removeItem("adData");
        localStorage.removeItem("profileFormData");
        localStorage.removeItem("profile");
        toast.success("Password Updated");
        setLoading(false);
        actions.resetForm();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Try Again.");
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
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit,
  });

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <LogoutMessage>
      <ContentWrapper>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  // type="password"
                  type={visible ? "text" : "password"}
                  id="validationCustom03"
                  name="currentPassword"
                  placeholder="Current password"
                  className="form-control mb-3"
                  // required
                  autoFocus
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="password-toggle" onClick={toggle}>
                  {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              {/* {errors.currentPassword && touched.currentPassword && (
                <div className="mt-0 text-danger">
                  <small>
                    {" "}
                    <p> {errors.currentPassword}</p>
                  </small>
                </div>
              )} */}

              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="newPassword"
                  placeholder="New password"
                  className="form-control mb-3"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="password-toggle" onClick={toggle}>
                  {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              {errors.newPassword && touched.newPassword && (
                <div className="mt-0 text-danger">
                  <small>
                    {" "}
                    <p> {errors.newPassword}</p>
                  </small>
                </div>
              )}

              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm the new password"
                  className="form-control mb-3"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="password-toggle" onClick={toggle}>
                  {visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <div className="mt-0 text-danger">
                  <small>
                    {" "}
                    <p> {errors.confirmNewPassword}</p>
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
    </LogoutMessage>
  );
}
