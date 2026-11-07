import React from "react";
import {Menu, Activity, ArrowRight} from "lucide-react";

interface NavbarProps {
	currentView: "login"|"signup"|"dashboard"|"profile";
	isAuthenticated:boolean;
	setCurrentView: (view:"login"|"signup"|"dashboard"|"profile")=>void;
}

export const Navbar:React.FC<NavbarProps>=({
	currentView,
	isAuthenticated,
	setCurrentView,
})=>{
	const navigation=isAuthenticated
		? [
			{label:"Dashboard",view:"dashboard" as const},
			{label:"Profile",view:"profile" as const},
		]
		: [
			{label:"Login",view:"login" as const},
			{label:"Sign Up",view:"signup" as const},
		];

	return (
		<header className="bg-[#0e1322] backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
			<nav className="flex justify-between items-center w-full px-4 sm:px-8 lg:px-16 py-3.5 max-w-360 mx-auto">
				<button
					type="button"
					onClick={()=>setCurrentView("login")}
					className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
				>
					<div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#0056d2] to-[#b2c5ff] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(178,197,255,0.3)] group-hover:scale-105 transition-transform duration-300">
						<Activity className="w-full h-full text-[#0e1322] stroke-[2.5]"/>
					</div>
					<span className="font-montserrat text-xl sm:text-2xl font-extrabold text-[#b2c5ff] tracking-tighter group-hover:text-white transition-colors">
						Syncsphere
					</span>
				</button>

				<div className="hidden sm:flex items-center gap-2">
					{navigation.map(({label,view})=>(
						<button
							key={view}
							type="button"
							onClick={()=>setCurrentView(view)}
							aria-current={currentView===view?"page":undefined}
							className={`font-inter text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-lg hover:bg-white/5 cursor-pointer ${
								currentView===view
									? "text-[#dee1f7]"
									: "text-[#c3c6d6] hover:text-[#b2c5ff]"
							}`}
						>
							{label}
						</button>
					))}
					{!isAuthenticated&&(
						<button
							type="button"
							onClick={()=>setCurrentView("signup")}
							className="bg-[#0056d2] text-[#ccd8ff] px-6 py-2 rounded-full font-inter text-sm font-semibold hover:bg-[#004bb8] hover:shadow-[0_0_20px_rgba(0,86,210,0.4)] transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
						>
							<span>Sign Up</span>
							<ArrowRight className="w-3.5 h-3.5" />
						</button>
					)}
				</div>

				<div className="flex sm:hidden items-center gap-2">
					{navigation.map(({label,view})=>(
						<button
							key={view}
							type="button"
							onClick={()=>setCurrentView(view)}
							className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer ${
								currentView===view
									? "bg-[#25293a] text-white"
									: "bg-[#0056d2] text-[#ccd8ff]"
							}`}
						>
							{label}
						</button>
					))}
					<button
						type="button"
						onClick={()=>setCurrentView("login")}
						className="p-2 rounded-lg text-[#c3c6d6] hover:text-white hover:bg-white/5 focus:outline-none cursor-pointer"
						aria-label="Toggle navigation menu"
					>
						<Menu className="w-5 h-5" />
					</button>
				</div>
			</nav>
		</header>
	);
};
