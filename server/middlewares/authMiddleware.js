export const isAuthenticate = (req,res,next)=>{
    if(req.isAuthenticate()){
        return next();
    }
    res.status(401).json({message:"Login is required.!!Anauthoried Access.!!"});
}