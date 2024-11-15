import { User } from "../models/user.models.js";
import cloudinary from 'cloudinary';
import bcrypt from 'bcryptjs';
import createTokenandsaveCookies from "../jwt/authToken.js";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const register = async (req, res) => {
    // Multer will add the uploaded file to req.file
    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ message: "User photo is required" });
    }

    const photo = req.file;
    console.log('Uploaded photo:', photo);

    // Allowed file formats
    const allowedFormat = ["image/jpeg", "image/png"];

    // Check if the file type is allowed
    if (!allowedFormat.includes(photo.mimetype)) {
        console.log('Unsupported file format:', photo.mimetype);
        return res.status(400).json({ message: "Only JPG and PNG formats are allowed" });
    }

    // Get data from request body
    const { email, name, password, phone, education, role } = req.body;
    console.log('Request body data:', { email, name, password, phone, education, role });

    // Check if all fields are provided
    if (!email || !name || !password || !phone || !education || !role) {
        console.log('Missing required fields');
        return res.status(400).json({ msg: "Please fill all the fields" });
    }

    // Check if the user already exists
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log('User already exists:', email);
            return res.status(400).json({ msg: "User already exists" });
        }

        // Upload the photo to Cloudinary
        console.log('Uploading photo to Cloudinary...');
        const cloudinaryResponse = await cloudinary.uploader.upload(photo.path); // Use photo.path when using multer
        console.log('Cloudinary upload response:', cloudinaryResponse);

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log('Error uploading photo to Cloudinary:', cloudinaryResponse.error);
            return res.status(500).json({ msg: "Error uploading photo to Cloudinary" });
        }

        // Hash the password
        const hashpassword = await bcrypt.hash(password, 10)


        // Create new user in the database
        const newUser = new User({
            email,
            name,
            password: hashpassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url
            }
        });

        await newUser.save();
        const token = await createTokenandsaveCookies(newUser._id, res)
        console.log('New user created:', newUser, token);

        return res.status(200).json({ msg: "User registered successfully", newUser, token: token });
    } catch (error) {
        console.error('Error during registration process:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            console.log('Missing required fields');
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password');
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        if (user.role !== role) {
            console.log('Invalid role');
            return res.status(403).json({ msg: "Invalid role" });
        }

        const token = await createTokenandsaveCookies(user._id, res);
        console.log('User logged in:', user, token);

        return res.status(200).json({
            msg: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token
        });

    } catch (error) {
        console.error('Error during login process:', error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
export const logout = async (req, res) => {
    try {
        const token = req.cookies?.jwt; // Safely access the 'jwt' cookie

        if (!token) {
            // If no JWT cookie is found, the user is already logged out
            return res.status(400).json({ msg: "User is already logged out" });
        }

        // Clear the JWT cookie
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        // Send success response
        res.status(200).json({ msg: "User logged out successfully" });
    } catch (error) {
        console.error("Error during logout process:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
