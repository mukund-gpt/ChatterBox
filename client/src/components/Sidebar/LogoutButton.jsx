import React from "react";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.message);

      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mx-4 mt-1 mb-0 p-0 text-2xl">
      <CiLogout
        onClick={logout}
        className="text-red-500 cursor-pointer hover:text-red-600"
      />
      <ToastContainer />
    </div>
  );
};

export default LogoutButton;
