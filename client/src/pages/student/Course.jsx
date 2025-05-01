import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {
    const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image";
    const thumbnail = course?.courseThumbnail?.startsWith("http")
        ? course.courseThumbnail
        : fallbackImage;

    return (
        <Link to={`/course-detail/${course._id}`} className="block">
            <Card className="overflow-hidden rounded-2xl dark:bg-gray-800 bg-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 w-full max-w-sm mx-auto h-[400px] group">
                
                {/* Thumbnail */}
                <div className="relative">
                    <img
                        src={thumbnail}
                        alt={course?.courseTitle || "Course Thumbnail"}
                        className="w-full h-[150px] object-cover object-center transition-opacity group-hover:opacity-90"
                    />
                </div>

                {/* Content */}
                <CardContent className="px-5 py-4 space-y-3">
                    
                    {/* Title */}
                    <h2 className="text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white transition group-hover:text-blue-600">
                        {course?.courseTitle || "Untitled Course"}
                    </h2>

                    {/* Creator Info */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <Avatar className="h-8 w-8">
                                <AvatarImage 
                                    src={course?.creator?.PhotoUrl || "https://github.com/shadcn.png"} 
                                    alt={course?.creator?.name || "User"} 
                                />
                                <AvatarFallback>
                                    {course?.creator?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                                {course?.creator?.name || "Unknown Creator"}
                            </span>
                        </div>
                        <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                            {course?.courseLevel || "Beginner"}
                        </Badge>
                    </div>

                    {/* Optional Description */}
                    {course?.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {course.description}
                        </p>
                    )}

                    {/* Price */}
                    <div className="text-base font-bold text-gray-900 dark:text-white">
                        ₹{course?.coursePrice || "Free"}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default Course;
