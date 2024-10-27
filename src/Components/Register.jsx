import React ,{useState} from 'react'
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';


const Register = (props) => {

    let server_uri = import.meta.env.VITE_REACT_APP_SERVER_URI;
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        let res = await fetch(server_uri + "api/v1/user/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        setLoading(false);
        let user = await res.json();
        props.handleLogin(user);        
    }

    return (
        <>

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="mx-auto max-w-2xl m-10 bg-white">
                <div className='flex flex-col border border-black rounded-3xl justify-center p-5 gap-5 shadow-2xl'>
                    <h1 className='text-4xl text-center font-bold bg-blue-200 w-full py-1 rounded-lg'><span className='text-blue-700 m-0'>&lt;</span> Key<span className='text-blue-700 m-0'>Nest /&gt;</span></h1>
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-64 h-px my-1 bg-blue-900 border-0" />
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">SIGN IN</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                        <input {...register('username', { required: { value: true, message: "Username is required" }, minLength: { value: 5, message: "Username must contain minimum 5 characters" } })} type="text" placeholder="Enter your Username" className='border-2 border-blue-600 rounded-full px-2 py-1 mt-5' />
                        {errors.username && <div className='text-red-600 text-sm'>{errors.username.message}</div>}
                        <input {...register('email', { required: { value: true, message: "Email is required" } })} type="text" placeholder="Enter your Email" className='border-2 border-blue-600 rounded-full px-2 py-1 mt-5' />
                        {errors.email && <div className='text-red-600 text-sm'>{errors.email.message}</div>}
                        <input {...register('password', { required: { value: true, message: "Password is required" }, minLength: { value: 7, message: "Password must contain minimum 7 characters" } })} type="password" placeholder='Enter passowrd' className='border-2 border-blue-600 rounded-full px-2 py-1 mt-5' />
                        {errors.password && <div className='text-red-600 text-sm'>{errors.password.message}</div>}
                        <input disabled = {loading} type="submit" value="Sign In" className='bg-blue-700 px-3 py-1 text-center text-white hover:bg-blue-400 border border-blue-900 rounded-md cursor-pointer mt-5' />
                    </form>
                    <div className='text-center'>
                        <p>Already have an account? <Link to="/" className='text-blue-500'>Login</Link></p>
                    </div>
                    {loading && <Spinner/>}
                </div>
            </div>
        </>
    )
}

export default Register