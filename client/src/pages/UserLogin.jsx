import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/authSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notifyToast } from "../utils/notifyToast";

import People from "../assets/People.png";

const UserLogin = () => {
  const URL = "http://localhost:5000/api/auth/user";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  console.log(currentUser);
  const loginUser = (data) => {
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res);
        notifyToast("Success! Redirecting...", "success");
        setTimeout(() => {
          navigate("/manuscript/dashboard");
        }, 3000);
        dispatch(login(res.data));
      })
      .catch((err) => {
        notifyToast(err.response.data.message.toString(), "error");
      });
  };

  return (
    <div className="w-screen h-full px-4 ">
      <div className="max-w-[1400px] min-h-[calc(100vh-160px)] mx-auto grid grid-cols-1 gap-x-4 md:grid-cols-2 place-content-center">
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-center">
          <h1 className="text-h1 font-roboto font-bold text-textColor">
            Login
          </h1>

          <p className="text-h4 font-roboto font-medium text-textColor">
            Hello There! Log in to continue and get started.
          </p>
          <Formik
            onSubmit={loginUser}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form className="mt-10 grid gap-y-6">
              <div className="grid gap-y-4">
                <label
                  htmlFor="username"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Username
                </label>
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-400"
                />
                <Field
                  autoComplete="off"
                  id="username"
                  name="username"
                  className="py-4 px-2 bg-inputBox rounded-xl"
                />
              </div>

              <div className="grid gap-y-4">
                <label
                  htmlFor="password"
                  className="text-h4 font-roboto font-medium text-textColor"
                >
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-400"
                />
                <Field
                  type="password"
                  autoComplete="off"
                  id="password"
                  name="password"
                  className="py-4 px-2 bg-inputBox rounded-xl"
                />
              </div>

              {currentUser && (
                <div className="bg-green-400 py-4 font-roboto px-4 rounded-xl text-white">
                  <p>Welcome {currentUser.username}!</p>
                </div>
              )}

              <div className="w-full h-full flex justify-end">
                <button
                  type="submit"
                  className="px-12 py-2 rounded-xl text-h4 font-roboto font-medium text-white bg-button"
                >
                  Log in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        {/* RIGHT PANEL */}
        <div className="w-full h-full flex flex-col items-center pb-20 md:pb-0">
          <img
            src={People}
            alt="People Logo"
            className="w-full  max-w-[550px] mx-auto object-cover"
          />
          <div className=" max-w-[550px]">
            <h1 className="text-h2 font-roboto font-medium text-textColor text-center">
              Browsing Manuscripts made easier!
            </h1>
            <p className="text-p font-roboto font-normal text-textColor text-center">
              Through CEIT Manuscript Information System, everything is made
              clean, less time-consuming, and easy to maintain. Be sure to login
              to gain special permissions
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
