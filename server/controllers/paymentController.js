import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res
                .status(404)
                .json({ success: false, message: "Booking not found" });
        }

        const options = {
            amount: booking.price * 100, // amount in paisa
            currency: "INR",
            receipt: `receipt_order_${bookingId}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Verify Payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } =
            req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await Booking.findByIdAndUpdate(bookingId, {
                paymentStatus: "Paid",
                transactionId: razorpay_payment_id,
                paymentId: razorpay_order_id,
            });

            res.json({
                success: true,
                message: "Payment successful",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
