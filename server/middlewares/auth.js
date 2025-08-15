import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  
  if (!token) {
    return res.json({ success: false, message: "there is no token" });
  }

  // Handle Bearer token format
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    // Use jwt.verify instead of jwt.decode for security
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.json({ success: false, message: "no user found" });
    }

    // Use decoded.id instead of just decoded
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.json({ success: false, message: "not authorized" });
  }
};
