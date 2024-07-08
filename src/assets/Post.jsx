import React, { useState } from 'react'
import "../styles/profile.css"

const Post = () => {
  const [spinner, setSpinner] = useState(true)
  const [message, setMessage] = useState("")

  return (
    <div className='home-container'>
      {spinner ? <div className='post-loading-card'>
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
      </div> : <div id='post-card-in-post' className='home-post-card  p-3'>
        <h5 className='text-center'>Post your story </h5>
        <span className="material-symbols-outlined image-icon-in-post">
          image
        </span>
        <label htmlFor="post-photo" className='btn bg-primary text-white '>Upload Photo</label>
        <input type='file' name='image' id='post-photo' className='d-none' />


      </div>}
      {spinner ? <div className=''>
        <textarea type='text' placeholder='wright message ' name='message' className='message-input-in-post' value={message} onChange={(e) => setMessage(e.target.value)} /><br />
        <button className='send-post-bt'>Post</button>
      </div> : ""}



    </div>
  )
}

export default Post