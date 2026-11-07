import {LogOut} from "lucide-react";

interface DashboardHeaderProps{
	name:string;
	onLogout:()=>void;
	onReturnToLogin:()=>void;
}

export const DashboardHeader=({
	name,
	onLogout,
	onReturnToLogin,
}:DashboardHeaderProps)=>(
	<header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#b2c5ff]">PROFILE DASHBOARD</p>
			<h1 className="mt-2 font-montserrat text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Welcome back, <span className="text-[#b2c5ff]">{name}</span>
			</h1>
		</div>
		<div className="flex flex-wrap items-center gap-3">
			<button
				type="button"
				onClick={onReturnToLogin}
				className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#c3c6d6] transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
			>
				Back to Login
			</button>
			<button
				type="button"
				onClick={onLogout}
				className="flex items-center gap-2 rounded-lg bg-[#25293a] px-3 py-2 text-xs font-semibold text-[#dee1f7] transition-colors hover:bg-[#2f3445] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff]"
			>
				<LogOut className="h-3.5 w-3.5"/>
				Logout
			</button>
		</div>
	</header>
);
