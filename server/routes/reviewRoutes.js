import express from "express";
import { protect } from "../middlewares/auth.js";
import { getReviews, getCarReviews, createReview, getRatingsSummary } from "../controllers/reviewController.js";

const router = express.Router();

// Public: get latest reviews for homepage
router.get("/", getReviews);

// Public: get rating summary (average rating & count) for all cars
router.get("/summary", getRatingsSummary);

// Public: get reviews for a specific car
router.get("/car/:carId", getCarReviews);

// Protected: create a new review
router.post("/", protect, createReview);

export default router;
