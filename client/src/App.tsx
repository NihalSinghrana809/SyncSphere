import {CheckCircle2} from "lucide-react";
import {Footer} from "./components/Footer";
import {ForgotPasswordModal} from "./components/ForgotPasswardModel";
import {Navbar} from "./components/Navbar";
import {useSyncSphereApp} from "./hooks/useSyncSphereApp";
import {AppRoutes} from "./routes/Auth";

export default function App() {
	const {
		user,
		currentView,
		forgotPasswordOpen,
		toastMessage,
		setCurrentView,
		setForgotPasswordOpen,
		handleLoginSuccess,
		handleSignUpSuccess,
		handleLogout,
		onReturnToLogin,
		onNavigateToSignUp,
		onNavigateToLogin,
	}=useSyncSphereApp();

	return (
		<div className="min-h-screen flex flex-col bg-[#0e1322] text-[#dee1f7] selection:bg-[#b2c5ff]/30 selection:text-white">
			{toastMessage&&(
				<div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#161b2b] border border-[#b2c5ff]/40 text-[#dee1f7] text-xs font-semibold shadow-2xl animate-fade-in backdrop-blur-xl">
					<CheckCircle2 className="w-4 h-4 text-[#10b981]"/>
					<span>{toastMessage}</span>
				</div>
			)}

			<Navbar currentView={currentView} setCurrentView={setCurrentView}/>

			<AppRoutes
				user={user}
				onLoginSuccess={handleLoginSuccess}
				onSignUpSuccess={handleSignUpSuccess}
				onLogout={handleLogout}
				onReturnToLogin={onReturnToLogin}
				onOpenForgotPassword={()=>setForgotPasswordOpen(true)}
				onNavigateToSignUp={onNavigateToSignUp}
				onNavigateToLogin={onNavigateToLogin}
			/>

			<Footer/>

			<ForgotPasswordModal
				isOpen={forgotPasswordOpen}
				onClose={()=>setForgotPasswordOpen(false)}
				onBackToLogin={()=>setForgotPasswordOpen(false)}
			/>
		</div>
	);
}
