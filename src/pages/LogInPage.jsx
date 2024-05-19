import vegetables from "../images/vegetables.png";
import logo from "../images/logo.png";
import { useCallback, useEffect, useState } from "react";
import { getUsers, setLoggedInUser } from "../utils";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback(() => {
    const errors = {};
    if (!formValues.email) errors.email = "Email is required";
    if (!formValues.password) errors.password = "Password is required";
    return errors;
  }, [formValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    submitted && setErrors(validate());
  }, [formValues, submitted, validate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (validationErrors.length) return;
    const users = getUsers();
    const foundUser = users.find(
      (user) =>
        user.email === formValues.email && user.password === formValues.password
    );

    if (foundUser) {
      setLoggedInUser(formValues);
      navigate("/");
    } else {
      setErrors({ ...validationErrors, invalid: "Invalid credentials" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-pink-100 to-white ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center w-full mb-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </div>
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold mb-2">Glad to see you again.</div>
          <p className="text-gray-600">Login with your account below.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {errors.invalid && (
            <p className="text-red-500 text-center text-sm my-1">
              {errors.invalid}
            </p>
          )}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#FF928B] text-white py-2 rounded-md focus:outline-none focus:ring-2"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-[#FF928B] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <img
        src={vegetables}
        alt="Vegetables"
        className="hidden md:block md:w-1/2 lg:w-1.5/3 object-contain h-[100vh]"
      />
    </div>
  );
};

export default LogInPage;
