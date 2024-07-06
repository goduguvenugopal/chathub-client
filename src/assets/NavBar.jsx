import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { loginTokenContext, profileTokenContext } from '../App'


const NavBar = () => {
    const [loginToken ] = useContext(loginTokenContext)
    const [profileToken ] = useContext(profileTokenContext)
 
 
 
    return (
        <>
            {/* header section  */}
            <header className=' header-container '>
                <Link style={{ textDecoration: "none" }} to="/" className='d-flex align-items-center gap-3 '>
                    <img src='favicon.jpg' className='logo-img' />
                    <h5 className='web-name'>ChatHub</h5>
                </Link>
 
            </header>
            {/* navbar section  */}

            {loginToken && profileToken ? <nav className='nav-container '>
                <Link to="/" className='sub-nav-card'>
                    <span className="material-symbols-outlined nav-home-icon">
                        home
                    </span>
                    <h5 className='nav-text'>Home</h5>
                </Link>
                <Link to="/search" className='sub-nav-card'>
                    <span className="material-symbols-outlined nav-home-icon">
                        search
                    </span>
                    <h5 className='nav-text'>Search</h5>
                </Link>

                <Link to="/post" className='sub-nav-card'>
                    <span className="material-symbols-outlined nav-home-icon">
                        add_box
                    </span>
                    <h5 className='nav-text'>Post</h5>
                </Link>
                <Link to="/groupchat" className='sub-nav-card'>
                    <span className="material-symbols-outlined nav-home-icon d-none d-md-block">
                        groups
                    </span>
                    <span className="material-symbols-outlined nav-home-icon d-md-none">
                        chat
                    </span>
                    <h5 className='nav-text'>Group Chat</h5>
                </Link>
                <Link to="/profile" className='sub-nav-card'>
                    <img src='favicon.jpg' className="nav-profile-img" />


                    <h5 className='nav-text'>Profile</h5>
                </Link>

            </nav> : ""}

        </>
    )
}

export default NavBar