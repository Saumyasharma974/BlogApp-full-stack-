import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url'; // Import fileURLToPath for resolving __dirname

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
});

// Use fileURLToPath to get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Serve static files (uploads directory)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Root Route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define Routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
