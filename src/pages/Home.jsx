import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllPostsRoute, deletePost } from '../utils/APIRoutes';

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/login');
          return;
        }
      const response = await axios.get(getAllPostsRoute ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status === true) {
        setPosts(response.data.posts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred while fetching posts');
    }
  };

  const handleUpdate = (postId) => {
    console.log(postId)
    navigate(`/update/${postId}`);
  };
  const handleFullView = (postId) => {
    console.log(postId)
    navigate(`/post/${postId}`);
  };



  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/login');
          return;
        }
      const response = await axios.delete(`${deletePost}/${postId}` ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if(response.status){
        fetchPosts();
        toast.success('Post deleted successfully');
      }else{
        fetchPosts();
        toast.error('An error occurred while deleting the post');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the post');
    }
  };

  return (
    <>
      <Container>
        <h1>All Posts</h1>
        <ButtonContainer><Button onClick={()=>{
          navigate('/post')
        }}>Post New</Button></ButtonContainer>
        <br></br>
        <PostList>
          {posts.map((post) => (
            <PostCard key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.caption}</p>
              <img src={`https://source.unsplash.com/random/400x300/?${post.title}`} alt={post.title} />
              <ButtonContainer>
                <Button onClick={() => handleDelete(post._id)}>Delete</Button>
                 <Button onClick={() => handleUpdate(post._id)}>Update</Button>
                <Button onClick={() => handleFullView(post._id)}>Full View</Button>
              </ButtonContainer>
            </PostCard>
          ))}
        </PostList>
      </Container>
      <ToastContainer />
    </>
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
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
`;

const PostCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
  background-color: #f8f8f8;
  h2 {
    margin-bottom: 0.5rem;
    color:black;
  }
  p {
    margin-bottom: 1rem;
    color:black;
  }
  img {
    width: 100%;
    cursor:pointer;
    max-width: 300px; /* Adjust the value as needed */
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #4e0eff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;