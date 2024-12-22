import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const getAllUsersForSidebar = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    let users = await User.find({ _id: { $ne: senderId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const { id } = req.user;
    const { username, email, gender } = req.body;
    const image = req.file;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.email = email;
    user.username = username;
    user.gender = gender;

    if (image) {
      const fileUri = getDataUri(image);
      console.log("Uploading image to Cloudinary...");
      const cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "ChatterBox",
      });
      user.profilePic = cloudResponse.secure_url;
      console.log("Image uploaded:", cloudResponse.secure_url);
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    next(err);
  }
};
