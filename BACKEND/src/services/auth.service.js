
import { findUserByEmail, createUser } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if (user) throw new ConflictError("User Already Exists");

    const newUSer = await createUser(name, email, password)
    const token = await signToken({ id: newUSer._id })
    return { token, user: newUSer }
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token,user}
}