import React, { useContext, useEffect, useState } from 'react'
import "../styles/profile.css"
import { loginTokenContext, proDataContext, profileTokenContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken] = useContext(loginTokenContext)
  const navigate = useNavigate()
  const [profileToken] = useContext(profileTokenContext)
  const [proData, setProData] = useContext(proDataContext)
  const [postData, setPostData] = useState([])

  // fetching posts data 

  useEffect(() => {
    const profileId = { profileId: proData._id }

    const getPostData = async () => {
      try {

        const response = await axios.get(`${api}/message//get-individual-messages`, profileId)
        if (response) {
          console.log(response)

          setPostData(response.data)
        }
      } catch (error) {
        console.log(error);

      }
    }

    getPostData()
  }, [proData])

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
          <h4>{proData.userName}</h4>
          <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
            settings
          </span>
        </div>
        {/* profile card  */}
        <div className='image-pro-card'>
          <img src={proData.image} alt="profile-photo" className='pic-in-profile' />
          <div className=''>
            <h4 className='count-num'>{postData.length}</h4>
            <h5 className='followers-text'>posts</h5>
          </div>
          <div className=''>
            <h4 className='count-num'>102</h4>
            <h5 className='followers-text'>followers</h5>
          </div>
        </div>

        <div className='bio-name-card mt-2'>
          <h5 className='name-in-profile'>{proData.profileName}</h5>
          <p className='bio-in-pro'>{proData.bio}</p>

        </div>

        {/* post images division */}
        <div className='post-img-card-in-pro'>

          {postData.length ? <> {postData.map((item) => (
            <img key={item.id} src="favicon.jpg" className='post-img-in-pro' />
          ))}</> : <div className='d-flex justify-content-center' style={{width:"100vw"}}>No Posts</div>}




        </div>
      </div>
    </div>

  )
}

export default Profile