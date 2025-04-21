import React from "react";

const NotificationSettings = () => {
  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto font-sans">
      <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>

      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        {/* Sidebar */}
        <div className="col-span-2 hidden sm:block">
          <ul>
            <li className="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700">
              Users
            </li>
            <li className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition">
              Notifications
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-span-8 overflow-hidden rounded-xl bg-gray-50 px-8 shadow">
          <div className="border-b pt-4 pb-8">
            <h1 className="py-2 text-2xl font-semibold">Notification settings</h1>
          </div>


            <div  className="grid border-b py-6 sm:grid-cols-2 shadow">
              <div>
                <h2 className="text-lg font-semibold leading-4 text-slate-700">
                  New product/KYC
                </h2>
                <p className="text-slate-600">
                  Lorem ipsum dolor, Alias eligendi laboriosam magni reiciendis neque.
                </p>
              </div>
              
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
