"use client";
import React, { useEffect, useState } from 'react';
import auth from './assets/auth.webp';
import eye from './assets/eye.svg';
import eyeh from './assets/eyeh.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

const Signup: React.FC = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [authDetails, setAuthDetails] = useState({ name: '', email: '', password: '' });
    const router = useRouter();
    const { signupUser } = useAuth();

    const handleInput = (type: string, value: string) => {
        setAuthDetails(prev => ({ ...prev, [type]: value }));
    }

    const postSignup = async () =>{
        try {
            const response = await signupUser(authDetails.name, authDetails.email, authDetails.password);
            if(response.token){
                localStorage.setItem('hedtech', response.token);
                router.push('/');
            } else {
                console.log("Failed to sign up");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('hedtech');
        if(token){
            router.push('/');
        }
    }, [])

    return (
        <section className='w-full h-screen flex bg-[#F5F5F5] justify-center items-center font-mono'>
            <section className='w-7/12 h-10/12 flex items-center justify-center bg-[#FFF] rounded-md max-sm:w-[95%] max-md:w-[80%]'>
                <section className='w-1/2 h-full flex flex-col py-18 px-8 gap-6 max-sm:w-full max-md:w-full'>
                    <p className='text-3xl font-semibold drop-shadow-xl'>Get Started Now</p>
                    <section className=' flex flex-col h-fit gap-3'>
                        <div className='w-full h-fit flex flex-col gap-1'>
                            <label htmlFor="name" className='text-lg font-semibold'>Name</label>
                            <input value={authDetails?.name} onChange={(e) => handleInput("name", e.target.value)} id="name" className='w-full h-10 border-2 border-gray-300 p-2 rounded-md outline-none' type="text" placeholder='Enter your name' />
                        </div>

                        <div className='w-full h-fit flex flex-col gap-1'>
                            <label htmlFor="email" className='text-lg font-semibold'>Email</label>
                            <input value={authDetails?.email} onChange={(e) => handleInput("email", e.target.value)} id="email" className='w-full h-10 border-2 border-gray-300 p-2 rounded-md outline-none' type="text" placeholder='Enter your email' />
                        </div>

                        <div className='w-full h-fit flex flex-col gap-1'>
                            <label htmlFor="password" className='text-lg font-semibold'>Password</label>
                            <div className='w-full h-fit flex border-2 border-gray-300 rounded-md items-center'>
                                <input value={authDetails?.password} onChange={(e) => handleInput("password", e.target.value)} id='password' prefix='wer' className='w-[calc(100%-24px)] h-10  p-2 rounded-md outline-none' type={isPasswordShown ? 'text' : 'password'} placeholder='Enter your Password' />
                                <Image className='w-9 h-9 p-2 cursor-pointer' onClick={() => setIsPasswordShown(!isPasswordShown)} src={isPasswordShown ? eye : eyeh} alt="eye" />
                            </div>
                        </div>
                        <button onClick={postSignup} className='w-full h-10 rounded-md mt-3 p-2 bg-[#3A5B22] text-white font-semibold cursor-pointer active:shadow-lg active:bg-green-800 active:font-bold'>
                            Sign up
                        </button>
                    </section>
                    <div className='w-full h-fit flex items-center justify-between'>
                        <div className='w-[calc(50%-25px)] h-[1px] bg-gray-300'></div>
                        <p>Or</p>
                        <div className='w-[calc(50%-25px)] h-[1px] bg-gray-300'></div>
                    </div>
                    <div className='w-full h-fit flex items-center justify-center text-xl gap-3'>
                        <p >Have an accoount?</p>
                        <Link href="/auth/signin">
                            <p className='cursor-pointer text-blue-500 font-semibold active:text-blue-600'>Login</p>
                        </Link>
                    </div>
                </section>
                <section className='w-1/2 h-full bg-left bg-no-repeat bg-cover rounded-md rounded-x-[25px] max-sm:hidden max-md:hidden' style={{ backgroundImage: `url(${auth?.src})` }}></section>
            </section>
        </section>
    )
};

export default Signup;