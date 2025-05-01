import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SelectDemo } from "@/components/ui/Select1";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, PlusCircle } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi.js";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();
  const navigate = useNavigate();

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  // for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 max-w-3xl mx-auto mt-20 p-10 bg-gradient-to-r from-blue-100 via-indigo-100 to-teal-100 rounded-3xl shadow-xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Let's add a course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Add some basic details for your new course.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Course Title
          </Label>
          <input
            type="text"
            name="CourseTitle"
            placeholder="Your Course Name"
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 ease-in-out"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </Label>

          {/* call the SelectDemo */}
          <SelectDemo getSelectedCategory={getSelectedCategory} />
        </div>
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/course")}
            className="py-2 px-4 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
