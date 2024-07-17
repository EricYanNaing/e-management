import { Link, Navigate, useNavigate } from "react-router-dom";
import StyleErrorMesg from "./StyleErrorMesg";
import { Formik, Form, Field } from "formik";
import { AiOutlineLoading } from "react-icons/ai";
import * as Yup from "yup";
import { useState } from "react";
import { AuthValuesProps } from "../../lib/types/authformprops";
import { useDispatch, useSelector } from "react-redux";
import { setLoginReducer } from "../../lib/store/reducer/auth";
import { RootState } from "../../lib/store/store";

const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: AuthValuesProps = {
    _id: "",
    name: "",
    email: "",
    password: "",
    createdAt: "",
    updatedAt: "",
  };
  const UserFormSchema = Yup.object({
    name: isLogin
      ? null
      : Yup.string()
          .min(3, "Uesrname must have at least 3 characters.")
          .required("Uesrname is required."),
    email: Yup.string().email("Invalid Email.").required("Email is required."),
    password: Yup.string()
      .min(3, "Password must have at least 3 words.")
      .required("Password is required."),
  });

  const submitHandler = async (values: AuthValuesProps) => {
    if (isLogin) {
      // Login Form
      setLoading(true);
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        const { token, user_mail, userId } = data;
        console.log(data);
        dispatch(setLoginReducer({ token, user_mail, userId }));

        window.alert("Auth Success ");
        navigate("/");
      } else {
        console.error("Error fetching users:");
        window.alert("Auth Failed!!!");
      }
      setLoading(false);
    } else {
      // Register Form
      setLoading(true);
      const response = await fetch("http://localhost:8000/create-user", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        return navigate("/");
      } else {
        throw new Error("Failed to fetch events");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center w-full ">
      <div className="bg-white w-96 dark:bg-gray-900 shadow-md rounded-lg px-8 py-6">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          {isLogin ? "Welcome Back!" : "Register New Account"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={UserFormSchema}
          onSubmit={submitHandler}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    User Name
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="name"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="user name"
                    required
                  />
                  <StyleErrorMesg name="name" />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
                <StyleErrorMesg name="email" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <StyleErrorMesg name="password" />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    {isLogin ? "Not registered?" : "Already Have an account?"}
                  </label>
                </div>
                {isLogin ? (
                  <Link to={"/register"} className=" text-white ">
                    Create Account Here
                  </Link>
                ) : (
                  <Link to={"/login"} className=" text-white ">
                    Login Here
                  </Link>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin
                  ? `${
                      loading ? (
                        <>
                          <AiOutlineLoading />
                          'Loginning...'
                        </>
                      ) : (
                        "Login"
                      )
                    }`
                  : `${
                      loading ? (
                        <>
                          <AiOutlineLoading />
                          'Registering...'
                        </>
                      ) : (
                        "Register"
                      )
                    }`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
