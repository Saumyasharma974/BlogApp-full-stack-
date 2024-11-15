import express from 'express';
import { login, logout, register } from '../controller/user.controller.js';
import upload from '../middleware/multerConfig.js';  // Import multer configuration

const router = express.Router();

// Register route, using multer's single file upload middleware
router.post('/register', upload.single('photo'), register); // 'photo' is the name of the input field
router.post('/login',login);
router.get('/logout',logout)
export default router;
