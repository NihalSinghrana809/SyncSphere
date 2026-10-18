import {LoginView} from "../components/auth/LoginView";
import type {UserProfile} from "../types/UserProfile";

interface LoginPageProps {
	onLoginSuccess:(user:UserProfile,token?:string)=>void;
	onNavigateToSignUp:()=>void;
	onOpenForgotPassword:()=>void;
}

export const LoginPage=({
	onLoginSuccess,
	onNavigateToSignUp,
	onOpenForgotPassword,
}:LoginPageProps)=>(
	<LoginView
		onLoginSuccess={onLoginSuccess}
		onNavigateToSignUp={onNavigateToSignUp}
		onOpenForgotPassword={onOpenForgotPassword}
	/>
);

export default LoginPage;
