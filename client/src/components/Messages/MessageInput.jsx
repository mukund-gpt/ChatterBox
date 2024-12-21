import React, { useState } from "react";
import { TiArrowRightThick } from "react-icons/ti";
import { FaImage } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      toast.success("Image selected. Ready to send!");
      console.log("Selected Image:", selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message && !image) {
      toast.error("Please enter a message or select an image");
      return;
    }
    try {
      const formData = new FormData();
      if (message) formData.append("message", message);
      if (image) formData.append("image", image);
      console.log("Sending FormData:", formData);
      await sendMessage(formData);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send the message");
    } finally {
      setMessage("");
      setImage(null);
    }
  };

  return (
    <div className="mx-10 my-2">
      <form
        onSubmit={handleSubmit}
        className="flex justify-around min-w-full items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="input w-[350px] px-5 rounded-full focus:border-green-500 max-w-xs bg-white text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="btn btn-circle border-none bg-gray-300 hover:bg-gray-400 text-black">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <button
          type="submit"
          className="btn btn-circle border-none bg-green-400 hover:bg-green-500 text-white text-3xl"
          disabled={loading}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <TiArrowRightThick />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
