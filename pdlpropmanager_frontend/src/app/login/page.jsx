'use client';

import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import {useToast} from '@/lib/useToast';
import withGuest from '../lib/withGuest';
import Link from 'next/link';

 function LoginPage() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const {success, error, warning, info} = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const { token } = await loginUser(formData);
      login(token); // stores token + user
      success("Login successful!");
  
    } catch (errorMsg) {
      error(errorMsg.message || "Login failed");
  }   finally {
      setLoading(false);
    }
  };


  
    return (
          <div className='card w-96 mx-auto mt-10 p-6 shadow-md shadow-gray-700 rounded'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                className='input'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  className='input'
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className='btn border-b-cyan-700' type="submit">Login</button>
            </form>
            <p>
              <Link href="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
              Don't have an account? <Link href="/register">Register</Link>
            </p>
          </div>
        );
}
    
export default withGuest(LoginPage);