import type {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
	sub:string;
	email:string;
	username?:string;
}

export interface CustomRequest extends Request {
	user?:{
		id:string;
		email:string;
		username?:string;
	};
}

export const authMiddleware=(
	req:CustomRequest,
	res:Response,
	next:NextFunction,
)=>{
	const authHeader=req.headers.authorization;
	const tokenFromHeader=authHeader?.startsWith("Bearer ")
		? authHeader.slice(7)
		:null;
	const token=tokenFromHeader||(req.cookies&&req.cookies.token)||null;

	if(!token){
		return res.status(401).json({
			message:"Unauthorized"
		});
	}

	try{
		const decoded=jwt.verify(
			token,
			process.env.JWT_SECRET||"syncsphere-secret",
		) as AuthPayload;
		const user={
			id:decoded.sub,
			email:decoded.email,
			...(decoded.username?{username:decoded.username}:{}),
		};

		req.user=user;

		return next();
	}
	catch(_error){
		return res.status(401).json({
			message:"Invalid or expired token"
		});
	}
};
