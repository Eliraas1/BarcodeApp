import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid  email")
    .required("Email Address is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("password is required"),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

export default schema;
