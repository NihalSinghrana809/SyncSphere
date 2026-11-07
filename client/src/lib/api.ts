const API_BASE_URL=import.meta.env.VITE_API_URL??"";

export interface AuthUserPayload{
	id:string;
	email:string;
	username?:string;
}

export interface LoginResponse{
	message:string;
	token:string;
	user:AuthUserPayload;
}

export interface RegisterResponse{
	message:string;
	token:string;
	user:AuthUserPayload;
}

export interface CurrentUserResponse{
	user:AuthUserPayload;
}

export interface BackendProfile{
	name:string;
	username:string;
	bio?:string;
	avatar?:string;
	location?:string;
	dateOfBirth?:string|null;
	createdAt?:string;
	updatedAt?:string;
}

interface ProfileResponse{
	success:boolean;
	message:string;
	data:BackendProfile;
}

export type ProfileUpdate={
	name:string;
	username:string;
	bio:string;
	location:string;
	dateOfBirth:string|null;
};

export class ApiError extends Error{
	readonly status:number;

	constructor(status:number,message:string){
		super(message);
		this.name="ApiError";
		this.status=status;
	}
}

export async function apiRequest<T>(
	path:string,
	options:RequestInit={},
):Promise<T>{
	const response=await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers:{
			"Content-Type":"application/json",
			...(options.headers||{}),
		},
	});

	const payload=await response.json().catch(()=>null);

	if(!response.ok){
		throw new ApiError(
			response.status,
			payload?.message||"Something went wrong. Please try again.",
		);
	}

	return payload as T;
}

export const loginUser=(email:string,password:string)=>
	apiRequest<LoginResponse>("/api/auth/login", {
		method:"POST",
		body:JSON.stringify({email,password}),
	});

export const registerUser=(
	username:string,
	email:string,
	password:string,
)=>
	apiRequest<RegisterResponse>("/api/auth/signup",{
		method:"POST",
		body:JSON.stringify({username,email,password}),
	});

export const getCurrentUser=(token:string)=>
	apiRequest<CurrentUserResponse>("/api/auth/me",{
		method:"GET",
		headers:{
			Authorization:`Bearer ${token}`,
		},
	});

export const getMyProfile=(token:string)=>
	apiRequest<ProfileResponse>("/api/user/me",{
		method:"GET",
		headers:{
			Authorization:`Bearer ${token}`,
		},
	});

export const updateMyProfile=(token:string,profile:ProfileUpdate)=>
	apiRequest<ProfileResponse>("/api/user/me",{
		method:"PATCH",
		headers:{
			Authorization:`Bearer ${token}`,
		},
		body:JSON.stringify(profile),
	});
