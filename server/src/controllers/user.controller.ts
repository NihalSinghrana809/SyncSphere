
import type {Request,Response} from "express";
import mongoose from "mongoose";
import type {CustomRequest} from "../middleware/auth/index.js";
import Profile from "../models/profile.model.js";

export const getMyProfile=async(req:Request,res:Response)=>{
	const authReq=req as CustomRequest;
	try{
		const profile=await Profile.findOne({
			userId: authReq.user?.id
		} as any).lean();
		if(!profile){
			return res.status(404).json({
				success:false,
				message:"Profile not found"
			});
		}
		return res.status(200).json({
			success: true,
			message: "Profile found",
			data: profile
		});
	}
	catch(error){
		return res.status(500).json({
			success:false,
			message:"Internal server error"
		});
	}
};

export const updateMyProfile=async(req:Request,res:Response)=>{
	const authReq=req as CustomRequest;
	try{
		const allowedFields=[
			"name",
			"username",
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
		if(Object.keys(updates).length===0){
			return res.status(400).json({
				success:false,
				message:"No valid fields provided"
			});
		}
		if(updates.username){
			updates.username=updates.username.toLowerCase();
		}
		const profile=await Profile.findOneAndUpdate(
			{userId:authReq.user?.id} as any,
			{$set: updates},
			{returnDocument: "after", runValidators: true}
		);
		if(!profile){
			return res.status(404).json({
				success:false,
				message:"Profile not found"
			});
		}
		return res.status(200).json({
			success:true,
			message:"Profile updated successfully",
			data:profile
		});
	}
	catch(error:any){
		if(error.code===11000){
			return res.status(409).json({
				success:false,
				message:"Username already exists"
			});
		}
		if(error.name==="ValidationError"){
			return res.status(400).json({
				success:false,
				message:error.message
			});
		}
		return res.status(500).json({
			success:false,
			message:"Internal server error"
		});
	}
};