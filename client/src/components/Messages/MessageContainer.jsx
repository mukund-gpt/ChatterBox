import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { MdMessage } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <>
      <div className="md:min-w-[450px] flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="bg-orange-300 gap-5 h-[60px] text-black font-bold px-10 flex items-center">
              <div className="chat-image avatar my-auto">
                <div className="w-10 rounded-full">
                  <img src={selectedConversation?.profilePic} />
                </div>
              </div>
              <p> {selectedConversation?.username}</p>
            </div>

            <Messages />
            <MessageInput />
          </>
        )}
      </div>
    </>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-slate-800 font-semibold flex flex-col items-center gap-2">
          <p className="text-1xl">Welcome {authUser.username}, </p>
          <p className="text-2xl">Select a Chat to start messaging</p>
          <MdMessage className="text-5xl" />
        </div>
      </div>
    </>
  );
};
export default MessageContainer;
