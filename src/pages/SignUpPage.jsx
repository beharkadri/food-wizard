import vegetables from "../images/vegetables.png";
import logo from "../images/logo.png";
import { useCallback, useEffect, useState } from "react";
import { addUser } from "../utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = useCallback(() => {
    const errors = {};
    if (!formValues.firstName) errors.firstName = "First name is required";
    if (!formValues.lastName) errors.lastName = "Last name is required";
    if (!formValues.username) errors.username = "Username is required";
    if (!formValues.age) errors.age = "Age is required";
    if (!formValues.gender) errors.gender = "Gender is required";
    if (!formValues.email) errors.email = "Email is required";
    if (!formValues.password) errors.password = "Password is required";
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
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
    if (Object.keys(validationErrors).length === 0) {
      addUser(formValues);
      toast.success("Successfully signed up, login to continue!");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-pink-100 to-white ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full md:mx-8">
        <div className="flex justify-center w-full mb-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </div>
        <div className="mb-4 text-center">
          <div className="text-2xl font-bold mb-2">Create your account</div>
          <p className="text-gray-600">
            Enter your details below to create an account and get started.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formValues.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formValues.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formValues.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formValues.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
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
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat Password"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#FF928B] text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF928B]"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-[#FF928B] hover:underline">
              Login
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

export default SignUpPage;
