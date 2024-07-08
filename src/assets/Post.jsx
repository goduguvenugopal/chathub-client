import React, { useContext, useState } from 'react'
import "../styles/profile.css"
import { profileTokenContext } from '../App'
import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import app from '../firebase'



const Post = () => {
  const api = import.meta.env.VITE_API_URL;
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState("")
  const [image, setImage] = useState("")
  const [loader, setLoader] = useState(false)
  const [profileToken] = useContext(profileTokenContext)

 
  // url generating with firebase function 

  const urlGenerateFunc = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setSpinner(true)
      try {
        const storage = getStorage(app)
        const storageRef = ref(storage, "posts/" + file.name)
        await uploadBytes(storageRef, file)
        const downLoadUrl = await getDownloadURL(storageRef)
        if (downLoadUrl) {
          setImage(downLoadUrl)
          setSpinner(false)
        }
      } catch (error) {
        console.error(error);
        alert("please try again photo not uploaded")

      }
    }
  }



  // post story function 
  const postStoryFunc = async () => {
    setLoader(true)
    try {
      const response = await axios.post(`${api}/message/send-message`, { message : message , postImage : image }, {
        headers: {
          token: profileToken
        }
      })
      if (response) {
        setLoader(false)
        setSpinner(false)
        setImage("")
      }
    } catch (error) {
      console.error(error);
      setLoader(false)

    }
  }

  return (
    <div className='home-container'>

      {image ? <>
        <img src={image} alt='pro-photo' className='profile-img-in-post' />
      </>
        : <>
          {spinner ? <div className='post-loading-card '>
            <div>
              <div className="spinner-grow spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow  text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <span className=' fs-5'>Uploading Photo..</span>
          </div> : <div id='post-card-in-post' className='home-post-card  p-3 '>
            <h5 className='text-center'>Post your story </h5>
            <span className="material-symbols-outlined image-icon-in-post">
              image
            </span>
            <label htmlFor="post-photo" className='btn bg-primary text-white '>Upload Photo</label>
            <input onChange={urlGenerateFunc} type='file' name='image' id='post-photo' className='d-none' />


          </div>}</>}

      {image ? <div className=''>
        <textarea type='text' placeholder='wright message ' name='message' className='message-input-in-post' value={message} onChange={(e) => setMessage(e.target.value)} /><br />
        <div className='text-end'>
          {loader ? <button style={{ width: "8rem", height: "35px" }} className="btn btn-primary " type="button" disabled>
            <span className="spinner-border spinner-border-sm " style={{ marginRight: "0.5rem" }} aria-hidden="true"></span>
            <span role="status">Sending...</span>
          </button> : <button onClick={postStoryFunc} className='send-post-bt bg-primary'>Send</button>}

        </div>

      </div> : ""}



    </div>
  )
}

export default Post