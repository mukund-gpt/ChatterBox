import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { baseUrl } from "../assets/baseUrl";

const useDeleteMessage = () => {
  const { messages, setMessages } = useConversation();

  const deleteMessage = async (id) => {
    try {
      //   console.log(id);

      const res = await fetch(`${baseUrl}/api/messages/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      //   console.log(data);

      if (data.success) {
        const updatedMessages = messages.filter((msg) => msg._id !== id);
        setMessages(updatedMessages);
        toast.info(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { deleteMessage };
};

export default useDeleteMessage;
