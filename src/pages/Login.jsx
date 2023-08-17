import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

export default function Login() {
  const navigate = useNavigate();
  const [val, setVal] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/')
    }
  },[])

  const toastOpts = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    theme: "dark"
  }

  const handleValidation = () => {
    const { password, username } = val;
    if (username === "") {
      toast.error("Uername and password is required", toastOpts);
      return false;
    }
    else if (password === "") {
      toast.error("username and password is required", toastOpts);
      return false;
    }
    return true;
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    if (handleValidation()) {
      const { password, username } = val;
      const { data } = await axios.post(loginRoute,{
        username,
        password
      });
      console.log(data.status)
      if(data.status === false){
        toast.error(data.message)
      }
      if(data.status){
        localStorage.setItem("token",(data.token));
        navigate("/")
      }
    } 
  }

  const handleChange = (event) => {
    setVal({ ...val, [event.target.name]: event.target.value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>React-Node-Test</h1>
          </div>
          <input type="text" placeholder='username' name='username' min={3} onChange={e => handleChange(e)} />
          <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)} />
          <button type='submit'>Login</button>
          <span>Dont have an Account ? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flext-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img {
      height:5rem
    }
    h1{
      color:white;
      test-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:0.4rem;
      color: white;
      width:100%;
      font-size:1rem;
      &:focus{
        border:0.1rem solid #997af0;
        outline:none;
      }
    }
    button{
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
    span{
      color:white;
      a{
        text-decoration:none
      }
    }
  }
`