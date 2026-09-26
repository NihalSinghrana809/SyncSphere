import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import type { HydratedDocument, Model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

type UserDocument = HydratedDocument<IUser,IUserMethods>;

const userSchema=new Schema(
  {
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      match:[/^\S+@\S+\.\S+$/,"Invalid email format"],
    },
    password:{
      type:String,
      required:true,
      minlength:8,
      select:false,
    },
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      minlength:3,
      maxlength:30,
    },
  },
  {timestamps:true}
);

userSchema.methods.comparePassword=async function(
  candidate:string
):Promise<boolean>{
  return bcrypt.compare(candidate,this.password);
};

userSchema.set("toJSON",{
  transform:(_doc,ret:any)=>{
    delete ret.password;
    return ret;
  },
});

export type { UserDocument };

export const User=model<IUser,Model<IUser,{},IUserMethods>>(
  "User",
  userSchema
);