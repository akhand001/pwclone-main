import React from "react";
import { Button } from "@/components/ui/button";
import { TableDemo } from "@/components/ui/table1";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center px-2 sm:px-4 mt-12">
      <div className="w-full max-w-2xl p-0 sm:p-4 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 dark:bg-gradient-to-br dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-700 rounded-xl shadow-md transition-all duration-300 ease-in-out">
        {/* Title and Create Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-1xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-0">
            Courses
          </h1>
          <Button
            onClick={() => navigate(`create`)}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium py-2 px-5 rounded-full shadow-md hover:scale-105 transition-all duration-300 text-sm"
          >
            Create Course
          </Button>
        </div>

        {/* Table Component */}
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-md shadow-md p-3">
          <TableDemo />
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
