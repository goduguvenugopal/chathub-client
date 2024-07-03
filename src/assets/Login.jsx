import React, { useState } from 'react'
import "../styles/loginSignUp.css"
import { Link } from 'react-router-dom'

const Login = () => {
  const api = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hide, setHide] = useState(false)


  // password toggle function 
  const checkEvnet = (e) => {
    const checked = e.target.checked
    if (checked) {
      setHide(true)
    }  if ( !checked) {
      setHide(false)
    } 
  }
  return (
    <div className='main-signup-card'>
    <div className='sign-up-card'>
      <form className='pt-4' >
        <h5 style={{ fontSize: "23px" }}>LogIn</h5>
        <hr />

        <h5 className='email-text'>Email</h5>
        <input type='email' placeholder='Enter Email' name='email' className='email-box' />
        <h5 className='email-text mt-3'>Password</h5>
        <input type={hide ? "text" : "password"} placeholder='Enter Password' className='email-box' name='password' /><br />
        <div className='d-flex align-items gap-2 mt-2'>
          <input type='checkbox' onChange={checkEvnet} />
          <span className=''>{!hide ? "Show Password" : "Hide Password"}</span></div>


        <button type='submit' className=' signup-bt'>Login</button>
        <h6 className='mt-4 text-secondary'>Don't Have An account? <Link className='underline' to="/signup" style={{ textDecoration: "none" }} >Signup</Link></h6>
      </form>
    </div>

  </div>
  )
}

export default Login