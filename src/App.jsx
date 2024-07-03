import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './assets/NavBar'
import Home from './assets/Home'
import Search from './assets/Search'
import GroupChat from './assets/GroupChat'
import Profile from './assets/Profile'
import Post from './assets/Post'
import Login from './assets/Login'


function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Login/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/groupchat' element={<GroupChat />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
