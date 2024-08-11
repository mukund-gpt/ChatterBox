import React, { useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      <div className="mx-10 my-2">
        <form
          onSubmit={handleSubmit}
          className="flex justify-around min-w-full items-center gap-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="input w-[350px] px-5 rounded-full focus:border-green-500  max-w-xs bg-white text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-circle border-none bg-green-400 hover:bg-green-500 text-white text-3xl"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <TiArrowRightThick />
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
