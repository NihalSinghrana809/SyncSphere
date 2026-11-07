import {CalendarDays, MapPin, Save, UserCircle2} from "lucide-react";
import {useEffect, useState} from "react";
import {
	getMyProfile,
	updateMyProfile,
} from "../../lib/api";
import type {BackendProfile, ProfileUpdate} from "../../lib/api";
import type {UserProfile} from "../../types/UserProfile";

interface ProfileViewProps{
	user:UserProfile;
	token:string;
	onProfileUpdated:(user:UserProfile)=>void;
	onLogout:()=>void;
}

type ProfileForm={
	name:string;
	username:string;
	bio:string;
	location:string;
	dateOfBirth:string;
};

const toProfileForm=(profile:BackendProfile):ProfileForm=>({
	name:profile.name||"",
	username:profile.username||"",
	bio:profile.bio||"",
	location:profile.location||"",
	dateOfBirth:profile.dateOfBirth
		? new Date(profile.dateOfBirth).toISOString().slice(0,10)
		:"",
});

export const ProfileView=({
	user,
	token,
	onProfileUpdated,
	onLogout,
}:ProfileViewProps)=>{
	const [form,setForm]=useState<ProfileForm>({
		name:user.name,
		username:user.username,
		bio:"",
		location:"",
		dateOfBirth:"",
	});
	const [avatar,setAvatar]=useState("");
	const [isLoading,setIsLoading]=useState(true);
	const [isSaving,setIsSaving]=useState(false);
	const [error,setError]=useState("");
	const [success,setSuccess]=useState("");

	useEffect(()=>{
		let isActive=true;
		getMyProfile(token)
			.then(({data})=>{
				if(!isActive) return;
				setForm(toProfileForm(data));
				setAvatar(data.avatar||"");
			})
			.catch((requestError:unknown)=>{
				if(!isActive) return;
				setError(
					requestError instanceof Error
						? requestError.message
						:"Unable to load your profile.",
				);
			})
			.finally(()=>{
				if(isActive) setIsLoading(false);
			});
		return ()=>{isActive=false;};
	},[token]);

	const updateField=(field:keyof ProfileForm,value:string)=>{
		setForm((current)=>({...current,[field]:value}));
		setSuccess("");
	};

	const handleSubmit=async(event:React.FormEvent<HTMLFormElement>)=>{
		event.preventDefault();
		setError("");
		setSuccess("");
		setIsSaving(true);
		const updates:ProfileUpdate={
			name:form.name.trim(),
			username:form.username.trim(),
			bio:form.bio.trim(),
			location:form.location.trim(),
			dateOfBirth:form.dateOfBirth||null,
		};
		try{
			const {data}=await updateMyProfile(token,updates);
			setForm(toProfileForm(data));
			setAvatar(data.avatar||"");
			onProfileUpdated({
				...user,
				name:data.name,
				username:data.username,
				bio:data.bio||"",
				location:data.location||"",
				dateOfBirth:data.dateOfBirth||undefined,
				avatarUrl:data.avatar||undefined,
			});
			setSuccess("Your profile has been updated.");
		}
		catch(requestError){
			setError(
				requestError instanceof Error
					? requestError.message
					:"Unable to save your profile.",
			);
		}
		finally{
			setIsSaving(false);
		}
	};

	return (
		<main className="grow w-full max-w-6xl mx-auto px-4 py-10 sm:px-8 lg:px-12">
			<div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#b2c5ff]">
						Account settings
					</p>
					<h1 className="mt-2 font-montserrat text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						Your profile
					</h1>
					<p className="mt-2 text-sm text-[#8d90a0]">
						Manage the details shown on your Syncsphere account.
					</p>
				</div>
				<button
					type="button"
					onClick={onLogout}
					className="self-start rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-[#c3c6d6] transition-colors hover:border-white/20 hover:text-white sm:self-auto"
				>
					Log out
				</button>
			</div>

			<div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
				<aside className="glass-panel h-fit rounded-2xl p-6 sm:p-8">
					<div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#0b1020]">
						{avatar
							?<img src={avatar} alt="" className="h-full w-full object-cover"/>
							:<UserCircle2 className="h-9 w-9"/>
						}
					</div>
					<h2 className="mt-5 text-xl font-bold text-white">
						{form.name||form.username||"Your profile"}
					</h2>
					<p className="mt-1 text-sm text-[#b2c5ff]">@{form.username||"username"}</p>
					<p className="mt-4 break-all text-sm text-[#c3c6d6]">{user.email}</p>
					<p className="mt-1 text-xs text-[#8d90a0]">Account email</p>
					{form.location&&(
						<p className="mt-5 flex items-center gap-2 text-sm text-[#c3c6d6]">
							<MapPin className="h-4 w-4 text-[#b2c5ff]"/>
							{form.location}
						</p>
					)}
					{form.dateOfBirth&&(
						<p className="mt-3 flex items-center gap-2 text-sm text-[#c3c6d6]">
							<CalendarDays className="h-4 w-4 text-[#b2c5ff]"/>
							{new Date(`${form.dateOfBirth}T00:00:00`).toLocaleDateString()}
						</p>
					)}
				</aside>

				<section className="glass-panel rounded-2xl p-6 sm:p-8">
					<div className="mb-6">
						<h2 className="text-lg font-bold text-white">Personal details</h2>
						<p className="mt-1 text-sm text-[#8d90a0]">
							Your profile is saved to your account.
						</p>
					</div>
					{error&&(
						<div role="alert" className="mb-5 rounded-lg border border-[#ffb4ab]/30 bg-[#93000a]/20 p-3 text-sm text-[#ffb4ab]">
							{error}
						</div>
					)}
					{success&&(
						<div role="status" className="mb-5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
							{success}
						</div>
					)}
					{isLoading
						?<p className="py-8 text-sm text-[#8d90a0]">Loading your profile…</p>
						:<form onSubmit={handleSubmit} className="space-y-5">
							<div className="grid gap-5 sm:grid-cols-2">
								<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
									Name
									<input
										required
										maxLength={100}
										value={form.name}
										onChange={(event)=>updateField("name",event.target.value)}
										className="mt-2 w-full rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus:border-[#b2c5ff]"
									/>
								</label>
								<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
									Username
									<input
										required
										minLength={3}
										maxLength={30}
										value={form.username}
										onChange={(event)=>updateField("username",event.target.value)}
										className="mt-2 w-full rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus:border-[#b2c5ff]"
									/>
								</label>
							</div>
							<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
								Bio
								<textarea
									maxLength={250}
									rows={4}
									value={form.bio}
									onChange={(event)=>updateField("bio",event.target.value)}
									placeholder="A little about you"
									className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none placeholder:text-[#8d90a0] focus:border-[#b2c5ff]"
								/>
							</label>
							<div className="grid gap-5 sm:grid-cols-2">
								<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
									Location
									<input
										maxLength={100}
										value={form.location}
										onChange={(event)=>updateField("location",event.target.value)}
										placeholder="City, country"
										className="mt-2 w-full rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none placeholder:text-[#8d90a0] focus:border-[#b2c5ff]"
									/>
								</label>
								<label className="block text-xs font-semibold uppercase tracking-wider text-[#b2c5ff]">
									Date of birth
									<input
										type="date"
										value={form.dateOfBirth}
										onChange={(event)=>updateField("dateOfBirth",event.target.value)}
										className="mt-2 w-full rounded-lg border border-white/10 bg-[#25293a]/80 px-3 py-3 text-sm normal-case tracking-normal text-[#dee1f7] outline-none focus:border-[#b2c5ff]"
									/>
								</label>
							</div>
							<button
								type="submit"
								disabled={isSaving}
								className="flex items-center justify-center gap-2 rounded-lg bg-[#0056d2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004bb8] disabled:cursor-not-allowed disabled:opacity-60"
							>
								<Save className="h-4 w-4"/>
								{isSaving?"Saving…":"Save changes"}
							</button>
						</form>
					}
				</section>
			</div>
		</main>
	);
};
