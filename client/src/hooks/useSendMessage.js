import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { baseUrl } from "../assets/baseUrl";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${baseUrl}/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
