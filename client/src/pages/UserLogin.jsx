import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout, resetState as resetThesis } from "../features/thesisSlice";
import { login, resetState } from "../features/authSlice";

import { useFormik } from "formik";
import { initialValues, validationSchema } from "../yupUtils/auth/userLogin";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notifyToast } from "../utils/notifyToast";

import People from "../assets/People.png";
import { useEffect } from "react";

const UserLogin = () => {
  const URL = "http://localhost:5000/api/auth/user";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);

  //* Formik automatically handles form validation and submission by declaring parameters in the formik hooks

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post(URL, values)
        .then((res) => {
          notifyToast("Success! Redirecting...", "success");
          setTimeout(() => {
            navigate("/manuscript/dashboard");
          }, 3000);
          dispatch(login(res.data));

          sessionStorage.setItem("User", res.data.token);
        })
        .catch((err) => {
          notifyToast(err.response.data.message, "error");
        });
    },
  });

  useEffect(() => {
    dispatch(resetState());
    dispatch(resetThesis());
  }, [dispatch]);

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

          <form className="mt-10 grid gap-y-6" onSubmit={formik.handleSubmit}>
            <div className="grid gap-y-4">
              <label
                htmlFor="username"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                Username
              </label>

              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-400">{formik.errors.username}</div>
              ) : null}
              <input
                id="username"
                name="username"
                type="text"
                className="py-4 px-2 bg-inputBox rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>

            <div className="grid gap-y-4">
              <label
                htmlFor="password"
                className="text-h4 font-roboto font-medium text-textColor"
              >
                Password
              </label>

              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-400">{formik.errors.password}</div>
              ) : null}
              <input
                id="password"
                name="password"
                type="password"
                className="py-4 px-2 bg-inputBox rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {currentUser && (
              <div className="bg-green-400 py-4 font-roboto px-4 rounded-xl text-white">
                <p>Welcome {currentUser.username}!</p>
              </div>
            )}

            <div className="w-full h-full flex justify-between items-center">
              <Link
                to="/auth/forgotpassword"
                className="text-blue-400 underline underline-offset-2"
              >
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="px-12 py-2 rounded-xl text-h4 font-roboto font-medium text-white bg-button"
              >
                {isLoading ? (
                  <>
                    <p className="pi pi-spin pi-spinner"></p>
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
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
