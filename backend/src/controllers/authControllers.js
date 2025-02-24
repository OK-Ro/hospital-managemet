const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { firstName, surName, email, password, phone, address, role } =
      req.body;

    if (!firstName || !surName || !email || !password || !address || !role)
      return res.status(401).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(401).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      surName,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    });

    await newUser.save();

    res.status(200).json({ message: "User created successfully", newUser });
    console.log("created", newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid email or password" });

    // Update user's online status
    user.online = true;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        surName: user.surName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        online: user.online, // Include online status in the response
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user's online status
    user.online = false;
    await user.save();

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
