import React from "react";

const ShowImage = ({ imageUrl, closeImage }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={closeImage}
    >
      <div className="relative shadow-xl max-w-[80vw] max-h-[80vh]">
        <img
          src={imageUrl}
          alt="Full Size"
          className="w-full h-auto rounded-lg"
        />
        <button
          onClick={closeImage}
          className="absolute top-4 right-4 p-2 text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-800 transition"
        >
          <span className="text-lg">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default ShowImage;
