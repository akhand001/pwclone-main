import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 shadow-md">
        <Navbar />
      </div>

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-10">
        <div className="w-full max-w-screen-2xl mx-auto bg-white dark:bg-gray-800 rounded-none sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row min-h-[60vh] gap-6">
              
              {/* Optional Sidebar - visible on large screens */}
              <aside className="hidden lg:block lg:w- bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4 rounded-lg">
                {/* Sidebar content */}
              </aside>

              {/* Main Content */}
              <section className="flex-1">
                <Outlet />
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-gray-900 text-center py-4 text-gray-600 dark:text-gray-400 text-sm">
        © 2025 E-Marrow. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
