import {Mail,MapPin} from "lucide-react";
import type {UserProfile} from "../../types/UserProfile";

interface ProfileDetailsProps{
	user:UserProfile;
}

export const ProfileDetails=({user}:ProfileDetailsProps)=>(
	<div className="mt-6 space-y-4">
		<div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/5 bg-[#121a2b] px-4 py-3">
			<Mail className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>
			<span className="break-all text-sm text-[#dee1f7]">{user.email}</span>
		</div>
		{user.location&&(
			<div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#121a2b] px-4 py-3">
				<MapPin className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>
				<span className="wrap-break-word text-sm text-[#dee1f7]">{user.location}</span>
			</div>
		)}
		{user.bio&&(
			<div className="rounded-xl border border-[#b2c5ff]/20 bg-[#0d1322] p-4">
				<p className="text-[10px] uppercase tracking-[0.2em] text-[#8d90a0]">About</p>
				<p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-[#dee1f7]">{user.bio}</p>
			</div>
		)}
	</div>
);
