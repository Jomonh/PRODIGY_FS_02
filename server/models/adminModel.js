const mongoose=require('mongoose');

const adminSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    passwd:{
        type:String,
        required:true,
    }
});

const adminModel= mongoose.model('admin',adminSchema,'admin');
module.exports=adminModel;