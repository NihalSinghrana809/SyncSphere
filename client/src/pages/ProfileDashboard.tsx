import {CalendarDays,Edit3,MapPin,UserCircle2,UserRound} from "lucide-react";
import {useEffect,useMemo,useState} from "react";
import {Link} from "react-router-dom";
import {ApiError} from "../api/profile";
import {useMyProfile,useUpdateProfile} from "../hooks/useProfile";
import {profileSchema} from "../schemas/profile";
import type {MyProfile,UpdateProfileInput} from "../types/profile";
import type {UserProfile} from "../types/UserProfile";
import {useUIStore} from "../features/uiStore";

interface ProfileDashboardProps{
	user:UserProfile;
	token:string;
	onLogout:()=>void;
	onProfileUpdated:(user:UserProfile)=>void;
}

interface ProfileForm{
	name:string;
	username:string;
	bio:string;
	location:string;
	dateOfBirth:string;
}

const toInputDate=(value?:string|null):string=>{
	if(!value) return "";
	const timestamp=Date.parse(value);
	return Number.isNaN(timestamp)?"":new Date(timestamp).toISOString().slice(0,10);
};

const toForm=(profile:MyProfile):ProfileForm=>({
	name:profile.name,
	username:profile.username,
	bio:profile.bio||"",
	location:profile.location||"",
	dateOfBirth:toInputDate(profile.dateOfBirth),
});

const toUpdate=(form:ProfileForm,initial:ProfileForm):UpdateProfileInput=>{
	const payload:UpdateProfileInput={};
	const username=form.username.trim().toLowerCase();
	const initialUsername=initial.username.trim().toLowerCase();
	const name=form.name.trim();
	const location=form.location.trim();

	if(name!==initial.name) payload.name=name;
	if(username!==initialUsername) payload.username=username;
	if(form.bio!==initial.bio) payload.bio=form.bio;
	if(location!==initial.location) payload.location=location;
	if(form.dateOfBirth!==initial.dateOfBirth){
		payload.dateOfBirth=form.dateOfBirth
			?new Date(`${form.dateOfBirth}T00:00:00.000Z`).toISOString()
			:null;
	}
	return payload;
};

const formatDate=(value?:string|null):string=>{
	const date=toInputDate(value);
	return date
		?new Date(`${date}T00:00:00`).toLocaleDateString(undefined,{
			year:"numeric",
			month:"long",
			day:"numeric",
		})
		:"";
};

const ProfileSkeleton=()=>(
	<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]" aria-label="Loading profile">
		<div className="glass-panel animate-pulse rounded-2xl p-6 sm:p-8">
			<div className="h-16 w-16 rounded-2xl bg-white/10"/>
			<div className="mt-5 h-6 w-40 rounded bg-white/10"/>
			<div className="mt-3 h-4 w-28 rounded bg-white/10"/>
		</div>
		<div className="glass-panel animate-pulse rounded-2xl p-6 sm:p-8">
			<div className="h-6 w-44 rounded bg-white/10"/>
			<div className="mt-6 grid gap-5 sm:grid-cols-2">
				<div className="h-12 rounded-lg bg-white/10"/>
				<div className="h-12 rounded-lg bg-white/10"/>
				<div className="h-24 rounded-lg bg-white/10 sm:col-span-2"/>
			</div>
		</div>
	</div>
);

