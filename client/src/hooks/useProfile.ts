import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import {getMyProfile,getUserProfile,updateMyProfile} from "../api/profile";
import type {UpdateProfileInput} from "../types/profile";

export const profileKeys={
	my:(token:string)=>["profile","me",token] as const,
	public:(username:string)=>["profile","public",username] as const,
};

export const useMyProfile=(token:string)=>useQuery({
	queryKey:profileKeys.my(token),
	queryFn:()=>getMyProfile(token),
	enabled:Boolean(token),
	retry:false,
});

export const useUpdateProfile=(token:string)=>{
	const queryClient=useQueryClient();
	return useMutation({
		mutationFn:(profile:UpdateProfileInput)=>updateMyProfile(token,profile),
		onSuccess:(profile)=>{
			queryClient.setQueryData(profileKeys.my(token),profile);
		},
	});
};

export const usePublicProfile=(username:string)=>{
	const normalizedUsername=username.trim().toLowerCase();
	return useQuery({
		queryKey:profileKeys.public(normalizedUsername),
		queryFn:()=>getUserProfile(normalizedUsername),
		enabled:Boolean(normalizedUsername),
		retry:false,
	});
};
