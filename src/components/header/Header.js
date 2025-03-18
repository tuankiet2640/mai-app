import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/Header.css';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../utils/AuthContext';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth() || { user: null, isAuthenticated: false };

    const dropdownMenus = {
        learning: [
            { label: 'Learning Home', path: '/learning' },
            { label: 'Courses', path: '/learning/courses' },
            { label: 'Tutorials', path: '/learning/tutorials' },
            { label: 'Documentation', path: '/learning/docs' },
            { label: 'Technology', path: '/learning/tech' }
        ],
        agents: [
            { label: 'Agents Home', path: '/agents' },
            { label: 'Claude', path: '/agents/claude' },
            { label: 'GPT', path: '/agents/gpt' },
            { label: 'Custom Agents', path: '/agents/custom' }
        ],
        services: [
            { label: 'Services Home', path: '/services' },
            { label: 'Chat', path: '/services/chat' },
            { label: 'Code', path: '/services/code' },
            { label: 'Images', path: '/services/images' }
        ],
        account: [
            { label: 'Profile', path: '/profile' },
            { label: 'Settings', path: '/settings' },
            { label: 'Billing', path: '/billing' },
            { label: 'Logout', action: 'logout' }
        ]
    };

    const handleAccountAction = (item) => {
        if (item.action === 'logout') {
            logout();
            navigate('/signin');
        }
        setActiveDropdown(null);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // Improved dropdown handling - clicking instead of hover
    const toggleDropdown = (dropdown) => {
        if (activeDropdown === dropdown) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(dropdown);
        }
    };

    // Handle clicking outside to close dropdown
    const handleClickOutside = () => {
        if (activeDropdown) {
            setActiveDropdown(null);
        }
    };

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <span className="text-xl font-bold text-white tracking-tight">M</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">MAI</span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            <Link 
                                to="/chat" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/chat') 
                                        ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                Chat
                            </Link>
                            
                            {/* Learning dropdown */}
                            <div className="relative dropdown-container">
                                <button 
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname.startsWith('/learning') 
                                            ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => toggleDropdown('learning')}
                                >
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
                                </button>
                                {activeDropdown === 'learning' && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={handleClickOutside}></div>
                                        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 py-1 z-20">
                                            {dropdownMenus.learning.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300"
                                                    role="menuitem"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {/* Agents dropdown */}
                            <div className="relative dropdown-container">
                                <button 
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname.startsWith('/agents') 
                                            ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => toggleDropdown('agents')}
                                >
                                    Agents
                                    <svg
                                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === 'agents' ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                {activeDropdown === 'agents' && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={handleClickOutside}></div>
                                        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 py-1 z-20">
                                            {dropdownMenus.agents.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300"
                                                    role="menuitem"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {/* Services dropdown */}
                            <div className="relative dropdown-container">
                                <button 
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname.startsWith('/services') 
                                            ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => toggleDropdown('services')}
                                >
                                    Services
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
                                </button>
                                {activeDropdown === 'services' && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={handleClickOutside}></div>
                                        <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 py-1 z-20">
                                            {dropdownMenus.services.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300"
                                                    role="menuitem"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <Link 
                                to="/about" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/about') 
                                        ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                About
                            </Link>
                        </nav>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            {/* User Menu */}
                            <div className="relative dropdown-container">
                                <button 
                                    className="flex items-center space-x-2"
                                    onClick={() => toggleDropdown('account')}
                                >
                                    <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user?.name || 'User'}
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-300">
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
                                        {user?.accountType || 'Free Account'}
                                    </span>
                                </button>
                                {activeDropdown === 'account' && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={handleClickOutside}></div>
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 py-1 z-20">
                                            {dropdownMenus.account.map((item) => (
                                                item.action ? (
                                                    <button
                                                        key={item.label}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300"
                                                        role="menuitem"
                                                        onClick={() => handleAccountAction(item)}
                                                    >
                                                        {item.label}
                                                    </button>
                                                ) : (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300"
                                                        role="menuitem"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                )
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Sign in
                            </Link>
                            <Link to="/signin" className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;