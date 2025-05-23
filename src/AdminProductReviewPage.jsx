import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProductReviewPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage]= useState('')
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/productreview/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleApproval = async (approved) => {
    try {
      await axios.post(`http://localhost:5000/admin/products/${id}/approve`, { approved }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`Product ${approved ? 'approved' : 'rejected'} successfully`);
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      console.error('Error updating product approval:', err);
      setError('Failed to update product status');
    }
  };

  if (!token || !JSON.parse(atob(token.split('.')[1])).role === 'ADMIN') return <div className="container mx-auto p-4 text-red-500">Please log in as an admin to access this page.</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if(message)return <div className="container mx-auto p-4 text-green-500">{message}</div>;
  if (!product) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Review - ID {id}</h1>
      <div className="bg-white shadow rounded-lg p-4">
        {product.photo && <img src={product.photo} alt={product.name} className="w-full h-64 object-cover mb-2 rounded" />}
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="mb-2">Description: {product.description || 'N/A'}</p>
        <p className="mb-2">Price: ${product.price || '0'}</p>
        <p className="mb-2">Type: {product.type || 'N/A'}</p>
        <p className="mb-2">Category: {product.category || 'N/A'}</p>
        <p className="mb-2"><strong>Status:</strong> {product.approved ? 'Approved' : 'Pending'}</p>
        {!product.approved && (
          <div className="mt-4 space-x-4">
            <button onClick={() => handleApproval(true)} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Approve
            </button>
            <button onClick={() => handleApproval(false)} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductReviewPage;