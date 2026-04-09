import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import passport from "../config/passport.js";

export const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email});
        if(user){
            res.status(401).json({message:"User is already exits.!!"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = {
            name,
            email,
            password:hashPassword
        }
        await User.create(newUser);
        res.status(201).json({message:"User register successfully.!!"});
    }
    catch(error){
        res.status(501).json({message:"Server error.!",error})
    }
}

export const login = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return next(err);

        if(!user){
            return res.status(401).json({message:"Login failed.!!"});
        }

        req.logIn(user,(err)=>{
            if(err) return next(err);

            return res.status(201).json({message:"Login Successfully.",user:{id:user.id,email:user.email}})
        })
        (req,res,next);
    })
}