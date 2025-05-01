import React from 'react';
import Course from './Course';
import { useLoadUserQuery } from '@/features/api/authApi';

// MyLearning Page Component
const MyLearning = () => {
    const { data, isLoading } = useLoadUserQuery();
    const MyLearning = data?.user.enrolledCourses || [];

    return (
        <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
            <h1 className="font-bold text-3xl text-gray-800">My Learning</h1>
            <div className="my-5">
                {isLoading ? (
                    <MyLearningSkeleton />
                ) : MyLearning.length === 0 ? (
                    <div className="text-gray-600 text-xl">You are not enrolled in any course.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {MyLearning.map((course, index) => (
                            <Course key={index} course={course} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;

// Enhanced Skeleton Loader Component
const MyLearningSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse shadow-lg"
                />
            ))}
        </div>
    );
};
