import React from 'react';
import '../../assets/css/Header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/assets/logo.png" alt="Project Logo" className="logo" />
                <nav>
                    <a href="/news">News</a>
                    <a href="/about">About</a>
                    <a href="/learning">Learning</a>
                    <a href="/my-agent">My Agent</a>
                    <a href="/my-services">My Services</a>
                </nav>
            </div>
            <div className="header-middle">
                {/* Empty for now */}
            </div>
            <div className="header-right">
                <img src="/assets/user-logo.png" alt="User Logo" className="user-logo" />
                <img src="/assets/settings-icon.png" alt="Settings" className="settings-icon" />
            </div>
        </header>
    );
};

export default Header;