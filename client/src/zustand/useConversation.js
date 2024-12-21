import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useConversation = create(
  devtools(
    (set) => ({
      selectedConversation: null,
      setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),

      messages: [],
      setMessages: (messages) => set({ messages }),
    }),
    { name: "ConversationStore" }
  )
);

export default useConversation;
