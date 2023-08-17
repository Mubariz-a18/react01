import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from "buffer"

function SetAvatar() {
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/454548415";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOpts = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark"
  }

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate('/login')
    }
  })

  const setProfilePicture = async() => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar",toastOpts)
    }else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
      })
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        navigate('/');
      }else{
        toast.error("Error Selecting avatar image",toastOpts)
      }
    }
  }


  useEffect(() => {
    let data = [];
    const fetchData = async () => {
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = new Buffer(response.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error('Error fetching image:');
        }
      }
      setAvatars(data);
      setIsloading(false);
    };

    fetchData();
  }, []);

  return (
    <>
    {
      isLoading ? <Container>
        <img src={Loader} alt="loader" className='loader' />
      </Container> : ( 

        <Container>
        <div className="title-container">
          <h1>
            Pick an Avatar as your Profile Picture
          </h1>
        </div>
        <div className="avatars">
          {
            avatars.map((avatar, i) => {
              return <div
              key={i}
              className={`avatar ${selectedAvatar === i ? "selected" : ""
            }`} 
            >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(i)} />
              </div>
            })
          }
        </div>
        <button className='submin-btn' onClick={setProfilePicture}>Set As Profile Avatar</button>
      </Container>
        )}
      <ToastContainer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      display: flex;
      padding: 0.4rem;
      border-radius: 6rem;
      border: 0.4rem solid white;
      justify-content: center;
      align-items: center;
      transition:0.5s ease-in-out;
      img {
        height: 4rem;
        width: 5rem;
        transition: 0.5s ease-in-out;
      }
      &.selected {
        border-color: #4e0eff;
      }
    }
  }
  .submin-btn{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    transition:0.5s ease-in-out;
    &:hover:{
      background-color:#4e0eff;
    }
  }
`;


export default SetAvatar