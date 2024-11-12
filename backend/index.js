import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js'
const app = express();



dotenv.config();
const port =process.env.PORT||3000;
const Mono_URI=process.env.MONGO_URI

//middleware
app.use(express.json());
//console.log(Mono_URI)
try {
    mongoose.connect(Mono_URI)
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
    process.exit(1);
}

app.get('/',(req,res)=>{
    res.send('Hello World!');
})

//defining routes

app.use('/api/users',userRoutes);
app.listen(port,(req,res)=>{
    console.log(`Server running on port ${port}`);
}
)