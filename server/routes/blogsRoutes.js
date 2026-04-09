import express from 'express';
import { addBlog } from '../controllers/blogController.js';
import upload from '../middlewares/upload.js';
import { isAuthenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create',isAuthenticate,upload.single('image'),addBlog);

export default router;