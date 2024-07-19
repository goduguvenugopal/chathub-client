import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { loginTokenContext, proDataContext, profileTokenContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';



const Home = () => {
  const api = import.meta.env.VITE_API_URL;
  const [loginToken] = useContext(loginTokenContext)
  const [data, setData] = useState([])
  const [like, setLike] = useState(false)
  const [like1, setLike1] = useState("")
  const [loader, setLoader] = useState(false)
  const [today, setToday] = useState(false)
  const navigate = useNavigate()
  const [profileToken] = useContext(profileTokenContext)
  const [proData] = useContext(proDataContext)
  const [likesCount, setLikesCount] = useState({});


  // fetching all messages from database 
  useEffect(() => {
    setLoader(true)
    const getData = async () => {
      getAllLikes()
      try {
        const response = await axios.get(`${api}/message/get-all-messages`)
        const fetchedData = response.data.allMessages
        setData(fetchedData.reverse())
        setLoader(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()

    // uploaded date function 
    const currentDate = new Date().toLocaleDateString("en-GB")
    setToday(currentDate)

    

  }, [])


  // post like function 
  const likePostFunc = async (postId) => {
    setLike(!like)
    setLike1(postId)
    try {
      const response = await axios.post(`${api}/like/like-post`, {
        userName: proData.userName,
        profileId: proData._id,
        postId: postId,
        profilePic: proData.image
      })
      if (response) {
        getAllLikes()
      }
    } catch (error) {
      console.log(error)
    }

  }

  // get all likes function 
  const getAllLikes = async () => {
    try {
      const response = await axios.get(`${api}/like/get-likes`)
      if (response) {

        const likesCountMap = response.data.reduce((acc, like) => {
          acc[like.postId] = (acc[like.postId] || 0) + 1;
          return acc;
        }, {});
        setLikesCount(likesCountMap);
      }
    } catch (error) {
      console.log(error)
    }

  }

  // share web api function 
  const shareImage = async (image) => {
    const url = "https://chathubb.netlify.app/"
    try {
      await navigator.share({
        text:
          `Hello, check this image link from ChatHub your friend shared to you : ${image} and Connect to the people across the world, welcome to ChatHub : ${url}`

      });

    } catch (error) {
      console.error("Error sharing the website:", error);
    }
  };


  // if token is not available it navigate to login page 
  useEffect(() => {
    if (!loginToken) {
      navigate("/login")
    } else if (!profileToken) {
      navigate("/createprofile")
    }
  }, [loginToken, navigate, profileToken])


  return (
    <>
      <div className='home-container'>

        {/*bootstrap spinner code  */}
        {loader ? <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
          : ""}

        {/* map function  */}
        {data.map((item) => (
          <div key={item._id} className='home-post-card'>
            <Link to={`/${item.profileId}`} className='d-flex align-items-center gap-2 text-white' style={{ textDecoration: "none" }}>
              <img src={item.profileImage} className='home-profile-img' />
              <h5 className=''>{item.userName}</h5>
            </Link>

            <img src={item.postImage} className='home-post-img ' alt="post image" />

            <div className='like-share-card' style={{ marginBottom: "0.5rem" }}>

              {item._id === like1 ?
                <svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill heart-icon1" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg> :
                <span style={{ cursor: "pointer", fontSize: "22px", width: "20px" }} onClick={() => likePostFunc(item._id)} className="material-symbols-outlined m-0 p-0" >favorite</span>}
              <span type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                mode_comment
              </span>
              <span onClick={() => shareImage(item.postImage)} style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                share
              </span>
            </div>

            <h5 className='uploaded-date mt-0 text-white'>{likesCount[item._id] || 0} Likes</h5>
            <h5 className='img-caption-text'>{item.message}</h5>
            <h5 type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" className='uploaded-date mt-2'>View all comments</h5>
            <h5 className='uploaded-date mt-2'>{today === item.date ? "Uploaded Today" : `Uploaded on ${item.date}`}</h5>
          </div>

        ))}
      </div>


      {/* offcanvas for comments  */}

      <div className="offcanvas offcanvas-bottom  bg-dark text-white" style={{height:"70vh"}} tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">Comments</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body small">
          ...
        </div>
      </div>
    </>

  )
}

export default Home