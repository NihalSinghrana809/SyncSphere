import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/user.models.js";
import type { UserDocument } from "../models/user.models.js";

export const registerSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().trim().min(3, "Username must be at least 3 characters long").max(30, "Username must be at most 30 characters long"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export async function register(user: RegisterInput): Promise<{ id: string; email: string; username: string }> {

  const sanitizedEmail = user.email.trim().toLowerCase();
  const sanitizedUsername = user.username.trim();

  const existingUser = await User.findOne({
    $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }],
  });

  if (existingUser) {
    throw new Error("User already exists with that email or username");
  }

  const hashedPassword = await bcrypt.hash(user.password, 12);

  const createdUser = await User.create({
    email: sanitizedEmail,
    username: sanitizedUsername,
    password: hashedPassword,
  });

  return {
    id: createdUser._id.toString(),
    email: createdUser.email,
    username: createdUser.username,
  };
}

export async function login(user: LoginInput): Promise<{ token: string; user: { id: string; email: string; username: string } }> {
  if (!user?.email || !user?.password) {
    throw new Error("Email and password are required");
  }

  const sanitizedEmail = user.email.trim().toLowerCase();
  const foundUser = (await User.findOne({ email: sanitizedEmail }).select("+password")) as UserDocument | null;

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await foundUser.comparePassword(user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { sub: foundUser._id.toString(), email: foundUser.email, username: foundUser.username },
    process.env.JWT_SECRET || "syncsphere-secret",
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: foundUser._id.toString(),
      email: foundUser.email,
      username: foundUser.username,
    },
  };
}