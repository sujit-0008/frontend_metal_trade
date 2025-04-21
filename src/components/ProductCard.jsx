import React from 'react';

const ProductCard = ({ name, price, image, imageHover, buttonText, onClick }) => {
  return (
    <div className="group my-10 flex w-full max-w-xs flex-col  rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl">
        <img
          className="peer absolute top-0 right-0 h-full w-full object-cover"
          src={image}
          alt="product image"
        />
        <img
          className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
          src={imageHover}
          alt="product image hover"
        />
      
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-base tracking-tight text-slate-900">{name}</h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">${price}</span>
            <span className="text-sm text-slate-900 line-through">${price + 100}</span>
          </p>
        </div>
        <button
          onClick={onClick}
          className="flex items-center justify-center w-full rounded-md bg-slate-900 px-5 py-2 text-sm font text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
