import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    ownerName: '', email: '', phone: '', companyName: '', address: '', password: '',
    ownerPhoto: null, companyPhotos: []
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'ownerPhoto' || name === 'companyPhotos') {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'companyPhotos' ? [...prev.companyPhotos, ...files] : files[0]
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'companyPhotos' && Array.isArray(formData[key])) {
        formData[key].forEach(file => data.append('companyPhotos', file));
      } else {
        data.append(key, formData[key]);
      }
    });

    axios.post('http://localhost:5000/suppliers/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => setMessage(response.data.message || 'Registration successful'))
      .catch(err => {
        console.error('Registration error:', err);
        setMessage(err.response?.data?.error || 'Registration failed');
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Register as Supplier</h1>
      {message && (
        <p className={`mb-4 text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Owner Name</label>
          <input name="ownerName" placeholder="Enter owner name" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input name="email" type="email" placeholder="Enter email" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input name="phone" placeholder="Enter phone number" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input name="companyName" placeholder="Enter company name" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input name="address" placeholder="Enter address" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input name="password" type="password" placeholder="Enter password" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Owner Photo</label>
          <input name="ownerPhoto" type="file" onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Company Photos</label>
          <input name="companyPhotos" type="file" multiple onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
