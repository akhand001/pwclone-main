import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";

// Search Page Component
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState(query || "");

  // Fetching the data from the API
  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: searchTerm,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  // Handle filter change
  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  // Update query param when search term changes
  useEffect(() => {
    setSearchParams({ query: searchTerm });
  }, [searchTerm, setSearchParams]);

  return (
    <div className="max-w-7xl mx-auto md:p-8 p-4 mt-8">
      {/* Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for courses..."
            className="w-full p-3 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <Button onClick={() => setSearchTerm(searchTerm)} className="ml-4 bg-blue-600 text-white">
          Search
        </Button>
      </div>

      {/* Search Results */}
      <div className="my-6">
        <h1 className="text-3xl font-semibold text-gray-800">Results for "{searchTerm}"</h1>
        <p className="text-lg text-gray-600">
          Showing results for
          <span className="text-blue-600 font-semibold italic"> "{searchTerm}"</span>
        </p>
      </div>

      {/* Filter Sidebar and Results Area */}
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => <CourseSkeleton key={idx} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// Skeleton Component for Course Loading
const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-6">
      <div className="h-32 w-full md:w-64 mb-4 md:mb-0">
        <Skeleton className="h-full w-full object-cover rounded-md shadow-md" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};

// Course Not Found Component
const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6 rounded-md shadow-xl">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-blue-600">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};
