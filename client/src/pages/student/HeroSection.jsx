import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-gray-900 dark:to-gray-700 py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-5xl font-extrabold mb-6 leading-tight tracking-wide">
          Unlock Your Potential with the Best Courses
        </h1>
        <p className="text-gray-300 dark:text-gray-200 mb-10 text-lg">
          Elevate your skills and career with our premium selection of courses, designed for growth.
        </p>

        {/* Search Form */}
        <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden max-w-2xl mx-auto mb-8">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to learn today?"
            aria-label="Search for courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
          />
          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-r-full hover:from-blue-700 hover:to-blue-800 transition-all">
            Search
          </Button>
        </form>

        {/* Explore Courses Button */}
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-blue-600 rounded-full px-8 py-4 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all mb-6"
        >
          Explore Courses
        </Button>

        {/* Owner Signature */}
        <div className="mt-8 text-white font-medium text-lg">
          <p>Created with passion by Akhand Pratap Chaurasiya</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
