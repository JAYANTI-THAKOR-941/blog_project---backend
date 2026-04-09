import Blogs from "../models/Blogs.js";

export const addBlog = async(req,res)=>{
    try{
        const {title,description,category,date} = req.body;
        const image = req.file;

        const newBlog = {
            title,
            description,
            category,
            date,
            image
        }
        await Blogs.create(newBlog);
        res.status(201).json({message:"Blog added successfully.",newBlog});
    }
    catch(error){
        console.log('Faild to add blog.!!',error);
    }
}