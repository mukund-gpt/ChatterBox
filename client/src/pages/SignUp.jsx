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

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSelectGender = (e) => {
    const { value } = e.target;
    setGender(value);
    formData.gender = value;
  };

  const togglePasswordVisibilty = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.gender
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network Response was Not OK");
      }

      // console.log(response);
      const data = await response.json();
      // console.log(data);

      if (data.success) {
        // toast.success("Registration Success");
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        navigate("/", { state: { message: "Registration successful!" } });
      } else {
        // console.log("Registration failed ", data.message);
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      // console.log("Error in Submitting form ", error);
      toast.error(`Error in submitting form: ${error.message}`);
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
              New User
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-3 mt-8 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="username"
                name="username"
                placeholder="Username"
                value={formData.username || ""}
                onChange={handleChange}
              />
              <input
                className="p-3 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              <div className="mx-12 form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-black">Male</span>
                  <input
                    type="checkbox"
                    className="checkbox border-green-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleSelectGender}
                  />
                  <span className="label-text text-black">Female</span>
                  <input
                    type="checkbox"
                    className="checkbox border-green-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange] checked:border-indigo-800"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleSelectGender}
                  />
                </label>
              </div>

              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "SignUp"
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
                If you already a member, log in now.
              </p>
              <Link to="/login">
                <button className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
                  Login
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

export default SignUp;
