import React from 'react';

const Breadcrumb = ({ label  }) => {
  return (
    <div className="bg-gray-50 py-12 w-screen leading-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <nav>
          <ul className="flex m-0 items-center p-0">
            <li className="text-left">
              <a
                href="#"
                title="Home"
                className="cursor-pointer text-gray-400 hover:text-gray-900"
              >
                <svg
                  className="block h-5 w-5 align-middle"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>

    
              <li  className="flex items-center text-left">
                <svg
                  className="block h-5 w-5 align-middle text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>

                <a
                  href="#"
                  title={item}
                  className="cursor-pointer text-sm font-normal leading-5 text-gray-400 hover:text-gray-900"
                >
                  {item}
                </a>
              </li>
        
          </ul>
        </nav>

        <p className="mt-5 text-lg font-bold leading-7 text-gray-800">
          {label}
        </p>

        <hr className="mt-8 border-t border-gray-300" />
      </div>
    </div>
  );
};

export default Breadcrumb;
