import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input px-5 rounded-full focus:border-green-500  w-full max-w-xs bg-white text-black"
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
