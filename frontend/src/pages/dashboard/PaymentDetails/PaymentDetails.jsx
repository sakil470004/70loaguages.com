import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaCreditCard, FaPaypal, FaRegMoneyBillAlt, FaReceipt } from 'react-icons/fa';

const PaymentDetails = () => {
    useEffect(() => {
        document.title = "Payment Details | 70Languages";
           // get argument from link
           const url = new URL(window.location.href);
           const success = url.searchParams.get("success");
           const cancelled = url.searchParams.get("cancelled");
           const jobId = url.searchParams.get("jobId");
           console.log(success, cancelled);
           if (success) {
            alert("Payment successful");  
               toast.success("Payment successful");
               
           } else if (cancelled) {
            alert("Payment cancelled");
           }
    }, []);
   
    return (
        <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Payment Details Heading */}
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Payment Details
            </h2>



            {/* Transaction History Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
                    <FaReceipt className="mr-2 text-yellow-500" /> Transaction History
                </h3>
                <div className="border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
                    <table className="w-full text-left">
                        <thead className="border-b-2">
                            <tr>
                                <th className="py-2">Date</th>
                                <th className="py-2">Amount</th>
                                <th className="py-2">Payment Method</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2">2024-09-15</td>
                                <td className="py-2">$150.00</td>
                                <td className="py-2">Credit Card</td>
                                <td className="py-2 text-green-600">Completed</td>
                            </tr>
                            <tr>
                                <td className="py-2">2024-08-20</td>
                                <td className="py-2">$45.00</td>
                                <td className="py-2">PayPal</td>
                                <td className="py-2 text-red-500">Pending</td>
                            </tr>
                            <tr>
                                <td className="py-2">2024-07-10</td>
                                <td className="py-2">$60.00</td>
                                <td className="py-2">Cash</td>
                                <td className="py-2 text-green-600">Completed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Total Amount Section */}
            <div className="flex justify-between items-center border-t pt-6">
                <span className="font-semibold text-gray-700">Total Amount Paid:</span>
                <span className="text-xl font-bold text-red-500">$205.00</span>
            </div>
        </div>
    );
};

export default PaymentDetails;
