import UserModel from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';

//Todo:  Post | Public | /api/users/register

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already registered.');
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

//Todo:  Post | Public | api/users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

//Todo:  Post | Public | api/users/logout

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt2', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json('User Logged Out');
});

//Todo:  Get | Public | api/users/profile

const getProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      followers: req.user.followers,
      following: req.user.following,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

//Todo:  Put | Public | api/users/profile

const updateProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById({ _id: req.user._id });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
  }

  if (req.body.password) {
    user.password = req.body.password || user.password;
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User Not found.');
  }
});

//Todo:  Put | private | api/users/followUnfollow

const followUnfollowUser = asyncHandler(async (req, res) => {
  try {
    const targetUserId = req.body.followId; // The Id of user to follow
    const currentUserId = req.user._id; // Id of logged-in user

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot follow yourself.' });
    }

    const targetUser = await UserModel.findById({ _id: targetUserId });
    const currentUser = await UserModel.findById({ _id: currentUserId });

    if (!targetUser.followers.includes(currentUserId)) {
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetUserId);
      res.status(200).json({ message: 'User Followed Successfully.' });
    } else {
      targetUser.followers.pull(currentUserId);
      currentUser.following.pull(targetUserId);
      res.status(200).json({ message: 'User Unfollowed Successfully.' });
    }

    await targetUser.save();
    await currentUser.save();
  } catch (error) {
    res.status(500);
    throw new Error('Unable to follow user.', error.message);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  followUnfollowUser,
};
