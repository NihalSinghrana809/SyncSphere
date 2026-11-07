import {ProfileView} from "../components/pages/ProfileView";
import type {UserProfile} from "../types/UserProfile";

interface ProfilePageProps{
	user:UserProfile;
	token:string;
	onProfileUpdated:(user:UserProfile)=>void;
	onLogout:()=>void;
}

export const ProfilePage=({
	user,
	token,
	onProfileUpdated,
	onLogout,
}:ProfilePageProps)=>(
	<ProfileView
		user={user}
		token={token}
		onProfileUpdated={onProfileUpdated}
		onLogout={onLogout}
	/>
);
