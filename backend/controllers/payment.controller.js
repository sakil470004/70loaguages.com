import Job from "../models/job.model.js";
import Payment from "../models/payment.model.js";


// Get all notifications for the current user
export const getAllPaymentCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming req.user contains the authenticated user
        // console.log(userId);
        // get job id from quiery
        const { jobId } = req.query;


        const payments = await Payment.find({ userId });

        if (payments) {
            res.status(200).json(payments);
        } else {
            res.status(404).json([]);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });

    }
};
export const createPayment = async (req, res) => {
    try {
        const { userId, jobId, amount } = req.body;

        // if job id already on payment then return the payment details
        const paymentExist = await Payment
            .findOne({ jobId })
            .populate("jobId")
            .populate("userId");
        if (paymentExist) {
            return res.status(200).json(paymentExist);
        }

        const newPayment = new Payment({
            userId,
            jobId,
            amount
        });
        if (newPayment) {

            // edit job status
            await newPayment.save();
            const job = await Job.findById(jobId);
            job.paymentStatus = "Paid";
            job.paymentId = newPayment._id;
            await job.save();

            res.status(201).json({ ...newPayment, message: "Payment created successfully & job updated" });

        } else {
            res.status(400).json({ message: "Payment failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
