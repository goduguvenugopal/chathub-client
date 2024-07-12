import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/groupChat.css"
import { loginTokenContext, proDataContext, profileTokenContext } from '../App';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const AllGroups = () => {
    const api = import.meta.env.VITE_API_URL;
    const [groups, setGroups] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [loginToken] = useContext(loginTokenContext)
    const [profileToken] = useContext(profileTokenContext)
    const navigate = useNavigate()
    const [proData] = useContext(proDataContext)
    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        admin: proData._id,
        groupName: "",
        adminProfileId: proData._id,
        profileId1: "",
        profileId2: "",
        profileId3: "",
        profileId4: "",
        profileId5: "",
        profileId6: "",
        profileId7: "",
        profileId8: "",

    })



    // handling multiple inputs function 
    const handleChangeFunc = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: value
        }))
    }


    // create group function 

    const createGroup = async (e) => {
        e.preventDefault()
        try {

            const response = await axios.post(`${api}/group/create-group`, formData)
            if (response) {
                toast.success("New Group Has been created successfully")
                setModal(false)
                getAllGroups()
            }
        } catch (err) {
            console.error(err);
            toast.error("please try again group has not created")
        }
    }

    // get all groups function 

    const getAllGroups = async () => {
        try {
            const response = await axios.get(`${api}/group/get-all-groups`)
            if (response) {
                setGroups(response.data)
            }
        } catch (err) {
            console.error(err);

        }
    }

    useEffect(() => {
        getAllGroups()
    }, [loginToken, profileToken])

    return (
        <div className='home-container gap-3' >
            <ToastContainer />

            <h5 className='all-groups-name-top text-warning'>All Groups</h5>
            <div className='all-group-chat-sub-card'>

                <Link className='chat-all-groups-card' to="/groupchat">
                    <div className='d-flex gap-3 align-items-center'>
                        <span className="material-symbols-outlined" style={{ fontSize: "30px" }}>
                            groups
                        </span>
                        <h5 className='chat-all-group-name'>ChatHub Group</h5>
                    </div>
                </Link>



                {/* map function  */}
                {groups.map((item) => (
                    <div key={item._id} id={proData._id === item.adminProfileId || item.profileId1 || item.profileId2 || item.profileId3 || item.profileId4 || item.profileId5 || item.profileId6 || item.profileId7 || item.profileId8 ? "group-show-condition" : "group-hide-condition"}>
                        <Link className='chat-all-groups-card' to="/groupchat" >
                            <div className='d-flex align-items-center gap-3'> <span className="material-symbols-outlined" style={{ fontSize: "30px" }}>
                                groups
                            </span>
                                <h5 className='chat-all-group-name'>{item.groupName}</h5></div>
                            <h5 className='chat-all-group-name text-danger'> {proData._id === item.adminProfileId ? "Delete" : ""}</h5>


                        </Link>
                    </div>
                ))}

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
                        <span onClick={() => setModal(false)} className="material-symbols-outlined" style={{ fontSize: "19px", marginTop: "0.4rem", cursor: "pointer" }}  >
                            close
                        </span>
                    </div>
                    <hr className='m-0 ' />

                    <div className="card-body">
                        <form className='text-dark d-flex flex-column gap-2' onSubmit={createGroup} >
                            <div className="col">
                                <input
                                    required
                                    name='groupName'
                                    value={formData.groupName.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="Group name"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    required
                                    name='profileId1'
                                    value={formData.profileId1.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="1.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId2'
                                    value={formData.profileId2.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="2.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId3'
                                    value={formData.profileId3.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="3.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId4'
                                    type="text"
                                    value={formData.profileId4.trim()}
                                    onChange={handleChangeFunc}
                                    className="form-control"
                                    placeholder="4.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId5'
                                    value={formData.profileId5.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="5.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId6'
                                    value={formData.profileId6.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="6.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId7'
                                    value={formData.profileId7.trim()}
                                    onChange={handleChangeFunc}
                                    type="text"
                                    className="form-control"
                                    placeholder="7.Profile Id"
                                    aria-label="First name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    name='profileId8'
                                    type="text"
                                    value={formData.profileId8.trim()}
                                    onChange={handleChangeFunc}
                                    className="form-control"
                                    placeholder="8.Profile Id"
                                    aria-label="First name"
                                />
                            </div>


                            <button type='submit' className='btn bg-primary text-white fw-bold mt-2'>Create Group</button>
                        </form>

                    </div>
                </div>


            </div> : ""}





        </div>
    )
}

export default AllGroups