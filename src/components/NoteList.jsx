import React, { useState } from 'react'

const NoteList = ({title,description, createdAt, user, deleteHandler,updateHandler,id}) => {
   
  return (
    <>
        <div className="w-full p-8 md:w-1/2 lg:w-1/3      shadow-xl">
            <div className="flex items-center mb-6">
                <svg  width="20" height="20" fill="currentColor" className="w-6 h-6 text-indigo-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                {title}
                </div>
            </div>
            <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
            {description}
            </p>
            <p>{createdAt}</p>
            <div className="flex items-center mt-4">{user}</div>
            <button  onClick={() => deleteHandler(id)} className="text-white text-base  py-1 px-3 bg-sky-500 hover:bg-sky-700 rounded">Delete</button>
            <button  onClick={() => updateHandler(title, description, id)} className="text-white text-base  py-1 px-3 bg-sky-500 hover:bg-sky-700 rounded">Delete</button>
        </div>






    <div style={{display:'none'}} className="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
        <p className="text-gray-600 dark:text-white">
            <span className="text-lg font-bold text-indigo-500">
                “
            </span>
            {description}
            <span className="text-lg font-bold text-indigo-500">
                ”
            </span>
        </p>
        <div className="flex items-center mt-4">
            <a href="#" className="relative block">
                <img alt="profil" src="/images/person/1.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
            </a>
            <div className="flex flex-col justify-between ml-2">
                <span className="text-sm font-semibold text-indigo-500">
                    {title}
                </span>
                <span className="flex items-center text-xs dark:text-gray-400">
                    {createdAt} by {user}
                    <img src="/icons/rocket.svg" className="w-4 h-4 ml-2"/>
                </span>
            </div>
        </div>
    </div>
    </>
  )
}

export default NoteList