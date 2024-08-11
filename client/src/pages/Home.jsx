import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar/Sidebar";
import MessageContainer from "../components/Messages/MessageContainer";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear the state after showing the toast
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="flex h-[600px] rounded-lg overflow-hidden m-auto mx-10 w-[750px] bg-orange-200">
          <Sidebar />
          <MessageContainer />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
