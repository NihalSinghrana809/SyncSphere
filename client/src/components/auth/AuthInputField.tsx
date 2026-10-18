import type {ChangeEvent, ReactNode} from "react";
import type {LucideIcon} from "lucide-react";

interface AuthInputFieldProps {
	id:string;
	label:string;
	value:string;
	placeholder:string;
	type?:"text"|"email"|"password";
	icon:LucideIcon;
	onChange:(event:ChangeEvent<HTMLInputElement>)=>void;
	trailing?:ReactNode;
	required?:boolean;
}

export const AuthInputField:React.FC<AuthInputFieldProps>=({
	id,
	label,
	value,
	placeholder,
	type="text",
	icon:Icon,
	onChange,
	trailing,
	required=true,
})=>{
	return (
		<div className="space-y-1.5">
			<label
				className="font-inter text-xs font-semibold text-[#b2c5ff] uppercase tracking-wider block"
				htmlFor={id}
			>
				{label}
			</label>

			<div className="relative flex items-center bg-[#25293a]/90 rounded-lg border border-white/5 focus-within:border-[#b2c5ff]">
				<Icon className="w-5 h-5 absolute left-3.5 text-[#8d90a0]"/>
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className="w-full bg-transparent border-none py-3 pl-11 pr-11 focus:ring-0 focus:outline-none text-[#dee1f7] placeholder:text-[#8d90a0]/60 font-inter text-sm"
				/>
				{trailing&&<div className="absolute right-3">{trailing}</div>}
			</div>
		</div>
	);
};
