const mongoose=require('mongoose');

const employeeSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    doj:{
        type:Date,
        required:true
    },
    salary:{
        type:Number,
        requied:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    designation:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    }
});

const employeeModel= mongoose.model('employee',employeeSchema,'employee');

module.exports=employeeModel;