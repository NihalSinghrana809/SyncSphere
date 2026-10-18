const API_BASE_URL=import.meta.env.VITE_API_URL??"";

export interface AuthUserPayload {
	id:string;
	email:string;
	username?:string;
}

export interface LoginResponse {
	message:string;
	token:string;
	user:AuthUserPayload;
}

export interface RegisterResponse {
	message:string;
	token:string;
	user:AuthUserPayload;
}

export interface CurrentUserResponse {
	user:AuthUserPayload;
}

async function apiRequest<T>(
	path:string,
	options:RequestInit={},
):Promise<T>{
	const response=await fetch(`${API_BASE_URL}${path}`, {
		headers:{
			"Content-Type":"application/json",
			...(options.headers || {}),
		},
		...options,
	});

	const payload=await response.json().catch(()=>null);

	if(!response.ok){
		throw new Error(
			payload?.message || "Something went wrong. Please try again.",
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
	apiRequest<RegisterResponse>("/api/auth/signup", {
		method:"POST",
		body:JSON.stringify({username,email,password}),
	});

export const getCurrentUser=(token:string)=>
	apiRequest<CurrentUserResponse>("/api/auth/me", {
		method:"GET",
		headers:{
			Authorization:`Bearer ${token}`,
		},
	});
