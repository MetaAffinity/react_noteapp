import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Context, server } from '../main';

const Like = ({ noteId, initialLikes, initialDislikes }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    const [likedUsers, setLikedUsers] = useState([]);
    const [dislikedUsers, setDislikedUsers] = useState([]);


    

    const fetchLikedUsers = () => {
        axios
          .get(`${server}/like/${noteId}/users`)
          .then((response) => {
            setLikedUsers(response.data.users);
            setIsAuthenticated(true);
          })
          .catch((error) => {
            console.error(error);
            setIsAuthenticated(false);
          });
      };
    
      const fetchDislikedUsers = () => {
        axios
          .get(`${server}/dislike/${noteId}/users`)
          .then((response) => {
            setDislikedUsers(response.data.users);
          })
          .catch((error) => {
            console.error(error);
          });
      };

    const handleLike = () => {
        if (likeActive) {
            // Unlike the note
            axios.put(`${server}/dislike/${noteId}`, null, {
                withCredentials: true,
            })
                .then(response => {
                    setLikeActive(false);
                    setLikes(response.data.likes);
                    setIsAuthenticated(true); // Set authenticated after a successful request
                })
                .catch(error => {
                    console.error(error);
                    setIsAuthenticated(false);
                });
        } else {
            // Like the note
            axios.put(`${server}/like/${noteId}`, null, {
                withCredentials: true,
            })
                .then(response => {
                    setLikeActive(true);
                    setLikes(response.data.likes);

                    if (dislikeActive) {
                        // Cancel the dislike
                        axios.put(`${server}/dislike/${noteId}`, null, {
                            withCredentials: true,
                        })
                            .then(dislikeResponse => setDislikes(dislikeResponse.data.dislikes))
                            .catch(error => console.error(error));
                    }
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    console.error(error);
                    setIsAuthenticated(false);
                });
        }
    };

    const handleDislike = () => {
        if (dislikeActive) {
            // Undislike the note
            axios.put(`${server}/notes/dislike/${noteId}`, null, {
                withCredentials: true,
            })
                .then(response => {
                    setDislikeActive(false);
                    setDislikes(response.data.dislikes);
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    console.error(error);
                    setIsAuthenticated(false);
                });
        } else {
            // Dislike the note
            axios.put(`${server}/notes/dislike/${noteId}`, null, {
                withCredentials: true,
            })
                .then(response => {
                    setDislikeActive(true);
                    setDislikes(response.data.dislikes);

                    if (likeActive) {
                        // Cancel the like
                        axios.put(`${server}/notes/dislike/${noteId}`, null, {
                            withCredentials: true,
                        })
                            .then(likeResponse => setLikes(likeResponse.data.likes))
                            .catch(error => console.error(error));
                    }
                    setIsAuthenticated(true);
                })
                .catch(error => {
                    console.error(error);
                    setIsAuthenticated(false);
                });
        }
    };

    return (
        <>
        <button onClick={handleLike} className={[likeActive ? 'bg-indigo-500 text-white px-2 text-md':null,'px-2 rounded-md border-slate-400 hover:border-indigo-300'].join('')}>
            Like ({likedUsers.length > 0 ? likedUsers.map(user => user.name).join(', ') : 'No likes'})
            </button> ---
        <button onClick={handleDislike} className={[dislikeActive ? 'bg-red-500 text-white px-2 text-md':null,'px-2 rounded-md border-slate-400 hover:border-indigo-300'].join('')}>
            Dislike ({dislikes})
            </button>
            

           
    </>
    );
};

export default Like;
