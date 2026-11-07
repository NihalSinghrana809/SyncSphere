export interface ApiResponse<T>{
	success:boolean;
	message:string;
	data?:T;
}

export interface MyProfile{
	name:string;
	username:string;
	bio?:string;
	avatar?:string;
	location:string;
	dateOfBirth?:string|null;
}

export interface PublicProfile{
	name:string;
	bio?:string;
	avatar?:string;
	location?:string;
	dateOfBirth?:string|null;
	username:string;
}

export interface UpdateProfileInput{
	name?:string;
	bio?:string;
	location?:string;
	dateOfBirth?:string|null;
	username?:string;
}
