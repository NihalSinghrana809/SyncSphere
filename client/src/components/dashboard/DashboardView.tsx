import React from "react";
import {LogOut, Mail, Sparkles, UserCircle2} from "lucide-react";
import type {UserProfile} from "../../types/UserProfile";

interface DashboardViewProps {
	user:UserProfile;
	onLogout:()=>void;
	onReturnToLogin:()=>void;
}

export const DashboardView:React.FC<DashboardViewProps>=({
	user,
	onLogout,
	onReturnToLogin,
})=>{
	return (
		<main className="grow w-full max-w-6xl mx-auto px-4 py-8 sm:px-8 lg:px-12">
			<div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#b2c5ff]">
						PROFILE DASHBOARD
					</p>
					<h1 className="mt-2 font-montserrat text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						Welcome back,
						<span className="text-[#b2c5ff]">{user.name}</span>
					</h1>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={onReturnToLogin}
						className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#c3c6d6] transition-colors hover:border-white/20 hover:text-white"
					>
						Back to Login
					</button>
					<button
						type="button"
						onClick={onLogout}
						className="flex items-center gap-2 rounded-lg bg-[#25293a] px-3 py-2 text-xs font-semibold text-[#dee1f7] transition-colors hover:bg-[#2f3445]"
					>
						<LogOut className="h-3.5 w-3.5"/>
						Logout
					</button>
				</div>
			</div>

			<div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
				<section className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8">
					<div className="flex items-center gap-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#b2c5ff] via-[#dcb8ff] to-[#ffacec] text-[#0b1020] shadow-lg shadow-[#b2c5ff]/20">
							<UserCircle2 className="h-8 w-8"/>
						</div>

						<div>
							<p className="text-xs uppercase tracking-[0.2em] text-[#8d90a0]">
								Athlete profile
							</p>
							<h2 className="mt-1 text-2xl font-bold text-white">
								{user.name}
							</h2>
						</div>
					</div>

					<div className="mt-6 space-y-4">
						<div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#121a2b] px-4 py-3">
							<Mail className="h-4 w-4 text-[#b2c5ff]"/>
							<span className="text-sm text-[#dee1f7]">
								{user.email}
							</span>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="rounded-xl border border-white/5 bg-[#121a2b] p-4">
								<p className="text-[10px] uppercase tracking-[0.2em] text-[#8d90a0]">
									Tier
								</p>
								<p className="mt-2 text-lg font-semibold text-white">
									{user.tier}
								</p>
							</div>

							<div className="rounded-xl border border-white/5 bg-[#121a2b] p-4">
								<p className="text-[10px] uppercase tracking-[0.2em] text-[#8d90a0]">
									Streak
								</p>
								<p className="mt-2 text-lg font-semibold text-white">
									{user.dailyStreak}days
								</p>
							</div>
						</div>

						<div className="rounded-xl border border-[#b2c5ff]/20 bg-[#0d1322] p-4">
							<p className="text-[10px] uppercase tracking-[0.2em] text-[#8d90a0]">
								Primary focus
							</p>
							<p className="mt-2 flex items-center gap-2 text-lg font-semibold text-[#dee1f7]">
								<Sparkles className="h-4 w-4 text-[#dcb8ff]"/>
								{user.primaryFocus}
							</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};
