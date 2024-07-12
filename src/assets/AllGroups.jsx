import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/groupChat.css"
import { loginTokenContext, proDataContext, profileTokenContext } from '../App';


const AllGroups = () => {
    const api = import.meta.env.VITE_API_URL;
    const [groups, setGroups] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [loginToken] = useContext(loginTokenContext)
    const [profileToken] = useContext(profileTokenContext)
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [proData] = useContext(proDataContext)
    const [modal, setModal] = useState(false)




    return (
        <div className='home-container gap-3' >
            <h5 className='all-groups-name-top'>All Groups</h5>
            <div className='all-group-chat-sub-card'>

                <Link className='chat-all-groups-card' to="/groupchat">
                    <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                        groups
                    </span>
                    <h5 className='chat-all-group-name'>ChatHub Group</h5>
                </Link>
                {/* map function  */}


            </div>

            <div className='create-custom-group' onClick={() => setModal(true)}>
                <span className="material-symbols-outlined">
                    group_add
                </span>
                <h5 className='create-custom-group-text'>New Group</h5>

               
            </div>
  {/* modal  */}
  {modal ? <div className='modal-create-custom-group'>

<div className="card bg-dark text-white px-3">
    <div className='d-flex align-items-center justify-content-between'>
        <h5 className="card-header">Create New Group</h5>
        <span onClick={()=> setModal(false)} className="material-symbols-outlined" style={{fontSize:"19px", marginTop:"0.4rem", cursor:"pointer"}}  >
            close
        </span>
    </div>
    <hr className='m-0 ' />

    <div className="card-body">
        <form className='text-dark d-flex flex-column gap-2'  >
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Group name"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="1.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="2.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="3.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"

                    className="form-control"
                    placeholder="4.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="5.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="6.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="7.Profile Id"
                    aria-label="First name"
                />
            </div>
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="8.Profile Id"
                    aria-label="First name"
                />
            </div>


            <button className='btn bg-primary text-white fw-bold mt-2'>Create Group</button>
        </form>

    </div>
</div>


</div> : ""}





        </div>
    )
}

export default AllGroups