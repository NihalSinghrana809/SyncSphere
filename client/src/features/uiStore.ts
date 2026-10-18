import {create} from "zustand";

interface UIState {
	forgotPasswordOpen:boolean;
	toastMessage:string|null;
	setForgotPasswordOpen:(isOpen:boolean)=>void;
	showToast:(message:string)=>void;
}

export const useUIStore=create<UIState>((set)=>({
	forgotPasswordOpen:false,
	toastMessage:null,
	setForgotPasswordOpen:(isOpen)=>set({forgotPasswordOpen:isOpen}),
	showToast:(message)=>{
		set({toastMessage:message});
		window.setTimeout(()=>set({toastMessage:null}),3500);
	},
}));