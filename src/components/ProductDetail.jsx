import React from 'react';

const ProductDetail = ({ id, name, description, photo, price, supplierId, category, type }) => {
  return (
    <section className="py-12 sm:py-16 ">
      <div className="container border mx-auto px-4 py-5">
        {/* Product Info */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          {/* Product Image */}
          <div className="lg:col-span-3 lg:row-end-1 ">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5 ">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img className="h-full w-full object-cover" src={photo} alt={name} />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 border lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <img className="h-20 mb-3 rounded-lg border-2 border-gray-900 object-cover" src={photo} alt={name} />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{name}</h1>

            <div className="mt-5">
              <p className="text-gray-700">{description}</p>
              <p className="mt-2 text-lg font-semibold text-black">₹{price}</p>
            </div>

            {type && (
              <div>
                <h2 className="mt-8 text-base text-gray-900">Product Type</h2>
                <p className="mt-2 rounded-lg border px-6 py-2 font-bold">{type}</p>
              </div>
            )}

            {category && (
              <div>
                <h2 className="mt-8 text-base text-gray-900">Category</h2>
                <p className="mt-2 rounded-lg border px-6 py-2 font-bold">{category}</p>
              </div>
            )}

            <div>
              <h2 className="mt-8 text-base text-gray-900">Supplier ID</h2>
              <p className="mt-2 rounded-lg border px-6 py-2 font-medium text-gray-700">{supplierId}</p>
            </div>

            <div>
              <button  className="flex items-center justify-center w-full rounded-md bg-slate-900 px-5 py-2 text-sm font text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"> Contact Supplier </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
