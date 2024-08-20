import { Link } from 'react-router-dom';
import userIcon from '../assets/images/user.svg'
import { useContext,useState,useEffect } from 'react'
import { EmployeeContext } from '../App'
export default function Navbar() {
  const {isLoggedIn,showProfile,setShowProfile}=useContext(EmployeeContext)
  const [navTitle,setNavTitle]=useState('Employee Management System');
  const handleResize=()=>{
    if(window.innerWidth<570){
      setNavTitle('EMS')
    }else{
      setNavTitle('Employee Management System')
    }
  }
  useEffect(()=>{
    handleResize();
    window.addEventListener('resize',handleResize);

    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  },[])

  return (
    <nav  >
      <div className="navDiv d-flex flex-row align-items-center gap-3 justify-content-around p-2 bg-light" style={{minHeight:'12vh'}}>
          <h3 className='m-0'>{navTitle}</h3>
          <div className="navGrp d-flex flex-row align-items-center gap-3">
            {isLoggedIn?
              <>
                <div className="navElem"><Link className='link' to="/home">Home</Link> </div>
                <div className="navElem"><Link className='link' to="/addUser">Add-User</Link> </div>              
                <img  src={userIcon} height='40px' width='40px' alt="" onClick={()=>setShowProfile(!showProfile)} style={{
                  borderRadius:'50%',
                  border:'1px solid black',
                  padding:'2px'
                }} />
              </>:''
            }
          </div>
      </div>
    </nav>
  )
}
