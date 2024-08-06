import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword, gender } = req.body;

  let validUser = await User.findOne({ username });
  if (validUser)
    if (validUser)
      return next(errorHandler(400, "User Exists with Same Username"));

  validUser = await User.findOne({ email });
  if (validUser) return next(errorHandler(400, "User Exists with Same Email"));

  if (password !== confirmPassword) {
    return next(errorHandler(400, "Password don't match"));
  }

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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: validUser._id,
      username: validUser.username,
      email: email,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "Logout Success",
    });
  } catch (error) {
    next(error);
  }
};
