import type {Request,Response} from "express";
import type {CustomRequest} from "../middleware/auth/index.js";
import {User} from "../models/user.model.js";
import Profile from "../models/profile.model.js";

export const getMyProfile=async(req:Request,res:Response)=>{
	const authReq=req as CustomRequest;
	try{
		const userId=authReq.user?.id;
		if(!userId){
			return res.status(401).json({
				success: false,
				message: "Unauthorized"
			});
		}
		const user=await User.findById(userId).select("_id username");
		if(!user){
			return res.status(404).json({
				success: false,
				message: "User not found"
			});
		}
		const profile=await Profile.findOne({userId}).lean();
		if(!profile){
			return res.status(404).json({
				success: false,
				message: "Profile not found"
			});
		}
		return res.status(200).json({
			success:true,
			message:"Profile fetched successfully",
			data:{
				...profile,
				username: user.username
			}
		});
	}
	catch(error){
		console.error("Get my profile error:",error);

		return res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
};

export const updateMyProfile=async(req:Request,res:Response)=>{
	const authReq=req as CustomRequest;
	try{
		const userId=authReq.user?.id;
		if(!userId){
			return res.status(401).json({
				success: false,
				message: "Unauthorized"
			});
		}
		const allowedFields=[
			"name",
			"bio",
			"location",
			"dateOfBirth"
		];
		const updates:any={};
		for(const field of allowedFields){
			if(req.body[field]!==undefined){
				updates[field]=req.body[field];
			}
		}
		let username:string|undefined;
		if(req.body.username!==undefined){
			if(typeof req.body.username!=="string" || !req.body.username.trim()){
				return res.status(400).json({
					success: false,
					message: "Invalid username"
				});
			}
			username=req.body.username.trim().toLowerCase();
		}
		if(Object.keys(updates).length===0 && username===undefined){
			return res.status(400).json({
				success: false,
				message: "No valid fields provided"
			});
		}
		const profileExists=await Profile.exists({userId});
		if(!profileExists){
			return res.status(404).json({
				success: false,
				message: "Profile not found"
			});
		}
		let user;
		if(username!==undefined){
			user=await User.findByIdAndUpdate(
				userId,
				{$set:{username}},
				{returnDocument:"after",runValidators:true}
			).select("_id username");
			if(!user){
				return res.status(404).json({
					success: false,
					message: "User not found"
				});
			}
		}
		else{
			user=await User.findById(userId).select("_id username");
		}
		if(Object.keys(updates).length>0){
			await Profile.findOneAndUpdate(
				{userId},
				{$set:updates},
				{returnDocument:"after",runValidators:true}
			);
		}
		const profile=await Profile.findOne({userId}).lean();
		return res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			data:{
				username: user?.username,
				...profile
			}
		});
	}
	catch(error:any){
		console.error("Update profile error:",error);
		if(error.code===11000){
			return res.status(409).json({
				success: false,
				message: "Username already exists"
			});
		}
		if(error.name==="ValidationError"){
			return res.status(400).json({
				success: false,
				message: error.message
			});
		}
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
};

export const getUserProfile=async(req:Request,res:Response)=>{
	try{
		const username=String(req.params.username??"").trim();
		if(!username){
			return res.status(400).json({
				success: false,
				message: "Username is required"
			});
		}
		const user=await User.findOne({username:username.toLowerCase()})
			.select("_id username");
		if(!user){
			return res.status(404).json({
				success: false,
				message: "User not found"
			});
		}
		const profile=await Profile.findOne({userId:user._id})
			.select("name bio avatar location dateOfBirth")
			.lean();
		if(!profile){
			return res.status(404).json({
				success: false,
				message: "Profile not found"
			});
		}
		return res.status(200).json({
			success: true,
			message: "User profile fetched successfully",
			data:{
				...profile,
				username: user.username
			}
		});
	}
	catch(error){
		console.error("Get user profile error:",error);
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
};