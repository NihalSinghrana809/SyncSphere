import mongoose, {Schema} from "mongoose";

export interface IProfile{
    userId: mongoose.Types.ObjectId;
    name: string;
    username: string;
    bio?: string;
    avatar?: string;
    location: string;
    dateOfBirth?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const profileSchema=new Schema<IProfile>({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    username:{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    location:{
        type: String,
        default: "",
        trim: true
    },
    bio:{
        type: String,
        maxlength: 250,
        default: ""
    },
    avatar:{
        type: String,
        default: ""
    },
    dateOfBirth: Date
},{
    timestamps: true
});

export default mongoose.model<IProfile>("Profile",profileSchema);