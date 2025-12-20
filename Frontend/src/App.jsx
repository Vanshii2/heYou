import React from 'react'
import {Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore';

const App = () => {

  const {authUser, isLoggedIn,login}= useAuthStore();

  console.log("auth user :", authUser)
  console.log("isLoggedIn:",isLoggedIn)

  return (
    <div className="min-h-screen bg-slate-900 relative flex justify-center items-center p-4
    overflow-hidden">

    <button onClick={login} className='z-10'>login</button>

      <Routes>
        <Route path="/" element={ <ChatPage/> }/>
        <Route path="/login" element={ <LoginPage/> }/>
        <Route path="/signup" element={ <SignUpPage/> }/>
      </Routes>
      </div>
  )
}

export default App