import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;
// Middleware setup
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    cookie:{
        httpOnly:true,
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        collectionName:'sessions',
        ttl: 14* 24 * 60 * 60
    })
}));

// intialize passport
app.use(passport.initialize());
app.use(passport.session());

// database connection
connectDB();

// import routes
import blogsRoutes from './routes/blogsRoutes.js';
import userRoutes from './routes/userRoutes.js'
import passport from 'passport';

app.use('/api/blogs',blogsRoutes);
app.use('/api/user',userRoutes);

//server routes
app.get('/',(req,res)=>{
    res.end('BharatBlog Server is Running.!!');
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})