import { createShortUrlWithoutUser ,createShortUrlWithUser, fetchUserUrls} from "../services/short_url.service.js"
import { getShortUrl } from "../dao/short_url.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl= wrapAsync(async (req,res)=>{

        const data=req.body
        let shortUrl
        if(req.user){
            shortUrl=await createShortUrlWithUser(data.url,req.user._id,data.slug)
        }else{

            shortUrl=await createShortUrlWithoutUser(data.url)
        }
        res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})

export const redirectFromShortUrl= wrapAsync(async (req,res)=>{
    const {id}=req.params
    const url=await getShortUrl(id)
    res.redirect(url.full_url)
})

export const createCustomShortUrl = wrapAsync(async(req, res)=>{
    const{url,slug}=req.body
    const shortUrl=await createShortUrlWithoutUser(url,slug)
    res.status(200).json({shortUrl:process.env.APP_URL+shortUrl})
})

export const getUserUrlsController = wrapAsync(async(req, res)=>{
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const urls = await fetchUserUrls(req.user._id);
    res.status(200).json(urls);
})

export const getNoController = (req, res) => {
    const reasons = [
        "This feels like something Future Me would yell at Present Me for agreeing to.",
        "I've carefully considered your request and decided to decline out of pure spite.",
        "The server says no, and frankly, I agree.",
        "I’m currently out of office, emotionally.",
        "That sounds like a 'you' problem, not a 'me' problem.",
        "Error 404: Motivation to load these logs not found.",
        "My code is compiling, I don't have time for this.",
        "Let's revisit this never.",
        "As per my previous email to the void: No.",
        "I would, but my 'give a damn' is severely broken right now."
    ];
    res.status(200).json({ reason: reasons[Math.floor(Math.random() * reasons.length)] });
}