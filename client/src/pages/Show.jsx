import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Show() {
    const [post, setPost] = useState([])
    
    const navigate = useNavigate()

    const { id } = useParams()

    async function getPosts() {
        try {
            console.log('fetch data here')
            const response = await axios.get(`api/posts/${id}`)
            console.log(response)
            setPost(response.data)
            
        } catch(err) {
            console.log(err.message)
        }
    }

    // here is where we would add a timeout function that sends a delete request
    /*
    

    */

    async function deletePost (){
        try {
            await axios.delete(`/api/posts/${id}`)
            navigate('/')
        } catch(err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getPosts()
        setTimeout(deletePost, 1000)
        
    }, [])

    return (
        <div className="w-full my-32 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
            <h1 className="mb-2 text-3xl font-bold text-lime-500 ">{post.title}</h1>
            <h2 className="mb-5 text-base text-gray-500 sm:text-lg ">{post.message}</h2>
        </div>
        
    )
}