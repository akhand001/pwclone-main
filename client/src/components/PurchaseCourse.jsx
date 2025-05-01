import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const PurchaseCourseProtected = ({ children }) => {
    const { courseId } = useParams();
    const { data, isLoading, isError, error } = useGetCourseDetailWithStatusQuery(courseId);

    // Loading State: Show a loader and a text for better accessibility
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center text-gray-800 dark:text-white">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                    <span>Loading your course...</span>
                </div>
            </div>
        );
    }

    // Error Handling: Show a user-friendly error message if the API request fails
    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <h2 className="text-xl font-semibold mb-2">Error loading course data</h2>
                    <p className="mb-4">{error?.message || 'Please try again later.'}</p>
                    <Navigate to="/courses" />
                </div>
            </div>
        );
    }

    // If the course is not purchased, redirect the user
    if (!data?.purchased) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-gray-700 dark:text-white">
                    <h2 className="text-xl font-semibold mb-2">You need to purchase the course to access it</h2>
                    <Navigate to={`/course-detail/${courseId}`} />
                </div>
            </div>
        );
    }

    // If course is purchased, render the children
    return <>{children}</>;
};

export default PurchaseCourseProtected;
