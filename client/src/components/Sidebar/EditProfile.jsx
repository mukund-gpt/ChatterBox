import React, { useState, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { baseUrl } from "../../assets/baseUrl";

const EditProfile = ({ close }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [updatedUser, setUpdatedUser] = useState({
    email: authUser.email,
    username: authUser.username,
    gender: authUser.gender,
    profilePic: authUser.profilePic,
  });

  const [isLoading, setIsLoading] = useState(false); // To show a loading state
  const [editingField, setEditingField] = useState(null); // Track which field is being edited
  const modalRef = useRef(null); // Reference to the modal content for click detection
  const fileInputRef = useRef(null); // Reference to file input element
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // When the file is loaded, update the image preview
      reader.onload = () => {
        setUpdatedUser((prevState) => ({
          ...prevState,
          profilePic: reader.result, // Use the base64 data URL for preview
        }));
      };

      reader.readAsDataURL(file); // Read the file as a data URL
      setImage(file); // Store the file for uploading
    }
  };

  // console.log(authUser);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", updatedUser.email);
    formData.append("username", updatedUser.username);
    formData.append("gender", updatedUser.gender);
    console.log([...formData]);

    try {
      const response = await fetch(`${baseUrl}/api/users/updateProfile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log(data.user);

      setAuthUser(data.user);

      localStorage.setItem("user_details", JSON.stringify(data.user));

      close(); // Close the modal after saving changes
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close(); // Close the modal if clicked outside
    }
  };

  const handleEditField = (field) => {
    setEditingField(field);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleOutsideClick} // Attach the outside click handler to the background
    >
      <div
        ref={modalRef} // Set the reference to the modal content div
        className="relative shadow-xl max-w-[90vw] max-h-[80vh] bg-white p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-center mb-4 relative">
          <img
            src={updatedUser.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover" // Center and round the image
          />
          <label
            htmlFor="file-input"
            className="absolute bottom-0 right-0 p-2 text-blue-500 hover:text-blue-800 rounded-full cursor-pointer"
          >
            <FaEdit />
          </label>
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Email Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-white text-black">
            {editingField === "email" ? (
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white text-black w-full"
              />
            ) : (
              <span>{updatedUser.email}</span>
            )}
            <button
              type="button"
              onClick={() => handleEditField("email")}
              className="ml-2 p-1 text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Username Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-white text-black">
            {editingField === "username" ? (
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleInputChange}
                className="border p-2 rounded w-full bg-white text-black"
              />
            ) : (
              <span>{updatedUser.username}</span>
            )}
            <button
              type="button"
              onClick={() => handleEditField("username")}
              className="ml-2 p-1 text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/* Gender Dropdown */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <select
              name="gender"
              value={updatedUser.gender}
              onChange={handleInputChange}
              className="border p-2 rounded bg-white text-black"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Save and Close */}
        <div className="flex justify-between">
          <button
            onClick={handleSaveChanges}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={close}
            className="bg-gray-700 text-white py-2 px-4 rounded shadow-lg hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
