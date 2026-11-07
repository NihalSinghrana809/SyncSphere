import {ApiError,apiRequest} from "../lib/api";
import type {ApiResponse,MyProfile,PublicProfile,UpdateProfileInput} from "../types/profile";

export {ApiError};

const authenticatedOptions=(token:string,method="GET",body?:unknown):RequestInit=>({
	method,
	headers:{
		Authorization:`Bearer ${token}`,
	},
	...(body===undefined?{}:{body:JSON.stringify(body)}),
});

const requireData=<T>(response:ApiResponse<T>):T=>{
	if(!response.success||response.data===undefined){
		throw new ApiError(500,response.message||"Unable to load profile.");
	}
	return response.data;
};

export const getMyProfile=async(token:string):Promise<MyProfile>=>{
	const response=await apiRequest<ApiResponse<MyProfile>>(
		"/api/user/me",
		authenticatedOptions(token),
	);
	return requireData(response);
};

export const updateMyProfile=async(
	token:string,
	profile:UpdateProfileInput,
):Promise<MyProfile>=>{
	const payload={
		...profile,
		...(profile.username===undefined
			?{}
			:{username:profile.username.trim().toLowerCase()}),
	};
	const response=await apiRequest<ApiResponse<MyProfile>>(
		"/api/user/me",
		authenticatedOptions(token,"PATCH",payload),
	);
	return requireData(response);
};

export const getUserProfile=async(username:string):Promise<PublicProfile>=>{
	const response=await apiRequest<ApiResponse<PublicProfile>>(
		`/api/user/${encodeURIComponent(username)}`,
	);
	return requireData(response);
};
