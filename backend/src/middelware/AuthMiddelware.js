const jwt = require("jsonwebtoken");

const AuthMiddelware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ error: "Access denied, invalid token" });

    const decorded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decorded;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = AuthMiddelware;
