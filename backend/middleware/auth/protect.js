import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt2;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.userId).select('-password');
    } catch (error) {
      res.status(401);
      throw new Error('User not authorized, Invalid token.');
    }
  } else {
    res.status(401);
    throw new Error('User not authorized, no token.');
  }
  next();
});

export { protect };
