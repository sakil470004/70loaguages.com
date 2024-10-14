import express from 'express';
import {
    getAllReview, createReview
    , deleteReview, updateReview
} from '../controllers/review.controller.js';


const router = express.Router();

// Get all review
router.get('/getAllReview', getAllReview);
// create review
router.post('/create', createReview);
// Delete a specific review
router.delete('/delete/:id', deleteReview);
// update a specific review
router.patch('/update/:id', updateReview);


export default router;
