import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js'
import path from 'path';
import cookieParser from "cookie-parser";

import {connectDB} from "./lib/db.js"

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json({ limit: "5mb" }));
//req.body
app.use(cookieParser()); 

//payloading too large can be fixed by adding the limit
const __dirname= path.resolve();

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

//  make ready deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
    })
}


app.listen(PORT,()=>{
    console.log("Server is running at PORT "+ PORT);
      connectDB();
  
})