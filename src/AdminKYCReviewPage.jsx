import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminKYCReviewPage = () => {
  const { id } = useParams();
  const [kycData, setKycData] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKYCData = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:5000/admin/kyc/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setKycData(response.data);
      } catch (err) {
        console.error('Error fetching KYC data:', err);
        setError('Failed to load KYC data');
      }
    };
    fetchKYCData();
  }, [id, token]);

  const handleApproval = async (approved) => {
    try {
      await axios.post(`http://localhost:5000/admin/kyc/${id}/approve`, { approved }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setError(`KYC ${approved ? 'approved' : 'rejected'} successfully`);
      setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      console.error('Error updating KYC approval:', err);
      setError('Failed to update KYC status');
    }
  };

  if (!token || !JSON.parse(atob(token.split('.')[1])).role === 'ADMIN') return <div className="container mx-auto p-4 text-red-500">Please log in as an admin to access this page.</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!kycData) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">KYC Review - Supplier {id}</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold">Supplier Details</h2>
        <p className="mb-2"><strong>Company Name:</strong> {kycData.companyName}</p>
        <div className="mb-2">
          <strong>Business Registration:</strong>
          {kycData.kycBusinessReg && <a href={kycData.kycBusinessReg} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">View Document</a>}
        </div>
        <div className="mb-2">
          <strong>Tax ID:</strong>
          {kycData.kycTaxId && <a href={kycData.kycTaxId} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">View Document</a>}
        </div>
        <div className="mb-2">
          <strong>Address Proof:</strong>
          {kycData.kycAddressProof && <a href={kycData.kycAddressProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">View Document</a>}
        </div>
        <p className="mb-2"><strong>Status:</strong> {kycData.kycApproved ? 'Approved' : 'Pending'}</p>
        {!kycData.kycApproved && (
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

export default AdminKYCReviewPage;