import express from "express";
import { isAuthenticate } from "../middlewares/verifyToken.js";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/send/:id", isAuthenticate, upload.single("image"), sendMessage);
router.get("/:id", isAuthenticate, getMessage);

export default router;
