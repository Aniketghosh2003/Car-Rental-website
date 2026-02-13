import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("server is running"));

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 3000;

// In local/dev, start the HTTP server. On Vercel, the exported app
// is used as the request handler by the @vercel/node runtime.
if (!process.env.VERCEL) {
	app.listen(PORT, () =>
		console.log(`Server is running on http://localhost:${PORT}`)
	);
}

export default app;