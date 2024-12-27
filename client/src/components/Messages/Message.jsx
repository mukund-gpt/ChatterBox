import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import ShowImage from "./ShowImage";
import { ChevronDown } from "lucide-react";
import useDeleteMessage from "../../hooks/useDeleteMessage";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  const { selectedConversation } = useConversation();
  const { deleteMessage } = useDeleteMessage();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const messageFromMe = message.senderId === authUser._id;

  const chatClassName = messageFromMe ? "chat-end" : "chat-start";
  const profilePic = messageFromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const msgBgColor = messageFromMe ? "bg-white" : "bg-blue-300";
  const dropdownAlign = messageFromMe ? "right-0" : "left-0";

  const formattedTime = () => {
    const date = new Date(message.createdAt);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      timezone: "Asia/Kolkata",
    };
    return date.toLocaleTimeString("en-IN", options);
  };

  const handleDelete = async (id) => {
    await deleteMessage(id);
    setShowDropdown(false);
  };

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} />
          </div>
        </div>
        {message.image && (
          <div className={`chat-bubble bg-transparent`}>
            {
              <img
                src={message.image}
                width={200}
                onClick={() => handleImageClick(message.image)}
              />
            }
          </div>
        )}

        {message.message && (
          <div
            className={`chat-bubble ${msgBgColor} text-black font-bold relative pr-5`}
          >
            {message.message}

            {/* Dropdown Toggle */}
            <div className="absolute top-0 p-0 right-1 dropdown">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-black focus:outline-none"
              >
                <ChevronDown width={19} />
              </button>

              {showDropdown && (
                <div
                  className={`absolute ${dropdownAlign} mt-2 w-32 bg-white border rounded-md shadow-lg z-10`}
                >
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="chat-footer text-black opacity-50">
          {formattedTime()}
        </div>
      </div>

      {selectedImage && (
        <ShowImage
          imageUrl={selectedImage}
          closeImage={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default Message;
