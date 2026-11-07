import {CalendarDays,MapPin,UserCircle2,UserRound} from "lucide-react";
import {useEffect} from "react";
import {Link,useParams} from "react-router-dom";
import {usePublicProfile} from "../hooks/useProfile";
import {ApiError} from "../api/profile";
import {useUIStore} from "../features/uiStore";

const formatDate=(value?:string|null):string=>{
	if(!value) return "";
	const timestamp=Date.parse(value);
	if(Number.isNaN(timestamp)) return "";
	const date=new Date(timestamp).toISOString().slice(0,10);
	return new Date(`${date}T00:00:00`).toLocaleDateString(undefined,{
		year:"numeric",
		month:"long",
		day:"numeric",
	});
};

export const PublicProfile=()=>{
	const {username=""}=useParams();
	const profileQuery=usePublicProfile(username);
	const showToast=useUIStore((state)=>state.showToast);
	const profile=profileQuery.data;

	useEffect(()=>{
		if(profileQuery.error instanceof ApiError&&profileQuery.error.status===500){
			showToast("Unable to load this profile. Please try again.");
		}
	},[profileQuery.error,showToast]);

	if(profileQuery.isPending){
		return (
			<main className="mx-auto w-full max-w-4xl grow px-4 py-10 sm:px-8">
				<div className="glass-panel animate-pulse rounded-2xl p-8 sm:p-12" aria-label="Loading profile">
					<div className="h-20 w-20 rounded-2xl bg-white/10"/>
					<div className="mt-6 h-7 w-48 rounded bg-white/10"/>
					<div className="mt-3 h-4 w-32 rounded bg-white/10"/>
				</div>
			</main>
		);
	}

	if(profileQuery.error instanceof ApiError&&profileQuery.error.status===404){
		return (
			<main className="mx-auto flex w-full max-w-4xl grow items-center justify-center px-4 py-10 sm:px-8">
				<section className="glass-panel w-full rounded-2xl p-8 text-center" aria-live="polite">
					<UserRound className="mx-auto h-10 w-10 text-[#b2c5ff]"/>
					<h1 className="mt-4 font-montserrat text-2xl font-bold text-white">Profile not found</h1>
					<p className="mt-2 text-sm text-[#8d90a0]">There’s no public profile for @{username}.</p>
					<button type="button" onClick={()=>void profileQuery.refetch()} className="mt-5 rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Retry</button>
				</section>
			</main>
		);
	}

	if(profileQuery.isError||!profile){
		return (
			<main className="mx-auto flex w-full max-w-4xl grow items-center justify-center px-4 py-10 sm:px-8">
				<section className="glass-panel w-full rounded-2xl p-8 text-center" role="alert" aria-live="assertive">
					<h1 className="font-montserrat text-2xl font-bold text-white">We couldn’t load this profile</h1>
					<p className="mt-2 text-sm text-[#8d90a0]">Please check your connection and try again.</p>
					<button type="button" onClick={()=>void profileQuery.refetch()} className="mt-5 rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Retry</button>
				</section>
			</main>
		);
	}

	return (
		<main className="mx-auto w-full max-w-4xl grow px-4 py-8 sm:px-8 sm:py-12">
			<Link to="/dashboard" className="mb-6 inline-flex rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#c3c6d6] hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Back</Link>
			<article className="glass-panel rounded-2xl p-6 sm:p-10">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
					<div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#0b1020]">
						{profile.avatar
							?<img src={profile.avatar} alt="" className="h-full w-full object-cover"/>
							:<UserCircle2 className="h-11 w-11"/>
						}
					</div>
					<div className="min-w-0">
						<h1 className="break-words font-montserrat text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{profile.name}</h1>
						<p className="mt-2 break-all text-sm text-[#b2c5ff]">@{profile.username}</p>
					</div>
				</div>
				<p className="mt-8 whitespace-pre-wrap break-words text-sm leading-7 text-[#dee1f7]">{profile.bio||"No bio added."}</p>
				<dl className="mt-8 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Location</dt>
						<dd className="mt-2 flex items-center gap-2 break-words text-sm text-[#dee1f7]">
							{profile.location&&<MapPin className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>}
							{profile.location||"Not specified"}
						</dd>
					</div>
					<div>
						<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Date of birth</dt>
						<dd className="mt-2 flex items-center gap-2 text-sm text-[#dee1f7]">
							{profile.dateOfBirth&&<CalendarDays className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>}
							{formatDate(profile.dateOfBirth)||"Not specified"}
						</dd>
					</div>
				</dl>
			</article>
		</main>
	);
};
