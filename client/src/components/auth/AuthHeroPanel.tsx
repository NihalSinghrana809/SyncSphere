import type {LucideIcon} from "lucide-react";

interface AuthHeroPanelProps {
	badgeLabel:string;
	title:string;
	subtitle:string;
	imageUrl:string;
	icon?:LucideIcon;
}

export const AuthHeroPanel:React.FC<AuthHeroPanelProps>=({
	badgeLabel,
	title,
	subtitle,
	imageUrl,
	icon:Icon,
})=>{
	return (
		<section className="relative w-full lg:w-1/2 min-h-[420px] overflow-hidden flex flex-col justify-end p-6 sm:p-10 lg:p-16">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(178,197,255,0.32),_transparent_55%)]"/>
			<img
				alt="Athlete training"
				className="absolute inset-0 w-full h-full object-cover object-center brightness-90 contrast-105"
				src={imageUrl}
			/>

			<div className="relative z-10 max-w-xl">
				<div className="inline-flex items-center gap-2 bg-[#0e1322]/70 border border-white/10 rounded-full px-3 py-1.5 mb-6 text-[10px] uppercase tracking-[0.22em] text-[#b2c5ff] backdrop-blur-md">
					{Icon&&<Icon className="w-3.5 h-3.5"/>}
					{badgeLabel}
				</div>

				<h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#b2c5ff] tracking-tight leading-[1.08] mb-4 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
					{title}
				</h1>

				<p className="font-inter text-base sm:text-lg text-[#e4e7f7] leading-relaxed max-w-lg drop-shadow-md">
					{subtitle}
				</p>
			</div>
		</section>
	);
};
