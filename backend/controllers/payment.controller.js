import Payment from "../models/payment.model";


// Get all notifications for the current user
export const getAllPaymentCurrentUser = async (req, res) => {
    const { userId } = req.params; // Assuming req.user contains the authenticated user
    console.log(userId);
    // get job id from quiery
    const { jobId } = req.query;
    console.log(jobId);
    console.log(userId);
    const payments = await Payment.find({ userId });

    if (payments) {
        res.status(200).json(payments);
    } else {
        res.status(404).json([]);
    }
};