const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" + err });
    }
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

module.exports = authMiddleware;
