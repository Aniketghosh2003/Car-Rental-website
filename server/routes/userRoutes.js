import express from 'express';
import { registerUser, loginUser, getUserdata, getCars, googleAuth } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

// POST /api/users/register - User registration
userRouter.post('/register', registerUser);

// POST /api/users/login - User login
userRouter.post('/login', loginUser);

// POST /api/users/google-login - Google login
userRouter.post('/google-login', googleAuth);

userRouter.get('/data',protect,getUserdata);

userRouter.get('/cars', getCars);

export default userRouter;
