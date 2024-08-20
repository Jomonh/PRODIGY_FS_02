import {useCallback, useContext, useEffect,useState} from 'react'
import Navbar from './components/Navbar'
import UserFetch from './utils/UserFetch';
import { EmployeeContext } from './App';
import postApi from './utils/postApi';
import Profile from './components/Profile';
export default function Home() {
  const {axios,navigate} =UserFetch();

  const [empData,setEmpData]= useState([]);
  const {employee,setEmployee,logout,showProfile,setShowProfile}=useContext(EmployeeContext)
  const getEmpdata= useCallback( ()=> {
    axios.get('http://localhost:3000/emp-get')
    .then(res=>res.data)
    .then(data=>{
      if(data.status===200){
        console.log('success');
        setEmpData(data.employees);
        console.log(data.employees);
      }else if(data.status===405){
        localStorage.removeItem('isLoggedIn');
        logout()
      }
      else{
        console.log('some issues in getting employee data');
        console.log(data);
      }
    }).catch((err)=>{
      console.log('some issues occured');
      console.log(err);
    })
  },[])
  
  useEffect(()=>{
    if(empData.length===0){
      getEmpdata();
    }else{
      console.log('employee data is present');
    }
  },[empData])
  //console.log(adminData);

  function editInfo(id){
    console.log(id);
    const emp=empData.filter((emps)=> emps._id===id)[0]
    console.log(emp);
    console.log(emp._id);
    console.log(typeof emp);
    setEmployee(emp)
    console.log(employee);
    navigate('/addUser')
  }
  function deleteInfo(id){
    getEmpdata()
    console.log('in delete info');
    console.log(id);
    postApi('/emp-delete',{id:id},(res)=>{
      getEmpdata();
      alert(res.msg)
    },(res)=>{
      console.log('some issues in deleting employee');
      console.log(res.msg);
      alert(res.msg)
    })
  }

  return (
    <div className=''  style={{minHeight:'100vh'}}>
      <Navbar/>
      <div className="d-flex flex-column p-3 " onClick={()=>setShowProfile(false)} >
        <h3>Admin DashBoard</h3>
        <br />

        <h4>Employee List</h4>

        <div className="empdiv empdiv table-responsive mt-3" style={{maxWidth:'100vw',maxHeight:'60vh'}}>
        { empData.length!==0 ? 
          (
          <table className="table  table-hover  table-info">
            <thead className='table-dark'>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Date Of Joining</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {empData.map((emp,index)=>{
                let date=new Date(emp.doj);
                let dateString=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                return (<tr key={index}>
                  <td>{index+1}</td>
                  <td>{emp.fname+' '+emp.lname}</td>
                  <td>{emp.email}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.salary}</td>
                  <td>{dateString}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.address}</td>
                  <td className='' style={{height:'100%',display:'grid', gridTemplateRows:'1fr', gap:'20px'
                  }}>
                    <button className=" btn btn-outline-primary" onClick={()=>editInfo(emp._id)}>Edit</button>
                    <button className=" btn btn-outline-danger" onClick={()=>deleteInfo(emp._id)}>Delete</button>
                  </td>
                </tr>)
              })
  
              }
            </tbody>
          </table>
          ) : <p>No employee records</p>
        }
        </div>
      </div>
      {showProfile?
        <Profile/> :''
      }
    </div>
  )
}
