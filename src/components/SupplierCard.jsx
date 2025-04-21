import React from 'react';

const SupplierCard = ({ address, companyName, email, id, ownerName, phone, photo }) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="rounded-lg border bg-white px-3 pt-6 pb-6 shadow-sm">
        <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden">
          <span className="absolute right-0 m-1 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-1"></span>
          <img
            className="w-full h-full object-cover"
            src={photo || 'https://via.placeholder.com/150'}
            alt={ownerName}
          />
        </div>
        <h1 className="mt-2 text-center text-base font-semibold text-gray-900">{ownerName}</h1>
        <h3 className="text-center text-sm text-gray-600">{companyName}</h3>
        <p className="text-center text-xs text-gray-500">{address}</p>

        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-xs text-gray-700 shadow-sm">
          <li className="flex justify-between py-1">
            <span>Email</span>
            <span className="text-right">{email}</span>
          </li>
          <li className="flex justify-between py-1">
            <span>Phone</span>
            <span className="text-right">{phone}</span>
          </li>
          <li className="flex justify-between py-1">
            <span>ID</span>
            <span className="text-right">{id}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SupplierCard;
