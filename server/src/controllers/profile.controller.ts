import type {Request,Response} from "express";
import {User} from "../models/user.model.js";
import Profile from "../models/profile.model.js";

export const getUserProfile=async(req:Request,res:Response)=>{
	try{
		const rawUsername=req.params.username;
		const username=Array.isArray(rawUsername)?rawUsername[0]?.trim():rawUsername?.trim();
		if(!username){
			return res.status(400).json({
				success:false,
				message:"Username is required"
			});
		}
		const user=(await User.findOne({username} as any).select("_id username")) as { _id: unknown; username: string } | null;
		if(!user){
			return res.status(404).json({
				success:false,
				message:"User not found"
			});
		}
		const profile=(await Profile.findOne({userId:user._id} as any)
			.select("name bio avatar location dateOfBirth username")
			.lean()) as {
			username?: string;
			name?: string;
			bio?: string;
			avatar?: string;
			location?: string;
			dateOfBirth?: Date;
		} | null;

		if(!profile){
			return res.status(404).json({
				success:false,
				message:"Profile not found"
			});
		}

		const {username:profileUsername,...profileData}=profile;

		return res.status(200).json({
			success:true,
			message:"User profile fetched successfully",
			data:{
				username:user.username,
				...profileData
			}
		});
	}
	catch(error){
		console.error("Get user profile error:",error);
		return res.status(500).json({
			success:false,
			message:"Internal server error"
		});
	}
};