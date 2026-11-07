import {UserCircle2} from "lucide-react";
import type {UserProfile} from "../../types/UserProfile";

interface AthleteIdentityProps{
	user:UserProfile;
}

export const AthleteIdentity=({user}:AthleteIdentityProps)=>(
	<div className="flex min-w-0 items-center gap-4">
		<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#0b1020] shadow-lg shadow-[#b2c5ff]/20">
			<UserCircle2 className="h-8 w-8"/>
		</div>
		<div className="min-w-0">
			<p className="text-xs uppercase tracking-[0.2em] text-[#8d90a0]">Athlete profile</p>
			<h2 className="mt-1 wrap-break-word text-2xl font-bold text-white">{user.name}</h2>
			<p className="mt-1 break-all text-sm text-[#b2c5ff]">@{user.username}</p>
		</div>
	</div>
);
