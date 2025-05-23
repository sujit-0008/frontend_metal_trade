import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import ProfilePage from './components/ProfilePage';

const SupplierDashboard = () => {
  const [activeSection, setActiveSection] = useState('yourproduct'); // Default section
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
        setMessage('Failed to load supplier data');
      }
    };
    fetchSupplierData();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/suppliers/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.products || []);
      } catch (error) {
        //console.error('Error fetching products:', error);
        setMessage('You dont have any uploaded products');
      }
    };
    fetchProducts();
  }, [token]);

  const handleProductUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post('http://localhost:5000/suppliers/products', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setMessage('Product uploaded successfully');
      event.target.reset();
      navigate('/supplier'); // Refresh to see new product
    } catch (error) {
      console.error('Error uploading product:', error);
      setMessage('Failed to upload product');
    }
  };

  const handleKYCSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await axios.post('http://localhost:5000/suppliers/kyc', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      setMessage('KYC submitted successfully');
      event.target.reset();
    } catch (error) {
      console.error('Error submitting KYC:', error);
      setMessage('Failed to submit KYC');
    }
  };

  if (!token) return <div>Please log in to access the dashboard.</div>;

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Supplier Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveSection('yourproduct')}
              className={`block w-full text-left py-2 px-4 rounded border-l-4 transitionn ${activeSection === 'yourproduct' ? 'border-blue-700 text-blue-700' : 'border-transparent hover:border-blue-700 hover:text-blue-700'}`}
            >
              Your Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('kyc')}
              className={`block w-full text-left py-2 px-4 rounded border-l-4 transitionn ${activeSection === 'kyc' ? 'border-blue-700 text-blue-700' : 'border-transparent hover:border-blue-700 hover:text-blue-700'}`}
            >
              KYC Form
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('productupload')}
              className={`block w-full text-left py-2 px-4 rounded border-l-4 transition ${activeSection === 'productupload' ? 'border-blue-700 text-blue-700' : 'border-transparent hover:border-blue-700 hover:text-blue-700'}`}
            >
              Product Upload
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveSection('profile')}
              className={`block w-full text-left py-2 px-4 rounded border-l-4 transition ${activeSection === 'profile' ? 'border-blue-700 text-blue-700' : 'border-transparent hover:border-blue-700 hover:text-blue-700'}`}
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              
              className={`block w-full text-left py-2 px-4 rounded border-l-4 transition ${activeSection === '' ? 'border-blue-700 text-blue-700' : 'border-transparent hover:border-blue-700 hover:text-blue-700'}`}
            >
              FAQ
            </button>
          </li>
        
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1  p-6">
      
      
        {activeSection === 'yourproduct' && (
          <div className=''>
             {message && <p className={message.includes('Failed') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
            <h2 className="text-2xl font-semibold mb-2">Your Products</h2>
            {products.length > 0 ? (
              <div className="flex">
                {products.map(product => (
                   <div key={product.id} className='px-5'  >
                   <ProductCard
                       name={product.name}
                       price={product.price}
                       image={product.photo}
                       imageHover={product.photo}
                       buttonText="View Product"
                       onClick={() => navigate(`/product/${product.id}`)}
                   />
               </div>
                ))}
              </div>
            ) : (
              <p>No approved products found.</p>
            )}
          </div>
        )}
       {activeSection === 'kyc' && (
  !supplier?.kycApproved ? (
    <div>
      <h2 className="text-xl font-semibold mb-4">KYC Form</h2>
      {message && <p className={message.includes('Failed') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
      <form onSubmit={handleKYCSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Business Registration</label>
          <input type="file" name="kycBusinessReg" className="block w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Tax ID</label>
          <input type="file" name="kycTaxId" className="block w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Address Proof</label>
          <input type="file" name="kycAddressProof" className="block w-full p-2 border rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit KYC</button>
      </form>
    </div>
  ) : (
    <p>Your KYC is already approved!</p>
  )
)}
        {activeSection === 'productupload' && (
          supplier?.kycApproved ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Product Upload</h2>
              {message && <p className={message.includes('Failed') ? 'text-red-500' : 'text-green-500'}>{message}</p>}
              <form onSubmit={handleProductUpload} className="space-y-4">
                <input type="text" name="name" placeholder="Product Name" className="block w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" className="block w-full p-2 border rounded" />
                <input type="number" name="price" placeholder="Price" step="0.01" className="block w-full p-2 border rounded" required />
                <input type="text" name="type" placeholder="Type (e.g., Electronics)" className="block w-full p-2 border rounded" />
                <input type="text" name="category" placeholder="Category (e.g., Laptops)" className="block w-full p-2 border rounded" />
    
                <input type="file" name="productImage" className="block w-full p-2 border rounded" required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload Product</button>
              </form>
            </div>
          ) : (
            <p>Please submit and get your KYC approved before uploading products.</p>
          )
        )}

{activeSection === 'profile' && (
  <ProfilePage {...supplier} />

)}

      </div>
      
    </div>
  );
};

export default SupplierDashboard;