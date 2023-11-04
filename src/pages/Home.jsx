import React, { useContext, useEffect } from 'react'
import { Context, server } from '../main'
import Profile from './Profile'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteList from '../components/NoteList'

const Home = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState("")
  const [notes, setNotes] = useState([])
  const [reload,setReload] = useState(false)
  
  const {isAuthenticated, user} = useContext(Context)


  const deleteHandler = async(id) => {
    try {
      const {data} = await axios.delete(`${server}/notes/${id}`,{
        withCredentials: true,
      })
      toast.success(data.message)
      setReload(prev=>!prev) // reload   previous notes from server after delete operation completes 
    } catch (error) {
      toast.error(error.response.data.message)
    }
  
  }

  const addHandler = async(e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const {data} = await axios.post(`${server}/notes/newnote`, {
        title,description,

      },{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      toast.success(data.message)
      setLoading(false)
      setReload(prev=>!prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
      
    }
  }


  useEffect(() => {
    axios.get(`${server}/notes/my`, {
      withCredentials: true,
    }).then((response) => {
      setNotes(response.data.notes);
      console.log(response.data.notes);
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }, [reload])

  return isAuthenticated ? (

    <section className="text-gray-600 body-font bg-gray-200   h-screen">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">


        
<div  className="container p-6 px-6 mx-auto bg-white---- dark:bg-gray-800      lg:w-3/5 md:w-1/2">
    <div className="mb-16 text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
            Note Book
        </h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
    A better way to manage our notes
  </span>
        </p>
    </div>
    <div className="flex flex-wrap my-12 dark:text-white">
    {notes.length > 0 ? (
              notes.slice().reverse().map((i) => (
                <NoteList
                  key={i._id}
                  id={i._id}
                  title={i.title}
                  description={i.description}
                  createdAt={i.createdAt}
                  user={i.user.name}
                  deleteHandler={deleteHandler}
                />
              ))
            ) : (
              <div className="border-dashed border-2 border-indigo-600 w-full p-5">
              {user?.name} Add your first note
            </div>
            )}
    </div>
</div>




        
        
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Add Your Note</h2>
          <form onSubmit={addHandler}>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}  id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your comment" name="comment" rows="5" cols="40" />
          </div>
          <button disabled={loading} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Note</button>
          
          </form>
      </div>

    </div>
  </section>
    ) :(
    <>
    <section className="text-gray-600 body-font    bg-gray-200 h-screen">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-3xl ">
        
          A better way to manage our notes
        </h1>
        <p className="leading-relaxed mt-4">
        QuickNotes is a user-friendly and efficient note-making application designed to help you capture and organize your thoughts, ideas, and important information. Whether you're a student, professional, or simply someone who loves to jot down notes, QuickNotes is the perfect tool to streamline your note-taking process.</p>
      </div>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
        <div className="relative mb-4">
          <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
          <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <p className="text-xs text-gray-500 mt-3">Literally you probably havent heard of them jean shorts.</p>
      </div>
    </div>
  </section>

    </>
  )
}

export default Home