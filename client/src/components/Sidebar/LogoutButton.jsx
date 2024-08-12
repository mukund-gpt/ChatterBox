import React from "react";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../../assets/baseUrl";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
    <div className="absolute bottom-0 left-0 right-0 h-[30px] px-4 py-1 text-2xl bg-orange-200">
      <CiLogout
        onClick={logout}
        className="text-red-500 cursor-pointer hover:text-red-600"
      />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default LogoutButton;
