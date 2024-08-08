import User from "../models/user.model.js";

export const getAllUsersForSidebar = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    let users = await User.find({ _id: { $ne: senderId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
