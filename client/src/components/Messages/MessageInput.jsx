import React from "react";
import { TiArrowRightThick } from "react-icons/ti";

const MessageInput = () => {
  return (
    <>
      <div className="mx-10 my-2">
        <form className="flex justify-around min-w-full items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="input w-[350px] px-5 rounded-full focus:border-green-500  max-w-xs bg-white text-black"
          />
          <button
            type="submit"
            className="btn btn-circle border-none bg-green-400 hover:bg-green-500 text-white text-3xl"
          >
            <TiArrowRightThick />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
