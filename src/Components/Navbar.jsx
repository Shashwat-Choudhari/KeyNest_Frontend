import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white flex justify-between gap-x-3 p-2 sticky z-50 top-0 w-full bg-opacity-95'>
            <div className="logo font-bold text-xl"><a className='hover:font-extrabold' href="/"><span className='text-blue-700 m-0'>&lt;</span> Key<span className='text-blue-700 m-0'>Nest /&gt;</span></a></div>
            {/* <ul className='flex gap-x-5'>
                <li className='pt-1'>
                    <a className='hover:font-bold' href="/">Home</a>
                </li>
                <li className='pt-1'>
                    <a className='hover:font-bold' href="/about">About</a>
                </li>
                <li className='pt-1'>
                    <a className='hover:font-bold' href="/contact">Contact</a>
                </li>
            </ul> */}
            <button className='flex bg-blue-700 p-2 py-1 rounded-full gap-1 hover:bg-blue-500'><img src="icons/icons-github.svg"/><a href="https://github.com/" target='_blank'>Github</a></button>
        </nav>
    )
}

export default Navbar