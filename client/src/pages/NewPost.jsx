import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function NewPost() {

    const titleRef = useRef()
    const messageRef = useRef()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const newPost = {
                subject: subjectRef.current.value,
                body: bodyRef.current.value
            }
            await axios.post(`/api/posts`, newPost, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            navigate(`/`)
        } catch(err) {
            console.log(err.message)
        }
    }

    return ( 
        <>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label><br />
                <input type="text" id="title" name="title" ref={titleRef} /><br /><br />

                <label htmlFor="message">Body:</label><br />
                <textarea name="body" id="message" cols="30" rows="10" ref={messageRef}/><br /><br />

                <button>Submit</button>
            </form>

            <button onClick={() => navigate(`/`)}>Back</button>
        </>
    );
}

export default NewPost;