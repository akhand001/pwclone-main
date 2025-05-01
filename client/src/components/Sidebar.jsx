import { ChartBar, LayoutDashboard, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false); // Auto-close on mobile
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out 
        ${isOpen ? "w-64" : "w-0"} 
        overflow-hidden lg:static lg:w-64`}
      >
        <div className="flex items-center justify-between px-4 py-4 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            E-MARROW
          </h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-white transition"
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-4 space-y-4">
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-2 py-2 rounded-md transition text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white ${location.pathname === "/admin/dashboard"
                ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                : ""
              }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/course"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-2 py-2 rounded-md transition text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white ${location.pathname === "/admin/course"
                ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                : ""
              }`}
          >
            <ChartBar size={22} />
            <span>Courses</span>
          </Link>
        </nav>

        {/* Toggle Button at Bottom */}
        <div className="absolute bottom-12 left-0 w-full px-4">
          <button
            onClick={toggleSidebar}
            className="w-full lg:hidden flex items-center justify-center gap-2 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
            {isOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? "ml-0 lg:ml-64" : "ml-0"
          }`}
      >
        {/* Mobile Topbar */}
        <div className="flex items-center justify-between px-4 pt-10 pb-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 dark:text-gray-300"
            aria-label="Open Sidebar"
          >
            <Menu size={30} />
          </button>
        </div>


        {/* Page Content */}
        <div className="p-4 sm:p-6 md:p-10 w-full max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
