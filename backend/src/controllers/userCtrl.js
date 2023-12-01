import User from "../models/user.js"
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/jwt.js"; 

export const ctrlRegister = async (req, res) => {
  console.log( req.body );
  const { username, password, email, avatarURL } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: passwordHash,
      email,
      avatarURL
    });
    const user = await newUser.save()
    const token = await createAccessToken({ id: user._id });
    res.cookie('token', token);
    res.status(201).json({ user, message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: error.message })    
  }
} 

export const ctrlLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found', details: 'User may not exist in the database' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);
    res.status(201).json({token, user, message: `Welcome ${user.username}!`});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crtlLogout = async(req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta Pronto!" });
}

export const ctrlProfile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "User found" });
    res.json({
      message: "profile found",
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile error", error });
  }
};