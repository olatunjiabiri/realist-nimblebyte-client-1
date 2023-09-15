import * as yup from "yup";

export const passwordResetSchema = yup.object().shape({
  otp: yup.number().required("Enter the otp"),
  password: yup
    .string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
    ),
  email: yup
    .string()
    .required("Enter your email")
    .email("Invalid email address"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password must match")
    .required("Required"),
});

export const updatePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
    ),
  currentPassword: yup
    .string()
    .min(8)
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), ""], "Password must match")
    .required("Required"),
});
