import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword, gender } = req.body;

  let validUser = await User.findOne({ username });
  if (validUser) {
    return res.status(400).json({
      success: false,
      message: "User Exists with Same Username",
    });
  }

  validUser = await User.findOne({ email });
  if (validUser) {
    return res.status(400).json({
      success: false,
      message: "User Exists with Same Email",
    });
  }
  /*   if (password !== confirmPassword) {
    return res.status(400).json({
      error: "Password don't match",
    });
  } */

  const hashedPassword = await bcryptjs.hash(password, 10);
  let profilePic;
  if (gender === "male") {
    profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  } else {
    profilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  }
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    gender,
    profilePic,
  });

  try {
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    await newUser.save();
    res.cookie("access_token", token, { httpOnly: true }).status(201).json({
      id: newUser._id,
      username: username,
      email: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
