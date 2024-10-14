//? this file is for control app core functions and it will be only given access to admin
import mongoose from "mongoose";

// text
// rating
// userId
//jobId

const reviewSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 10,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
    },

    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
