import React from 'react';

const ProfilePage = ({
  ownerName,
  email,
  phone,
  companyName,
  address,
  ownerPhoto,
  companyPhotos,
  kycApproved,
  kycBusinessReg,
  kycTaxId,
  kycAddressProof,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={ownerPhoto}
            alt={ownerName}
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h2 className="text-xl font-semibold capitalize">{ownerName}</h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phone}</p>
            <p className="mt-2 text-sm text-green-600">
              KYC Status: {kycApproved ? '✅ Approved' : '❌ Not Approved'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Company Details</h3>
        <p><span className="font-medium">Company Name:</span> {companyName}</p>
        <p><span className="font-medium">Address:</span> {address}</p>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Company Photo:</h4>
          {companyPhotos?.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Company ${index + 1}`}
              className="w-full max-w-sm rounded-lg shadow mb-4"
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">KYC Documents</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Business Registration: {kycBusinessReg ? '✅ Uploaded' : '❌ Not Uploaded'}</li>
          <li>Tax ID: {kycTaxId ? '✅ Uploaded' : '❌ Not Uploaded'}</li>
          <li>Address Proof: {kycAddressProof ? '✅ Uploaded' : '❌ Not Uploaded'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
