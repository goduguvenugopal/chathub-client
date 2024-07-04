import React, { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './assets/NavBar'
import Home from './assets/Home'
import Search from './assets/Search'
import GroupChat from './assets/GroupChat'
import Profile from './assets/Profile'
import Post from './assets/Post'
import Login from './assets/Login'
import Signup from './assets/Signup'
import CreateProfile from './assets/CreateProfile'


export const loginTokenContext = createContext()
function App() {
  const [loginToken, setLoginToken] = useState("")

  return (
    <>
      <loginTokenContext.Provider value={[loginToken, setLoginToken]}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/groupchat' element={<GroupChat />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/post' element={<Post />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createprofile' element={<CreateProfile />} />
          </Routes>
        </BrowserRouter>
      </loginTokenContext.Provider>

    </>
  )
}

export default App
