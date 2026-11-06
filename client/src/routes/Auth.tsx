import {Navigate, Route, Routes} from "react-router-dom";
import type {UserProfile} from "../types/UserProfile";
import {DashboardPage} from "../pages/Dashboard";
import {LoginPage} from "../pages/Login";
import {SignUpPage} from "../pages/SignUp";

interface AppRoutesProps {
	user:UserProfile|null;
	isRestoringSession:boolean;
	onLoginSuccess:(user:UserProfile,token?:string)=>void;
	onSignUpSuccess:(user:UserProfile,token?:string)=>void;
	onLogout:()=>void;
	onReturnToLogin:()=>void;
	onOpenForgotPassword:()=>void;
	onNavigateToSignUp:()=>void;
	onNavigateToLogin:()=>void;
}

export const AppRoutes=({
	user,
	isRestoringSession,
	onLoginSuccess,
	onSignUpSuccess,
	onLogout,
	onReturnToLogin,
	onOpenForgotPassword,
	onNavigateToSignUp,
	onNavigateToLogin,
}:AppRoutesProps)=>{
	return (
		<Routes>
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
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Routes>
	);
};
