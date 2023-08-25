import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import IndexPost from './pages/IndexPost';
import NewPost from './pages/NewPost';
import Navbar from './components/NavBar';
import Register from './users/Register'
import Login from './users/Login';

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
      <Navbar />
      <Routes>
        <Route path='/' element={<IndexPost setUser={setUser}/>}/>
        <Route path='/new' element={<NewPost />}/>
        <Route path='/register' element={<Register setUser={setUser}/>} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
      </Routes>
    </div>
  )
}

export default App
