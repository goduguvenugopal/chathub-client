import React, { useContext, useEffect, useState } from 'react'
import "../styles/profile.css"
import { loginTokenContext, profileTokenContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken] = useContext(loginTokenContext)
  const navigate = useNavigate()
  const [profileToken] = useContext(profileTokenContext)
  const [proData, setProData] = useState([])
  const [user, setUser] = useState([])
  console.log(user);


  // fetching user Id 
  useEffect(() => {
    const getUserId = async () => {

      const userId = user._id
      try {
        const response1 = await axios.get(`${api}/user/get-user`, {
          headers: {
            token: loginToken
          }
        })
        if (response1) {
          setUser(response1.data)

        }

        const response = await axios.get(`${api}/profile/get-profile-byid`, { user: userId })
        if (response) {
          setProData(response.data)
          console.log(response.data);

        }

      } catch (error) {
        console.log(error);

      }
    }
    getUserId()

  }, [])



  // if token is not available it navigate to login page 
  useEffect(() => {
    if (!loginToken || !profileToken) {
      return navigate("/login")
    }
  }, [loginToken, profileToken, navigate])

  return (
    <div className='profile-container'>
      <div className='profile-sub-card'>
        <div className='username-top-card'>
          <h4>venu_gopal</h4>
          <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
            settings
          </span>
        </div>
        {/* profile card  */}
        <div className='image-pro-card'>
          <img src='favicon.jpg' alt="profile-photo" className='pic-in-profile' />
          <div className=''>
            <h4 className='count-num'>102</h4>
            <h5 className='followers-text'>posts</h5>
          </div>
          <div className=''>
            <h4 className='count-num'>102</h4>
            <h5 className='followers-text'>followers</h5>
          </div>
        </div>

        <div className='bio-name-card mt-2'>
          <h5 className='name-in-profile'>Venu gopal godugu</h5>
          <p className='bio-in-pro'>I am software Developer and code Enthuisiast</p>

        </div>

        {/* post images division */}
        <div className='post-img-card-in-pro'>

          <img src="favicon.jpg" className='post-img-in-pro' />
          <img src="favicon.jpg" className='post-img-in-pro' />
          <img src="favicon.jpg" className='post-img-in-pro' />
          <img src="favicon.jpg" className='post-img-in-pro' />

          <img src="favicon.jpg" className='post-img-in-pro' />
          <img src="favicon.jpg" className='post-img-in-pro' />

        </div>
      </div>
    </div>

  )
}

export default Profile