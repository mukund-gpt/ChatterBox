import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "../../assets/css/styles.css";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log(messages);

  useListenMessages();

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behaviour: "smooth" });
    });
  }, [messages]);
  return (
    <>
      <div className="px-4 flex-1 overflow-auto scrollbar-hide">
        {!loading && messages.length === 0 && (
          <p className="flex items-center justify-center text-center text-[20px] h-full">
            Start Conversation by Sending messages
          </p>
        )}
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Messages;
