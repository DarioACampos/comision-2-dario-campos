import User from "../models/user.js"
import bcrypt from "bcrypt";
// import {} from ""; 

export const ctrlRegister = async (req, res) => {
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
    res.status(201).json(user, { message: "user Created" })
  } catch (error) {
    res.status(500).json({ message: error.message })    
  }
} 

export const ctrlLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = await createJWT({ userId: user._id });
    res.status(200).json({ token, user }, {message: `Bienvenido ${user.username}!`});
  } catch (error) {
    res.status(500).json({ error: "Couldn't login user" });
  }
};

export const crtlLogout = async(req, res) => {
  try {
    
  } catch (err) {
    
  }
}