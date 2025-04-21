import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from './components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch all products once
    useEffect(() => {
        axios.get('http://localhost:5000/public/products')
            .then(response => {
                const productsList = response.data.products || [];
                setProducts(productsList);
                applySearchFilter(productsList);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
                setProducts([]);
                setFiltered([]);
            });
    }, []);

    // When the URL search query changes, refilter
    useEffect(() => {
        applySearchFilter(products);
    }, [location.search, products]);

    const applySearchFilter = (list) => {
        const query = new URLSearchParams(location.search);
        const searchParam = query.get('q') || '';
        const result = list.filter(product =>
            product.name?.toLowerCase().includes(searchParam.toLowerCase())
        );
        setFiltered(result);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">Welcome to Retail Hub</h1>

            {error && <p className="text-red-500 ">{error}</p>}

            {/* Products Grid */}
            <div className="flex ">
                {filtered.length > 0 ? (
                    filtered.map(product => (
                        <div key={product.id} className=" p-5">
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                image={product.photo}
                                imageHover={product.photo}
                                buttonText="View Product"
                                onClick={() => navigate(`/product/${product.id}`)}
                            />
                        </div>
                      
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No products found.</p>
                )}
            </div>


        </div>
    );
};

export default HomePage;
