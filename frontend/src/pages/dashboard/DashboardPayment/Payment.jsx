import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APP_URL from "../../../../APP_URL";

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    let { paymentId } = useParams();
    const [job, setJob] = useState({});
    useEffect(() => {
        fetch(`${APP_URL}/api/job/getCurrentJob/${paymentId}`)
        .then(res=>res.json())
        .then(data=>setJob(data))
    }, [paymentId])
    // const total = cart.reduce((sum, item) => sum + item.price, 0);
    // const price = parseFloat(total.toFixed(2))
    return (
        <div className="container mx-auto">
            <Elements stripe={stripePromise}>
                <CheckoutForm job={job} price={job.budget}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;