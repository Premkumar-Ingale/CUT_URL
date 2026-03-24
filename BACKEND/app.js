import express from "express"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import auth_routes from "./src/routes/auth.route.js"
import { errorHandler } from "./src/utils/errorHandler.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { attachUser } from "./src/utils/attachUser.js"
dotenv.config("./.env")
const app=express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/auth",auth_routes)

// INLINE DASHBOARD ROUTES TO BYPASS ONEDRIVE DIR CACHE
app.get("/api/create/my-urls", async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        const { fetchUserUrls } = await import("./src/services/short_url.service.js");
        const urls = await fetchUserUrls(req.user._id);
        res.status(200).json(urls);
    } catch (error) {
        next(error);
    }
});

app.get("/api/create/no", (req, res) => {
    const reasons = [
        "This feels like something Future Me would yell at Present Me for agreeing to.",
        "I've carefully considered your request and decided to decline out of pure spite.",
        "The server says no, and frankly, I agree.",
        "I’m currently out of office, emotionally.",
        "That sounds like a 'you' problem, not a 'me' problem.",
        "Error 404: Motivation to load these logs not found.",
        "My code is compiling, I don't have time for this.",
        "Let's revisit this never.",
        "As per my previous email to the void: No."
    ];
    res.status(200).json({ reason: reasons[Math.floor(Math.random() * reasons.length)] });
});

app.use("/api/create",short_url)
app.get("/:id", redirectFromShortUrl )
app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("app is running on http://localhost:3000")
}) // server start