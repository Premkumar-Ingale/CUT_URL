import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl, getUserUrls } from "../dao/short_url.js"
export const createShortUrlWithoutUser=async (url) =>{
    const shortUrl= generateNanoId(8)
    if(!shortUrl) throw new Error("Short Url not Generated")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser=async (url,userId, slug=null) =>{
    const shortUrl= slug ? slug : generateNanoId(8)
    const exists = await getCustomShortUrl(slug)
    if(exists) throw new Error("This CustomUrl Alredy Exists")
    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}

export const fetchUserUrls = async (userId) => {
    return await getUserUrls(userId);
}