import crypto from "crypto";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default : function (){
            return getGravatarUrl(this.email)
        }
    }

})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return this.password === enteredPassword;
}

function getGravatarUrl(email) {
    const hash= crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=mp`
}

const user =mongoose.model("User", userSchema)

export default user;