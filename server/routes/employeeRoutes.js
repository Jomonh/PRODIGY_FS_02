const express=require('express');
const verifyToken=require('../auth/adminAuth');
const empModel=require('../models/employeeModel')
const empRoutes=express.Router();

empRoutes.post('/emp-add',verifyToken,async(req,res,next)=>{
    console.log('in emp-add');
    console.log(req.body);
    const {fname,lname,email,phone,doj,designation,salary,addr}=req.body;
    const date1=new Date(doj)
    if(fname===''||lname===''||email===''||phone===''||doj===''||designation===''||salary===''||addr==='')
        return res.send({status:203,msg:'some input fields are missing'});
    try{
        empModel.create({
            fname,lname,email,doj:date1,salary:parseInt(salary),phone,designation,address:addr
        })
        .then(async(data)=>{
            console.log(data);
            const employeeList=await empModel.find();
            console.log(employeeList);
            return res.send({status:200,msg:'Employee data added successfully',empData:employeeList})
        }).catch((err)=>{
            console.log(err);
            if(err.code===11000){
                const field=Object.keys(err.keyValue)[0]
                return res.send({status:300,msg:`The ${field} with value ${err.keyValue[field]} already exist  `})
            }
            return res.send({status:300,msg:'error occured in uploading data to db'})
        })
    }catch(err){
        console.log(err)
        return res.send({status:500,msg:'some issue in server'})
    }
})

empRoutes.post('/emp-edit',verifyToken,async(req,res,next)=>{
    console.log(req.body);
    const {fname,lname,email,phone,doj,designation,salary,addr,id}=req.body;
    const date1=new Date(doj)
    try{
        await empModel.findByIdAndUpdate(id,{
            fname,lname,email,phone,doj:date1,designation,salary:parseInt(salary),address:addr
        });
        return res.send({status:200,msg:'Employee data updated successfully'})
    }catch(err){
        console.log(err)
        return res.send({status:300,msg:'error occured in updating the db'})
    }
})

empRoutes.post('/emp-delete',verifyToken,async(req,res,next)=>{
    console.log(req.body)
    const {id}=req.body;
    try{
        await empModel.findByIdAndDelete(id);
        return res.send({status:200,msg:'Employee data deleted successfully'})
    }catch(err){
        console.log(err);
        return res.send({status:400,msg:'Some issue in deleting user data'})
    }
})

empRoutes.get('/emp-get',verifyToken,async(req,res,next)=>{
    const employees= await empModel.find({},{__v:0})//,fname:1,lname:1,email:1,doj:1,salary:1,phone:1,designation:1,address:1
    res.send({status:200,employees:employees})
})

module.exports=empRoutes;