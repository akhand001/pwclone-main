import React, { useEffect, useState } from 'react';
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DialogDemo from '@/components/ui/Dialog1';
import Course from './Course';

const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const { data, isLoading, refetch } = useLoadUserQuery();
    const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error, isSuccess, isError }] = useUpdateUserMutation();

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePhoto(file);
    };

    const updateUserHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto);
        await updateUser(formData);
    };

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data.message || "Profile updated.");
        }
        if (isError) {
            toast.error(error.message || "Failed to update profile.");
        }
    }, [error, updateUserData, isSuccess, isError]);

    if (isLoading) {
        return (
            <div className="text-center mt-16">
                <h1 className="text-xl font-semibold">Loading Profile...</h1>
            </div>
        );
    }

    const { user } = data;

    return (
        <div className="max-w-4xl mx-auto px-4 my-16">
            <h1 className="font-bold text-3xl text-center md:text-left text-gray-800">Profile</h1>

            {/* Profile Card */}
            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Avatar className="h-32 w-32 mb-4 border-4 border-gray-300 shadow-lg rounded-lg">
                            <AvatarImage
                                src={user?.PhotoUrl || "https://github.com/shadcn.png"}
                                alt="User Avatar"
                                className="rounded-full"
                            />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <button
                            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
                            onClick={() => {/* Handle photo change */}}
                        >
                            <i className="fas fa-camera"></i>
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                </div>

                <div className="space-y-6 md:ml-8 w-full">
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h3 className="font-semibold text-xl text-gray-800">Email</h3>
                        <p className="text-gray-700">{user.email}</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg">
                        <h3 className="font-semibold text-xl text-gray-800">Role</h3>
                        <p className="text-gray-700">{user.role.toUpperCase()}</p>
                    </div>

                    {/* Profile Update Dialog */}
                    <DialogDemo
                        name={name}
                        updateUserIsLoading={updateUserIsLoading}
                        onChangeHandler={onChangeHandler}
                        setName={setName}
                        updateUserHandler={updateUserHandler}
                    />
                </div>
            </div>

            {/* Enrolled Courses Section */}
            <div className="mt-12">
                <h2 className="font-medium text-xl text-gray-900">Courses You're Enrolled In</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {user.enrolledCourses.length === 0 ? (
                        <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
                    ) : (
                        user.enrolledCourses.map((course) => (
                            <Course course={course} key={course._id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
