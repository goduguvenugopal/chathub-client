import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/profile.css"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const OthersProfile = () => {
    const api = import.meta.env.VITE_API_URL;
    const [proData, setProData] = useState([])
    const [filter, setFilter] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [spinner1, setSpinner1] = useState(false)
    const [modal, setModal] = useState(false)
    const [like, setLike] = useState(false)
    const [like1, setLike1] = useState("")
    const [today, setToday] = useState(false)
    const [singlePost, setSinglePost] = useState([])
    const { id } = useParams()
    const [preview, setPreview] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [toggle1 , setToggle1] = useState(false)

    // fetching other's profile 
    useEffect(() => {
        const getProfile = async () => {
            try {
                
                setSpinner1(true)
                const response = await axios.get(`${api}/profile/get-profile/${id}`)
                if (response) {
                    setProData(response.data)
                    setSpinner1(false)
                    
                }

            } catch (error) {
                console.log(error);
                setSpinner1(false)
                if (error.response) {
                    if (error.response.status === 404) {
                        alert("This user account not existed")
                    }
                }
            }
        }


        getProfile()
    }, [id])


    useEffect(() => {
        const getPostData = async () => {
            setSpinner(true)
            try {

                const response = await axios.get(`${api}/message/get-all-messages`)
                if (response) {
                    const data = response.data.allMessages.reverse()
                    const userId = proData._id
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




    // like function
    const likeFunc = (likeId) => {
        setLike(!like)
        setLike1(likeId)
    }



    // delete post function 
    const openPost = (postId) => {
        setModal(true)
        const singlePost = filter.find((item) => item._id === postId)
        setSinglePost(singlePost)

    }

    // web api clipboard function 
    const copyProfileId = async () => {
        try {
            await navigator.clipboard.writeText(proData._id)
            toast.success("Profile Id has been copied to clipboard successfully")
        } catch (error) {
            toast.error("Profile Id has not been copied, please try again")
            console.error(error);

        }
    }

    useEffect(() => {
        const getAllAccounts = async () => {
            try {
                const response = await axios.get(`${api}/privateaccount/get-all-accounts`)
                if (response.data) {
                    const data = response.data
                    const isItAvailable = data.filter((item) => item.profileId === proData._id)
                    if (isItAvailable[0]) {
                        setToggle(false)
                    } else if (!isItAvailable[0]) {
                        setToggle(true)
                    }
                }
            } catch (error) {
                console.error(error);

            }

        }
        getAllAccounts()

    }, [proData])

    return (
        <div className='profile-container'>

            <ToastContainer />
            {/* image preview  */}
            {preview ? <div onClick={() => setPreview(false)} className='image-preview-card'>
                <img src={proData.image} alt={proData.profileName} className='preview-img' />
            </div> : ""}

            <div className='profile-sub-card'>
                <div className='username-top-card'>
                    <h4>{proData.userName}</h4>

                    {toggle1 ? <>  {toggle ? <div onClick={copyProfileId} style={{ display: "flex", columnGap: "5px", paddingTop: "5px", cursor: "pointer", userSelect: "none" }}>
                        <span className="material-symbols-outlined">
                            passkey
                        </span>
                        <h5 className=''>Profile Id</h5>
                    </div> : ""}</> : ""}



                </div>
                {/* profile card  */}
                <div className='image-pro-card'>

                    {spinner1 ? <div className="spinner-border pic-in-profile border-2 text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                        :
                        <img style={{ cursor: "pointer" }} src={proData.image} alt="profile-photo" onClick={() => setPreview(true)} className='pic-in-profile' />}

                    <div className=''>
                        <h4 className='count-num'>{filter.length}</h4>
                        <h5 className='followers-text'>posts</h5>
                    </div>
                    <div className=''>
                        <h4 className='count-num'>102</h4>
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
                            </h5>
                        </div>

                    </div> : ""}


                </div>
            </div>
        </div>
    )
}

export default OthersProfile