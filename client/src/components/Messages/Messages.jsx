import React from "react";
import Message from "./Message";
import "../../assets/css/styles.css"

const Messages = () => {
  return (
    <>
      <div className="px-4 flex-1 overflow-auto scrollbar-hide">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </>
  );
};

export default Messages;
