import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {
  const {isAuthenticated, loading, user} = useContext(Context)
  return loading ?  (

    <Loader />
  ) :(

    <>
    
    
<div className="bg-gray-200 h-screen dark:bg-gray-800 ">
    <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                Hello {user?.name}!
            </span>
            <span className="block text-indigo-500">
                make your notes today.
            </span>
        </h2>
        <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
            I had noticed that both in the very poor and very rich extremes of society the mad were often allowed to mingle freely
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
                <button type="button" className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Get started
                </button>
            </div>
        </div>
    </div>
</div>

    
    </>
  )
  
}

export default Profile