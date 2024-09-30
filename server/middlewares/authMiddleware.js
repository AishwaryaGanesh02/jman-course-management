const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(403).send("A token is required for authentication");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
