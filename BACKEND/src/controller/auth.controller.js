import { cookieOptions } from "../config/config.js"
import { loginUser, registerUser } from "../services/auth.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body
    const { token, user } = await registerUser(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ message: "login sucessful" })
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    const { token, user } = await loginUser(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ message: "Login Success" })
})

// Returns the currently authenticated user based on the httpOnly JWT cookie.
// Used by the frontend on page load to restore session state.
export const me_user = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" })
    const { _id, name, email } = req.user
    res.status(200).json({ _id, name, email })
}