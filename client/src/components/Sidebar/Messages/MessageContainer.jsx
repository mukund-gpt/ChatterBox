import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <>
      <div className="md:min-w-[450px] flex flex-col">
        <div className="bg-orange-300 gap-5 h-10 text-black font-bold px-10 flex items-center">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <p> Username</p>
        </div>

        <Messages />

        <MessageInput />
      </div>
    </>
  );
};

export default MessageContainer;
