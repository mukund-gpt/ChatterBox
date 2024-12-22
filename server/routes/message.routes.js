import express from "express";
import { isAuthenticate } from "../middlewares/verifyToken.js";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/send/:id", isAuthenticate, upload.single("image"), sendMessage);
router.get("/:id", isAuthenticate, getMessage);

export default router;
