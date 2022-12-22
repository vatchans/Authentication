const mongoose=require('mongoose')
const validator=require('validator')
const userSchema=new mongoose.Schema({
    Email:{type:String,required:true,validate:(value)=>validator.isEmail(value)},
    Bike_name:{type:String,required:true},
    Brand_name:{type:String,required:true},
    Password:{type:String,required:true},
    released_year:{type:String,required:true},
    Mobile:{type:String,required:true,validate:(value)=>validator.isNumeric(value)&& value.length===10},
    CreatedAt:{type:Date,default:Date.now()}

},{
    versionkey:false
})
const userModel=mongoose.model('Bike',userSchema)
module.exports={userModel}