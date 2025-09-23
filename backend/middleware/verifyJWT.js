const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }
  // Authorization header format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }
  // Verify JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info from token to request object for further use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyJWT;