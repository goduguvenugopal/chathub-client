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
import ForgotPassword from './assets/ForgotPassword'

export const profileTokenContext = createContext()
export const loginTokenContext = createContext()

function App() {
  const [loginToken, setLoginToken] = useState("")
  const [profileToken, setProfileToken] = useState("")

  return (
    <><profileTokenContext.Provider value={[profileToken, setProfileToken]}>
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
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          </Routes>
        </BrowserRouter>
      </loginTokenContext.Provider>
    </profileTokenContext.Provider>

    </>
  )
}

export default App
