import React , {useState} from 'react';
import { Link } from 'react-router-dom';

const Header = ({ regMode }) => {
    // const [isRegisterMode, setIsRegisterMode] = useState(true);
    return (
        <header className="p-2 lg:p-5 fixed top-0 left-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md px-2 py-1.5 flex items-center justify-between">
            {/* Brand name on the left */}
            <Link to="/" className="flex items-center">
                <img
                    className="w-8 h-8"
                    src="https://cdn-icons-png.flaticon.com/128/9360/9360864.png"
                    alt="Brand Logo"
                />
                <span className="text-lg text-black font-semibold hover:text-gray-700 dark:hover:text-gray-300 ml-1.5">Brand Name</span>
            </Link>

            {/* Navigation links on the right */}
            <ul className="hidden lg:flex items-center space-x-2 hover:bg-2b2d42 text-white p-2">
                <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200" onClick={() => {
                    // You might want to define the setActive function and state
                    // setActive("home");
                }}>Home</Link></li>
            </ul>

            {/* Register button  */}
            <Link to="/login" className="bg-black inline-block py-1 px-2 rounded text-white hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Login 
            </Link> 
            {/* <Link to="/register">
                <button
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                    className="bg-black text-white py-3 px-6 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
                >
                    {regMode ? 'Login' : 'Register'}
                </button>
            </Link> */}

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