export const ProfileDashboard=({user,token,onLogout,onProfileUpdated}:ProfileDashboardProps)=>{
	const profileQuery=useMyProfile(token);
	const updateMutation=useUpdateProfile(token);
	const showToast=useUIStore((state)=>state.showToast);
	const [form,setForm]=useState<ProfileForm>({
		name:"",
		username:"",
		bio:"",
		location:"",
		dateOfBirth:"",
	});
	const [editing,setEditing]=useState(false);
	const [savedMessage,setSavedMessage]=useState("");
	const profile=profileQuery.data;
	const initialForm=profile?toForm(profile):null;

	useEffect(()=>{
		const error=profileQuery.error;
		if(!(error instanceof ApiError)) return;
		if(error.status===401){
			onLogout();
		}
		else if(error.status===500){
			showToast("Unable to load your profile. Please try again.");
		}
	},[onLogout,profileQuery.error,showToast]);

	useEffect(()=>{
		const error=updateMutation.error;
		if(!(error instanceof ApiError)) return;
		if(error.status===401){
			onLogout();
		}
		else if(error.status===500){
			showToast("Unable to save your profile. Please try again.");
		}
	},[onLogout,showToast,updateMutation.error]);

	const validation=useMemo(()=>profileSchema.safeParse(form),[form]);
	const validationErrors=validation.success
		?{}
		:validation.error.flatten().fieldErrors;
	const payload=validation.success&&initialForm
		?toUpdate(validation.data,initialForm)
		:{};
	const isDirty=Object.keys(payload).length>0;
	const mutationError=updateMutation.error instanceof ApiError?updateMutation.error:null;
	const isMissing=(profileQuery.error instanceof ApiError&&profileQuery.error.status===404)
		||mutationError?.status===404;
	const mutationUsernameError=mutationError&&(mutationError.status===409
		||(mutationError.status===400&&mutationError.message.toLowerCase().includes("username")))
		?mutationError.message
		:"";
	const visibleFormError=mutationError&&mutationError.status===400&&!mutationUsernameError
		?mutationError.message
		:mutationError?.status===404
			?"Your profile could not be found. Reload to try again."
			:"";

	const updateField=(field:keyof ProfileForm,value:string)=>{
		setForm((current)=>({...current,[field]:value}));
		setSavedMessage("");
		updateMutation.reset();
	};

	const startEditing=()=>{
		if(initialForm) setForm({...initialForm});
		setEditing(true);
		setSavedMessage("");
	};

	const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		setSavedMessage("");
		if(!validation.success||!isDirty) return;
		const normalizedForm={...form,username:form.username.trim().toLowerCase()};
		setForm(normalizedForm);
		try{
			const updated=await updateMutation.mutateAsync(payload);
			const nextForm=toForm(updated);
			setForm(nextForm);
			setEditing(false);
			setSavedMessage("Your profile has been updated.");
			onProfileUpdated({
				...user,
				name:updated.name,
				username:updated.username,
				bio:updated.bio||"",
				location:updated.location||"",
				dateOfBirth:updated.dateOfBirth||undefined,
				avatarUrl:updated.avatar||undefined,
			});
		}
		catch{
			return;
		}
	};

	const retry=()=>{
		updateMutation.reset();
		void profileQuery.refetch();
	};

	return (
		<main className="mx-auto w-full max-w-6xl grow px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
			<header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#b2c5ff]">Account settings</p>
					<h1 className="mt-2 font-montserrat text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Your profile</h1>
					<p className="mt-2 text-sm text-[#8d90a0]">Manage the details shown on your SyncSphere profile.</p>
				</div>
				{profile&&(
					<Link
						to={`/u/${encodeURIComponent(profile.username)}`}
						className="w-fit rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#c3c6d6] transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
					>
						View public profile
					</Link>
				)}
			</header>

			{profileQuery.isPending
				?<ProfileSkeleton/>
				:isMissing
					?<section className="glass-panel rounded-2xl p-8 text-center" aria-live="polite">
						<UserRound className="mx-auto h-10 w-10 text-[#b2c5ff]"/>
						<h2 className="mt-4 text-xl font-bold text-white">Profile not found</h2>
						<p className="mt-2 text-sm text-[#8d90a0]">Your profile is unavailable right now.</p>
						<button type="button" onClick={retry} className="mt-5 rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Retry</button>
					</section>
					:profileQuery.isError
						?<section className="glass-panel rounded-2xl p-8 text-center" role="alert" aria-live="assertive">
							<h2 className="text-xl font-bold text-white">We couldn’t load your profile</h2>
							<p className="mt-2 text-sm text-[#8d90a0]">Please check your connection and try again.</p>
							<button type="button" onClick={retry} className="mt-5 rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Retry</button>
						</section>
						:profile&&(
							<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
								<aside className="glass-panel h-fit rounded-2xl p-6 sm:p-8">
									<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#0b1020]">
										{profile.avatar
											?<img src={profile.avatar} alt="" className="h-full w-full object-cover"/>
											:<UserCircle2 className="h-9 w-9"/>
										}
									</div>
									<h2 className="mt-5 text-xl font-bold text-white">{profile.name}</h2>
									<p className="mt-1 break-all text-sm text-[#b2c5ff]">@{profile.username}</p>
									<p className="mt-5 text-xs text-[#8d90a0]">Avatar is display-only.</p>
									{profile.location&&(
										<p className="mt-5 flex items-center gap-2 text-sm text-[#c3c6d6]">
											<MapPin className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>
											{profile.location}
										</p>
									)}
									{profile.dateOfBirth&&(
										<p className="mt-3 flex items-center gap-2 text-sm text-[#c3c6d6]">
											<CalendarDays className="h-4 w-4 shrink-0 text-[#b2c5ff]"/>
											{formatDate(profile.dateOfBirth)}
										</p>
									)}
								</aside>

								<section className="glass-panel min-w-0 rounded-2xl p-5 sm:p-8">
									<div className="mb-6 flex items-start justify-between gap-4">
										<div>
											<h2 className="text-lg font-bold text-white">Personal details</h2>
											<p className="mt-1 text-sm text-[#8d90a0]">{editing?"Edit your public profile information.":"These details are shown on your profile."}</p>
										</div>
										{!editing&&(
											<button type="button" onClick={startEditing} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-[#c3c6d6] hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">
												<Edit3 className="h-4 w-4"/>
												Edit
											</button>
										)}
									</div>
									<div aria-live="polite">
										{savedMessage&&<p role="status" className="mb-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">{savedMessage}</p>}
										{visibleFormError&&<p role="alert" className="mb-5 rounded-lg border border-[#ffb4ab]/30 bg-[#93000a]/20 p-3 text-sm text-[#ffb4ab]">{visibleFormError}</p>}
									</div>
									{editing
										?<form onSubmit={handleSubmit} className="space-y-5" noValidate>
											<div className="grid gap-5 sm:grid-cols-2">
												<label className="block min-w-0 text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
													Name
													<input
														required
														maxLength={100}
														value={form.name}
														onChange={(event)=>updateField("name",event.target.value)}
														aria-invalid={Boolean(validationErrors.name?.[0])}
														className="mt-2 w-full min-w-0 rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
													/>
													{validationErrors.name?.[0]&&<span className="mt-1 block text-xs text-[#ffb4ab]">{validationErrors.name[0]}</span>}
												</label>
												<label className="block min-w-0 text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
													Username
													<input
														required
														minLength={3}
														maxLength={30}
														value={form.username}
														onChange={(event)=>updateField("username",event.target.value)}
														aria-invalid={Boolean(mutationUsernameError||validationErrors.username?.[0])}
														aria-describedby={mutationUsernameError||validationErrors.username?.[0]?"username-error":undefined}
														className="mt-2 w-full min-w-0 rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
													/>
													{(mutationUsernameError||validationErrors.username?.[0])&&<span id="username-error" role="alert" className="mt-1 block text-xs text-[#ffb4ab]">{mutationUsernameError||validationErrors.username?.[0]}</span>}
												</label>
											</div>
											<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
												Bio
												<textarea
													maxLength={250}
													rows={4}
													value={form.bio}
													onChange={(event)=>updateField("bio",event.target.value)}
													aria-invalid={Boolean(validationErrors.bio?.[0])}
													className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none placeholder:text-[#8d90a0] focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
												/>
												{validationErrors.bio?.[0]&&<span className="mt-1 block text-xs text-[#ffb4ab]">{validationErrors.bio[0]}</span>}
											</label>
											<div className="grid gap-5 sm:grid-cols-2">
												<label className="block min-w-0 text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
													Location
													<input
														value={form.location}
														onChange={(event)=>updateField("location",event.target.value)}
														placeholder="City, country"
														className="mt-2 w-full min-w-0 rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none placeholder:text-[#8d90a0] focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
													/>
												</label>
												<label className="block min-w-0 text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
													Date of birth
													<input
														type="date"
														value={form.dateOfBirth}
														onChange={(event)=>updateField("dateOfBirth",event.target.value)}
														aria-invalid={Boolean(validationErrors.dateOfBirth?.[0])}
														className="mt-2 w-full min-w-0 rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
													/>
													{validationErrors.dateOfBirth?.[0]&&<span className="mt-1 block text-xs text-[#ffb4ab]">{validationErrors.dateOfBirth[0]}</span>}
												</label>
											</div>
											<div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center">
												<button type="button" onClick={()=>{if(initialForm) setForm({...initialForm});setEditing(false);updateMutation.reset();}} className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-[#c3c6d6] hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]">Cancel</button>
												<button type="submit" disabled={!isDirty||!validation.success||updateMutation.isPending} className="rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004bb8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff] disabled:cursor-not-allowed disabled:opacity-50">
													{updateMutation.isPending?"Saving…":"Save changes"}
												</button>
											</div>
										</form>
										:<dl className="grid gap-5 sm:grid-cols-2">
											<div>
												<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Name</dt>
												<dd className="mt-2 break-words text-sm text-[#dee1f7]">{profile.name}</dd>
											</div>
											<div>
												<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Username</dt>
												<dd className="mt-2 break-all text-sm text-[#dee1f7]">@{profile.username}</dd>
											</div>
											<div className="sm:col-span-2">
												<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Bio</dt>
												<dd className="mt-2 whitespace-pre-wrap break-words text-sm text-[#dee1f7]">{profile.bio||"No bio added."}</dd>
											</div>
											<div>
												<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Location</dt>
												<dd className="mt-2 break-words text-sm text-[#dee1f7]">{profile.location||"Not specified"}</dd>
											</div>
											<div>
												<dt className="text-xs font-semibold uppercase tracking-wider text-[#8d90a0]">Date of birth</dt>
												<dd className="mt-2 text-sm text-[#dee1f7]">{formatDate(profile.dateOfBirth)||"Not specified"}</dd>
											</div>
										</dl>
									}
								</section>
							</div>
						)
			}
		</main>
	);
};
