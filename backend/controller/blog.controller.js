import mongoose, { mongo } from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
export const createBlog = async (req, res) => {
  try {
    // Log the uploaded file to debug
    console.log(req.file);  // req.file will contain the uploaded file's details

    // Ensure file is provided
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    // Use req.file directly (no need for destructuring)
    const blogImage = req.file;  // req.file will directly contain the file details
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

    // Validate the mimetype of the uploaded image
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpeg, png, and webp are allowed",
      });
    }

    const { title, category, about } = req.body;
    // Validate the other form fields
    if (!title || !category || !about) {
      return res.status(400).json({ message: "Title, category, & about are required fields" });
    }

    // Admin-related details from the request (assuming user is authenticated)
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.path);  // Use blogImage.path
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    // Prepare blog data for the database
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    // Create new blog entry in the database
    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};


export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  res.status(200).json(myBlogs);
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json(updatedBlog);
};