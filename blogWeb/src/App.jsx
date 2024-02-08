import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// pages imports
import { Routes, Route } from "react-router-dom"
import Header from './components/header'
import Home from './pages/home'
import Login from './pages/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
