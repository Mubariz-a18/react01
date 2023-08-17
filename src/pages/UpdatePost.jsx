import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { updatePost } from '../utils/APIRoutes';

export default function UpdatePost() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        caption: '',
        imageUrl: ''
    });

    const toastOpts = {
        position: 'bottom-right',
        autoClose: 8000,
        draggable: true,
        theme: 'dark'
    };

    const handleValidation = () => {
        const { title, caption, imageUrl } = post;
        if (title === '') {
            toast.error('Title is required', toastOpts);
            return false;
        }
        else if (imageUrl === '') {
            toast.error('imageurl is required', toastOpts);
            return false;
        } else if (caption === '') {
            toast.error('Caption is required', toastOpts);
            return false;
        }
        return true;
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (handleValidation()) {
            try {
                const { title, caption, imageUrl } = post;
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const { data } = await axios.put(`${updatePost}/${postId}`, {
                    title,
                    caption,
                    imageUrl
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (data.status === false) {
                    toast.error(data.message);
                }
                if (data.status) {
                    toast.success('Post created successfully');
                    navigate('/');
                }
            } catch (error) {
                toast.error('An error occurred while creating the post', toastOpts);
            }
        }
    };

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <h1>Create New Post</h1>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={(e) => handleChange(e)}
                    />
                    <textarea
                        placeholder="Caption"
                        name="caption"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        name="imageUrl"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Update Post</button>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  h1 {
    color: white;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input,
    textarea {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
  }
`;
