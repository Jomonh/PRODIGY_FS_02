import {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import signin from '../src/assets/images/signin.svg'
import Navbar from './components/Navbar';
import postApi from './utils/postApi';
import { EmployeeContext } from './App';
export const DefaultFn=(data)=>{
    const {logout}=useContext(EmployeeContext)
    const navigate=useNavigate()
    alert('Session expired')
    logout()
    console.log(data.msg);
    navigate('/')
}
export default function LoginPage() {
    const {login}=useContext(EmployeeContext)
    const navigate=useNavigate();
    const [admin,setAdmin]=useState({email:'',passwd:''});

    function loginFn(event){
        event.preventDefault()
        console.log(admin);
        postApi('/admin-login',admin,(res)=>{
            console.log(res);
            login();
            console.log('success');
            navigate('/home');
        },(res)=>{
            console.log(res);
            console.log('invalid credentials');
        })
    }

    function handleChange(event){
        const {name,value}=event.target;
        console.log(name);
        console.log(value);
        setAdmin((prev)=> ( { ...prev,[name]:value } ) );
    }
  return (
    <div className=" border register col-10 col-sm-10 col-lg-5 col-md-8 w-100" style={{minHeight:'100vh'}}>
    <Navbar/>
    <main className='d-flex flex-column align-items-center justify-content-center p-3 ' style={{minHeight:'80vh'}} >
        <form   className="row m-0 p-3 border d-flex flex-column gap-2 w-100" style={{
            maxWidth:'450px',borderRadius:'13px' }} onSubmit={loginFn}  >
            <h3 className='my-3'>Admin Login</h3>
            
            <label htmlFor="#email" className='label-bold'>Email:</label>
            <input className='form-control mb-1' type="email" name="email" id="email"  onChange={handleChange}  placeholder='eg. john454@gmail.com' />
            <label htmlFor="#passwd" className='label-bold'>Password:</label>
            <input className='form-control mb-1' type="password" name="passwd" id="passwd" minLength={8} maxLength={20} onChange={handleChange} placeholder='eg. password123' />
            <button className='sbtn btn btn-success m-0 my-2 ' type="submit"  >
                <p className='m-0 py-2 d-flex align-items-center justify-content-center gap-3'>Login Account
                    <img src={signin} height='20px' width='20px' alt="" />
                </p>
            </button>            
        </form>
    </main>
</div>
  )
}
