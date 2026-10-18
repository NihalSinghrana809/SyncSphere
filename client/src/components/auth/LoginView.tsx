import {ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck} from "lucide-react";
import {useState} from "react";
import {loginUser} from "../../lib/api";
import type {UserProfile} from "../../types/UserProfile";
import {AuthHeroPanel} from "./AuthHeroPanel";
import {AuthInputField} from "./AuthInputField";

interface LoginViewProps {
	onLoginSuccess:(user:UserProfile,token?:string)=>void;
	onNavigateToSignUp:()=>void;
	onOpenForgotPassword:()=>void;
}

export const LoginView:React.FC<LoginViewProps>=({
	onLoginSuccess,
	onNavigateToSignUp,
	onOpenForgotPassword,
})=>{
	const [email, setEmail]=useState("");
	const [password, setPassword]=useState("");
	const [showPassword, setShowPassword]=useState(false);
	const [isSubmitting, setIsSubmitting]=useState(false);
	const [error, setError]=useState("");

	const handleSubmit=async(event:React.FormEvent)=>{
		event.preventDefault();
		setError("");

		if(!email.trim()||!password.trim()){
			setError("Please enter your email and password.");
			return;
		}

		setIsSubmitting(true);

		try{
			const response=await loginUser(
				email.trim().toLowerCase(),
				password,
			);
			const loggedInUser:UserProfile={
				name:
					response.user.username||
					response.user.email.split("@")[0]||
					"Syncsphere Athlete",
				email:response.user.email,
				tier:"Tier 1 · Elite",
				primaryFocus:"High-Intensity Sprint & Endurance",
				dailyStreak:18,
			};

			onLoginSuccess(loggedInUser, response.token);
		}
		catch(apiError){
			setError(
				apiError instanceof Error
					? apiError.message
					:"Unable to sign in right now.",
			);
		}
		finally{
			setIsSubmitting(false);
		}
	};

	return (
		<main className="grow flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
			<AuthHeroPanel
				badgeLabel="Performance intelligence"
				title={"Train smarter.\nRecover faster."}
				subtitle="Bring your training load, recovery score, and sprint readiness into a single athlete dashboard."
				imageUrl="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
				icon={ShieldCheck}
			/>

			<section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-16 bg-[#090e1c]/40 relative">
				<div className="w-full max-w-md glass-panel p-6 sm:p-9 rounded-2xl relative shadow-2xl transition-all duration-300">
					<div className="mb-6">
						<p className="font-inter text-xs uppercase tracking-[0.24em] text-[#b2c5ff] mb-2">
							sign in
						</p>
						<h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-[#dee1f7] mb-2 tracking-tight">
							Welcome back athlete
						</h2>
					</div>

					{error&&(
						<div className="mb-4 p-3 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-medium">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<AuthInputField
							id="login-email"
							label="email address"
							type="email"
							value={email}
							onChange={(event)=>setEmail(event.target.value)}
							placeholder="name@gmail.com"
							icon={Mail}
						/>

						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<label
									className="font-inter text-xs font-semibold text-[#b2c5ff] uppercase tracking-wider block"
									htmlFor="login-password"
								>
									password
								</label>
								<button
									type="button"
									onClick={onOpenForgotPassword}
									className="text-[11px] font-medium text-[#b2c5ff] hover:underline"
								>
									Forgot password?
								</button>
							</div>

							<div className="relative flex items-center bg-[#25293a]/90 rounded-lg border border-white/5 focus-within:border-[#b2c5ff]">
								<Lock className="w-5 h-5 absolute left-3.5 text-[#8d90a0]"/>
								<input
									id="login-password"
									type={showPassword?"text":"password"}
									value={password}
									onChange={(event)=>
										setPassword(event.target.value)
									}
									placeholder="Enter your password"
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

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full mt-4 bg-linear-to-r from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#002c72] font-montserrat font-extrabold text-sm py-4 rounded-lg uppercase tracking-widest bloom-primary transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-lg hover:brightness-105 flex items-center justify-center gap-2"
						>
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-[#002c72] border-t-transparent rounded-full animate-spin"/>
									<span>Connecting...</span>
								</>
							) : (
								<>
									<span>Access dashboard</span>
									<ArrowRight className="w-4 h-4 stroke-3"/>
								</>
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="font-inter text-sm text-[#c3c6d6]">
							Need a profile?{" "}
							<button
								type="button"
								onClick={onNavigateToSignUp}
								className="text-[#b2c5ff] font-bold hover:underline transition-all ml-1 cursor-pointer"
							>
								Create account
							</button>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};