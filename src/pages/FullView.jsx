import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { getOnePost } from '../utils/APIRoutes';

export default function FullView() {
    const { postId } = useParams();
    console.log(postId)
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch post details based on postId
        const fetchPostDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const { data } = await axios.get(`${getOnePost}/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPost(data.post);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    }, [postId]);


    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>{post.title}</h1>
            <img src={`https://source.unsplash.com/random/400x300/?${post.title}`} alt={post.title} />
            <p>{post.caption}</p>
        </Container>
    );
}

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131324;
  color: white;
  min-height: 100vh;

  img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4e0eff;
    color: white;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #997af0;
    }
  }
}`;
