import { useState,useContext } from 'react';
import userIcon2 from './assets/images/user.svg'
import editIcon from './assets/images/edit.svg'
import Navbar from './components/Navbar';
import UserFetch from './utils/UserFetch';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import postApi from './utils/postApi';
import { EmployeeContext } from './App';
import Profile from './components/Profile';
export default function UserProfile() {
    const {showProfile,setShowProfile} =useContext(EmployeeContext)
    const {adminData,setAdminData} =UserFetch();
    const [showEdit,setShowEdit]=useState(false);
    
    const adminSchema=yup.object().shape({
        fname:yup.string().min(4,'Minimum characters should be 4').max(15,'First name should not exceed 15 characters').required('First Name is required'),
        lname:yup.string().max(15,'Last name should not exceed 15 characters').required('Last name is required'),
        passwd:yup.string().required('Password field is required').min(8).max(24)
    })

    const {handleSubmit,reset,register,formState:{errors}}=useForm({
        resolver:yupResolver(adminSchema)
    })

    function adminEdit(data){
        event.preventDefault()
        console.log('in adminEdit');
        data.email=adminData.email
        console.log(data);

        postApi('/admin-edit',data,(res)=>{
            console.log(res);
            reset();
            setShowEdit(false)
            setAdminData(res.data)
            alert('Admin profile info updated successfully')
        },(res)=>{
            reset();
            console.log(res.msg);
            alert('some issues in updating profile info')
        })
    }

    return (
        <div className='bg-primary' style={{minHeight:'100vh'}}>
        <Navbar/>
        <div onClick={()=>setShowProfile(false)} className="userAccount  p-3 px-1 d-flex flex-column align-items-center justify-content-center gap-4 bg-primary " 
        style={{
            minWidth:'280px', boxSizing:'border-box',
            position:'relative',minHeight:'420px'
        }}>
        <div className="userContain  p-3  my-1 d-flex flex-column align-items-center " 
        style={{
            borderRadius:'13px', boxSizing:'border-box',
            backgroundColor:'aliceblue',maxWidth:'400px'
        }}>
            <h3>Admin Profile</h3>
            <div className="userInfo d-flex flex-column gap-5 justify-content-center align-items-center mt-4 py-3 " style={{width:'100%'}}>
                <div className="pimgDiv d-flex justify-content-center flex-column align-items-center">
                    <img src={userIcon2} alt="userImg" width='80px' height='80px' style={{
                        borderRadius:'50%', border:'0', backgroundColor:'white' }} />
                </div>
                <div className="userDetails row" style={{padding: '3%',fontSize: '18px'}}>
                    <div className="col-4 pe-0 ps-0 ps-md-2" >
                        <p className='userfield'>Firstname: </p>
                        <p className='userfield'>Lastname: </p>
                        <p className='userfield' >Email:</p>
                    </div>        
                    <div className="col-8 ps-1 pe-0 pe-md-2">
                        <p> <b> {adminData.fname} </b> </p>
                        <p> <b> {adminData.lname} </b> </p>
                        <p> <b style={{overflowWrap:'anywhere'}}> {adminData.email} </b> </p>
                    </div>
                    <div className="btndiv w-100  d-flex flex-row gap-3 mt-2 align-items-center ">
                        <button className="btn-primary btn" onClick={()=>setShowEdit(true)}>Edit profile</button>
                    </div>
                </div>
            </div>

        </div>
        {
            showEdit ?
            <div className="bg-info d-flex flex-column  align-items-center py-4" style={{width:'100%',position:'absolute',borderRadius:'13px', boxSizing:'border-box',
                backgroundColor:'aliceblue',maxWidth:'400px',top:'4%'
                }}>
                <h3 className='d-flex justify-content-around align-items-center w-100 py-2 mb-2'>Edit profile 
                <span onClick={()=>setShowEdit(false)}>X</span>
                </h3>
                <form className="userForm py-2 d-flex flex-column gap-2" onSubmit={handleSubmit(adminEdit)} style={{width:'85%'}} >
                    <label htmlFor="#fname" className='label-bold'>First Name:</label>
                    <input className='form-control mb-1' type="text" name="fname" id="fname"  {...register('fname')} defaultValue={adminData.fname} placeholder='eg. john'  />
                    <p>{errors.fname?.message}</p>
                    <label htmlFor="#lname" className='label-bold'>Last Name:</label>
                    <input className='form-control mb-1' type="text" name="lname" id="lname"  {...register('lname')} defaultValue={adminData.lname}  placeholder='eg. doe'  />
                    <p>{errors.lname?.message}</p>
                    <label htmlFor="#email" className='label-bold'>Email:</label>
                    <input className='form-control mb-1' type="email" name="email" id="email" disabled={true} value={adminData.email}   placeholder='eg. john454@gmail.com' />
                    <label htmlFor="#passwd" className='label-bold'>Password:</label>
                    <input className='form-control mb-1' type="password" name="passwd" id="passwd" minLength={8} maxLength={20} {...register('passwd')} placeholder='eg. password123'  />
                    <p>{errors.passwd?.message}</p>
                    <button className='sbtn btn btn-success m-0 my-2 ' type="submit"  >
                        <p className='m-0 py-1 d-flex align-items-center justify-content-center gap-3 w-100'>Edit 
                            <img src={editIcon} height='20px' width='20px' alt="" />
                        </p>
                    </button>            
                </form>
            </div>
            :''
        }
        </div>
        {showProfile?
            <Profile/>:''
        }
    </div>
    )
}
