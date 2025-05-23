'use client';

import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { registerUser } from '@/services/authService';

import Link from 'next/link';
import withGuest from '../lib/withGuest';
import { useToast } from '@/lib/useToast';
 function RegisterPage() {
  const {success, error, warning, info} = useToast();
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '', // default role
  });

  const [isError, setIsError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsError('');
    try {
      const { token } = await registerUser(formData);
      login(token);
      success("Registration successful!"); // auto-login after registration
    } catch (isError) {
      error(isError.message || "Registration failed");
  }  finally {
      setLoading(false);
    }
  };
  
  

  return (
     <div className='card w-96 mx-auto mt-10 p-6 shadow-md shadow-gray-700 rounded'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input className='input' type="text" name="name" value={formData.name} onChange={ handleChange } required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input  className='input'type="email" name="email" value={formData.email} onChange={ handleChange } required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input  className='input' type="password" name="password" value={formData.password} onChange={ handleChange } required />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input className='input' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={ handleChange } required />
                    </div>
                    <label htmlFor="role">Role:</label>
                    <select className='select' name="role" value={formData.role} onChange={ handleChange } required>
                        <option value="tenant">Tenant</option>
                        <option value="admin">Admin</option>
                        <option value="contractor">Contractor</option>
                        <option value="staff">Staff</option>
                    </select>
    
                    <button className='btn border-b-cyan-700' type="submit">Register</button>
                </form>
                <p className='mt-4'>
                    Already have an account? <Link className='text-shadow-cyan-600  hover:underline' href="/login">Login</Link>
                </p>
            </div>
        );
    };

export default withGuest(RegisterPage);