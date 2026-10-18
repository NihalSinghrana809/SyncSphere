import {useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {clearAuthSession, setSession, setUser} from "../features/authSlice";
import {useUIStore} from "../features/uiStore";
import {getCurrentUser} from "../lib/api";
import {useAppDispatch, useAppSelector} from "./redux";
import type {UserProfile} from "../types/UserProfile";

const AUTH_TOKEN_KEY="SyncSphere";

const buildProfile=(
	user:{username?:string;email:string},
	primaryFocus="High-Intensity Sprint & Endurance",
	dailyStreak=1,
):UserProfile=>({
	name:user.username||user.email.split("@")[0]||"Syncsphere Athlete",
	email:user.email,
	tier:"Tier 1 · Elite",
	primaryFocus,
	dailyStreak,
});

const getCurrentView=(pathname:string):"login"|"signup"|"dashboard"=>{
	if(pathname==="/signup") return "signup";
	if(pathname==="/dashboard") return "dashboard";
	return "login";
};

export const useSyncSphereApp=()=>{
	const navigate=useNavigate();
	const location=useLocation();
	const dispatch=useAppDispatch();
	const user=useAppSelector((state)=>state.auth.user);
	const forgotPasswordOpen=useUIStore((state)=>state.forgotPasswordOpen);
	const toastMessage=useUIStore((state)=>state.toastMessage);
	const setForgotPasswordOpen=useUIStore((state)=>state.setForgotPasswordOpen);
	const showToast=useUIStore((state)=>state.showToast);

	const currentView=getCurrentView(location.pathname);

	const setCurrentView=useCallback(
		(view:"login"|"signup"|"dashboard")=>{
			const nextRoute=
				view==="login"
					? "/"
					:view==="signup"
						? "/signup"
						:"/dashboard";
			navigate(nextRoute);
		},
		[navigate],
	);

	const persistSession=useCallback(
		(token:string,authenticatedUser:UserProfile)=>{
			sessionStorage.setItem(AUTH_TOKEN_KEY,token);
			dispatch(setSession({token,user:authenticatedUser}));
			setCurrentView("dashboard");
		},
		[dispatch,setCurrentView],
	);

	const clearSession=useCallback(()=>{
		sessionStorage.removeItem(AUTH_TOKEN_KEY);
		dispatch(clearAuthSession());
		setCurrentView("login");
	}, [dispatch,setCurrentView]);

	useEffect(()=>{
		const restoreSession=async()=>{
			const token=sessionStorage.getItem(AUTH_TOKEN_KEY);
			if(!token) return;

			try{
				const response=await getCurrentUser(token);
				const authenticatedUser=buildProfile(response.user);
				dispatch(setSession({token,user:authenticatedUser}));
				setCurrentView("dashboard");
			}
			catch{
				sessionStorage.removeItem(AUTH_TOKEN_KEY);
				dispatch(clearAuthSession());
			}
		};

		void restoreSession();
	}, [dispatch,setCurrentView]);

	const handleLoginSuccess=useCallback(
		(loggedInUser:UserProfile,token?:string)=>{
			if(token){
				persistSession(token,loggedInUser);
			}else{
				dispatch(setUser(loggedInUser));
			}
			setCurrentView("dashboard");
			showToast(
				`Welcome back, ${loggedInUser.name}.Telemetry synchronized.`,
			);
		},
		[dispatch,persistSession,setCurrentView,showToast],
	);

	const handleSignUpSuccess=useCallback(
		(newUser:UserProfile,token?:string)=>{
			if(token){
				persistSession(token,newUser);
			}else{
				dispatch(setUser(newUser));
			}
			setCurrentView("dashboard");
			showToast(
				`Account calibrated for ${newUser.name}.Welcome to Syncsphere!`,
			);
		},
		[dispatch,persistSession,setCurrentView,showToast],
	);

	const handleLogout=useCallback(()=>{
		clearSession();
		showToast("Logged out of telemetry session.");
	}, [clearSession, showToast]);

	const handleReturnToLogin=useCallback(()=>{
		clearSession();
	}, [clearSession]);

	return {
		user,
		currentView,
		forgotPasswordOpen,
		toastMessage,
		setCurrentView,
		setForgotPasswordOpen,
		handleLoginSuccess,
		handleSignUpSuccess,
		handleLogout,
		onReturnToLogin:handleReturnToLogin,
		onNavigateToSignUp:()=>setCurrentView("signup"),
		onNavigateToLogin:()=>setCurrentView("login"),
	};
};
