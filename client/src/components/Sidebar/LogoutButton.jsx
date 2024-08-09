import React from "react";
import { CiLogout } from "react-icons/ci";
const LogoutButton = () => {
  return (
    <div
      className="mx-4 mt-1 mb-0 p-0
      text-2xl"
     
    >
      <CiLogout className="text-red-500 cursor-pointer" />
    </div>
  );
};

export default LogoutButton;
