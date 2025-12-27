import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProfileHover = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const parsed = JSON.parse(userCookie);
                setUserData(parsed);
            } catch (e) {
                console.error("Failed to parse user cookie", e);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("user");
        setUserData(null);
        setShowProfile(false);
        navigate("/login");
    };

    return (
        <div
            className="relative inline-block group"
        >
            <button
                className="cursor-pointer text-2xl md:text-3xl"
                onClick={() => navigate("")}
                onMouseEnter={() => setShowProfile(true)}
            >
                <i className="bi bi-person"></i>
            </button>

            {/* Profile Box */}
            <div
                className={`absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded p-4 z-50 whitespace-normal transition-opacity duration-200 ${
                    showProfile ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setShowProfile(true)}
                onMouseLeave={() => setShowProfile(false)}
            >
                {userData ? (
                    <>
                        <h4 className="text-lg font-semibold mb-2">User Profile</h4>
                        <p className="truncate"><strong>Username:</strong> {userData.firstName}{userData.lastName}</p>
                        <p className="break-words"><strong>Email:</strong> {userData.email}</p>

                        <button
                            onClick={handleLogout}
                            className="mt-4 w-full bg-[#aa8265] hover:bg-[#876348] text-white font-semibold py-2 rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <p className="mb-3">You are not logged in.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full hover:bg-[#876348] bg-[#aa8265] text-white font-semibold py-2 rounded cursor-pointer"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfileHover;
