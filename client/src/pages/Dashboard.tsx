import {DashboardView} from "../components/dashboard/DashboardView";
import type {UserProfile} from "../types/UserProfile";

interface DashboardPageProps {
	user:UserProfile;
	onLogout:()=>void;
	onReturnToLogin:()=>void;
}

export const DashboardPage=({
	user,
	onLogout,
	onReturnToLogin,
}:DashboardPageProps)=>(
	<DashboardView
		user={user}
		onLogout={onLogout}
		onReturnToLogin={onReturnToLogin}
	/>
);

export default DashboardPage;
