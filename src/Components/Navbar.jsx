import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className='bg-slate-800 text-white flex justify-between gap-x-3 p-2 sticky z-50 top-0 w-full bg-opacity-95'>
            <div className="logo font-bold text-xl"><p className='hover:font-extrabold' href="/"><span className='text-blue-700 m-0'>&lt;</span> Key<span className='text-blue-700 m-0'>Nest /&gt;</span></p></div>
            <div className="flex gap-4">
                <button className='flex bg-blue-700 p-2 py-1 rounded-full gap-1 hover:bg-blue-500'><img src="icons/icons-github.svg" /><a href="https://github.com/" target='_blank'>Github</a></button>
                {props.user!=='' && <button onClick={props.handleLogout}><img className='mt-1 mr-5' src="icons/logout.svg" alt="Logout" /></button>}
            </div>
        </nav>
    )
}

export default Navbar