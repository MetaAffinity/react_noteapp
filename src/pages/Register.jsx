import React, { useState, useContext } from 'react'
import { Context, server } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Register = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated, loading, setLoading} = useContext(Context)

  const submitHandler = async(e) => {
    setLoading(true)
    e.preventDefault();
try {
    const {data} =  await axios.post(`${server}/users/register`,{
        name,email,password
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
} catch (error) {
  toast.error("some error occurred")
  setLoading(false)
  setIsAuthenticated(false)
  console.log(error)
}
   }
   if(isAuthenticated) return <Navigate to={"/"} />
  return (
    <>
    <div className="w-full h-screen font-sans  bg-gray-300  bg-cover bg-landscape">
    <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
            <div className="leading-loose">
                <form onSubmit={submitHandler} className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                    <p className="mb-8 text-2xl font-light text-center text-black">
                        Register
                    </p>
                        <div className="mb-2">
                            <div className=" relative ">
                            <input type="text" onChange={(e)=>setName(e.target.value)} id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name" required/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className=" relative ">
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} id="login-with-bg-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email" required/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className=" relative ">
                                <input type="text" onChange={(e)=>setPassword(e.target.value)} id="login-with-bg-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="password" required/>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button type="submit" disabled={loading} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Register
                                </button>
                            </div>
                            <div className="text-center">
                                <a className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                    Sign In
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

export default Register