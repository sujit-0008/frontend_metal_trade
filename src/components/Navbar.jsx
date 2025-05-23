import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, X,Home } from 'lucide-react'; // Optional: `lucide-react` for icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;
  const isAdmin = role === 'ADMIN';
  const isSupplier=role==='SUPPLIER';

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
         <Home/> MetalTrade
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <form onSubmit={handleSearch} className="flex flex-1 mx-6 max-w-md">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-xl hover:bg-blue-700">
            Search
          </button>
        
        </form>

        

        <div className="hidden md:flex items-center gap-4">
        <Link to="/about" className="px-4 py-2 text-blue-600 hover:text-blue-800">
            About us
          </Link>
          {isAdmin && <Link to="/admin" className="px-4 py-2 text-blue-600 hover:text-blue-800">
            Admin Dashbord
          </Link>}
        
        {isSupplier && <Link to="/supplier" className="px-4 py-2 text-blue-600 hover:text-blue-800">
            Supplier Dashbord
          </Link>}
          <Link
            to="/signup"
            className="block text-blue-600 hover:text-blue-800 px-4"
            onClick={() => setIsOpen(false)}
          >
            Sign up
          </Link>
          <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800">
            login 
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Join as Seller
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
              <Link
            to="/signup"
            className="block text-blue-600 hover:text-blue-800 px-4"
            onClick={() => setIsOpen(false)}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="block text-blue-600 hover:text-blue-800 px-4"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
