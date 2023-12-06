import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  contactName: yup.string().required("Name is required"),
  phone: yup.string().required("Contact Phone is required"),
  // message: yup.string().required("Drop a message for us"),
  email: yup
    .string()
    .required("Enter your email")
    .email("Invalid email address"),
});
