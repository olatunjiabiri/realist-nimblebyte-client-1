import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import { useAuth } from "../../context/auth";

import { updatePasswordSchema } from "../../../src/validations";

export default function UpdatePassword() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    // e.preventDefault();
    const { currentPassword, newPassword } = values;

    try {
      setLoading(true);
      console.log("values>>>>", values);
      const { data } = await axios.post(
        `https://payorigins-auth.azurewebsites.net/user/ChangePassword`,
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
        toast.success("Password Updated");
        setLoading(false);
        actions.resetForm();
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
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit,
  });

  return (
    <div className="container m-5 p-5">
      <div className="container mt-5 pt-5" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                id="validationCustom03"
                name="currentPassword"
                placeholder="Current password"
                className="form-control mb-2"
                // required
                autoFocus
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.currentPassword && touched.currentPassword && (
                <div className="mt-0 text-danger">
                  <small>
                    {" "}
                    <p> {errors.currentPassword}</p>
                  </small>
                </div>
              )}

              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                className="form-control mb-2"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.newPassword && touched.newPassword && (
                <div className="mt-0 text-danger">
                  <small>
                    {" "}
                    <p> {errors.newPassword}</p>
                  </small>
                </div>
              )}

              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm the new password"
                className="form-control mb-2"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
      </div>
    </div>
  );
}
