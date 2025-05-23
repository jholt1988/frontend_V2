import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
