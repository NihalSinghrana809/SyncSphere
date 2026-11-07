import {CheckCircle2} from "lucide-react";
import {Footer} from "./components/auth/Footer";
import {Navbar} from "./components/auth/Navbar";
import {useSyncSphereApp} from "./hooks/useSyncSphereApp";
import {AppRoutes} from "./routes/Auth";

export default function App() {
	const {
		user,
		token,
		isRestoringSession,
		currentView,
		toastMessage,
		setCurrentView,
		setForgotPasswordOpen,
		handleLoginSuccess,
		handleSignUpSuccess,
		handleLogout,
		handleProfileUpdated,
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
			<Navbar
				currentView={currentView}
				isAuthenticated={Boolean(user)}
				setCurrentView={setCurrentView}
			/>
			<AppRoutes
				user={user}
				token={token}
				isRestoringSession={isRestoringSession}
				onLoginSuccess={handleLoginSuccess}
				onSignUpSuccess={handleSignUpSuccess}
				onLogout={handleLogout}
				onProfileUpdated={handleProfileUpdated}
				onReturnToLogin={onReturnToLogin}
				onOpenForgotPassword={()=>setForgotPasswordOpen(true)}
				onNavigateToSignUp={onNavigateToSignUp}
				onNavigateToLogin={onNavigateToLogin}
			/>
			<Footer/>
		</div>
	);
}
