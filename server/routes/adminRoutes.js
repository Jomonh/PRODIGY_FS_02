require('dotenv').config();
const express=require('express');
const jwt=require('jsonwebtoken');
const adminModel=require('../models/adminModel');
const {comparePassword,hashPassword} =require('../securePassword')
const verifyToken=require('../auth/adminAuth')

const adminRoutes=express.Router();

adminRoutes.post('/admin-login',async(req,res,next)=>{
    const {email,passwd}=req.body;
    console.log(req.body);
    if(email==='' || passwd==='')return res.send({status:400,msg:"Input fields are missing"})
    const admindata= await adminModel.findOne({email:email});
    console.log(admindata);
    if(admindata==null) return res.send({status:404,msg:'So such admin exist'});
    if(!comparePassword(passwd,admindata.passwd)) return res.send({status:300,msg:'Invalid credentials'});
    //create token

    const accessToken=jwt.sign({email:email},process.env.ACCESS_TOKEN, {expiresIn:'3m'});
    const refreshToken=jwt.sign({email:email},process.env.REFRESH_TOKEN, {expiresIn:'15m'});
    res.cookie('accessToken',accessToken,{
        httpOnly:true,secure:true,sameSite:'strict',maxAge:60000
    });
    res.cookie('refreshToken',refreshToken, {
        httpOnly:true,secure:true,sameSite:'strict',maxAge:300000
    });
    console.log('cookies is ');
    return res.send({status:200,msg:'success'})
})

adminRoutes.post('/admin-logout',verifyToken,(req,res,next)=>{
    delete req.email;
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken')
    return res.send({status:200,msg:'Logout success'});
})

adminRoutes.post('/admin-edit',verifyToken,async(req,res,next)=>{
    console.log('in /admin-edit');
    console.log(req.body);
    const {fname,lname,email,passwd}=req.body;
    if(fname===''||lname===''||email===''||passwd==='') return res.send({status:400,msg:'Some input fields are missing'})
    const passwd2=hashPassword(passwd)
    console.log(passwd2);
    try{
        await adminModel.findOneAndUpdate({email:email},{$set:{
            fname,lname,email,passwd:passwd2
        }});
        const adminDetails=await adminModel.findOne({email:email})
        return res.send({status:200,msg:'Profile info updated successfully!',data:adminDetails})         
    }catch(err){
        console.log(err);
        return res.send({status:300,msg:err})
    }
})

adminRoutes.get('/get-admindata',verifyToken,async(req,res,next)=>{
    console.log('entered get-admindata');
    const email=req.email
    delete req.email;
    console.log(email);
    const adminData=await adminModel.findOne({email:email});
    //if adminData is empty
    if(adminData===null) return res.send({status:404,msg:'No such user in database'})
    console.log('admin data is ');
    console.log(adminData);
    return res.send({status:200,msg:'authorized',data:adminData})
})

module.exports=adminRoutes;