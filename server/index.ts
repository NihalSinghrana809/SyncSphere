import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";

dotenv.config();

const app=express();
const PORT=Number(process.env.PORT)||3000;

app.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS",
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if(req.method==="OPTIONS"){
		return res.sendStatus(204);
	}

	return next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (_req, res)=>{
	res.json({status:"ok"});
});

app.use("/api/auth", authRoutes);

connectDB();

app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`);
});
