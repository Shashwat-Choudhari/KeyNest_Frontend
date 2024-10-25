import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import './App.css'
import Manager from './Components/Manager.jsx'
import Footer from './Components/Footer.jsx'

function App() {

  return (
    <>
    <Navbar/>
    <div className="container min-h-[77.5vh]">
      <Manager/>   
    </div>
    <Footer/>   
    </>
  )
}

export default App
