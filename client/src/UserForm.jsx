//import {useState} from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Navbar from './components/Navbar';
import UserFetch from './utils/UserFetch';
import { useContext } from 'react';
import { EmployeeContext } from './App';
import postApi from './utils/postApi';
import addIcon from './assets/images/add.svg';
import editIcon from './assets/images/edit.svg';
import Profile from './components/Profile';
export default function UserForm() {
    const {navigate,getData}=UserFetch();
    const designArray=['Developer','Designer','Tester','Analyst']
    const {employee,setEmployee,showProfile,setShowProfile}=useContext(EmployeeContext);
    const isNewUser=Object.keys(employee).length===0;//?true:false;
    console.log(employee);
    console.log(Object.keys(employee).length);

    console.log('isNewUser'+isNewUser);
   
    function editUser(data){
      console.log('in edit user');
      getData();
      data.id=employee._id
      console.log(data);   
      postApi('/emp-edit',data,(res)=>{
        reset();
        setEmployee({})
        console.log('user added successfully');
        console.log(res);
        navigate('/home')
      },(res)=>{
        alert(res.msg)
        console.log(res);
      })   
    }

    function addUser(data){
      console.log('in addUser');
      getData();
      console.log(data);

      postApi('/emp-add',data,(res)=>{
        reset();
        console.log('user added successfully');
        console.log(res);
        navigate('/home')
      },(res)=>{
        alert(res.msg)
        console.log(res);
      })
    }
    let pattern=/^(\+?\d{2,3}\s?)?\d{10}$/;

    const employeeSchema= yup.object().shape({
      fname : yup.string().min(4,'Minimum characters should be 4').max(15,'First name should not exceed 15 characters').required('First name is required'),
      lname : yup.string().max(15,'Last name should not exceed 15 characters').required('Last name is required'),
      email : yup.string().email('Invalid email').required('Email is required'),
      phone : yup.string().matches(pattern,'invalid number').required('Phone no. is required').min(10,'Min length is 10'),
      doj : yup.string().required('Date of Joining is required'),
      designation:yup.string().required('Choose one of the job designations'),
      salary : yup.string().matches(/^\d{5,7}$/,'Invalid, salary must be 5-7 digits number').required('Salary is required'),
      addr : yup.string().required('Address is required')
    })

    const {register,reset,handleSubmit,formState:{errors}}=useForm({
      resolver:yupResolver(employeeSchema)
    })
    function shiftNew(){
      setEmployee({})
      reset()
    }

  return (
    <div className='bg-primary' style={{minHeight:'100vh'}}>
      <Navbar/>
        <div className="bg-light border border d-flex flex-column align-items-center gap-1" onClick={()=>setShowProfile(false)}>
        <form className="row  m-0 p-3 border-primary d-flex flex-column  gap-2 w-100" style={{
            maxWidth:'450px',borderRadius:'13px' }} onSubmit={ handleSubmit( isNewUser? addUser: editUser)}  >

            <h3 className='my-3 d-flex flex-row align-items-center justify-content-between gap-3'> 
              { isNewUser? 'Add Employee' : 
                <>
                  Edit Employee 
                  <button className="btn btn-outline-primary" onClick={(shiftNew)}>Add new</button>
                </>
              }
            </h3>
            <label htmlFor="#fname" className='label-bold'>FirstName</label>
            <input className='form-control mb-1' type="text" name="fname" {...register('fname')} defaultValue={employee.fname??''} id="fname" placeholder='John'/>
            <p className='errors'>{errors.fname?.message}</p>
            <label htmlFor="#lname" className='label-bold'>LastName</label>
            <input className='form-control mb-1' type="text" name="lname" {...register('lname')} defaultValue={employee.lname??''} id="lname" placeholder='Doe' />
            <p className='errors'>{errors.lname?.message}</p>
            
            <label htmlFor="#email" className='label-bold'>Email:</label>
            <input className='form-control mb-1' type="email" name="email" id="email" {...register('email')}  defaultValue={employee.email??''} placeholder='eg. john454@gmail.com' />
            <p className='errors'>{errors.email?.message}</p>
            <label htmlFor="phone" className='label-bold'>Phone Number</label>
            <input className='form-control mb-1' type="tel" name="phone" id="phone" {...register('phone')} defaultValue={employee.phone??''} placeholder='Enter contact no.' />
            <p className='errors'>{errors.phone?.message}</p>
            <label htmlFor="doj" className='label-bold'>Date of Joining</label>
            <input className='form-control mb-1' type="date" name="doj" id="doj" {...register('doj')} defaultValue={ isNewUser? new Date(Date.now()).toISOString().split('T')[0] : new Date(employee.doj).toISOString().split('T')[0] } />
            <p className='errors'>{errors.doj?.message}</p>
            
            <label htmlFor="designation" className='label-bold'>Designation</label>
            <div className="d-flex flex-row align-items-center justify-content-between overflow-breakWord">
              {
                designArray.map((design,index)=>{
                 
                 return ( <>
                    <input className='radio p-2 m-1' type="radio" name={design} defaultChecked={design===employee.designation? true:false} {...register('designation')} id="" value={design} key={index} /> {design}
                </> )
                })
              }
              </div>
              <p className='errors'>{errors.designation?.message}</p>
            <label htmlFor="salary" className='label-bold'>Monthly Salary</label>
            <input className='form-control mb-1' type="number" name="salary" id="salary" {...register('salary')} defaultValue={employee.salary??''} placeholder='enter the monthly salary'  />
            <p className='errors'>{errors.salary?.message}</p>
            <label htmlFor="#addr" className='label-bold'>Contact Address</label>
            <textarea className='form-control mb-1' name="addr" id="addr" {...register('addr')} defaultValue={employee.address??''} placeholder='Enter employee addrress' ></textarea>
            <p className='errors'>{errors.addr?.message}</p>

            <button className='sbtn btn btn-success m-0 my-2 ' type="submit"  >
                <p className='m-0 py-2 d-flex align-items-center justify-content-center gap-3'>{
                isNewUser? 
                'Add Employee' :
                'Edit Employee'
              } <img src={isNewUser?addIcon:editIcon} width={20} height={20} alt="" /> </p>
            </button>            
        </form>
        </div>
      {showProfile?
        <Profile/> :''
      }

    </div>
  )
}
