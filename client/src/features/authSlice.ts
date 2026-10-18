import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {UserProfile} from "../types/UserProfile";

interface AuthState {
	user:UserProfile|null;
	token:string|null;
}

const initialState:AuthState={
	user:null,
	token:null,
};

const authSlice=createSlice({
	name:"auth",
	initialState,
	reducers:{
		setSession:(state,action:PayloadAction<{token:string;user:UserProfile}>)=>{
			state.token=action.payload.token;
			state.user=action.payload.user;
		},
		setUser:(state,action:PayloadAction<UserProfile>)=>{
			state.user=action.payload;
		},
		clearAuthSession:(state)=>{
			state.token=null;
			state.user=null;
		},
	},
});

export const {clearAuthSession,setSession,setUser}=authSlice.actions;
export default authSlice.reducer;