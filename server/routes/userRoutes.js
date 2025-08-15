import express from 'express';
import { registerUser, loginUser, getUserdata, getCars } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const userRouter = express.Router();

// POST /api/users/register - User registration
userRouter.post('/register', registerUser);

// POST /api/users/login - User login
userRouter.post('/login', loginUser);

userRouter.get('/data',protect,getUserdata);

userRouter.get('/cars', getCars);

export default userRouter;
