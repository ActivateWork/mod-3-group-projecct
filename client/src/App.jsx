import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import IndexPost from './pages/IndexPost';
import NewPost from './pages/NewPost';
import Navbar from './components/NavBar';
function App() {
  

  useEffect(()=>{
    console.log('page loaded')
  },[])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<IndexPost />}/>
        <Route path='/new' element={<NewPost />}/>
      </Routes>
    </div>
  )
}

export default App
