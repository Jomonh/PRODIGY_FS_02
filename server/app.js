const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser')
//const adminModel=require('./models/adminModel')
mongoose.connect('mongodb://127.0.0.1:27017/project2')

const app=express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({
    methods:['POST','GET'],
    credentials:true,
    origin:'http://localhost:5173'
}))

app.use('/',require('./routes/adminRoutes'))
app.use('/',require('./routes/employeeRoutes'))

app.listen(3000,()=>{
    console.log('the app is running on port 3000');
})