import React, { useContext, useEffect, useRef, useState } from 'react'
import "../styles/groupChat.css"
import axios from 'axios'
import { loginTokenContext, proDataContext, profileTokenContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const GroupChat = () => {
  const api = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [loginToken] = useContext(loginTokenContext)
  const [profileToken] = useContext(profileTokenContext)
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [proData] = useContext(proDataContext)
  const chatEndRef = useRef(null)


  // scrollBottom automatically when new message comes 
  const scrollBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollBottom()
  }, [data])


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
          <textarea value={text} onChange={(e) => setText(e.target.value)} type='text' className='input-box-in-chat' placeholder='Message...'></textarea>
          {spinner ? <button className="chat-send-bt text-white" type="button" disabled>
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span className="visually-hidden" role="status">Loading...</span>
          </button> : <button type='submit' className='chat-send-bt'>Send</button>}


        </form>
      </div>

      {/* Messages card  */}
      <div className='message-main-card'>
        {data.map((item) => (
          <div className={proData._id === item.userId ? 'chat-user-card-right' : ""}>
            <div key={item._id} className='chat-text-main-card' id={proData._id === item.userId ? "chat-text-main-card1" : ""}>
              <Link to={`/${item.userId}`} style={{ textDecoration: "none" }} className='chat-img-user-card'>
                <img src={item.image} className='chat-user-img' alt={item.userName} />
                <h5 className="user-name-in-chat" >{item.userName}</h5>
              </Link>
              <div className='text-card'>
                <h5 className='chat-text'>{item.text}</h5>
                <span className='date-in-chat'>{item.date}</span>
              </div>
            </div>
          </div>

        ))}

        <div ref={chatEndRef} id='chat-go-down'></div>
      </div>


      <a href='#chat-go-down' className='go-down'><span style={{ fontSize: "27px" }} className="material-symbols-outlined">
        keyboard_double_arrow_down
      </span></a>
    </div>
  )
}

export default GroupChat