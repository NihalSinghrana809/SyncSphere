import type {NextFunction,Request,Response} from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload{
	sub:string;
	email:string;
	username?:string;
}

export interface CustomRequest extends Request{
	user?:{
		id:string;
		email:string;
		username?:string;
	};
}

export const authMiddleware=(
	req:CustomRequest,
	res:Response,
	next:NextFunction
)=>{
	const authHeader=req.headers.authorization;
	const tokenFromHeader=authHeader?.startsWith("Bearer ")
		?authHeader.slice(7)
		:null;
	const token=tokenFromHeader||(req.cookies&&req.cookies.token)||null;
	if(!token){
		return res.status(401).json({
			success: false,
			message: "Unauthorized. Please login."
		});
	}
	try{
		const decoded=jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as AuthPayload;
		if(!decoded.sub || !decoded.email){
			return res.status(401).json({
				success: false,
				message: "Invalid token payload"
			});
		}
		req.user={
			id:decoded.sub,
			email:decoded.email,
			...(decoded.username?{username:decoded.username}:{})
		};
		return next();
	}
	catch(error){
		if(error instanceof jwt.TokenExpiredError){
			return res.status(401).json({
				success: false,
				message: "Token expired. Please login again."
			});
		}
		if(error instanceof jwt.JsonWebTokenError){
			return res.status(401).json({
				success: false,
				message: "Invalid token"
			});
		}
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
};