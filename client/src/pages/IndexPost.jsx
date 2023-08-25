import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import axios from 'axios'

function IndexPost() {

    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    async function getPosts() {
        try {
            console.log('fetch data here')
            const response = await axios.get('/api/posts')
            setPosts(response.data)
        } catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
            <div>
                <h1>Posts</h1>
                <div id="posts">
                    {posts.map((post,i)=>{
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.message}</p>
                        </div>
                    })}
                </div>
                <button onClick={() => navigate('/new')}>NEW POST</button>
            </div>
    )
}

export default IndexPost