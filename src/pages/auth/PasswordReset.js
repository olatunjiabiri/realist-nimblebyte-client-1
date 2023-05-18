import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { passwordResetSchema } from "../../validations";

export default function PasswordReset() {
  
  // state

  const [values1] = useState({
    otp: "",
    email: "",
    password: "",
  });
  const { otp, email, password } = values1;

  const [loading, setLoading] = useState(false);
  // hooks
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    // e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `https://payorigins-auth.azurewebsites.net/user/ResetPassword`,
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

  return (
    <div>
      <h1 className="display-1 text-center bg-primary text-light p-5">
        Reset Password
      </h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
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
                <p className="mt-0 text-danger">
                  <small>
                    {" "}
                    <div> otp must be a number</div>
                  </small>
                </p>
              )}

              <input
                type="text"
                class="form-control"
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
                <p className="mt-0 text-danger">
                  <small>
                    {" "}
                    <div> {errors.email}</div>
                  </small>
                </p>
              )}

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="form-control mb-1"
                // required
                // autoFocus
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              
              />
              {errors.password && touched.password && (
                <p className="mt-0 text-danger">
                  <small>
                    {" "}
                    <div> {errors.password}</div>
                  </small>
                </p>
              )}

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
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="mt-0 text-danger">
                  <small>
                    {" "}
                    <div> {errors.confirmPassword}</div>
                  </small>
                </p>
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
