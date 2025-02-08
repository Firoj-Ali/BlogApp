import React from 'react'
import Container from '../container/Container'
import { useNavigate, Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import {Logo} from '../index'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Post",
            slug: "/all-post",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <>
            <header className='py-3 shadow bg-gray-500'>
                <Container>
                    <nav className='flex'>
                        <div className='mr-4'>
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <ul>
                            {
                                navItems.map((item) => item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'

                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null)

                            }

                            {
                                authStatus && (
                                    <li>
                                        <LogoutBtn />
                                    </li>
                                )
                            }
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}
