import Review from "../models/review.model.js";

export const getAllReview = async (req, res) => {
    try {
        const review = await Review.find();
        res.json(review);
    } catch (error) {
        console.log("Error in review controller", error.message);
        res.status(500).json([]);
    }
};
export const createReview = async (req, res) => {
    try {
        // create a new review
        const review = new Review(req.body);
        // save the review
        await review.save();
        res.status(201).json({ ...review?._doc, message: "Review created successfully" });

    } catch (error) {
        console.log("Error in review controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const deleteReview = async (req, res) => {
    try {
        // delete a review
        const review = await Review.findByIdAndDelete(req.params.id);
        if (review) {
            res.json({ ...review, message: "Review deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        console.log("Error in review controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const updateReview = async (req, res) => {
    try {
        //  update a review
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (review) {
            res.json({ ...review?._doc, message: "Review updated successfully" });
        }
        else {
            res.status(404).json({ message: "Review not found" });
        }
    } catch (error) {
        console.log("Error in review controller", error.message);
        res.status(500).json({ message: error.message });
    }
};
