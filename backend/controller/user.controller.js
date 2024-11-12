import { User } from "../models/user.models.js"

export const register = async (req, res) => {
    //get data from request body
    const { email, name, password, phone, education, role } = req.body
    // ye check kro ki user ne saare fild fill kiye ki nhi
    if (!email || !name || !password || !phone || !education || !role) {
        return res.status(400).json({ msg: "Please fill all the fields" })
    }
    // check kro ki user email already exists or not
    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ msg: "User already exists" })
    }
    // new user ko database me save kro
    const newUser = new User({ email, name, password, phone, education, role });
    await newUser.save()
    if (newUser) {
        res.status(200).json({ msg: "User registered successfully" })
    }
}