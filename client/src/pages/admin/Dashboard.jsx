// src/pages/admin/Dashboard.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPuchaseCourseQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPuchaseCourseQuery();

  if (isLoading)
    return <h1 className="text-center text-xl mt-10">Loading...</h1>;

  if (isError)
    return (
      <h1 className="text-center text-red-500 text-xl mt-10">
        Failed to get purchased courses
      </h1>
    );

  const { purchasedCourse = [] } = data || {};

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Cards Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-10">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl text-center">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl text-center">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">₹{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl text-center">
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {new Set(purchasedCourse.map((c) => c.courseId._id)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700 dark:text-white">
            Course Prices Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            {courseData.length === 0 ? (
              <p className="text-center text-gray-500">No course data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4a90e2"
                    strokeWidth={3}
                    dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
