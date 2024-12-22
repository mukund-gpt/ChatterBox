import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import chattingImage from "../assets/images/ChattingApp.png";
import { useAuthContext } from "../context/AuthContext";
import { baseUrl } from "../assets/baseUrl";
import GoogleSvg from "../assets/SVG/GoogleSvg";
import CloseEye from "../assets/SVG/CloseEye";
import OpenEye from "../assets/SVG/OpenEye";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const togglePasswordVisibilty = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // console.log(formData);
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network Response was Not OK");
      }

      // console.log(response);
      const data = await response.json();
      // console.log(data);

      if (data.success) {
        localStorage.setItem("user_details", JSON.stringify(data.user));
        setAuthUser(data.user);
        navigate("/", { state: { message: "Login successful!" } });
      } else {
        // console.log("Login failed ", data.message);
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.log("Error in Submitting form", error);
      toast.error(`Error in Submitting form ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8">
            <h2 className="font-bold text-3xl text-[#002D74] text-center">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-3 mt-8 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  className="p-3 rounded-xl w-full border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />

                <span onClick={togglePasswordVisibilty}>
                  {isPasswordVisible ? <CloseEye /> : <OpenEye />}
                </span>
              </div>
              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <br />
            <hr />

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black font-medium">
              <GoogleSvg />
              Login with Google
            </button>
            <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip text-black">
              Forget password?
            </div>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-black">
                If you don't have an account..
              </p>
              <Link to="/signup">
                <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl max-h-[1600px]"
              src={chattingImage}
              alt="login form image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
