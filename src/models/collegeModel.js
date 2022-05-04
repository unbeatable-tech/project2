const mongoose=require('mongoose')
const collegeSchema=new mongoose.Schema({
    name:{type:String,required:"name is required",unique:true,trim:true},
    fullName:{type:String,required:"full name is required",trim:true},
    logoLink:{type:String,required:true},
    isDeleted:{type:Boolean,default:false},







},{timestamps:true});



module.exports=mongoose.model("College",collegeSchema)