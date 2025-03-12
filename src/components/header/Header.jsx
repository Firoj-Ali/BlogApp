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
  <header className="navbar bg-base-100 shadow-sm">
    
    <div className="flex-1">
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <div className="flex-none">
      <nav className="flex items-center gap-4">
        <ul className="flex gap-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="btn btn-ghost hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
        {authStatus && <LogoutBtn />}
      </nav>
    </div>
    
  </header>
</>

    )
}