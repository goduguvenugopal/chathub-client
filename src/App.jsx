import React, { createContext, useEffect, useState } from 'react'
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
import axios from 'axios'

export const profileTokenContext = createContext()
export const loginTokenContext = createContext()
export const proDataContext = createContext()


function App() {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken, setLoginToken] = useState("")
  const [profileToken, setProfileToken] = useState("")
  const [proData, setProData] = useState([])
  const [spinner, setSpinner] = useState(false)

  // retrieving token from localStorage 
  useEffect(() => {
    const token = localStorage.getItem("loginToken")
    if (token) {
      setLoginToken(JSON.parse(token))
    }

    // profile token retrieving 
    const proToken = localStorage.getItem("profileToken")
    if (proToken) {
      setProfileToken(JSON.parse(proToken))
    }

  }, [loginToken, profileToken])



  // get profile function 
  useEffect(() => {
    const getProfile = async () => {
      setSpinner(true)
      try {
        const response = await axios.get(`${api}/profile/get-profile-byid`, {
          headers: {
            token: profileToken
          }
        })
        if (response) {
          setProData(response.data)
          setSpinner(false)
        }

      } catch (error) {
        console.log(error);
        setSpinner(false)
      }
    }

    getProfile()
  }, [loginToken, profileToken])

  return (
    <>
      <proDataContext.Provider value={[proData, setProData]}>
        <profileTokenContext.Provider value={[profileToken, setProfileToken]}>
          <loginTokenContext.Provider value={[loginToken, setLoginToken]}>
            <BrowserRouter>
              <NavBar spinner={spinner} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/groupchat' element={<GroupChat />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/post' element={<Post />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/createprofile' element={<CreateProfile />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
              </Routes>
            </BrowserRouter>
          </loginTokenContext.Provider>
        </profileTokenContext.Provider>
      </proDataContext.Provider>
    </>
  )
}

export default App
