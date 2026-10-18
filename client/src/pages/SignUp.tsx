import {SignUpView} from "../components/auth/SignUpView";
import type {UserProfile} from "../types/UserProfile";

interface SignUpPageProps {
	onSignUpSuccess:(user:UserProfile,token?:string)=>void;
	onNavigateToLogin:()=>void;
	openLegalModal?:(type:"privacy"|"terms")=>void;
}

export const SignUpPage=({
	onSignUpSuccess,
	onNavigateToLogin,
	openLegalModal,
}:SignUpPageProps)=>(
	<SignUpView
		onSignUpSuccess={onSignUpSuccess}
		onNavigateToLogin={onNavigateToLogin}
		openLegalModal={openLegalModal}
	/>
);

export default SignUpPage;
