import * as yup from "yup";

export const contactAgentSchema = yup.object().shape({
  contactName: yup.string().required("Name is required"),
  phone: yup.string().required("Phone Number is required"),
  // message: yup.string().required("Drop a message for us"),
  email: yup
    .string()
    .required("Enter your email")
    .email("Invalid email address"),
});
