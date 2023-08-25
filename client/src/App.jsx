import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import './index.css'
import IndexPost from './pages/IndexPost';
import NewPost from './pages/NewPost';
import Navbar from './components/NavBar';
function App() {
  const[ user, setUser] = useState({})

  async function getUser(){
    try{
      const response = await axios.get('api/users',{
        headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response)
    setUser(response.data)
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    console.log('page loaded')
  },[])
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center bg-lime-50'>
      <Routes>
        <Route path='/' element={<IndexPost />}/>
        <Route path='/new' element={<NewPost />}/>
      </Routes>
      </div>
      
    </div>
  )
}

export default App
