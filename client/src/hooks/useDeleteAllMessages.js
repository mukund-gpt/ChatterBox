import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify";
import { baseUrl } from "../assets/baseUrl";

const useDeleteAllMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();

  const deleteAllMessages = async () => {
    if (messages.length == 0) {
      toast.info("Chat already cleared");
      return;
    }
    try {
      const id = selectedConversation._id;
      console.log(id);

      const res = await fetch(`${baseUrl}/api/messages/delete/all/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setMessages([]);
        toast.info(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { deleteAllMessages };
};

export default useDeleteAllMessages;
