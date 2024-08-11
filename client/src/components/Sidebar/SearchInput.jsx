import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { toast } from "react-toastify";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    const conversation = conversations.find((conversation) =>
      conversation.username.toLowerCase().includes(search.toLowerCase())
    );

    console.log(conversation);
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input px-5 rounded-full focus:border-green-500  w-full max-w-xs bg-white text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle border-none bg-sky-400 hover:bg-sky-500 text-white text-lg"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
