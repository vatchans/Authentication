const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const SALT=10
const secret="ytdytf@$#^%*GYUFTDERSAW79"
const hashPassword=async(password)=>{
   let salt=await bcrypt.genSalt(SALT)
   let hash=await bcrypt.hash(password,salt)
   return hash
}
const validate=async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
}
const Createtoken=async(payload)=>{
    let token=await jwt.sign(payload,secret,{expiresIn:'1h'})
    return token
}
const Decodetoken=async(token)=>{
    let decode=await jwt.decode(token)
    console.log(decode)
}
module.exports={hashPassword,validate,Createtoken,Decodetoken}