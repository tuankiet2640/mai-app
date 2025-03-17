import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Header.css';
import ThemeToggle from '../common/ThemeToggle';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const dropdownMenus = {
        learning: [
            { label: 'Courses', path: '/learning/courses' },
            { label: 'Tutorials', path: '/learning/tutorials' },
            { label: 'Documentation', path: '/learning/docs' }
        ],
        agent: [
            { label: 'Dashboard', path: '/my-agent/dashboard' },
            { label: 'Settings', path: '/my-agent/settings' },
            { label: 'History', path: '/my-agent/history' }
        ],
        services: [
            { label: 'my services', path: '/my-services' },

        ]
    };

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <img src="/assets/logo.png" alt="Project Logo" className="h-8 w-auto" />
                        <nav className="flex items-center space-x-4">
                            <Link to="/news" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                                News
                            </Link>
                            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                                About
                            </Link>
                            {/* Learning dorpdown */}
                            <div className="relative group"
                                onMouseEnter={() => setActiveDropdown('learning')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link to="/learning" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                                    Learning
                                    <svg
                                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'learning' ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </Link>
                                {activeDropdown === 'learning' && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu">
                                            {dropdownMenus.learning.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    role="menuitem"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                            {/* Agent dropdown*/}
                            <div className="relative group"
                                onMouseEnter={() => setActiveDropdown('agent')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link to="/agent" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                                    My agent
                                    <svg
                                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'agent' ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </Link>
                                {activeDropdown === 'agent' && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu">
                                            {dropdownMenus.agent.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    role="menuitem"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                            {/* Services dropdown */}
                            <div className="relative group"
                                onMouseEnter={() => setActiveDropdown('services')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link to="/agent" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md">
                                    My services
                                    <svg
                                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'services' ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </Link>
                                {activeDropdown === 'services' && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu">
                                            {dropdownMenus.services.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    role="menuitem"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                            {/* Similar dropdown structures if needed */}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <img src="/assets/user-logo.png" alt="User Logo" className="h-8 w-8 rounded-full" />
                        <img src="/assets/settings-icon.png" alt="Settings" className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;