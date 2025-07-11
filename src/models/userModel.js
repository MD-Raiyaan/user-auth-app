import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username "],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please provide an email "],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide an password"],
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifytoken:String,
    verifytokenexpiry:Date,
    forgotpasswordtoken:String,
    forgotpasswordtokenexpiry:Date
});

export const User= mongoose.models.user || mongoose.model('user',userSchema);

