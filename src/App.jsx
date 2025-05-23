import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import SupplierDashboard from './SupplierDashboard';
import AdminDashboard from './AdminDashboard';
import ProductDetailPage from './ProductDetailPage';
import Navbar from './components/Navbar';
import AdminKYCReviewPage from './AdminKYCReviewPage';
import AdminProductReviewPage from './AdminProductReviewPage';
import SignUp from './Signup';
import AboutUs from './AboutUs';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;
  const isAdmin = role === 'ADMIN';
  const isSupplier = role === 'SUPPLIER';

  // Update token whenever it changes in localStorage (login/logout)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }, 500); // check every 0.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/supplier" element={isSupplier ? <SupplierDashboard /> : <LoginPage />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <LoginPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/kycreview/:id" element={isAdmin ? <AdminKYCReviewPage /> : <LoginPage />} />
        <Route path="/newproduct/:id" element={isAdmin ? <AdminProductReviewPage /> : <LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
