import Review from "../models/Review.js";
import Booking from "../models/Booking.js";

// Get latest reviews for homepage / general listing
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("car", "brand model location")
      .populate("user", "image");

    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get reviews for a specific car
export const getCarReviews = async (req, res) => {
  try {
    const { carId } = req.params;
    const reviews = await Review.find({ car: carId })
      .sort({ createdAt: -1 })
      .populate("car", "brand model location");

    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching car reviews:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get rating summary (average rating and count) for all cars
export const getRatingsSummary = async (req, res) => {
  try {
    const summary = await Review.aggregate([
      {
        $group: {
          _id: "$car",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    res.json({ success: true, summary });
  } catch (error) {
    console.error("Error fetching ratings summary:", error);
    res.json({ success: false, message: error.message });
  }
};

// Create a review - only after confirmed booking whose returnDate has passed
export const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carId, bookingId, rating, comment } = req.body;

    if (!carId || !bookingId || !rating || !comment) {
      return res.json({ success: false, message: "carId, bookingId, rating and comment are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const now = new Date();

    // Ensure the specific booking belongs to the user, is for this car,
    // is confirmed, and its return date has already passed
    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      car: carId,
      status: "confirmed",
      returnDate: { $lte: now },
    });

    if (!booking) {
      return res.status(403).json({
        success: false,
        message: "You can review this car only after your confirmed booking has ended.",
      });
    }

    // Ensure the user has not already reviewed this booking
    const existingReview = await Review.findOne({ user: userId, booking: bookingId });
    if (existingReview) {
      return res.json({ success: false, message: "You have already reviewed this car" });
    }

    const review = await Review.create({
      car: carId,
      user: userId,
      booking: bookingId,
      rating,
      comment,
      name: req.user.name,
    });

    res.json({ success: true, review });
  } catch (error) {
    console.error("Error creating review:", error);
    res.json({ success: false, message: error.message });
  }
};
