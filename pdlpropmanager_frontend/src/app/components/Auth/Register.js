import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import { useToast } from "@/lib/useToast";
import { a, s } from "framer-motion/client";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role:""
    });
    const { success, error } = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            error("Passwords do not match!");
            return;
        }
        try {
            const userData = await authService.registerUser(formData);
            console.log(userData)
            success("Registration successful!");
            navigate("/login");
        } catch (error) {
                error(error.message || "Registration failed");
        }
    };


    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="Tenant">Tenant</option>
                    <option value="Admin">Admin</option>
                    <option value="Contractor">Contractor</option>
                </select>

                <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Register;
