var express = require('express');
var router = express.Router();
const mongoose=require('mongoose')
const validator=require('validator')
const{mongodb,dbname,dburl}=require('../public/dbconfig/DB')
const{userModel}=require('../public/dbconfig/Schema/userSchema')
const{hashPassword,validate,Createtoken,Decodetoken}=require('../public/dbconfig/bcrypt')
mongoose.connect(dburl)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/Signup',async(req,res)=>{
  try{
    let user=await userModel.findOne({Email:req.body.Email})
    if(!user){
      req.body.Password = await hashPassword(req.body.Password) 
      let user=await userModel.create(req.body)
      res.status(201).send(`User Registration Sucessfull!!`)
    }
    else{
      res.status(400).send(`User with ${req.body.Email} is Already exists`)
    }
  }
  catch(error){
      res.status(500).send({message:`Internal server error ${error}`})
  }
})
router.get('/All',async(req,res)=>{
  try{
    let user=await userModel.find()
      res.status(201).send({data:user})
  }
  catch(error){
      res.status(500).send({message:"Internal server error",error})
  }
})

router.post('/Signin',async(req,res)=>{
  try{
    let user=await userModel.findOne({Email:req.body.Email})
    console.log(user)
    if(user){
      if(await validate(req.body.Password,user.Password)){
        let token=await Createtoken({
          Email:user.Email,
          Bike_name:user.Bike_name,
          Brand_name:user.Brand_name,
          Password:user.Password,
          released_year:user.released_year,
          Mobile:user.Mobile,
        })
        Decodetoken(token)
        res.status(200).send("Login sucessfull"+token)
      }
    }
    else{

      res.status(400).send(`Invalid Credentials`)
    }
  }
  catch(error){
      res.status(500).send({message:"Internal server error",error})
  }
})
module.exports = router;
