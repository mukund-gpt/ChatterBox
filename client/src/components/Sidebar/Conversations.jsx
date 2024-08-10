import React from "react";
import Conversation from "./Conversation";
import "../../assets/css/styles.css";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto scrollbar-hide">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversation.length - 1}
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
