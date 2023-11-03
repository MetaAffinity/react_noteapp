import { Navigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Context, server } from '../main'

const Login = () => {
  
  const {isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(Context)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const submitHandler = async(e) =>{
    setLoading(true)
    e.preventDefault();

try {
        const {data} = await axios.post(`${server}/users/login`, {
          email,password,
        },{
          headers:{
            "Content-Type": "application/json"
          },
          withCredentials:true
        })
        toast.success(data.message)
        setIsAuthenticated(true)
        setLoading(false)
} catch (error) {
    toast.error(error.response.data.message)
    setLoading(false)
    setIsAuthenticated(false)
  
}

  }
if(isAuthenticated) return <Navigate to={"/profile"} />
  return (
    <>

    

<div className="w-full h-screen font-sans  bg-gray-300  bg-cover bg-landscape">
    <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
            <div className="leading-loose">
                <form onSubmit={submitHandler} className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                    <p className="mb-8 text-2xl font-light text-center text-black">
                        Login
                    </p>
                    <div className="mb-2">
                        <div className=" relative ">
                            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className=" relative ">
                                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="password"/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button type="submit" disabled={loading}  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <a className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                    Create an account
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </>
  )
}

export default Login