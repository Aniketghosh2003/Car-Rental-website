import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
  {
    car: { type: ObjectId, ref: "Car", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    booking: { type: ObjectId, ref: "Booking", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    name: { type: String, trim: true }, // snapshot of user name at time of review
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
