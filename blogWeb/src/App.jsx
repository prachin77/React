import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// pages imports
import { Routes, Route } from "react-router-dom"
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'
import Register from './components/register'
import UserPage from './pages/userPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/user' element={<UserPage/>}/>
      </Routes>
    </>
  )
}

export default App
