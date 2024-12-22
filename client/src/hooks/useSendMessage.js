import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { baseUrl } from "../assets/baseUrl";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (formData) => {
    try {
      console.log([...formData]);
      setLoading(true);
      const res = await fetch(
        `${baseUrl}/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setMessages([...messages, data.newMessage]);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
