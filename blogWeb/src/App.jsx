import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from './pages/auth';
import Header from './components/header'
import Home from './pages/home';
import { auth } from './firebase';
import UserPage from './pages/userPage';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setActive] = useState("home")
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      }
      else {
        setUser(null)
      }
    })
  }, [])


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/")
      })
  }

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/userpage' element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
