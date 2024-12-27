import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { MdMessage } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import { EllipsisVertical } from "lucide-react";
import useDeleteAllMessages from "../../hooks/useDeleteAllMessages";

const MessageContainer = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { deleteAllMessages } = useDeleteAllMessages();

  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  const handleDelete = () => {
    deleteAllMessages();
  };

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-orange-300 gap-5 h-[60px] text-black font-bold px-4 flex items-center justify-between relative">
            <div className="flex items-center gap-5">
              <div className="chat-image avatar my-auto">
                <div className="w-10 rounded-full">
                  <img src={selectedConversation?.profilePic} alt="Profile" />
                </div>
              </div>
              <p>{selectedConversation?.username}</p>
            </div>
            <span
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <EllipsisVertical />
            </span>

            {showDropdown && (
              <div
                className={`absolute right-0 top-full mt-0 w-32 bg-white border rounded-md shadow-lg z-10`}
              >
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white rounded-md"
                >
                  Clear chat
                </button>
              </div>
            )}
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-slate-800 font-semibold flex flex-col items-center gap-2">
        <p className="text-1xl">Welcome {authUser.username}, </p>
        <p className="text-2xl">Select a Chat to start messaging</p>
        <MdMessage className="text-5xl" />
      </div>
    </div>
  );
};

export default MessageContainer;
