import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
    },
    category:{
        type:String,
    },
    image:{
        type:String,
    }
});

const Blogs = mongoose.model('Blogs',BlogSchema);

export default Blogs;