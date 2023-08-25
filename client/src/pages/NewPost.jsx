import { useRef } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../index.css'

function NewPost() {

    const titleRef = useRef()
    const messageRef = useRef()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const newPost = {
                title: titleRef.current.value,
                message: messageRef.current.value
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
        <div className="block my-32  w-1/3 max-w-md rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div >
            <h1 className="flex justify-center mb-4 text-large font-extrabold leading-none tracking-tight text-lime-900 md:text-5xl lg:text-6xl">New Post</h1>
            <form onSubmit={handleSubmit}>
                <label className=" text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400"  htmlFor="title">Title:</label><br />
                <input className="mt-4 w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" type="text" id="title" name="title" ref={titleRef} /><br /><br />

                <label className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400" htmlFor="message">Message:</label><br />
                <textarea className="mt-4 w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"  name="message" id="message" cols="30" rows="10" ref={messageRef}/><br /><br />

                <button className="bg-lime-300 mb-4 inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00 ] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ">Submit</button>
            </form>

            <button className="bg-lime-600 inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00 ] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] " onClick={() => navigate(`/`)}>Back</button>
            </div>
            
        </div>
            
        </>
    );
}

export default NewPost;