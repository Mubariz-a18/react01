import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Post from './pages/Post'
import UpdatePost from './pages/UpdatePost'
import FullView from './pages/FullView'

// import SetAvatar from './pages/SetAvatar'

export default function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/' element = {<Home/>}/>
      <Route path='/post' element = {<Post/>}/>
      <Route path="/update/:postId" element={<UpdatePost />} />
      <Route path="/post/:postId" element={<FullView />} />
      {/* <Route path='/setavatar' element = {<SetAvatar/>}/> */}
    </Routes>

    </BrowserRouter>
  )
}
