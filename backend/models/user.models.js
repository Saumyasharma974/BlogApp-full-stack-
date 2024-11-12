import mongoose from "mongoose";
import validator from "validator";// used for email validation
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"]

    },
    phone:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999,
        unique:true
    },
    // photo:{
    //     type:String,
    //     required:true,
    // },
    education:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const User=mongoose.model('User',userSchema)