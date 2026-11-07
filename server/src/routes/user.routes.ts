import express from "express";
import {getMyProfile,updateMyProfile,getUserProfile} from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth/index.js";

const router=express.Router();

router.get("/me",authMiddleware,getMyProfile);
router.patch("/me",authMiddleware,updateMyProfile);
router.get("/:username",getUserProfile);

export default router;
