const jwt = require("jsonwebtoken");
const JWT_SECRET = "vishalgautam";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied.");

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401);
  }
};

module.exports = fetchUser;
