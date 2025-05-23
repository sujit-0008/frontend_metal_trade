import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch CAPTCHA on component mount
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/generate-captcha");
        setCaptchaId(response.data.captchaId);
        setCaptchaText(response.data.captchaText);
      } catch (err) {
        setError("Failed to load CAPTCHA");
      }
    };
    fetchCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/auth/login', formData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        const token = response.data.token;
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const role = decoded.role;

        if (role === 'SUPPLIER') {
          navigate('/supplier');
        } 
        else if (role === 'ADMIN') {
          navigate('/admin');
        }
        else if (role === 'CUSTOMER') {
          navigate('/');
        } else {
          setMessage('Unknown role');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        setMessage(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      {message && (
        <div>
          <p className={`mb-4 text-center ${message.includes('Incorrect') ? 'text-red-500' : 'text-green-500'}`}>
            {message}   <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              forget Password 
            </span>
          </p>

          <p className="mb-4 text-center">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </p>
        </div>

      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
