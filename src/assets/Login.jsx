import React, { useState } from 'react'
import "../styles/loginSignUp.css"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const api = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hide, setHide] = useState(false)
  const [error, setError] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [mailErr, setMailErr] = useState(false)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)


  // password toggle function 
  const checkEvnet = (e) => {
    const checked = e.target.checked
    if (checked) {
      setHide(true)
    } if (!checked) {
      setHide(false)
    }
  }
  return (
    <div className='main-signup-card'>
      <div className='sign-up-card border-success'>
        <form className='pt-4' >
          <h5 className='text-center' style={{ fontSize: "23px" }}>LogIn</h5>
          <h5 className='text-primary text-center' style={{ fontSize: "14px" }}>Connect to the People</h5>
          <div className='horizontal-line border-success'></div>

          <h5 className='email-text'>Email</h5>
          <input type='email' placeholder='Enter Email' name='email' className='email-box border-success' />
         {/* validation error  */}
          {error ? <h6 style={{ fontSize: "14px" }} id={email !== "" ? "email-err-hide" : ""} className='text-danger mt-3'>Please Enter the Email</h6> : ""}
            {mailErr ? <h6 style={{ fontSize: "14px" }} className='text-danger mt-3'>you have entered incorrect email</h6> : ""}

          <h5 className='email-text mt-3'>Password</h5>
          <input type={hide ? "text" : "password"} placeholder='Enter Password' className='email-box border-success' name='password' /><br />
         
            {/* validation error  */}
            {error ? <h6 style={{ fontSize: "14px" }} className='text-danger mt-2f' id={password !== "" ? "password-err-hide" : ""} >Please Enter the Password</h6> : ""}
            {passErr ? <h6 style={{ fontSize: "14px" }} className='text-danger mt-2'>you have entered incorrect password<br />number</h6> : ""}

          <div className='d-flex align-items gap-2 mt-2'>
            <input type='checkbox' onChange={checkEvnet} />
            <span style={{ fontSize: "14px" ,marginBottom:"0.1rem"}}>{!hide ? "Show Password" : "Hide Password"}</span>
            </div>
            {/* button spinner  */}
            {spinner ? <button className="signup-bt bg-warning " type="button" disabled="">
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              <span className="visually-hidden" role="status">
                Loading...
              </span>
            </button>
              : <button type='submit' className=' signup-bt bg-warning text-dark'>Login</button>}


          <h6 className='mt-4 text-secondary'>Don't Have An account? <Link className='underline' to="/signup" style={{ textDecoration: "none" }} >Signup</Link></h6>
        </form>
      </div>

    </div>
  )
}

export default Login