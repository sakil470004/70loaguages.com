import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaReceipt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import APP_URL from '../../../../APP_URL';

const PaymentDetails = () => {
    const { userId } = useParams();
    const [payments, setPayments] = useState([]);
    const [total, setTotal] = useState(0);
    const fetchAllPayment = (userId, jobId) => {
        fetch(`${APP_URL}/api/payment/getAllPayment/${userId}?jobId=${jobId}`)
            .then((res) => res.json())
            .then((data) => {
                setPayments(data?.reverse());
                let newTotal = 0;
                data.map((payment) => {
                    newTotal += payment.amount;
                }
                );
                setTotal(newTotal);
            })
    }
    useEffect(() => {
        // document.title = "Payment Details | 70Languages";
        // get argument from link
        const url = new URL(window.location.href);
        const success = url?.searchParams.get("success");
        const cancelled = url?.searchParams.get("cancelled");
        const jobId = url?.searchParams.get("jobId");
        const amount = url?.searchParams.get("amount");

        if (success) {
            alert("Payment successful");
            toast.success("Payment successful");
            fetch(`${APP_URL}/api/payment/createPayment/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    jobId,
                    amount: amount,
                })
            }).then((res) => res.json())
                .then((data) => {
                    //    remove the query from url
                    window.history.replaceState({}, document.title, "/" + "dashboard/paymentDetails/" + userId);
                }).catch((error) => {
                    console.log(error);
                })

        } else if (cancelled) {
            alert("Payment cancelled");
        }
        fetchAllPayment(userId, jobId);
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

                                <th>JOB ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments?.map(payment => (
                                <tr key={payment._id}>
                                    <td className="py-2">{payment?.createdAt}</td>
                                    <td className="py-2">${payment?.amount}</td>

                                    <td className="py-2 text-green-600">{payment?.jobId}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Total Amount Section */}
            <div className="flex justify-between items-center border-t pt-6">
                <span className="font-semibold text-gray-700">Total Amount Paid:</span>
                <span className="text-xl font-bold text-green-500">${total}</span>
            </div>
        </div>
    );
};

export default PaymentDetails;
