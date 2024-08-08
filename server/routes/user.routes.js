import express from "express";
import { getAllUsersForSidebar } from "../controllers/user.controllers.js";
import { isAuthenticate } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/", isAuthenticate, getAllUsersForSidebar);

export default router;
