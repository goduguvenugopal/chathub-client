import React, { useContext, useEffect, useState } from 'react'
import "../styles/groupChat.css"
import axios from 'axios'
import { loginTokenContext, profileTokenContext } from '../App';
import { useNavigate } from 'react-router-dom';

const GroupChat = () => {
  const api = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [loginToken, setLoginToken] = useContext(loginTokenContext)
  const [profileToken, setProfileToken] = useContext(profileTokenContext)
  const navigate = useNavigate()
  const [text, setText] = useState("")



  // sending text message function 

  const sendText = async (e) => {
    e.preventDefault()
    if (text !== "") {
      try {
        setSpinner(true)
        const response = await axios.post(`${api}/chat/send-chat`, { text }, {
          headers: {
            token: profileToken
          }
        })

        if (response) {
          setSpinner(false)
          setText("")
        }

      } catch (error) {
        console.error(error);
        setSpinner(false)
        alert("Message has not sent Try again")
      }
    }
    else {
      alert("Please Enter message")
    }
  }


  // fetching all messages 

  useEffect(() => {

    const getAllChats = async () => {
      try {
        const response = await axios.get(`${api}/chat/get-all-chats`)
        if (response) {
          setData(response.data)

        }
      } catch (error) {
        console.error(error);
        alert("please wait try again server is down")
      }
    }

    const interval = setInterval(getAllChats, 5000)

    return () => clearInterval(interval)

  }, [])


  // if token is not available it navigate to login page 
  useEffect(() => {
    if (!loginToken || !profileToken) {
      navigate("/login")
    }
  }, [loginToken, navigate, profileToken])

  return (
    <div className='chat-container'>

      {/* chat inpu box  */}
      <div className='chat-input-card fixed-bottom' >
        <form onSubmit={sendText} className='chat-sub-card'>
          <input value={text} onChange={(e) => setText(e.target.value)} type='text' className='input-box-in-chat' placeholder='Message...' />
          {spinner ? <button className="chat-send-bt text-white" type="button" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Loading...</span>
          </button> : <button type='submit' className='chat-send-bt'>Send</button>}


        </form>
      </div>

      {/* Messages card  */}
      <div className='message-main-card'>
        {data.map((item) => (
          <div key={item._id} className='chat-text-main-card'>
            <div className='chat-img-user-card'>
              <img src={item.image} className='chat-user-img' alt={item.userName} />
              <h5 className='user-name-in-chat'>{item.userName}</h5>
            </div>
            <div className='text-card'>
              <h5 className='chat-text'>{item.text}</h5>
              <span className='date-in-chat'>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupChat