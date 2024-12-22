import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`avatar cursor-pointer`}>
        <div className="w-12 rounded-full">
          <img src={authUser?.profilePic} onClick={() => setOpen(true)} />
        </div>
      </div>
      {open && <EditProfile close={() => setOpen(false)} />}
    </>
  );
};

export default Profile;
