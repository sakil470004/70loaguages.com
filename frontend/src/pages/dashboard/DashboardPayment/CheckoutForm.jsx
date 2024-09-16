import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
import APP_URL from "../../../../APP_URL";
import { useAuthContext } from "../../../context/AuthContext";

const CheckoutForm = ({ job, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { authUser } = useAuthContext();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    console.log("price", price);
    console.log("job", job);
    console.log("key", import.meta.env.VITE_Payment_Gateway_PK);
    if (price > 0) {
      fetch(`${APP_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_Payment_Gateway_PK}`,
        },
        body: JSON.stringify({ price: price * 100 }),
      })
        .then((res) => res.json())
        .then((res) => {
        
          setClientSecret(res.clientSecret);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: authUser?.email || "unknown",
            name: authUser?.fullName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    // console.log('payment intent', paymentIntent)
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        user: authUser?.username,
        userId: authUser?._id,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        quantity: 1,
        jobId: job._id,
        status: "service pending",
        jobDetails: job,
      };
    //   adding payment to the database
      // fetch(`${APP_URL}/payments`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(payment),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data?.result?.insertedId) {
      //       toast.success("Payment Completed");
      //     }
      //   });
      console.log('payment', payment)
    }
  };

  return (<div className="py-8 md:py-10 px-4 bg-cover bg-center">
      <div className="flex justify-between items-end">
        <span className="text-2xl border-b-4 border-b-sky-600 text-sky-400 md:text-3xl font-semibold uppercase">
          Payment
        </span>
      </div>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <div className="text-green-600 ml-8">
            Payment completed successfully. Transaction ID: {transactionId}
        ---- <Link to="/dashboard/booking" className="btn btn-primary btn-sm mt-4">
            My Booking
        </Link>
        </div>

      )}
    </div>
  );
};

export default CheckoutForm;
