const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    device:{
        type:String
    },
    browser:{
        type:String
    }
})



const signupModel = mongoose.model("user",userSchema)

module.exports = signupModel