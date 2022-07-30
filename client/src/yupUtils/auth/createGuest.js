import * as Yup from "yup";

export const initialValues = {
  guestUsername: "",
  guestPassword: "",
};

export const validationSchema = Yup.object().shape({
  guestUsername: Yup.string().required("Guest Username is required"),
  guestPassword: Yup.string().required("Guest Password is required"),
});
