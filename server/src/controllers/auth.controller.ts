import type { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util.js";
import * as userServices from "../services/user.service.js";
import type { CustomRequest } from "../middleware/auth/index.js";

export const loginOne = async (req: Request, res: Response) => {
  try {
    const validatedBody = userServices.loginSchema.parse(req.body);
    const result = await userServices.login(validatedBody);
    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    const validatedBody = userServices.registerSchema.parse(req.body);
    const user = await userServices.register(validatedBody);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: getErrorMessage(error) });
  }
};

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json({ user: req.user });
};