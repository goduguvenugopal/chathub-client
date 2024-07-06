import React from 'react'
import "../styles/profile.css"

const Profile = () => {
  return (
    <div className='profile-container'>
      <div className='profile-sub-card'>
        <div className='username-top-card'>
          <h4>venu_gopal_godugu</h4>
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