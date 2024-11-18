import express from 'express';

import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlogs, updateBlog } from '../controller/blog.controller.js';
import upload from '../middleware/multerConfig.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();
router.post('/create', isAuthenticated, isAdmin("admin"), upload.single('blogImage'), createBlog);

router.delete('/delete/:id',upload.single('blogImage'),isAdmin("admin"),isAuthenticated,deleteBlog)
router.get('/allBlogs',upload.single('blogImage'),isAuthenticated,getAllBlogs)
router.get('/single/:id',isAuthenticated,getSingleBlogs)
router.get('/myBlog',isAuthenticated,isAdmin("admin"),getMyBlogs)
router.put('/update/:id',isAuthenticated,isAdmin("admin"),updateBlog)
export default router;
