import * as Yup from "yup";

export const initialValues = {
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  secretKey: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  currentPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmNewPassword: Yup.string().required("New Password is required"),
  secretKey: Yup.string().required("Secret Key is required"),
});
