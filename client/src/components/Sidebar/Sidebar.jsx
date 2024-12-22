import React from "react";
import SearchInput from "./SearchInput";
import Conversation from "./Conversations";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <div className="relative h-full border-r border-slate-500 p-4 flex flex-col">
      <div className="flex space-x-2">
        <Profile />
        <SearchInput />
      </div>
      <div className="divider px-3"></div>
      <Conversation />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
