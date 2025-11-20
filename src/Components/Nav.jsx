import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/JustLogo.jpg'
import Services from '../Pages/Services'


export default function Nav() {
    const [open, setOpen] = React.useState(false)
    const [user, setUser] = useState(() => {
        try {
            const s = localStorage.getItem('user')
            return s ? JSON.parse(s) : null
        } catch {
            return null
        }
    })

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'user') {
                try {
                    setUser(e.newValue ? JSON.parse(e.newValue) : null)
                } catch {
                    setUser(null)
                }
            }
        }
        const onAuthChange = () => {
            try {
                const s = localStorage.getItem('user')
                setUser(s ? JSON.parse(s) : null)
            } catch {
                setUser(null)
            }
        }
        window.addEventListener('storage', onStorage)
        window.addEventListener('auth-change', onAuthChange)
        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('auth-change', onAuthChange)
        }
    }, [])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link to="/" className="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-10 w-auto object-contain cursor-pointer"
                />
                <span className="text-xl font-semibold text-[#426287]">CureLink</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/articles">Articles</Link>

                {user ? (
                    <Link to="/user" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition">
                        <span className="inline-block h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=426287&color=fff`}
                                alt="User Profile"
                                className="h-full w-full object-cover"
                            />
                        </span>
                        <span className="font-medium text-gray-700">{user.name || 'Profile'}</span>
                    </Link>
                ) : (
                    <Link
                        to="/login"
                        className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
                    >
                        Login
                    </Link>
                )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link to="/" className="block">Home</Link>
                <Link to="/about" className="block">About</Link>
                <Link to="/contact" className="block">Contact</Link>
                <Link to="/articles" className="block">Articles</Link>
                {user ? (
                    <Link to="/user" className="block px-3 py-2 rounded">{user.name || 'Profile'}</Link>
                ) : (
                    <Link to="/login" className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">Login</Link>
                )}
            </div>

        </nav>
    )
}
