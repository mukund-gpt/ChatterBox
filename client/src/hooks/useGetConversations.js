import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../assets/baseUrl";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/api/users`);

        const data = await res.json();
        // console.log(data);

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
