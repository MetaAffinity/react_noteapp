import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../main';

const Like = ({ noteId, initialLikes, initialDislikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    const handleLike = () => {
        if (likeActive) {
            // Unlike the note
            axios.put(`${server}/notes/dislike/${noteId}`)
                .then(response => {
                    setLikeActive(false);
                    setLikes(response.data.likes);
                })
                .catch(error => {
                    console.error(error.response.data.message);
                });
        } else {
            // Like the note
            axios.put(`${server}/notes/like/${noteId}`)
                .then(response => {
                    setLikeActive(true);
                    setLikes(response.data.likes);

                    if (dislikeActive) {
                        // Cancel the dislike
                        axios.put(`${server}/notes/dislike/${noteId}`)
                            .then(dislikeResponse => setDislikes(dislikeResponse.data.dislikes))
                            .catch(error => console.error(error));
                    }
                })
                .catch(error => {
                    console.error(error.response.data.message);
                });
        }
    };

    const handleDislike = () => {
        if (dislikeActive) {
            // Undislike the note
            axios.put(`/api/v1/notes/like/${noteId}`)
                .then(response => {
                    setDislikeActive(false);
                    setDislikes(response.data.dislikes);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Dislike the note
            axios.put(`/api/v1/notes/dislike/${noteId}`)
                .then(response => {
                    setDislikeActive(true);
                    setDislikes(response.data.dislikes);

                    if (likeActive) {
                        // Cancel the like
                        axios.put(`/api/v1/notes/like/${noteId}`)
                            .then(likeResponse => setLikes(likeResponse.data.likes))
                            .catch(error => console.error(error));
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <button onClick={handleLike} className={likeActive ? 'text-indigo-500' : null}>
                Like {likes}
            </button>{" "}
            <button onClick={handleDislike} className={dislikeActive ? 'text-red-500' : null}>
                Dislike {dislikes}
            </button>
        </div>
    );
};

export default Like;
