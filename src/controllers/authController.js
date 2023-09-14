const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    // Retrieve the bcrypt salt from .env file
    const bcryptSalt = Number(process.env.BCRYPT_SALT);
    const { fullName, username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    // console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This user is already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("New User added");
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "The user is not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is not matched",
      });
    }

    return res.status(200).json({
      success: true,
      user: user.fullName,
      message: "Login successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  register,
  login,
};
