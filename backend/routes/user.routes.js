import express from 'express';
import { getAdmins, getMyProfile, login, logout, register } from '../controller/user.controller.js';
import upload from '../middleware/multerConfig.js';  // Import multer configuration
import { isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

// Register route, using multer's single file upload middleware
router.post('/register', upload.single('photo'), register); // 'photo' is the name of the input field
router.post('/login',login);
router.get('/logout',isAuthenticated,logout)
router.get("/my-profile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
export default router;
