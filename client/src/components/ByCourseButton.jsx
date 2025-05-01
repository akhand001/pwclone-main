import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi.js';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { loadRazorpayScript } from '@/utils/razorpay';

const ByCourseButton = ({ courseId }) => {
    const [createCheckoutSession, { data, isLoading, isError, error, isSuccess }] = useCreateCheckoutSessionMutation();
    const [isProcessing, setIsProcessing] = useState(false); // Track button state for processing

    const purchaseCourseHandler = async () => {
        // Set processing state to true to lock the button
        setIsProcessing(true);

        const response = await createCheckoutSession(courseId);
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
            toast.error("Razorpay SDK failed to load.");
            setIsProcessing(false);
            return;
        }

        const data = response?.data;

        if (!data?.orderId) {
            toast.error("Failed to create order.");
            setIsProcessing(false);
            return;
        }

        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: data.courseTitle,
            image: data.thumbnail,
            order_id: data.orderId,
            handler: function (response) {
                toast.success("Payment successful!");
                window.location.href = data.successUrl;
            },
            prefill: {
                name: "Your User Name", // Optional: Fill from auth state
                email: "user@example.com", // Optional
            },
            notes: {
                courseId,
            },
            theme: {
                color: "#4F46E5", // Modern shade of purple
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    useEffect(() => {
        if (isSuccess && !data?.orderId) {
            toast.error("Invalid response from server.");
            console.log("Invalid response from server:", data);
        }

        if (isError) {
            toast.error(error?.data?.message || "Failed to create checkout.");
        }

        // Reset processing state after success or error
        setIsProcessing(false);
    }, [data, isSuccess, isError]);

    return (
        <Button
            className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#6D5DFF] to-[#4F46E5] text-white font-semibold text-lg shadow-xl hover:from-[#4F46E5] hover:to-[#6D5DFF] transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:bg-gray-400 disabled:text-gray-600 flex justify-center items-center relative"
            disabled={isLoading || isProcessing} // Disable if loading or processing
            onClick={purchaseCourseHandler}
            aria-label="Purchase Course"
        >
            {isProcessing ? (
                <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    <span>Purchase Course</span>
                </>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs text-white bg-black py-1 px-2 rounded-md shadow-lg">
                Click to purchase this course.
            </div>
        </Button>
    );
};

export default ByCourseButton;
