import React, { useContext, useEffect, useState } from 'react'
import "../styles/profile.css"
import { loginTokenContext, proDataContext, profileTokenContext, refreshContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebase';

const Profile = ({ spinner1 }) => {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken] = useContext(loginTokenContext)
  const navigate = useNavigate()
  const [profileToken] = useContext(profileTokenContext)
  const [proData, setProData] = useContext(proDataContext)
  const [filter, setFilter] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [fileSpinner, setFileSpinner] = useState(false)
  const [refresh, setRefresh] = useContext(refreshContext)


  // fetching posts data 

  useEffect(() => {
    const userId = proData._id

    const getPostData = async () => {
      setSpinner(true)
      try {

        const response = await axios.get(`${api}/message/get-all-messages`)
        if (response) {
          const data = response.data.allMessages.reverse()

          // filtering post from all posts 
          const filteredData = data.filter((item) => item.profileId === userId)

          setFilter(filteredData)
          setSpinner(false)
        }
      } catch (error) {
        console.log(error);
        setSpinner(false)
      }
    }

    getPostData()
  }, [proData])



  // update photo function 

  const updatePhoto = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        setFileSpinner(true)
        const storage = getStorage(app)
        const storageRef = ref(storage, "profile/" + file.name)
        await uploadBytes(storageRef, file);
        const downLoadUrl = await getDownloadURL(storageRef)

        if (downLoadUrl) {

          const update = { user: proData.user, image: downLoadUrl }
          try {
            const response = await axios.put(`${api}/profile/update-photo`, update)
            if (response) {
              setFileSpinner(false)
              setRefresh(true)
            }
          } catch (error) {
            console.log(error)
            alert("Please try again Profile photo has not uploaded ")
            setFileSpinner(false)
          }

        }

      } catch (error) {
        setFileSpinner(false)
        console.log(error)
        alert("Please try again Profile photo not uploaded ")
      }
    }
  }


  // update photo function 

  // const updatePicFunc = async () =>{
  //  
  // }

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
          {fileSpinner ? <div className="spinner-border pic-in-profile border-2 text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : <>{spinner1 ? <img src="image-icon.jpeg" alt="profile-photo" className='pic-in-profile' />
            :
            <label htmlFor='pro-img'>
              <img style={{ cursor: "pointer" }} src={proData.image} alt="profile-photo" className='pic-in-profile' /> </label>}


          </>}


          <input id='pro-img' type='file' name='image' onChange={updatePhoto} className='d-none' />
          <div className=''>
            <h4 className='count-num'>{filter.length}</h4>
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
          {spinner ?

            <>
              <img src="image-icon.jpeg" className='post-img-in-pro' />
              <img src="image-icon.jpeg" className='post-img-in-pro' />
              <img src="image-icon.jpeg" className='post-img-in-pro' />
              <img src="image-icon.jpeg" className='post-img-in-pro' />
              <img src="image-icon.jpeg" className='post-img-in-pro' />
              <img src="image-icon.jpeg" className='post-img-in-pro' />
            </>

            : <> {filter.length !== 0 ? <> {filter.map((item) => (
              <img key={item.id} src={item.postImage} className='post-img-in-pro' />
            ))}</> : <div className='d-flex justify-content-center align-items-center fs-6' style={{ width: "100vw", height: "30vh" }}>No Posts</div>}

            </>}




        </div>
      </div>
    </div>

  )
}

export default Profile