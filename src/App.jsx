import React, { useContext } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'
import { Context, server } from './main'




const App = () => {

  const { setUser, setIsAuthenticated, setLoading} = useContext(Context)   // from MAIN

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user)    // here we will get the user information
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  }, [])
  
  


  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path='/' element={<Home />}  />
        <Route path='/profile' element={<Profile />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/register' element={<Register />}  />

      </Routes>
      <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App