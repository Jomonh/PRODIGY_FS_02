import './assets/css/App.css';
import './assets/css/bootstrap.min.css'
import LoginPage from './LoginPage';
import Home from './Home';
import UserForm from './UserForm';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import UserProfile from './UserProfile';
import { createContext,useEffect,useState} from 'react';

export  const EmployeeContext=createContext();
function App(){
  const [employee,setEmployee]=useState({});
  const [showProfile,setShowProfile]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(
    ()=>localStorage.getItem('isLoggedIn')==='true'
  )
  console.log('isLoggedIn');
  console.log(localStorage.getItem('isLoggedIn'));
  function login(){
    setIsLoggedIn(true)
  }
  function logout(){
    setIsLoggedIn(false)
    console.log('logout executed');
  }
  useEffect(()=>{
    console.log('isLoggedIn useEffect executed');
    if(isLoggedIn){
      localStorage.setItem('isLoggedIn','true')
    }else{
      localStorage.removeItem('isLoggedIn')
    }
  },[isLoggedIn])
  return (
  <EmployeeContext.Provider value={{employee,setEmployee,login,logout,isLoggedIn,showProfile,setShowProfile}}>
    <BrowserRouter>
        <Routes>
          {
            isLoggedIn?
            <>
              <Route path='/home' element={<Home/>} />
              <Route path='/addUser' element={<UserForm/>} />
              <Route path='/profile' element={<UserProfile/>} />
              <Route path='*' element={<Navigate to='/home'/>} />
              </>
            :<>
              <Route path='/' element={<LoginPage/>} />
              <Route path='*' element={<Navigate to='/'/>} />
            </>
          }
           
        </Routes>
    </BrowserRouter>
    </EmployeeContext.Provider>
  )
}
export default App;

/*
import userReducer from './features/userDemo';

import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

const loginStore=configureStore({
  reducer:{
    user:userReducer
  },
})

    <Provider store={loginStore}>    </Provider>

*/