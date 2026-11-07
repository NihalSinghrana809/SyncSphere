import type {UserProfile} from "../../types/UserProfile";
import {AthleteIdentity} from "./AthleteIdentity";
import {DashboardHeader} from "./DashboardHeader";
import {ProfileDetails} from "./ProfileDetails";

interface DashboardViewProps{
	user:UserProfile;
	onLogout:()=>void;
	onReturnToLogin:()=>void;
}

export const DashboardView=({
	user,
	onLogout,
	onReturnToLogin,
}:DashboardViewProps)=>(
	<main className="mx-auto w-full max-w-6xl grow px-4 py-8 sm:px-8 lg:px-12">
		<DashboardHeader
			name={user.name}
			onLogout={onLogout}
			onReturnToLogin={onReturnToLogin}
		/>
		<div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<section className="glass-panel rounded-2xl border border-white/10 p-6 sm:p-8">
				<AthleteIdentity user={user}/>
				<ProfileDetails user={user}/>
			</section>
		</div>
	</main>
);
