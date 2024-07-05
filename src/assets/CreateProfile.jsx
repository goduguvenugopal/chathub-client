import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CreateProfile = () => {
  const api = import.meta.env.VITE_API_URL
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState(false)
  const [userErr, setUserErr] = useState(false)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)

  return (
    <div id="create-profi-card" className='main-signup-card text-white' >

      <div className='sign-up-card border-success'>
        <form className='pt-4'>
          <h5 className='text-center' style={{ fontSize: "23px" }}>Create Profile</h5>
          <div className='horizontal-line border-success'></div>
          <div className='d-flex flex-column align-items-center mb-2' style={{ position: "relative" }}>
            {image ? <img src='favicon.jpg' className='add-profile-first' alt='profile-photo' /> : <div className='add-profile-first1'></div>}

            <label htmlFor='file' id='camera-icon'><span style={{fontSize:"2rem"}} className="material-symbols-outlined">
              add_a_photo
            </span></label>
            <input type='file' name="image" accept='image/*' id="file" className='d-none' />

            <h5 className='email-text'>Add Profile Photo</h5>
          </div>

          <h5 className='email-text'>Full Name</h5>
          <input value={fullName.trim()} onChange={(e) => setFullName(e.target.value)} type='text' placeholder='Enter Full Name' name='fullName' className='email-box border-success' />
          {/* validation error  */}
          {error ? <h6 style={{ fontSize: "14px" }} id={fullName !== "" ? "email-err-hide" : ""} className='text-danger mt-2'>Please Enter the Name</h6> : ""}


          <h5 className='email-text mt-3'>User Name</h5>
          <input value={userName.trim()} onChange={(e) => setUserName(e.target.value)} placeholder='Enter UserName' className='email-box border-success' name='userName' /><br />
          {/* validation error  */}
          {error ? <h6 style={{ fontSize: "14px" }} className='text-danger mt-2' id={userName !== "" ? "password-err-hide" : ""} >Please Enter the UserName</h6> : ""}

          <h5 className='email-text mt-3'>Bio</h5>
          <input value={bio.trim()} onChange={(e) => setBio(e.target.value)} placeholder='Add Your Bio' className='email-box border-success' name='bio' /><br />
          {error ? <h6 style={{ fontSize: "14px" }} id={bio !== "" ? "email-err-hide" : ""} className='text-danger mt-2'>Please Add Your Bio </h6> : ""}


          {/* button spinner  */}
          {spinner ? <button className="signup-bt bg-warning " type="button" disabled="">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span className="visually-hidden" role="status">
              Loading...
            </span>
          </button>
            : <button type='submit' className=' signup-bt bg-warning text-dark' style={{ marginTop: "2rem" }}>Create Profile</button>}<br />

        </form>
      </div>



    </div>
  )
}

export default CreateProfile