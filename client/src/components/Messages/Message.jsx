import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  const { selectedConversation } = useConversation();

  const messageFromMe = message.senderId === authUser.id;

  const chatClassName = messageFromMe ? "chat-end" : "chat-start";
  const profilePic = messageFromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const msgBgColor = messageFromMe ? "bg-white" : "bg-blue-500";

  const formattedTime = () => {
    const date = new Date(message.createdAt);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timezone: "Asia/Kolkata",
    };
    return date.toLocaleTimeString("en-IN", options);
  };

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble ${msgBgColor} text-black font-bold`}>
          {message.message}
        </div>
        <div className="chat-footer text-black opacity-50">
          {formattedTime()}
        </div>
      </div>
    </>
  );
};

export default Message;
