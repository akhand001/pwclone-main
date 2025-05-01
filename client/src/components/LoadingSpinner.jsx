import { Loader } from 'lucide-react';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-indigo-400">
      <div className="flex items-center justify-center p-6 rounded-full bg-white shadow-lg border-2 border-blue-500">
        <Loader className="animate-spin h-16 w-16 text-blue-600" />
      </div>
      <p className="mt-6 text-xl font-semibold text-gray-800 dark:text-white opacity-80">Loading, please wait...</p>
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 animate-pulse">
        <p>We'll get you to your content shortly...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
