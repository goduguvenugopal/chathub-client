import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Home = () => {
  const api = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([])
  const [like, setLike] = useState(false)
  const [like1, setLike1] = useState("")


  // fetching all messages from database 
  useEffect(() => {
    const getData = async () => {

      try {
        const response = await axios.get(`${api}/message/get-all-messages`)
        setData(response.data.allMessages)

      } catch (error) {
        console.log(error)

      }

    }

    getData()
  }, [])


  // like function
  const likeFunc = (likeId) => {
    setLike(!like)
    setLike1(likeId)
  }

  return (
    <>
      <div className='home-container'>

        {data.map((item) => (
          <div key={item._id} className='home-post-card'>
            <div className='d-flex align-items-center gap-2'>
            <img src={item.profileImage} className='home-profile-img' />
              <h5 className=''>{item.userName}</h5>
            </div>

            <img src={item.postImage} className='home-post-img ' alt="post image"/>

            <div className='like-share-card '>

              {item._id === like1 ?
                <svg style={{ cursor: "pointer" }} onClick={() => likeFunc(item._id)} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart-fill heart-icon1" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg> :
                <span style={{ cursor: "pointer", fontSize: "22px", width: "20px" }} onClick={() => likeFunc(item._id)} className="material-symbols-outlined m-0 p-0" >favorite</span>}
              <span style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                mode_comment
              </span>
              <span style={{ fontSize: "22px", cursor: "pointer" }} className="material-symbols-outlined">
                share
              </span>
            </div>
            <h5 className='img-caption-text'>{item.message}</h5>
            <h5 className='uploaded-date'>Uploaded at {item.date}</h5>
          </div>

        ))}





      </div>
    </>

  )
}

export default Home