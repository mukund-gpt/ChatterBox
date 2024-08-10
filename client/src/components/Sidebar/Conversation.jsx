import React from "react";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // console.log(conversation);
  const isSelected = selectedConversation?._id === conversation?._id;

  return (
    <>
      <div
        className={`flex gap-4 my-0.5 text-black font-bold items-center hover:bg-blue-400 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-orange-400" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation?.profilePic} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p>{conversation?.username}</p>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
