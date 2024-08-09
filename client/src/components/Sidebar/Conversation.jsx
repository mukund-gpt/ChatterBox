import React from "react";

const Conversation = () => {
  return (
    <div className="flex gap-4 my-0.5 text-black font-bold items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img
            src="https://wallpapers.com/images/high/link-wallpaper-link-iphone-6-wallpaper-legend-of-zelda-56wmi3pw9qmcwfva.webp"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p>Mukund</p>
        </div>
      </div>
     
    </div>
  );
};

export default Conversation;
