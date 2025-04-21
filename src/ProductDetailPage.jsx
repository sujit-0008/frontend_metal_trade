import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from './components/ProductDetail';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/public/products/${id}`)
      .then(response => {
        console.log('Product details response:', response.data);
        setProduct(response.data.product || response.data); // depending on API format
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details');
      });
  }, [id]);

  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!product) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div >
      {/* <h1 className="text-2xl font-bold mb-4">Product Details</h1>

      <img src={product.photo} alt={product.name} className="w-full h-64 object-cover mb-2 rounded" />

      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="mb-2">Description: {product.description || 'N/A'}</p>
      <p className="mb-2">Price: ₹{product.price || '0'}</p>
      <p className="mb-2">Type: {product.type || 'N/A'}</p>
      <p className="mb-2">Category: {product.category || 'N/A'}</p> */}

      <ProductDetail
        id={1}
        name={product.name}
        description={product.description || 'N/A'}
        photo={product.photo}
        price={product.price}
        supplierId={21}
        category={product.category}
        type={product.type}
      />
    </div>
  );
};

export default ProductDetailPage;
