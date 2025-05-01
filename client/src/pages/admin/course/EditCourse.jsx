import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseTab from './CourseTab';

const EditCourse = () => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900 min-h-screen p-8 mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-0">
            Add detailed information about your course
          </h1>
          <Link to="lecture">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Go to Lectures Page
            </Button>
          </Link>
        </div>

        {/* Course Tab Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <CourseTab />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
