import express from "express";
import {
  getAllUsersForSidebar,
  updateProfile,
} from "../controllers/user.controllers.js";
import { isAuthenticate } from "../middlewares/verifyToken.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/", isAuthenticate, getAllUsersForSidebar);
router.put(
  "/updateProfile",
  isAuthenticate,
  upload.single("image"),
  updateProfile
);

export default router;
