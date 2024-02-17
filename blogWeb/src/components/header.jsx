import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user , handleLogout}) => {
    const userid = user?.uid;
    const username = user?.displayName;
    console.log("userid = ", userid);
    console.log("username = ", username);
    const profilePhoto = "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
    return (
        <header className="p-2 lg:p-5 fixed top-0 left-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md px-2 py-1.5 flex items-center justify-between">

            <Link to="/" className="flex items-center">
                <img
                    className="w-8 h-8"
                    src="https://cdn-icons-png.flaticon.com/128/9360/9360864.png"
                    alt="Brand Logo"
                />
                <span className="text-lg text-black font-semibold hover:text-gray-700 dark:hover:text-gray-300 ml-1.5">Brand Name</span>
            </Link>

            <ul className="hidden lg:flex items-center space-x-0 hover:bg-2b2d42 text-white p-2">
                <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200" onClick={() => {
                }}>Home</Link></li>
            </ul>
            {userid ? (
                <>
                    {/* <Link to="/">
                        <div className=' w-10'>
                            <img src={profilePhoto} alt="profile logo" />
                        </div>
                        <p>{username}</p>
                        <li className='nav-item nav-link'>Logout</li>
                    </Link> */}
                    <Link to="/userpage" className="flex items-center space-x-2">
                        <div className='w-10'>
                            <img src={profilePhoto} alt="profile logo" className="rounded-full w-full h-full object-cover" />
                        </div>
                        <p className='text-black'>{username}</p>
                        <li className='list-none nav-item nav-link cursor-pointer text-white bg-black p-2 rounded'
                            onClick={handleLogout}
                        >Logout</li>
                    </Link>


                </>
            ) : (
                <Link to="/auth" className="bg-black inline-block py-1 px-2 rounded text-white hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Login
                </Link>
            )}

            {/* Hamburger menu for mobile */}
            <button
                aria-label="Menu"
                className="block lg:hidden focus:outline-none md:px-2 rounded-full bg-transparent border border-gray-600 hover:bg-gray-100 hover:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>
        </header>

    );
};

export default Header;
