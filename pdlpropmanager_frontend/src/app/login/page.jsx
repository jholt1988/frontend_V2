'use client';

import { useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { loginUser } from '@/services/authService';
import { toast } from 'react-toastify';
import Link from 'next/link';
import withGuest from '../lib/withGuest';

 function LoginPage() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await loginUser(formData);
      login(token); // stores token + user
      toast.success("Login successful!");
  
    } catch (error) {
      toast.error(error.message || "Login failed");
  }   finally {
      setLoading(false);
    }
  };


  
    return (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Login</button>
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