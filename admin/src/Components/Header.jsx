import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [profileOpen, setProfileOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Guest',
        role: 'User',
        email: '',
        avatar: 'img/profil.png'
    });
    const profileRef = useRef(null);
    const toggleRef = useRef(null);

    // Load profile data from localStorage on mount
    useEffect(() => {
        try {
            const storedProfile = localStorage.getItem('user');
            if (storedProfile) {
                setProfile(JSON.parse(storedProfile));
            }
        } catch (error) {
            console.error('Error parsing profile data from localStorage', error);
        }
    }, []);

    // Toggle the profile dropdown
    const toggleProfile = () => {
        setProfileOpen(prev => !prev);
    };

    // Close dropdown if clicking outside the profile area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        // Optionally remove any other authentication tokens
        // Redirect to login page
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-800 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-black text-white rounded-lg hidden lg:block">
                        Flow Shop
                    </button>
                    {/* Mobile menu button */}
                    <button id="menuButton" className="lg:hidden p-2 rounded-md">
                        <i className="bi bi-list text-2xl" />
                    </button>
                    <div className="relative hidden lg:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border rounded-lg w-64"
                        />
                        <svg
                            className="w-4 h-4 absolute left-3 top-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center space-x-4 relative">
                    {/* Dark mode toggle */}
                    <div className="relative inline-block w-11 h-5 hidden lg:block">
                        <input
                            id="switch-component"
                            type="checkbox"
                            className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                        // Connect your dark mode toggle handler here if needed
                        />
                        <label
                            htmlFor="switch-component"
                            className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                        ></label>
                    </div>
                    <button className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden">
                        <i className="bi bi-search" />
                    </button>
                    <button className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <i className="bi bi-bell" />
                    </button>
                    {/* Profile Button */}
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        id="profileButton"
                        onClick={toggleProfile}
                        ref={toggleRef}
                    >
                        <img
                            src={"img/profil.png"}
                            width={50}
                            alt="Profile"
                            className="rounded-full"
                        />
                        <div className="ms-3 font-medium hidden lg:block">
                            <h6>{profile.name}</h6>
                            <p className="text-gray-400">{profile.role}</p>
                        </div>
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                        <div
                            ref={profileRef}
                            className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50"
                        >
                            <div className="p-4">
                                <div className="flex items-center">
                                    <img
                                        src={"img/profil.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {profile.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                            {profile.email}
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-3 border-gray-300 dark:border-gray-600" />
                                <ul>
                                    {/* <li>
                    <a
                      href="#"
                      className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    >
                      Settings
                    </a>
                  </li> */}
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
