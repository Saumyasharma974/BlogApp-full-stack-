import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js'

const createTokenandsaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_API_SECRET,{
        expiresIn:'7d',
    })

res.cookie("jwt",token,{
    httpOnly:true,//acces attack
    secure: false,

    sameSite:"strict"
    
})
await User.findByIdAndUpdate(userId,{token})
return token
}
export default createTokenandsaveCookies;