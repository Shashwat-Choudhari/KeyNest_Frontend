import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import './App.css'
import Manager from './Components/Manager.jsx'
import Footer from './Components/Footer.jsx'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const [user, setUser] = useState('');

  const handleLogin = async (user) => {
    setUser(user.User.id);
  }

  const handleLogout = async () => {
    setUser('');
  }

  const router = createBrowserRouter([
    {
      path: "/register",
      element: user === ''?<Register handleLogin={handleLogin} />: <Manager user_id={user} />
    },
    {
      path: "/",
      element: user === '' ? <Login handleLogin={handleLogin} /> : <Manager user_id={user} />
    },
    {
      path: "/login",
      element: <Login handleLogin={handleLogin} />
    }
  ])


  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="container min-h-[77.5vh]">
        {<RouterProvider router={router} />}
      </div>
      <Footer />
    </>
  )
}

export default App
