import { useContext } from 'react';
import { Link } from 'react-router-dom'
import userIcon from '../assets/images/user.svg';
import postApi from '../utils/postApi';
import UserFetch from '../utils/UserFetch';
import { EmployeeContext } from '../App';
export default function Profile() {
    const {adminData,navigate} =UserFetch();
    const {logout,setShowProfile}=useContext(EmployeeContext)

    function logoutAdmin(){
        postApi('/admin-logout','',(res)=>{
          console.log(res);
          alert('logout success')
          logout()
          navigate('/')
        },(res)=>{
          console.log(res);
          logout()
          console.log('logout faliure');
          navigate('/')
        })
      }

    return (
    <div className="ProfileCard">
        <div className=" d-flex flex-row align-items-center justify-content-between ">
            <h5 className="m-0 ">Profile</h5> 
            <button className="btn-close" onClick={()=>setShowProfile(false)} ></button> 
        </div>
        <hr />
        <div className=" p-2 d-flex flex-column align-items-center gap-2">
            <img src={userIcon} alt="" style={{
                height:'50px', width:'50px',borderRadius:'50%',
                border:'1px solid white',padding:'1px', backgroundColor:'white'
            }} />
            <div className="d-flex flex-row gap-2 mt-2 profileNames">
                <p className='m-0'> <b>{adminData.fname}</b>  </p>
                <p className='m-0'> <b>{adminData.lname}</b>  </p>
            </div>
            <p className='profileEmail'>{adminData.email}</p>
            <div className="btndiv w-100 d-flex flex-column gap-3">
                <Link to='/profile' className="btn btn-primary" onClick={()=>setShowProfile(false)}>Manage Account</Link>
                <button className="btn btn-danger" onClick={logoutAdmin}>SignOut</button>
            </div>
        </div>

    </div>
    )
}
