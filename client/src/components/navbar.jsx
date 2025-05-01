import { Menu, School, LogOut, Edit2, FileText, Settings } from "lucide-react"; // Using intuitive icons for each action
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            // Perform the logout
            await logoutUser();
            toast.success("You have been logged out successfully!");
            // Redirect to the login page after successful logout
            navigate("/login");
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
        }
    };

    useEffect(() => {
        if (isSuccess && data?.message) {
            toast.success(data.message);
        }
    }, [isSuccess, data?.message]);

    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 shadow-lg">
            {/* Desktop Navbar */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
                <div className="flex items-center gap-2">
                    <School size={"30"} className="text-blue-600" />
                    <Link to="/" className="font-extrabold text-2xl text-gray-900 dark:text-white">
                        E-MARROW
                    </Link>
                </div>
                {/* User icons and dark mode icon */}
                <div className="flex items-center gap-8">
                    {user ? (
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                                    <AvatarImage
                                        src={user?.PhotoUrl || "https://github.com/shadcn.png"}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                                <DropdownMenuLabel className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white p-2 rounded-t-md">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem icon={<FileText size={16} />} className="text-blue-600 hover:text-blue-700 transition-all">
                                        <Link to="my-learning">My learning</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem icon={<Edit2 size={16} />} className="text-blue-600 hover:text-blue-700 transition-all">
                                        <Link to="profile">Edit Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={logoutHandler}
                                        icon={<LogOut size={16} />}
                                        className="text-red-600 hover:text-red-700 transition-all"
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                {user?.role === "instructor" && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem icon={<Settings size={16} />} className="text-green-600 hover:text-green-700 transition-all">
                                            <Link to="/admin/dashboard">Instructor Dashboard</Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => navigate("/login")} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                                Login
                            </Button>
                            <Button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-700 text-white transition-all">
                                Signup
                            </Button>
                        </div>
                    )}
                    <DarkMode /> {/* Dark mode toggle */}
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <Link to="/" className="font-extrabold text-2xl text-gray-900 dark:text-white">
                    E-MARROW
                </Link>
                <MobileNavbar user={user} logoutHandler={logoutHandler} />
            </div>
        </div>
    );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
    const navigate = useNavigate();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    variant="outline"
                >
                    <Menu className="text-gray-800 dark:text-white" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all">
                <SheetHeader className="flex items-center justify-between mt-4 px-4">
                    <SheetTitle>
                        <Link to="/" className="font-bold text-xl text-gray-900 dark:text-white">
                            E-MARROW
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <Separator />
                <nav className="flex flex-col space-y-4 px-4 py-2 text-gray-800 dark:text-white">
                    <Link to="/my-learning" className="flex items-center gap-2 hover:text-blue-600 transition-all">
                        <FileText size={16} /> My Learning
                    </Link>
                    <Link to="/profile" className="flex items-center gap-2 hover:text-blue-600 transition-all">
                        <Edit2 size={16} /> Edit Profile
                    </Link>
                    {user ? (
                        <p className="cursor-pointer flex items-center gap-2 hover:text-blue-600 transition-all" onClick={async () => { await logoutHandler(); navigate("/login"); }}>
                            <LogOut size={16} /> Log Out
                        </p>
                    ) : (
                        <>
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all" onClick={() => navigate("/login")}>Login</Button>
                            <Button className="w-full bg-gray-300 dark:bg-gray-600 text-gray-800 hover:bg-gray-400 dark:hover:bg-gray-500 transition-all" onClick={() => navigate("/signup")}>Signup</Button>
                        </>
                    )}
                </nav>
                {user?.role === "instructor" && (
                    <SheetFooter className="px-4 py-2">
                        <SheetClose asChild>
                            <Button onClick={() => navigate("/admin/dashboard")} className="w-full bg-green-600 text-white hover:bg-green-700 transition-all">Instructor Dashboard</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
