import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Spinner from './Spinner';

const Manager = (props) => {
    
    const server_uri = import.meta.env.VITE_REACT_APP_SERVER_URI;

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [passwordArray, setpasswordArray] = useState([]);

    const getPassword = async () => {
        let req = await fetch(server_uri+`api/v1/passwords/${props.user_id}`);
        let passwords = await req.json();
        await setpasswordArray(passwords);
    }

    useEffect(() => {
        getPassword();
    }, [props])


    const togglePassword = () => {
        if (ref.current.src.includes("icons/eye.svg")) {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eye-close.svg";
        }
        else {
            ref.current.src = "icons/eye.svg";
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        let newEntry = {...form, id:uuidv4()};
        setLoading(true);
        let res = await fetch(server_uri+`api/v1/passwords/save/${props.user_id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newEntry) });
        setpasswordArray((prevArray) => [...prevArray, newEntry]);
        setLoading(false);
        await reset();
        toast.success('Password Saved', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you wish to delete this password");
        if (c) {
            setLoading(true);
            let res = await fetch(server_uri + `api/v1/passwords/delete`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id}) });
            await getPassword();
            setLoading(false);
            toast('Password Deleted !', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        }
    }

    const editPassword = async (id) => {
        let item = passwordArray.find(item => item.id === id);
        setForm({ site: item.site, username: item.username, password: item.password });
        setpasswordArray(passwordArray.filter((item) => item.id != id));

    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const reset = async () => {
        await setForm({ site: "", username: "", password: "" });
    }

    const copyText = (text) => {
        toast('Copied to Clipboard !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
        });
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>


            <div className="mx-auto max-w-2xl m-10 mb-0">
                <h1 className='text-4xl text-center font-bold'><span className='text-blue-700 m-0'>&lt;</span> Key<span className='text-blue-700 m-0'>Nest /&gt;</span></h1>
                <p className='text-center text-sm text-blue-900 font-light'>Your own Password Manager</p>
                <div className="flex flex-col p-5 gap-y-5 items-center">
                    <input onChange={handleChange} value={form.site} className='p-3 py-1 rounded-lg border border-blue-800 w-full' type="text" placeholder='Website URL' id='website' name='site' />
                    <div className="flex gap-x-2 w-full justify-between">
                        <input onChange={handleChange} value={form.username} className='p-3 py-1 rounded-lg border border-blue-800 w-full' type="text" placeholder='Username' id='username' name='username' />
                        <div className="relative w-full z-0">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} className='p-3 py-1 rounded-lg border border-blue-800 w-full' type="password" placeholder='Password' id='password' name='password' /><span className='absolute right-2 py-1 cursor-pointer' onClick={togglePassword}><img ref={ref} src="icons/eye.svg" alt="eye" className='p-1' /></span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button disabled = {loading} onClick={savePassword} className='bg-blue-700 rounded-lg w-fit text-white border border-blue-800 px-2 py-1 hover:bg-blue-500 flex justify-center gap-1'>
                            <lord-icon
                                src="https://cdn.lordicon.com/fjvfsqea.json"
                                trigger="click"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: '20px', height: '20px' }}
                                className="p-5 invert-0">
                            </lord-icon><span>Save</span></button>
                    </div>
                </div>

                <h1 className='text-center font-bold m-3 text-xl text-blue-900'>Your Passwords</h1>
                {loading && <Spinner/>}
                {!loading && passwordArray.length === 0 && <div className='text-lg text-center'>You have No Passwords</div>}
                {!loading && passwordArray.length !== 0 && <table className="table-auto w-full rounded-lg overflow-hidden">
                    <thead className='bg-blue-400 text-white'>
                        <tr>
                            <th className='py-2'>Website</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-blue-100'>
                        {passwordArray.map((password, index) => {
                            return <tr key={index}>
                                <td className='py-2 text-center border-2 border-white'>
                                    <div className="flex justify-around items-center p-1">
                                        <span>{password.site}</span>
                                        <button className='p-1 rounded-md hover:bg-white' onClick={() => { copyText(password.site) }}><img src="icons/copy.svg" alt="copy" /></button>
                                    </div>
                                </td>
                                <td className='py-2 text-center border-2 border-white'>
                                    <div className="flex justify-around items-center p-1">
                                        <span className='mx-2'>{password.username}</span>
                                        <button className='p-1 rounded-md hover:bg-white' onClick={() => { copyText(password.username) }}><img src="icons/copy.svg" alt="copy" /></button>
                                    </div>
                                </td>
                                <td className='py-2 text-center border-2 border-white'>
                                    <div className="flex justify-around items-center p-1">
                                        <span className='mx-2'>{password.password}</span>
                                        <button className='p-1 rounded-md hover:bg-white' onClick={() => { copyText(password.password) }}><img src="icons/copy.svg" alt="copy" /></button>
                                    </div>
                                </td>
                                <td className='py-2 text-center border-2 border-white'>
                                    <div className="flex justify-center items-center p-1 gap-x-2">
                                        <button className='p-1 rounded-md hover:bg-white' onClick={() => { deletePassword(password.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="click"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{ width: '20px', height: '20px' }}>
                                            </lord-icon></button>
                                        <button className='p-1 rounded-md hover:bg-white' onClick={() => { editPassword(password.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/fikcyfpp.json"
                                                trigger="click"
                                                colors="primary:#000000,secondary:#000000"
                                                style={{ width: '20px', height: '20px' }}>
                                            </lord-icon></button>
                                    </div>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>}
            </div>
        </>
    )
}

export default Manager