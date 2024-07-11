import React, { useContext, useEffect, useState } from 'react'
import "../styles/profile.css"
import { loginTokenContext, proDataContext, profileTokenContext, refreshContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebase';

const Profile = ({ spinner1 }) => {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken , setLoginToken] = useContext(loginTokenContext)
  const navigate = useNavigate()
  const [profileToken] = useContext(profileTokenContext)
  const [proData] = useContext(proDataContext)
  const [filter, setFilter] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [fileSpinner, setFileSpinner] = useState(false)
  const [refresh, setRefresh] = useContext(refreshContext)
  const [singlePost, setSinglePost] = useState([])
  const [modal, setModal] = useState(false)
  const [like, setLike] = useState(false)
  const [like1, setLike1] = useState("")
  const [today, setToday] = useState(false)
  const [delSpinn, setDelSpinn] = useState(false)


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


    // uploaded date function 
    const currentDate = new Date().toLocaleDateString("en-GB")
    setToday(currentDate)
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
              setRefresh("image has updated")
            }
          } catch (error) {
            console.log(error)
            alert("Please try again Profile photo has not uploaded1 ")
            setFileSpinner(false)
          }

        }

      } catch (error) {
        setFileSpinner(false)
        console.log(error)
        alert("Please try again Profile photo not uploaded2 ")
      }
    }
  }


  // delete post function 
  const openPost = (postId) => {
    setModal(true)
    const singlePost = filter.find((item) => item._id === postId)
    setSinglePost(singlePost)

  }

  // like function
  const likeFunc = (likeId) => {
    setLike(!like)
    setLike1(likeId)
  }

  // delete post function 

  const deletePostFunc = async (delId) => {
    try {
      setDelSpinn(true)
      const response = await axios.delete(`${api}/message/delete-message/${delId}`)
      if (response) {
        const remaining = filter.filter((item) => item._id !== delId)
        setFilter(remaining)
        setModal(false)
        setDelSpinn(false)
      }
    } catch (error) {
      console.log(error)
      setDelSpinn(false)
      alert("Please try again post has not deleted")
    }
  }

  // if token is not available it navigate to login page 
  useEffect(() => {
    if (!loginToken || !profileToken) {
      return navigate("/login")
    }
  }, [loginToken, profileToken, navigate])

// log out function 
  const logOut = () => {
    localStorage.removeItem("loginToken")
    setLoginToken("")

}

  return (
    <>
      <div className='profile-container'>
        <div className='profile-sub-card'>
          <div className='username-top-card'>
            <h4>{proData.userName}</h4>
            <a
              className="text-white"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <span className="material-symbols-outlined" style={{ cursor: "pointer" }}>
                settings
              </span>
            </a>


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
              <h4 className='count-num'>1.5 M</h4>
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
                <img key={item.id} style={{ cursor: "pointer" }} src={item.postImage} onClick={() => openPost(item._id)} className='post-img-in-pro' />
              ))}</> : <div className='d-flex justify-content-center align-items-center fs-6' style={{ width: "100vw", height: "30vh" }}>No Posts</div>}

              </>}

            {/* post modal  */}
            {modal ? <div className='post-modal-card' >
              <div className='profile-post-card '>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center gap-2'> <img src={singlePost.profileImage} className='home-profile-img' />
                    <h5 className=''>{singlePost.userName}</h5></div>

                  <span style={{ cursor: "pointer" }} onClick={() => setModal(false)} className="material-symbols-outlined ">
                    close
                  </span>
                </div>

                <img src={singlePost.postImage} className='profile-post-img ' alt="post image" />

                <div className='like-share-card '>

                  {singlePost._id === like1 ?
                    <svg style={{ cursor: "pointer" }} onClick={() => likeFunc(singlePost._id)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill heart-icon1" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg> :
                    <span style={{ cursor: "pointer", fontSize: "22px", width: "20px" }} onClick={() => likeFunc(singlePost._id)} className="material-symbols-outlined m-0 p-0" >favorite</span>}
                  <span style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                    mode_comment
                  </span>
                  <span style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                    share
                  </span>
                </div>
                <h5 className='img-caption-text-in-profile'>{singlePost.message}</h5>
                <h5 className='uploaded-date d-flex justify-content-between'>{today === singlePost.date ? "Uploaded Today" : `Uploaded on ${singlePost.date}`}
                  <span className='text-danger' onClick={() => deletePostFunc(singlePost._id)} style={{ cursor: "pointer" }} >{delSpinn ? <>

                    <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm mx-1" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>

                  </> : "Delete Post"}</span></h5>
              </div>

            </div> : ""}


          </div>
        </div>
      </div>

      {/* offcanvas  */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"

      >
        <div className="offcanvas-header bg-dark text-white">
          <h4 className="offcanvas-title" id="offcanvasExampleLabel">
            Settings
          </h4>
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>   <hr className='m-0 ' />

        <div className="offcanvas-body bg-dark text-white">
          <div className='d-flex gap-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Account settings</h5>
          </div>
          <hr className='hori-in-profile ' />

          <div className='d-flex gap-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Notifications</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Archive</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Saved</h5>
          </div>
          <hr className='hori-in-profile ' />

          <div className='d-flex gap-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Comments</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Favourites</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Close friends</h5>
          </div>
          <hr className='hori-in-profile ' />
          <div className='d-flex gap-2 '>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Share website</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
            <span className="material-symbols-outlined">
              tune
            </span><h5 className='offcanvas-text'>Download app</h5>
          </div>
          <hr className='hori-in-profile ' />
          <div className='d-flex gap-2 '>
            <h5 className='offcanvas-text text-danger' onClick={logOut}>Log out</h5>
          </div>
          <div className='d-flex gap-2 pt-2'>
          <h5 className='offcanvas-text text-danger'>Delete account</h5>
          </div>
        

        </div>
      </div>

    </>
  )
}

export default Profile