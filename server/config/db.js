import mongoose from "mongoose";

async function connectDB (){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database is connected successfully.!!');
    }
    catch(error){
        console.log('Faild to connect database.!!')
    }
}
export default connectDB;