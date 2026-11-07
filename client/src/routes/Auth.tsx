import {Navigate, Route, Routes} from "react-router-dom";
import type {UserProfile} from "../types/UserProfile";
import {DashboardPage} from "../pages/Dashboard";
import {LoginPage} from "../pages/Login";
import {SignUpPage} from "../pages/SignUp";
import {ProfileDashboard} from "../pages/ProfileDashboard";
import {PublicProfile} from "../pages/PublicProfile";

interface AppRoutesProps {
	user:UserProfile|null;
	token:string|null;
	isRestoringSession:boolean;
	onLoginSuccess:(user:UserProfile,token?:string)=>void;
	onSignUpSuccess:(user:UserProfile,token?:string)=>void;
	onLogout:()=>void;
	onProfileUpdated:(user:UserProfile)=>void;
	onReturnToLogin:()=>void;
	onOpenForgotPassword:()=>void;
	onNavigateToSignUp:()=>void;
	onNavigateToLogin:()=>void;
}

export const AppRoutes=({
	user,
	token,
	isRestoringSession,
	onLoginSuccess,
	onSignUpSuccess,
	onLogout,
	onProfileUpdated,
	onReturnToLogin,
	onOpenForgotPassword,
	onNavigateToSignUp,
	onNavigateToLogin,
}:AppRoutesProps)=>{
	return (
		<Routes>
			<Route path="/u/:username" element={<PublicProfile/>}/>
			<Route
				path="/"
				element={
					<LoginPage
						onLoginSuccess={onLoginSuccess}
						onNavigateToSignUp={onNavigateToSignUp}
						onOpenForgotPassword={onOpenForgotPassword}
					/>
				}
			/>
			<Route
				path="/signup"
				element={
					<SignUpPage
						onSignUpSuccess={onSignUpSuccess}
						onNavigateToLogin={onNavigateToLogin}
						openLegalModal={()=>undefined}
					/>
				}
			/>
			<Route
				path="/dashboard"
				element={isRestoringSession?null:!user?<Navigate to="/" replace/>:
					<DashboardPage
						user={user}
						onLogout={onLogout}
						onReturnToLogin={onReturnToLogin}
					/>
				}
			/>
			<Route
				path="/profile"
				element={isRestoringSession?null:!user||!token?<Navigate to="/" replace/>:
					<ProfileDashboard
						user={user}
						token={token}
						onLogout={onLogout}
						onProfileUpdated={onProfileUpdated}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Routes>
	);
};
