import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

passport.use(
  new LocalStrategy({
    usernameField: "email",
  },
  async(email,password,done)=>{
    try{
        const user = await User.fineOne({email});
        if(!user) return done(null,false,{message:"User not found.!!"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return done(null,false,{message:"Invalid username and password.!"});

        return done(null,user);
    }
    catch(error){
        return done(error)
    }
  }
),
);


passport.serializeUser((user,done)=>(null,user.id));

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await User.findById(id);
        done(null,user)
    }
    catch(error){
        done(error)
    }
})