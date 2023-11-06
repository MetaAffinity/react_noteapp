import axios from 'axios';
import { useState, useEffect } from 'react'
import React from 'react'
import { server } from '../main';
import AllnotesList from '../components/AllnotesList';
import Like from '../components/Like';

const AllNotes = () => {

    const [getallNotes, setGetAllNotes] = useState([]);

    useEffect(() => {

        axios
        .get(`${server}/notes/all`,{})
        .then((res) => {
            setGetAllNotes(res.data.notes);
        })
        .catch((error) =>{
            console.error(error);
            setGetAllNotes([]);
        })

    }, [])
    

  return (
    <>

<section className="text-gray-600 body-font bg-gray-200   h-screen">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">


        
<div  className="container p-6 px-6 mx-auto bg-white---- dark:bg-gray-800      lg:w-3/5 md:w-1/2">
    <div className="mb-16 text-center">
        <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
            Other Users Note Blocks
        </h2>
        <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
    A better note can be morehelpful
  </span>
        </p>
    </div>
    <div className="flex flex-wrap my-12 dark:text-white">
                        {getallNotes.length > 0 ? (
                            getallNotes.map((note) => (
                                <div key={note._id}>
                                    <AllnotesList
                                        id={note._id}
                                        title={note.title}
                                        description={note.description}
                                        createdAt={note.createdAt}
                                        user={note.user.name}
                                    />
                                    <Like
                                        noteId={note._id}
                                        initialLikes={note.likes}
                                        initialDislikes={note.dislikes}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="border-dashed border-2 border-indigo-600 w-full p-5">
                                There is no any note available
                            </div>
                        )}
                    </div>
</div>



    </div>
  </section>
    
    </>
  )
}

export default AllNotes