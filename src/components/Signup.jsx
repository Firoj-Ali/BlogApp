import React, { useState } from 'react'
import { Input, Button, Logo } from './index'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'

export default function Signup() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const session = await authService.createAccount(data)

            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-700 shadow-md rounded-xl p-10 border border-black/10`}>
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                                label='Full name:'
                                type='text'
                                placeholder='enter your name'
                                {...register('name', {
                                    required: true,
                                })}
                            />
                            <Input
                                label='Email:'
                                type='email'
                                placeholder='enter your email'
                                {...register('email', {
                                    required: true,
                                })}
                            />

                            <Input
                                label='Password:'
                                type='password'
                                placeholder='password'
                                {...register('password', {
                                    required: true,
                                })}
                            />

                            <Button type='submit' className='w-full'>Sign up</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}