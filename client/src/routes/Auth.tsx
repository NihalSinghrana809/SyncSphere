import {Navigate, Route, Routes} from "react-router-dom";
import type {UserProfile} from "../types/UserProfile";
import {DashboardPage} from "../pages/Dashboard";
import {LoginPage} from "../pages/Login";
import {SignUpPage} from "../pages/SignUp";

interface AppRoutesProps {
	user:UserProfile|null;
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
				element={
					<DashboardPage
						user={
							user||{
								name:"name",
								email:"name@gmail.com",
								tier:"Tier 1 · Elite",
								primaryFocus:
									"High-Intensity Sprint & Endurance",
								dailyStreak:1,
							}
						}
						onLogout={onLogout}
						onReturnToLogin={onReturnToLogin}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace/>}/>
		</Routes>
	);
};
