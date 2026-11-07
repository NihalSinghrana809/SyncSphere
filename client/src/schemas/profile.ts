import {z} from "zod";

export const profileSchema=z.object({
	name:z.string().trim().min(1,"Name is required.").max(100,"Name must be 100 characters or fewer."),
	username:z.string().trim().min(3,"Username must be at least 3 characters.").max(30,"Username must be 30 characters or fewer."),
	bio:z.string().max(250,"Bio must be 250 characters or fewer."),
	location:z.string().trim(),
	dateOfBirth:z.string().refine((value)=>{
		if(!value) return true;
		const date=new Date(`${value}T00:00:00.000Z`);
		return !Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===value;
	},"Enter a valid date."),
});

export type ProfileFormValues=z.infer<typeof profileSchema>;
