import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from '../models/user.js'

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." })

    const payload = { email: existingUser.email, id: existingUser._id };

    const token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10y' })

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);

  }
}

export const signUp = async (req, res) => {
  const { userName, email, password, firstName, lastName, imageUrl, bio, work, studies, preferencies } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    const existingUsername = await User.findOne({ username: userName });

    if (existingUser) return res.status(400).json({ message: "User registered with this email already exists." });

    if (existingUsername) return res.status(400).json({ message: "Username already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ username: userName, email: email, password: hashedPassword, hashedPassword, name: `${firstName} ${lastName}`, imageUrl: imageUrl, bio, work: { ...work }, studies: { ...studies }, preferencies: { ...preferencies } });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10y' });

    const refreshToken = jwt.sign({ email: result.email, id: result._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' });
    res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 90, httpOnly: true });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}

export const updateUser = async (req, res) => {
  const userData = req.body;
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No userData with that id");
    const updatedUserData = await User.findByIdAndUpdate(_id, { ...userData }, { new: true });
    res.json(updatedUserData);
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  await User.findByIdAndDelete(id);

  res.json({ message: "User deleted successufully" });
};


export const followUser = async (req, res) => {
  const { id, followingId } = req.params;
  console.log('followingId', followingId);
  console.log('id', id);

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with that id");
    
  const followingUser = await User.findById(followingId);
  
  if (!followingUser?.friends.includes(followingId)) {
  const friends = followingUser.friends;
  friends.push(id);
    var updatedUser = await User.findByIdAndUpdate(followingId, { ...followingUser, friends: [...friends] }, { new: true });
  }

  console.log(updatedUser);
  res.json(updatedUser);
};

export const unfollowUser = async (req, res) => {
  const { id, unfollowingId } = req.params;
  console.log('unfollowingId', unfollowingId);
  console.log('id', id);

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user with that id");
    
  const unfollowingUser = await User.findById(unfollowingId);
  console.log("user is following? ", unfollowingUser?.friends.includes(unfollowingId));
  if (unfollowingUser?.friends.includes(id)) {
    const unfollowIndex = unfollowingUser.friends.indexOf(id);
    const friends = unfollowingUser.friends.splice(unfollowIndex, 1);
    console.log(friends);
    var updatedUser = await User.findByIdAndUpdate(unfollowingId, { ...unfollowingUser, friends: [...friends] }, { new: true });
    console.log(updatedUser);
    res.json(updatedUser);
  }

};