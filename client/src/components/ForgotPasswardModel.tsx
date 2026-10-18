import React, {useState} from "react";
import {X, Mail, CheckCircle2, ArrowRight} from "lucide-react";

interface ForgotPasswordModalProps {
	isOpen:boolean;
	onClose:()=>void;
	onBackToLogin:()=>void;
}

export const ForgotPasswordModal:React.FC<ForgotPasswordModalProps>=({
	isOpen,
	onClose,
	onBackToLogin,
})=>{
	const [email, setEmail]=useState("");
	const [isSubmitting, setIsSubmitting]=useState(false);
	const [sentSuccess, setSentSuccess]=useState(false);

	if(!isOpen) return null;

	const handleSubmit=(e:React.FormEvent)=>{
		e.preventDefault();
		if(!email) return;

		setIsSubmitting(true);
		setTimeout(()=>{
			setIsSubmitting(false);
			setSentSuccess(true);
		}, 700);
	};

	const handleReset=()=>{
		setSentSuccess(false);
		setEmail("");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e1322]/80 backdrop-blur-md transition-opacity">
			<div className="relative w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
				<div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-[#b2c5ff] to-[#ffacec] rounded-t-2xl"/>

				<button
					onClick={handleReset}
					className="absolute top-5 right-5 text-[#8d90a0] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
				>
					<X className="w-5 h-5"/>
				</button>

				{!sentSuccess ? (
					<div>
						<div className="mb-6">
							<div className="w-10 h-10 rounded-xl bg-[#0056d2]/20 border border-[#b2c5ff]/30 flex items-center justify-center text-[#b2c5ff] mb-4">
								<Mail className="w-5 h-5"/>
							</div>
							<h3 className="font-montserrat text-2xl font-bold text-[#dee1f7] mb-2 tracking-tight">
								Reset Password
							</h3>
							<p className="font-inter text-sm text-[#c3c6d6]">
								Enter your registered athlete email to receive a
								secure recovery code.
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="font-inter text-xs font-semibold text-[#b2c5ff] uppercase tracking-wider block mb-2">
									ATHLETE EMAIL
								</label>
								<div className="relative flex items-center bg-[#25293a] rounded-lg input-glow border border-white/5">
									<Mail className="w-5 h-5 absolute left-3.5 text-[#8d90a0]"/>
									<input
										type="email"
										required
										value={email}
										onChange={(e)=>
											setEmail(e.target.value)
										}
										placeholder="name@syncsphere.com"
										className="w-full bg-transparent border-none py-3.5 pl-11 pr-4 focus:ring-0 text-[#dee1f7] text-sm"
									/>
								</div>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-linear-to-r from-[#b2c5ff] to-[#dcb8ff] text-[#002c72] font-montserrat font-extrabold text-sm py-3.5 rounded-lg uppercase tracking-wider bloom-primary transition-all cursor-pointer flex items-center justify-center gap-2"
							>
								{isSubmitting
									? "DISPATCHING..."
									: "SEND RECOVERY CODE"}
							</button>
						</form>

						<div className="mt-5 text-center">
							<button
								onClick={()=>{
									handleReset();
									onBackToLogin();
								}}
								className="text-xs text-[#8d90a0] hover:text-[#b2c5ff] underline"
							>
								Return to Login
							</button>
						</div>
					</div>
				) : (
					<div className="text-center py-4">
						<div className="w-14 h-14 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] mx-auto mb-4">
							<CheckCircle2 className="w-8 h-8"/>
						</div>
						<h3 className="font-montserrat text-2xl font-bold text-[#dee1f7] mb-2">
							Recovery Link Sent
						</h3>
						<p className="font-inter text-sm text-[#c3c6d6] mb-6">
							We&apos;ve dispatched instructions to{" "}
							<strong className="text-white">{email}</strong>
							.Follow the link to calibrate your new password.
						</p>
						<button
							onClick={()=>{
								handleReset();
								onBackToLogin();
							}}
							className="w-full bg-[#0056d2] text-[#ccd8ff] font-montserrat font-bold text-sm py-3.5 rounded-lg uppercase tracking-wider hover:bg-[#004ab0] transition-colors flex items-center justify-center gap-2"
						>
							<span>Back to Login</span>
							<ArrowRight className="w-4 h-4"/>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
