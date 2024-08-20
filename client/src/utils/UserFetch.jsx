import {useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { EmployeeContext } from '../App';
export default function UserFetch() {
    const navigate=useNavigate();
    const [adminData,setAdminData]=useState({})
    const {logout,login}=useContext(EmployeeContext)
    function getData(){
        console.log('isLoggediN from userFetch');
        console.log(localStorage.getItem('isLoggedIn'));
        if(Object.keys(adminData).length===0 && localStorage.getItem('isLoggedIn')==='true'){
            axios.get('http://localhost:3000/get-admindata')
            .then(res=>res.data)
            .then((data)=>{
                console.log(data);
                if(data.status===200){
                    console.log('success');
                    login()
                    setAdminData(data.data)
                }else{
                    logout()
                    alert('Session expired!')
                    console.log('failure');
                    navigate('/')
                }
            }).catch((err)=>{
                console.log('somew error occurd');
                logout()
                console.log(err);
                navigate('/')
          })  
        }else{
            console.log('adminData  is present');
            console.log(adminData);
        }
    }

    useEffect(()=>{
        console.log('executed from the useEffect');
        getData();
      },[adminData])
    

    return {adminData,setAdminData,axios,navigate,getData};
}
