import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  //   console.log(messages);
  useEffect(() => {
    socket?.on("newMessage", (newmessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newmessage]);
      console.log("Message received");
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
