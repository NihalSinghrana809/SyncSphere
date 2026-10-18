import React from "react";

export const Footer:React.FC=()=>{
	return (
		<footer className="bg-[#090e1c]/90 backdrop-blur-md border-t border-white/5 w-full mt-auto">
			<div className="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-8 lg:px-16 py-6 gap-4 max-w-360 mx-auto">
				<div className="font-montserrat text-lg sm:text-xl font-bold text-[#b2c5ff] tracking-tight">
					Syncsphere
				</div>
				<div className="font-inter text-xs sm:text-sm text-[#8d90a0] text-center">
					©{new Date().getFullYear()}Syncsphere All rights reserved.
				</div>
				<div className="flex items-center gap-6">
					<button className="font-inter text-xs sm:text-sm text-[#c3c6d6] hover:text-[#dcb8ff] transition-colors hover:underline cursor-pointer">
						Privacy Policy
					</button>
					<button className="font-inter text-xs sm:text-sm text-[#c3c6d6] hover:text-[#dcb8ff] transition-colors hover:underline cursor-pointer">
						Terms of Service
					</button>
				</div>
			</div>
		</footer>
	);
};
