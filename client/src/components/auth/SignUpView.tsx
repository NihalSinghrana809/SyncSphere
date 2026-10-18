import {ArrowRight, Check, Eye, EyeOff, Lock, Mail, User} from "lucide-react";
import {useState} from "react";
import {registerUser} from "../../lib/api";
import type {UserProfile} from "../../types/UserProfile";
import {AuthHeroPanel} from "./AuthHeroPanel";
import {AuthInputField} from "./AuthInputField";

interface SignUpViewProps {
	onSignUpSuccess:(user:UserProfile,token?:string)=>void;
	onNavigateToLogin:()=>void;
	openLegalModal?:(type:"privacy"|"terms")=>void;
}

export const SignUpView:React.FC<SignUpViewProps>=({
	onSignUpSuccess,
	onNavigateToLogin,
	openLegalModal=()=>undefined,
})=>{
	const [name, setName]=useState("");
	const [email, setEmail]=useState("");
	const [password, setPassword]=useState("");
	const [primaryFocus, setPrimaryFocus]=useState("HIIT & Sprint");
	const [agreeTerms, setAgreeTerms]=useState(true);
	const [showPassword, setShowPassword]=useState(false);
	const [isSubmitting, setIsSubmitting]=useState(false);
	const [error, setError]=useState("");

	const athleteImageUrl=
		"https://lh3.googleusercontent.com/aida-public/AB6AXuCA5HpISO2dHkA5P52_rMFVzhe4mfOMlpJHuh7M9wnt1MCpuLYsVmlBtaZgCcxE_AmHXA4GlAgFNTl1vDOjnoPxiZeid2XKx0V2qiKS7SF2FlQkHNBnYtmzASP1TQnj1E0hqlZJko0IprLSqCaC266r3Bytr2yb0E1cJ7dorDzTuoKqNWE4wEMW34x89WUPTA1G3BLB6E5J5Dz3k8zeTm8o-ipjeSh9CFLbesVCnolM8Qt7hGhAP0kS8qjVdK8v8t9T-tGs-PdzzQ4";

	const handleSubmit=async(event:React.FormEvent)=>{
		event.preventDefault();
		setError("");

		if(!name.trim()){
			setError("Please enter your full name.");
			return;
		}
		if(!email.includes("@")){
			setError("Please provide a valid email address.");
			return;
		}
		if(password.length<8){
			setError("Password should be at least 8 characters long.");
			return;
		}
		if(!agreeTerms){
			setError("Please accept the Terms of Service & Privacy Policy.");
			return;
		}

		setIsSubmitting(true);

		try{
			const response=await registerUser(
				name.trim(),
				email.trim().toLowerCase(),
				password,
			);
			const authenticatedUser:UserProfile={
				name:
					response.user.username||
					response.user.email.split("@")[0]||
					name.trim(),
				email:response.user.email,
				tier:"Tier 1 · Starter Elite",
				primaryFocus,
				dailyStreak:1,
			};

			onSignUpSuccess(authenticatedUser, response.token);
		}
		catch(apiError){
			setError(
				apiError instanceof Error
					? apiError.message
					:"Unable to create your account right now.",
			);
		}
		finally{
			setIsSubmitting(false);
		}
	};

	const focusOptions=[
		"HIIT & Sprint",
		"Endurance & Running",
		"Strength & Hypertrophy",
		"Hybrid Performance",
	];

	return (
		<main className="grow flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
			<AuthHeroPanel
				badgeLabel="Athlete onboarding"
				title={"ELEVATE\nYOUR BASELINE."}
				subtitle="Join thousands of pro athletes leveraging predictive readiness scores."
				imageUrl={athleteImageUrl}
			/>

			<section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16 bg-[#090e1c]/40 relative">
				<div className="w-full max-w-md glass-panel p-6 sm:p-9 rounded-2xl relative shadow-2xl transition-all duration-300">
					<div className="mb-6">
						<h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#dee1f7] mb-2 tracking-tight">
							Create Your Account
						</h2>
					</div>

					{error&&(
						<div className="mb-4 p-3 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-medium">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<AuthInputField
							id="signup-name"
							label="FULL NAME"
							value={name}
							onChange={(event)=>setName(event.target.value)}
							placeholder="name"
							icon={User}
						/>

						<AuthInputField
							id="signup-email"
							label="EMAIL ADDRESS"
							type="email"
							value={email}
							onChange={(event)=>setEmail(event.target.value)}
							placeholder="name@gmail.com"
							icon={Mail}
						/>

						<div className="space-y-1.5">
							<label
								className="font-inter text-xs font-semibold text-[#b2c5ff] uppercase tracking-wider block"
								htmlFor="signup-password"
							>
								PASSWORD
							</label>
							<div className="relative flex items-center bg-[#25293a]/90 rounded-lg input-glow transition-all duration-200 border border-white/5 focus-within:border-[#b2c5ff]">
								<Lock className="w-5 h-5 absolute left-3.5 text-[#8d90a0]"/>
								<input
									id="signup-password"
									type={showPassword?"text":"password"}
									value={password}
									onChange={(event)=>
										setPassword(event.target.value)
									}
									placeholder="Minimum 8 characters"
									required
									className="w-full bg-transparent border-none py-3 pl-11 pr-11 focus:ring-0 focus:outline-none text-[#dee1f7] placeholder:text-[#8d90a0]/60 font-inter text-sm"
								/>
								<button
									type="button"
									onClick={()=>
										setShowPassword((value)=>!value)
									}
									className="absolute right-3 text-[#8d90a0] hover:text-[#dee1f7] p-1"
								>
									{showPassword ? (
										<EyeOff className="w-4 h-4"/>
									) : (
										<Eye className="w-4 h-4"/>
									)}
								</button>
							</div>
						</div>

						<div className="space-y-1.5 pt-1">
							<label className="font-inter text-xs font-semibold text-[#b2c5ff] uppercase tracking-wider block">
								PRIMARY FOCUS
							</label>
							<div className="grid grid-cols-2 gap-2">
								{focusOptions.map((opt)=>(
									<button
										key={opt}
										type="button"
										onClick={()=>setPrimaryFocus(opt)}
										className={`text-xs font-medium py-2 px-2.5 rounded-lg border text-left transition-all truncate cursor-pointer ${
											primaryFocus===opt
												? "bg-[#0056d2]/30 border-[#b2c5ff] text-white shadow-[0_0_10px_rgba(178,197,255,0.2)]"
												: "bg-[#25293a]/60 border-white/5 text-[#8d90a0] hover:text-[#dee1f7]"
										}`}
									>
										{opt}
									</button>
								))}
							</div>
						</div>

						<div className="pt-2">
							<label className="flex items-start gap-2.5 cursor-pointer group select-none">
								<div
									role="button"
									tabIndex={0}
									onClick={()=>
										setAgreeTerms((value)=>!value)
									}
									onKeyDown={(event)=>{
										if(
											event.key==="Enter"||
											event.key===" "
										) {
											event.preventDefault();
											setAgreeTerms((value)=>!value);
										}
									}}
									className={`w-5 h-5 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-all ${
										agreeTerms
											? "bg-[#0056d2] border-[#b2c5ff]"
											: "bg-[#25293a] border-[#424654] group-hover:border-[#8d90a0]"
									}`}
								>
									{agreeTerms && (
										<Check className="w-3.5 h-3.5 text-white stroke-3" />
									)}
								</div>
								<span className="font-inter text-xs text-[#c3c6d6] leading-snug">
									I agree to Syncsphere&apos;s{" "}
									<button
										type="button"
										onClick={()=>openLegalModal("terms")}
										className="text-[#b2c5ff] hover:underline transition-all"
									>
										Terms of Service
									</button>{" "}
									&{" "}
									<button
										type="button"
										onClick={()=>
											openLegalModal("privacy")
										}
										className="text-[#b2c5ff] hover:underline transition-all"
									>
										Privacy Policy
									</button>
									.
								</span>
							</label>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full mt-4 bg-linear-to-r from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#002c72] font-montserrat font-extrabold text-sm py-4 rounded-lg uppercase tracking-widest bloom-primary transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-lg hover:brightness-105 flex items-center justify-center gap-2"
						>
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-[#002c72] border-t-transparent rounded-full animate-spin" />
									<span>INITIALIZING PROFILE...</span>
								</>
							) : (
								<>
									<span>CREATE ACCOUNT & START</span>
									<ArrowRight className="w-4 h-4 stroke-3" />
								</>
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="font-inter text-sm text-[#c3c6d6]">
							Already have an account?{" "}
							<button
								type="button"
								onClick={onNavigateToLogin}
								className="text-[#b2c5ff] font-bold hover:underline transition-all ml-1 cursor-pointer"
							>
								Log In
							</button>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};
