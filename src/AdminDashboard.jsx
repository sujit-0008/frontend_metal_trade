import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SupplierCard from './components/SupplierCard';

const AdminDashboard = () => {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(true);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));

            if (decoded.role !== 'ADMIN') {
                setMessage('Access Denied: Admin role required');
                navigate('/login');
                return;
            }

            axios.get('http://localhost:5000/admin/notifications', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setNotifications(response.data.notifications);
            }).catch(() => {
                setMessage('Failed to load notifications');
            });

        } catch (e) {
            console.error('Token decode error:', e.message);
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) return;

        axios.get('http://localhost:5000/admin/suppliers/approved-kyc', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setSuppliers(response.data.suppliers);
        }).catch(() => {
            setMessage('Failed to load suppliers');
        });
    }, [token]);

    const handleNotificationClick = (notif) => {
        const message = notif.message.toLowerCase();
        if (message.includes("kyc")) {
            navigate(`/kycreview/${notif.supplierId}`);
        } else if (message.includes("product")) {
            navigate(`/newproduct/${notif.id}`);
        }
    };

    if (message.includes('Access Denied')) {
        return (
            <div className="container mx-auto p-4 text-red-500">
                {message} <a href="/login" className="text-blue-500 underline">Login</a>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100 h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-10 gap-4">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-md p-4">
                    <ul>
                        <li
                            className={`mt-5 cursor-pointer border-l-4 px-2 py-2 font-semibold transition ${!showNotification
                                ? 'border-blue-700 text-blue-700'
                                : 'border-transparent hover:border-blue-700 hover:text-blue-700'
                                }`}
                            onClick={() => setShowNotification(false)}
                        >
                            All Suppliers
                        </li>
                        <li
                            className={`mt-5 cursor-pointer border-l-4 px-2 py-2 font-semibold transition ${showNotification
                                ? 'border-blue-700 text-blue-700'
                                : 'border-transparent hover:border-blue-700 hover:text-blue-700'
                                }`}
                            onClick={() => setShowNotification(true)}
                        >
                            Notifications
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="sm:col-span-8 col-span-1 bg-gray-50 rounded-xl shadow p-4 sm:p-8">
                    <div className="border-b pb-4">
                        <h1 className="text-2xl font-semibold">{showNotification ? 'Notification' : 'Suppliers'}</h1>
                    </div>
                    

                    {showNotification ? (
                        <div className="mt-6 space-y-4">
                            {notifications.length > 0 ? notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    className="cursor-pointer rounded border p-4 shadow-sm transition hover:shadow-md"
                                    onClick={() => handleNotificationClick(notif)}
                                >
                                    <h2 className="text-lg font-semibold text-slate-700">
                                        {notif.message.includes("kyc") ? "New KYC Request" : "New Product Request"}
                                    </h2>
                                    <p className="text-sm text-slate-600">{notif.message}</p>
                                </div>
                            )) : (
                                <p className="text-gray-500">No notifications found.</p>
                            )}
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {suppliers.length > 0 ? suppliers.map(item => (
                                <SupplierCard
                                    key={item.email}
                                    ownerName={item.ownerName}
                                    companyName={item.companyName}
                                    address={item.address}
                                    email={item.email}
                                    id={item.id}
                                    phone={item.phone}
                                    photo={item.ownerPhoto}
                                />
                            )) : (
                                <p className="text-gray-500">No suppliers found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
