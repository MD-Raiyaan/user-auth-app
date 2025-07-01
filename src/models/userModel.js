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
    verifytoken:String,
    verifytokenexpiry:String,
    forgotpasswordtoken:String,
    forgotpasswordtokenexpiry:String
});

export const User= mongoose.models.user || mongoose.model('user',userSchema);

